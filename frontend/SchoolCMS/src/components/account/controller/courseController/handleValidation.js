export function handleValidation(value, field) {
    if (field.toLowerCase().includes("name")) {
        if (validNumChars(value, 3, 32)) {
            return true;
        }
        return false;
    } else if (field.toLowerCase().includes("code")) {
        if (validNumChars(value, 4, 15)) {
            return true;
        }
        return false;
    } else if (field.toLowerCase().includes("year")) {
        if (
            isNaN(parseInt(value)) ||
            parseInt(value) < new Date().getFullYear() ||
            parseInt(value) > new Date().getFullYear() + 4
        ) {
            return false;
        }
        return true;
    } else if (
        field.toLowerCase().includes("homework") ||
        field.toLowerCase().includes("activities") ||
        field.toLowerCase().includes("midterm") ||
        field.toLowerCase().includes("reports") ||
        field.toLowerCase().includes("projects") ||
        field.toLowerCase().includes("quizzes") ||
        field.toLowerCase().includes("exams") ||
        field.toLowerCase().includes("final") ||
        field.toLowerCase().includes("presentations") ||
        field.toLowerCase().includes("participation")
    ) {
        if (
            (isNotaNumber(value) && value !== "") ||
            parseInt(value) > 100 ||
            parseInt(value) < 0
        ) {
            return false;
        }
        return true;
    }
}

const validNumChars = (value, min, max) => {
    if (value.length > max || (value.length < min && value.length !== 0))
        return false;
    else return true;
};

const isNotaNumber = (value) => {
    return isNaN(parseInt(value));
};
