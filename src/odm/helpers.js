export const TYPES = ["Array", "Boolean", "Datetime", "Map", "String", "Number", "Null", "Reference"]

export const REQUIRED = "req"
export const OPTIONAL = "opt"
export const RESERVED = "res"

export const defaultValues = {
    "Array": [],
    "Boolean": false,
    "Datetime": new Date(),
    "Map": {},
    "String": "empty",
    "Number": -86757,
    "Null": null,
    "Reference": "emptyRef"
}

export const validators = {
    "Array" : (value) => {
        return Array.isArray(value);
    },
    "Boolean": (value) => {
        return typeof value == "boolean";
    },
    "Datetime": (value) => {
        return (value instanceof Date);
    },
    "Map": (value) => {
        return (typeof value === 'object' &&
        !Array.isArray(value) &&
        value !== null);
    },
    "String": (value) => {
        return (typeof value === 'string' || value instanceof String);
    },
    "Number": (value) => {
        return !isNaN(parseFloat(value)) && !isvalueaN(value - 0);
    },
    "Null": (value) => {
        return value === null;
    },
    "Reference": (value) => {
        return (value instanceof DocumentReference);
    }

}


export const validate = (doc, template) => {
    let validatedDoc = {};
    validatedDoc['id'] = doc['id'];
    for (let key in template) {
        if (key === "___name") continue;
        if (doc.hasOwnProperty(key)){
            if (validators[template[key][0]](doc[key])) {
                validatedDoc[key] = doc[key]
            } else {
                console.log(`${key} is not of type ${template[key][0]}`)
                validatedDoc[key] = doc[key]
            }
        } else {
            if (template[key][1] === REQUIRED) {
                console.log(`${key} (required key) is not on firestore doc ${doc['id']}, default value of ${defaultValues[template[key][0]]} has been set`)
            }
            validatedDoc[key] = defaultValues[template[key][0]]
        }
    }
    return validatedDoc
}


export const isValid = (doc, template) => {
    let bool = true;
    for (let key in template) {
        if (key === "___name") continue;
        if (doc.hasOwnProperty(key)){
            if (!validators[template[key][0]](doc[key])) {
                bool = false;
                console.log(`${key} is not of type ${template[key][0]}`)
            }
        } else {
            if (template[key][1] === REQUIRED) {
                bool = false;
                console.log(`${key} (required key) is not found`)
            }
        }
    }
    return bool;
}


export const validateObj = (doc, template) => {
    return doc
}