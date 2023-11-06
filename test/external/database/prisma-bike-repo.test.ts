import { PrismaBikeRepo } from "../../../src/external/database/prisma-bike-repo"
import { Bike } from "../../../src/bike"
import prisma from "../../../src/external/database/db"

describe('PrismaBikeRepo', () => {
    beforeEach(async () => {
        await prisma.user.deleteMany({})
    })

    afterAll(async () => {
        await prisma.user.deleteMany({})
    })

    it('adds a bike in the database', async () => {
        const bikeToBePersisted = new Bike(
            'test bike',
            'test type',
            1,
            1,
            1,
            'test description',
            1,
            ['test url'],
            true
        )
        const repo = new PrismaBikeRepo()
        await repo.add(bikeToBePersisted)
        const persistedBike = await repo.find('test bike')
        expect(persistedBike).toEqual(bikeToBePersisted)
    })

    it('removes a bike from the database', async () => {
        const bikeToBePersisted = new Bike(
            'test bike',
            'test type',
            1,
            1,
            1,
            'test description',
            1,
            ['test url'],
            true
        )
        const repo = new PrismaBikeRepo()
        await repo.add(bikeToBePersisted)
        await repo.remove('test bike')
        const persistedBike = await repo.find('test bike')
        expect(persistedBike).toEqual(null)
    })

    it('lists bike in the database', async () => {
        const bikeToBePersisted = new Bike(
            'test bike',
            'test type',
            1,
            1,
            1,
            'test description',
            1,
            ['test url'],
            true
        )
        const repo = new PrismaBikeRepo()
        await repo.add(bikeToBePersisted)
        const persistedBikes = await repo.list()
        expect(persistedBikes).toEqual([bikeToBePersisted])
    })

    it('updates a bike in the database', async () => {
        const bikeToBePersisted = new Bike(
            'test bike 1',
            'test type',
            1,
            1,
            1,
            'test description',
            1,
            ['test url'],
            true
        )
        const repo = new PrismaBikeRepo()
        await repo.add(bikeToBePersisted)
        const bikeToBeUpdated = new Bike(
            'test bike 2',
            'test type',
            2,
            2,
            2,
            'test description',
            2,
            ['test url'],
            true
        )
        await repo.update('test bike 1', bikeToBeUpdated)
        const persistedBike = await repo.find('test bike 2')
        expect(persistedBike).toEqual(bikeToBeUpdated)
    })

    it('finds a bike in the database', async () => {
        const bikeToBePersisted = new Bike(
            'test bike',
            'test type',
            1,
            1,
            1,
            'test description',
            1,
            ['test url'],
            true
        )
        const repo = new PrismaBikeRepo()
        await repo.add(bikeToBePersisted)
        const persistedBike = await repo.find('test bike')
        expect(persistedBike).toEqual(bikeToBePersisted)
    })
})