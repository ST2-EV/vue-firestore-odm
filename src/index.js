import { fCollection } from "./odm/fCollection"

export default {
    install: (app, options) => {
        app.mixin({
            beforeCreate() {
                this.$firestore = {}
                const { collections } = options
                for (const collection in collections) {
                    this.$firestore[collection] = new fCollection({ "___name": collection, ...collections[collection]})
                }
            },
        });
    }
}