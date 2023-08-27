import Bicycle from './Bicycle';
import Customer from './Customer';

const { v1: uuidv1 } = require('uuid');

class BikeRentStore {
  storeName: string;
  inventory: Record<string, { model: string, rentedFrom: Date, rentedTo: Date, customer: string | null }>;
  minDate: Date;
  maxDate: Date;

  constructor(storeName: string) {
    this.storeName = storeName;
    this.inventory = {};
    this.minDate = new Date('01/01/2001');
    this.maxDate = new Date('31/12/2099');
  }

  updateInventory(bicycle: Bicycle, amount: number): void {
    for (let i = 0; i < amount; i++) {
      const bikeId = uuidv1();
      this.inventory[bikeId] = {
        model: bicycle.model,
        rentedFrom: this.maxDate,
        rentedTo: this.minDate,
        customer: null
      };
    }
  }

  isAvailable(model: string, startDate: Date, endDate: Date): string | null {
    for (const bikeId in this.inventory) {
      if (this.inventory.hasOwnProperty(bikeId)) {
        const bike = this.inventory[bikeId];
        let intersect = false;

        if (bike.model === model) {
          if (bike.rentedFrom <= startDate && startDate <= bike.rentedTo) {
            intersect = true;
          }

          if (bike.rentedFrom <= endDate && endDate <= bike.rentedTo) {
            intersect = true;
          }

          if (!intersect) {
            return bikeId;
          }
        }
      }
    }
    return null;
  }

  rent(customer: Customer, bikeModel: string, startDate: Date, endDate: Date): void {
    const bikeId = this.isAvailable(bikeModel, startDate, endDate);

    if (bikeId) {
      this.inventory[bikeId] = {
        model: bikeModel,
        rentedFrom: startDate,
        rentedTo: endDate,
        customer: customer.name
      };
    } else {
      console.log('No matching bikes available!');
    }
  }

  cancelRent(customer: Customer, bikeModel: string): void {
    for (const bikeId in this.inventory) {
      if (this.inventory.hasOwnProperty(bikeId)) {
        const bike = this.inventory[bikeId];
        if (bike.customer === customer.name && bike.model === bikeModel) {
          this.inventory[bikeId] = {
            model: bikeModel,
            rentedFrom: this.maxDate,
            rentedTo: this.minDate,
            customer: null
          };
        }
      }
    }
  }

  toString() {
    let inventoryItems = '';
    for (const bikeId in this.inventory) {
      if (this.inventory.hasOwnProperty(bikeId)) {
        const value = this.inventory[bikeId];
        const rentedToDateString = value.rentedTo.toLocaleDateString();
        const rentedToText = rentedToDateString === '1/1/2001' ? 'EMPTY' : rentedToDateString;

        const rentedFromDateString = value.rentedFrom.toLocaleDateString();
        const rentedFromText = rentedFromDateString === 'Invalid Date' ? 'EMPTY' : rentedFromDateString;

        inventoryItems += `Customer: ${value.customer}, model: ${value.model}, rented date: ${rentedFromText} - ${rentedToText}\n`;
      }
    }
    return `Hello! Here is ${this.storeName} and this is my inventory:\n${inventoryItems}`;
  }
}

export default BikeRentStore;
