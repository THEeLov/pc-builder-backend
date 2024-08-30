export default class ConflictError extends Error {
    constructor(
        message = "The request could not be completed due to a conflict with the current state of the target resource.",
    ) {
        super(message)
        this.name = "ConflictError"
    }
}
