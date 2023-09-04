import { Bike } from "./bike";
import { Rent } from "./rent";
import { User } from "./user";
import crypto from 'crypto'

export class App {
    users: User[] = []
    bikes: Bike[] = []
    rents: Rent[] = []

    findUser(email: string): User {
        return this.users.find(user => user.email === email)
    }

    registerUser(user: User): void {
        for (const rUser of this.users) {
            if (rUser.email === user.email) {
                throw new Error('Duplicate user.')
            }
        }
        user.id = crypto.randomUUID()
        this.users.push(user)
    }

    registerBike(bike: Bike): void {
        for (const rBike of this.bikes) {
            if (rBike.id === bike.id) {
                throw new Error('Duplicate bike.')
            }
        }
        bike.id = crypto.randomUUID()
        this.bikes.push(bike)
    }

    removeUser(email: string): void {
        const user = this.findUser(email)
        if (user) {
            this.users.splice(this.users.indexOf(user), 1)
        }
    }

    rentBike(rent: Rent): void {
        const canRent = Rent.canRent(this.rents, rent.dateFrom, rent.dateTo)
        if (canRent) {
            this.rents.push(rent)
        } else {
            throw new Error('Overlapping dates.')
        }
    }

    returnBike(bike: Bike, user: User): void {
        const rent = this.rents.find(rent => rent.bike.id === bike.id && rent.user.id === user.id)
        if (rent) {
            rent.dateReturned = new Date()
        }
    }
}

