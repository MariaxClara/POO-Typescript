import sinon from "sinon"
import { App } from "./app"
import { Bike } from "./bike"
import { User } from "./user"
import { Location } from "./location"

describe('App', () => {
    it('should correctly calculate the rent amount', async () => {
        const app = new App()
        const user = new User('Jose', 'jose@mail.com', '1234')
        await app.registerUser(user)
        const bike = new Bike('caloi mountainbike', 'mountain bike',
            1234, 1234, 100.0, 'My bike', 5, [])
        app.registerBike(bike)
        const clock = sinon.useFakeTimers();
        app.rentBike(bike.id, user.email)
        const hour = 1000 * 60 * 60
        clock.tick(2 * hour)
        const rentAmount = app.returnBike(bike.id, user.email)
        expect(rentAmount).toEqual(200.0)
    })

    it('should be able to move a bike to a specific location', () => {
        const app = new App()
        const bike = new Bike('caloi mountainbike', 'mountain bike',
            1234, 1234, 100.0, 'My bike', 5, [])
        app.registerBike(bike)
        const newYork = new Location(40.753056, -73.983056)
        app.moveBikeTo(bike.id, newYork)
        expect(bike.location.latitude).toEqual(newYork.latitude)
        expect(bike.location.longitude).toEqual(newYork.longitude)
    })

    it('should throw an exception when trying to move an unregistered bike', () => {
        const app = new App()
        const Brazil = new Location(-15.826691, -47.921820)
        expect(() => app.moveBikeTo('nao-existe', Brazil)).toThrowError('Bike not found')
    })

    it('should throw an exception when trying to move a bike to an invalid location', () => {
        const app = new App()
        const bike = new Bike('caloi mountainbike', 'mountain bike',
            1234, 1234, 100.0, 'My bike', 5, [])
        app.registerBike(bike)
        const invalidLocation = new Location(1000, 1000)
        expect(() => app.moveBikeTo(bike.id, invalidLocation)).toThrowError('Invalid location')
    })

    it('should only allow registered users to rent bikes', async () => {
        const app = new App()
        const bike = new Bike('caloi mountainbike', 'mountain bike',
            1234, 1234, 100.0, 'My bike', 5, [])
        app.registerBike(bike)
        expect(() => app.rentBike(bike.id, 'nao-existe')).toThrowError('User not found')
    })

    it('should authenticate a user', async () => {
        const app = new App()
        const user = new User('Jose', '', '1234')
        await app.registerUser(user)
        const authenticated = app.authenticate(user.email, user.password)
        expect(authenticated).toBeTruthy()
    })

    it('should find a user', async () => {
        const app = new App()
        const user = new User('Jose', '', '1234')
        await app.registerUser(user)
        const foundUser = app.findUser(user.email)
        expect(foundUser).toEqual(user)
    })

    it('should throw an exception when trying to register a duplicate user', async () => {
        const app = new App()
        const user = new User('Jose', '', '1234')
        await app.registerUser(user)
        const duplicateUser = new User('Jose', '', '1234')
        expect(() => app.registerUser(duplicateUser)).toThrowError('Duplicate user')
    })

    it('should register a bike', async () => {
        const app = new App()
        const bike = new Bike('caloi mountainbike', 'mountain bike',
            1234, 1234, 100.0, 'My bike', 5, [])
        const newId = app.registerBike(bike)
        expect(newId).toBeTruthy()
    })

    it('should remove a user', async () => {
        const app = new App()
        const user = new User('Jose', '', '1234')
        await app.registerUser(user)
        app.removeUser(user.email)
        expect(app.users.length).toEqual(0)
    })

    it('should find a bike', async () => {
        const app = new App()
        const bike = new Bike('caloi mountainbike', 'mountain bike',
            1234, 1234, 100.0, 'My bike', 5, [])
        app.registerBike(bike)
        const foundBike = app.findBike(bike.id)
        expect(foundBike).toEqual(bike)
    })

    it('should return a bike', async () => {
        const app = new App()
        const user = new User('Jose', '', '1234')
        await app.registerUser(user)
        const bike = new Bike('caloi mountainbike', 'mountain bike',
            1234, 1234, 100.0, 'My bike', 5, [])
        app.registerBike(bike)
        const clock = sinon.useFakeTimers();
        app.rentBike(bike.id, user.email)
        const hour = 1000 * 60 * 60
        clock.tick(2 * hour)
        app.returnBike(bike.id, user.email)
        expect(bike.available).toEqual(true)
    })
    
    it('should register a user', async () => {
        const app = new App()
        const user = new User('Jose', '', '1234')
        const newId = await app.registerUser(user)
        expect(newId).toBeTruthy()
    })

})