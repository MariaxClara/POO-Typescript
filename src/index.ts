import { App } from "./app";
import { Bike } from "./bike";
import { Rent } from "./rent";
import { User } from "./user";

const app = new App()
const bike1 = new Bike('Bike 1', 'Mountain', 20, 100, 10, 'A bike', 5, ['url1', 'url2'])
app.registerBike(bike1)

const user1 = new User('Maria', 'maria@mail.com', '1234')
app.registerUser(user1)

const today = new Date()
const twoDaysFromToday = new Date()
twoDaysFromToday.setDate(twoDaysFromToday.getDate() + 2)
const tomorrow = new Date()
tomorrow.setDate(tomorrow.getDate() + 1)
const sevenDaysFromToday = new Date()
sevenDaysFromToday.setDate(sevenDaysFromToday.getDate() + 7)

const rent1 = Rent.create([], bike1, user1, today, twoDaysFromToday)
app.rentBike(rent1)

const user2 = new User('Maria Clara', 'maria@mail.com', '3123')
app.registerUser(user2)

console.log(app.findUser('maria@mail.com'))

app.returnBike(bike1, user1)


