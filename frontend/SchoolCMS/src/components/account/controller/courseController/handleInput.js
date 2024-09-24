import useSetStorage from "src/hooks/useSetStorage";
import { handleValidation } from "./handleValidation";

export function handleInput(
    e,
    fieldName,
    fieldSetterFn,
    validationName,
    validationSetterFn
) {
    if (validationName && validationSetterFn) {
        useSetStorage(
            validationName,
            handleValidation(e.target.value, fieldName),
            validationSetterFn
        );
    }

    useSetStorage(fieldName, e.target.value, fieldSetterFn);
}
