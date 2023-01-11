export class fList {
    constructor(docs, template) {
        let mappedDocs = {}
        for (let doc of docs) {
            mappedDocs[doc["id"]] = doc;
        }
        this.docs = mappedDocs
        this.template = template
        this._docList = docs
    }

    get(id){
        return this.docs[id]
    }

    append(fDoc) {
        this.docs[fDoc.id] = fDoc
        this._docList.push(fDoc)
    }

    removeAll() {
        this._docList = []
        this.docs = {}
    }

    [Symbol.iterator]() {
        let index = -1;
        let docList  = this._docList;

        return {
          next: () => ({ value: docList[++index], done: !(index in docList) })
        };
    };
}