export default class BadRequest extends Error {
    constructor(message = "Bad Request") {
        super(message)
        this.name = "Bad Request"
    }
}
