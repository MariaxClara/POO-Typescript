import Bicycle from './Bicycle';
import Customer from './Customer';
import BikeRentStore from './BikeRentStore';

const bikeStore = new BikeRentStore("Maria's Bike Store");

bikeStore.updateInventory(new Bicycle('Caloi'), 2);
bikeStore.updateInventory(new Bicycle('Monark'), 5);
bikeStore.updateInventory(new Bicycle('Alfameq'), 5);

bikeStore.rent(new Customer('Maria'), 'Caloi', new Date('08/26/2023'), new Date('08/28/2023'));
bikeStore.rent(new Customer('Gustavo'), 'Caloi', new Date('08/26/2023'), new Date('08/28/2023'));
bikeStore.rent(new Customer('Clara'), 'Monark', new Date('08/26/2023'), new Date('08/28/2023'));

console.log(bikeStore.toString());
