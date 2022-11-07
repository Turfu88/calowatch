import { v4 as uuidv4 } from 'uuid';

export type Weight = {
    id?: string,
    weight: number,
    measureDoneAt: number,
}

export const weightHelper = {
    post: function(weight: number) {
        const newWeight = {
            id: uuidv4(),
            weight: weight,
            measureAt: Math.round(new Date().getTime()/1000)
        };
        const allWeight = localStorage.getItem('weight');
        if (allWeight === null) {
            localStorage.setItem('weight', JSON.stringify([newWeight]));
            return;
        }
        localStorage.setItem('weight', JSON.stringify([...JSON.parse(allWeight), newWeight]));
    },
    getc: function(): Weight[] | null {
        const allWeight = localStorage.getItem('weight');
        if (allWeight === null) {
            return null;
        }

        return JSON.parse(allWeight);
    },
    get: function(id: string): Weight | null {
        const allWeight = localStorage.getItem('weight');
        if (allWeight === null) {
            return null;
        }
        const weightFound = JSON.parse(allWeight).find((weight: Weight) => weight.id === id);
        if (weightFound === undefined) {
            return null;
        }
        return weightFound;
    },
    update: function(updatedWeight: Weight) {
        const allWeight = localStorage.getItem('weight');
        if (allWeight === null) {
            return;
        }
        const updatedWeights = JSON.parse(allWeight).map((weight: Weight) => {
            if (weight.id === updatedWeight.id){
                return updatedWeight;
            }
            return weight;
        })
        localStorage.setItem('weight', JSON.stringify(updatedWeights));
    },
    delete: function(id: string) {
        const allWeight = localStorage.getItem('weight');
        if (allWeight === null) {
            return;
        }
        const updatedWeights = JSON.parse(allWeight).filter((weight: Weight) => weight.id !== id)
        localStorage.setItem('weight', JSON.stringify(updatedWeights));
    },
    getLastWeight: function() :number | null {
        const allWeight = weightHelper.getc();
        if (allWeight === null) {
            return null;
        }
        return allWeight.sort((val1,val2)=> {
            return (val1.measureDoneAt < val2.measureDoneAt ) ? 1 : -1
         })[0].weight;
    }
}