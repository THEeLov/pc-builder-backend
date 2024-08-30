export default class InternalError extends Error {
    constructor(message = "The problem is on our side.") {
        super(message)
        this.name = "InternalError"
    }
}
