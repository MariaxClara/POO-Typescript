export class RentNotFoundError extends Error {
    public readonly name = 'RendNotFoundError'

    constructor() {
        super('Rent not found.')
    }
}