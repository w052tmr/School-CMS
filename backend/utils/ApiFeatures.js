class APIFeatures {
    constructor(query, queryStr) {
        this.query = query;
        this.queryStr = queryStr;
    }

    filter() {
        this.queryStr = JSON.parse(
            JSON.stringify(this.queryStr).replace(/([gl]te?)/g, "$$$1")
        );

        let filter = JSON.parse(JSON.stringify(this.queryStr));
        delete filter.fields;
        delete filter.sort;
        delete filter.page;
        delete filter.limit;

        this.query = this.query.find(filter);

        return this;
    }

    fields() {
        if (this.queryStr.fields) {
            let fields = this.queryStr.fields.split(",").join(" ");
            fields = fields.replace("password", "");
            fields = fields.replace("passwordModifiedAt", "");
            fields = fields.replace("passwordResetToken", "");
            this.query = this.query.select(fields);
        } else {
            this.query = this.query.select(
                "-password -passwordModifiedAt -passwordResetToken"
            );
        }

        return this;
    }

    sort() {
        if (this.queryStr.sort) {
            const sortBy = this.queryStr.sort.split(",").join(" ");
            this.query = this.query.sort(sortBy);
        } else {
            this.query = this.query.sort("id");
        }

        return this;
    }

    limit() {
        if (this.queryStr.limit) {
            const limit = this.queryStr.limit;
            this.query.limit(limit);
        }
        return this;
    }

    paginate() {
        const limit = this.queryStr.limit || 100000;
        const page = this.queryStr.page || 1;
        const skip = (page - 1) * limit;
        this.query = this.query.skip(skip).limit(limit);

        return this;
    }
}

module.exports = APIFeatures;
