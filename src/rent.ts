import { Bike } from "./bike";
import { User } from "./user";

export class Rent {
    private constructor(
        public bike: Bike,
        public user: User,
        public hourFrom: Date,
        public hourTo: Date,
        public dateReturned?: Date
    ) {}

    static create(rents: Rent[], bike: Bike, user: User, startDate: Date, endDate: Date): Rent {
        const rent = new Rent(bike, user, startDate, endDate)
        const rentIndex = rents.findIndex(rent => rent.bike.id === bike.id && rent.user.email === user.email)
        if (rentIndex !== -1) {
            throw new Error('Rent already exists.')
        }
        return rent
    }

    static canRent(rents: Rent[], bike: Bike): boolean {
        const rentIndex = rents.findIndex(rent => rent.bike.id === bike.id && !rent.dateReturned)
        return rentIndex === -1
    }
}