import { getDoc, doc, deleteDoc, updateDoc } from "firebase/firestore";
import { validate, defaultValues } from "./helpers"

export class fDocument {
    constructor(payload, template, db) {
        if (!payload.hasOwnProperty('id')){
            throw 'No id on the document, this will not work'
        }
        this.deleted = false;
        this.template = template;
	    Object.assign(this, payload);
        this._cloud = payload;
        this.db = db;
    }

    async get() {
        if (!this.deleted) {
            const docRef = doc(this.db, this.template["___name"], this.id);
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
                let validatedDoc = validate(docSnap.data(), this.template)
                Object.assign(this, validatedDoc);
            } else {
                console.log(`Document with id ${id} does not exist on firestore`)
            }
        } else {
            console.log(`${this.id} has been deleted from ${this.template["___name"]}, get rid of this ref`)
        }
    }

    async delete() {
        await deleteDoc(doc(this.db, this.template["___name"],  this.id));
        this.deleted = true;
    }

    async update() {
        let diff = Object.keys(this._cloud).reduce((diff, key) => {
            if (this[key] === this._cloud[key]) return diff
            return {
                ...diff,
                [key]: this._cloud[key]
            }
        }, {})
        if (!(diff && Object.keys(diff).length === 0 && Object.getPrototypeOf(diff) === Object.prototype)) {
            console.log(diff)
            let updatedDoc = {}
            for (let key in diff) {
                updatedDoc[key] = this[key]
            }
            try {
                await updateDoc(doc(this.db, this.template["___name"], this.id), updatedDoc);
            } catch (error) {
                console.log(error)
            }
        }
    }

    static dummy(template) {
        let validatedDoc = {}
        for (let key in template) {
            validatedDoc[key] = defaultValues[template[key][0]]
        }
        validatedDoc["___name"] = template["___name"]
        return validatedDoc
    }
}