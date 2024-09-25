import { numberFields } from "./numberFields";

function useSetStorage(
    name,
    value,
    setter = undefined,
    baseSetterOffCurrState = false,
    storageType = "local"
) {
    let stored;
    if (typeof value === "boolean" || typeof value === "object") {
        stored = JSON.stringify(value);
    } else if (numberFields.includes(name)) {
        stored = typeof parseInt(value) === "number" ? value : "0";
    } else stored = value;

    if (setter) {
        if (baseSetterOffCurrState) {
            setter((prev) => !prev);
        } else {
            setter(value);
        }
    }

    if (storageType === "local") {
        localStorage.setItem(name, stored);
    } else if (storageType === "session") {
        sessionStorage.setItem(name, stored);
    }
}

export default useSetStorage;
