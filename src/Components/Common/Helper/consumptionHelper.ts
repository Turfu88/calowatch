import { v4 as uuidv4 } from 'uuid';

type Consumption = {
    id?: string,
    calories: number,
    takenAt: Date,
    isBreakfast: boolean,
    isLunch: boolean,
    isDinner: boolean,
    isOffMealHour: boolean,
    productWeight: number,
    productId: string
}

export const consumptionHelper = {
    post: function(consumption: Consumption) {
        consumption.id = uuidv4();
        const allConsumption = localStorage.getItem('consumption');
        if (allConsumption === null) {
            localStorage.setItem('consumption', JSON.stringify([consumption]));
            return;
        }
        localStorage.setItem('consumption', JSON.stringify([...JSON.parse(allConsumption), consumption]));
    },
    getc: function(): Consumption[] | null {
        const allConsumption = localStorage.getItem('consumption');
        if (allConsumption === null) {
            return null;
        }

        return JSON.parse(allConsumption);
    },
    get: function(id: string): Consumption | null {
        const allConsumption = localStorage.getItem('consumption');
        if (allConsumption === null) {
            return null;
        }
        const consumptionFound = JSON.parse(allConsumption).find((consumption: Consumption) => consumption.id === id);
        if (consumptionFound === undefined) {
            return null;
        }
        return consumptionFound;
    },
    update: function(updatedConsumption: Consumption) {
        const allConsumption = localStorage.getItem('consumption');
        if (allConsumption === null) {
            return;
        }
        const updatedConsumptions = JSON.parse(allConsumption).map((consumption: Consumption) => {
            if (consumption.id === updatedConsumption.id){
                return updatedConsumption;
            }
            return consumption;
        })
        localStorage.setItem('consumption', JSON.stringify(updatedConsumptions));
    },
    delete: function(id: string) {
        const allConsumption = localStorage.getItem('consumption');
        if (allConsumption === null) {
            return;
        }
        const updatedConsumptions = JSON.parse(allConsumption).filter((consumption: Consumption) => consumption.id !== id)
        localStorage.setItem('consumption', JSON.stringify(updatedConsumptions));
    }

}