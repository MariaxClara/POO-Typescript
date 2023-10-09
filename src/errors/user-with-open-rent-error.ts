export class UserWithOpenRentError extends Error {
    public readonly name = 'UserWithOpenRentError'

    constructor() {
        super('Cannot remove user with open rents.')
    }
}