import { useState } from "react";
import { numberFields } from "./numberFields";

function useStorage(name, init) {
    return useState(() => {
        let storage;
        if (Array.isArray(localStorage.getItem(name))) {
            storage = JSON.parse(localStorage.getItem(name));
            if (storage) return storage;
        } else {
            storage = localStorage.getItem(name);
        }

        if (!storage) return init;

        let stored;
        if (storage === "false") {
            stored = false;
        } else if (storage === "true") {
            stored = true;
        } else if (typeof storage === "object") {
            stored = JSON.parse(storage);
        } else if (numberFields.includes(name)) {
            //numbers MUST be added to numberFields or they will be parsed as strings
            stored =
                typeof parseInt(storage) === "number" ? parseInt(storage) : 0;
        } else stored = storage;

        return stored;
    });
}

export default useStorage;
