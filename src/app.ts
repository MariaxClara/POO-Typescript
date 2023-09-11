import { Bike } from "./bike";
import { Rent } from "./rent";
import { User } from "./user";
import crypto from 'crypto'
import bcrypt from 'bcryptjs';

export class App {
    users: User[] = []
    bikes: Bike[] = []
    rents: Rent[] = []

    findUser(email: string): User {
        return this.users.find(user => user.email === email)
    }

    registerUser(user: User, password: string): string {
        for (const rUser of this.users) {
            if (rUser.email === user.email) {
                throw new Error('Duplicate user.')
            }
        }
        const newId = crypto.randomUUID()
        user.id = newId
        const salt = bcrypt.genSaltSync(10)
        const hash = bcrypt.hashSync(password, salt)
        user.password = hash
        this.users.push(user)
        return newId
    }

    registerBike(bike: Bike): string {
        const newId = crypto.randomUUID()
        bike.id = newId
        this.bikes.push(bike)
        return newId
    }

    removeUser(email: string): void {
        const userIndex = this.users.findIndex(user => user.email === email)
        if (userIndex !== -1) {
            this.users.splice(userIndex, 1)
            return
        }
        throw new Error('User does not exist.')
    }
    
    rentBike(bikeId: string, userEmail: string, startDate: Date, endDate: Date): void {
        const bike = this.bikes.find(bike => bike.id === bikeId)
        if (!bike) {
            throw new Error('Bike not found.')
        }
        const user = this.findUser(userEmail)
        if (!user) {
            throw new Error('User not found.')
        }
        const bikeRents = this.rents.filter(rent =>
            rent.bike.id === bikeId && !rent.dateReturned
        )
        const newRent = Rent.create(bikeRents, bike, user, startDate, endDate)
        this.rents.push(newRent)
    }

    returnBike(bikeId: string, userEmail: string) {
        const today = new Date()
        const rent = this.rents.find(rent => 
            rent.bike.id === bikeId &&
            rent.user.email === userEmail &&
            rent.dateReturned === undefined &&
            rent.dateFrom <= today
        )
        if (rent) {
            rent.dateReturned = today
            return
        }
        throw new Error('Rent not found.')
    }

    listBikes(): void {
        console.log('Bikes:')
        for (const bike of this.bikes) {
            console.log(bike)
        }
    }

    listRents(): void {
        console.log('Rents:')
        for (const rent of this.rents) {
            console.log(rent)
        }
    }

    listUsers(): void {
        console.log('Users:')
        for (const user of this.users) {
            console.log(user)
        }
    }

    authenticateUser(userId: string, password: string): boolean {
        const user = this.users.find(user => user.id === userId)
        if (!user) {
            return false
        }
        return bcrypt.compareSync(password, user.password)
    }
}