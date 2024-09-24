//THIS SCRIPT GENERATES JSON DATA FOR FAKE USERS FROM ROOT DIRECTORY: node .\frontend\public\data\generateUsers.js

const fs = require("fs");

const getRandomDate = (age = undefined) => {
    const months = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
    ];

    let randomInt = Math.floor(Math.random() * 11);

    let randomYear = Math.floor(Math.random() * (2000 - 1950) + 1950);

    if (age) {
        const current = new Date(Date.now());
        let year = current.getFullYear() - age;
        if (randomInt > current.getMonth()) {
            year -= 1;
        } else if (randomInt === current.getMonth()) {
            year -= 1;
            randomInt += 1;
        }

        randomYear = year;
    }

    let randomMonth = months.at(randomInt);

    let daysInMonth;
    if (randomInt === 1) {
        daysInMonth = 28;
    } else if (
        (randomInt < 7 && randomInt % 2 === 0) ||
        (randomInt >= 7 && randomInt % 2 !== 0)
    ) {
        daysInMonth = 31;
    } else daysInMonth = 30;

    const randomDay = Math.floor(Math.random() * (daysInMonth - 1) + 1);

    return new Date(`${randomMonth} ${randomDay}, ${randomYear}`);
};

const getData = async () => {
    try {
        let users = [];
        for (let i = 0; i < 3; i++) {
            // create users for each of these 3 schools
            let school;
            if (i === 0) {
                school = "William McKinley High School";
            } else if (i === 1) {
                school = "Normane Valley High";
            } else if (i === 2) {
                school = "Redcrest High";
            } else break;

            let dob;
            for (let j = 0; j < 6; j++) {
                let res;
                // initialize role to student
                let role = "student";
                if (j === 0) {
                    res = await fetch(
                        // generate grade 9
                        "https://randomuser.me/api/?nat=us&results=30"
                    );
                } else if (j === 1) {
                    res = await fetch(
                        // generate grade 10
                        "https://randomuser.me/api/?nat=us&results=30"
                    );
                } else if (j === 2) {
                    res = await fetch(
                        // generate grade 11
                        "https://randomuser.me/api/?nat=us&results=30"
                    );
                } else if (j === 3) {
                    res = await fetch(
                        // generate grade 12
                        "https://randomuser.me/api/?nat=us&results=30"
                    );
                } else if (j === 4) {
                    res = await fetch(
                        // generate teachers
                        "https://randomuser.me/api/?nat=us&results=6"
                    );
                    // change role to teacher
                    role = "teacher";
                } else if (j === 5) {
                    res = await fetch(
                        // generate an admin
                        "https://randomuser.me/api/?nat=us&results=1"
                    );
                    // change role to admin
                    role = "admin";
                }

                const data = (await res.json()).results;
                // console.log(data);

                const tmpUsers = data.map((user) => {
                    if (j === 0) {
                        dob = getRandomDate(14);
                    } else if (j === 1) {
                        dob = getRandomDate(15);
                    } else if (j === 2) {
                        dob = getRandomDate(16);
                    } else if (j === 3) {
                        dob = getRandomDate(17);
                    } else dob = getRandomDate();

                    const { name, gender, location, email, phone, picture } =
                        user;

                    const { street, city, state, country, postcode } = location;

                    const { first, last, title } = name;

                    const address = `${street.number} ${street.name}`;

                    const defaultPhoto = picture.medium;

                    let type = "";
                    if (role === "student") type = "student";
                    else type = "teacher";

                    return JSON.stringify({
                        firstName: first,
                        lastName: last,
                        title,
                        email,
                        password:
                            "$2b$12$jgGa2aPGTZ1w0Pk.zvdGxuQSMBJWH7hb/FJRoXz8LkQTBrKttC5TS",
                        phone,
                        gender,
                        dob,
                        address,
                        city,
                        state,
                        country,
                        zip: `${postcode}`,
                        defaultPhoto,
                        school,
                        role,
                        type,
                    });
                });

                users = users.concat(tmpUsers);
            }
        }

        fs.writeFileSync(
            `${__dirname}/users.json`,
            `${users.join(",\n\n")}`,
            (err) => {
                if (err) throw new Error("Error Writing to File", err);
                else {
                    console.log("Data Written to File...");
                }
            }
        );
    } catch (error) {
        console.log(error);
    }
};

getData()
    .then(() => console.log("Complete!"))
    .catch((err) => console.log(`Error! ${err}`));
