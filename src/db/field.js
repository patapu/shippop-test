class DBField {
    constructor(Schema) {
        this.Schema = Schema
    }
    get mainField() {
        return {
            createdBy: this.Schema.Types.ObjectId,
            createdDate: Date,
            updatedBy: this.Schema.Types.ObjectId,
            updatedDate: Date,
            createdPGM: String,
        }
    }
}
module.exports = DBField