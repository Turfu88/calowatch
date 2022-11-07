const COEF = {
    man : {
        weight: 13.707,
        size: 492.3,
        age: 6.673,
        constant: 77.607
    },
    woman : {
        weight: 9.740,
        size: 172.9,
        age: 4.737,
        constant: 667.051
    }
}

const COEF_PHYSICAL_ACTIVITY = [1.2, 1.375, 1.55, 1.725];

export type User = {
    size: number,
    gender: string,
    age: number,
    physicalActivityPerWeek: number,
    caloriesNeedsPerDay: number | null,
    bmi: number | null,
    currentWeight: number | null,
    createdAt?: number,
    updatedAt?: number
}


export const userHelper = {
    post: function(user: User) {
        user.createdAt = Math.round(new Date().getTime()/1000);
        user.updatedAt = Math.round(new Date().getTime()/1000);
        localStorage.setItem('user', JSON.stringify(user));
    },
    get: function(): User | null {
        const user = localStorage.getItem('user');
        if (user === null) {
            return null;
        }

        return JSON.parse(user);
    },
    update: function(updatedValues: User) {
        let user = localStorage.getItem('user');
        if (user === null) {
            localStorage.setItem('user', JSON.stringify(updatedValues));
            return;
        }
        updatedValues.updatedAt = Math.round(new Date().getTime()/1000);
        localStorage.setItem('user', JSON.stringify({...JSON.parse(user), updatedValues}));
    },
    getUserMBI: function(weight: number, size: number): number {
        const sizeInMeters = size / 100;
        const bmi = weight / (sizeInMeters * sizeInMeters);

        return Math.round(bmi * 100) / 100;
    },
    getUserCaloriesNeeds: function(weight: number, size: number, age: number, gender: string, physicalActivityPerWeek: number): number {
        let coef = null;
        if (gender === 'H') {
            coef = COEF.man;
        } else {
            coef = COEF.woman;
        }
        
        return Math.round(((weight * coef.weight) + ((size / 100) * coef.size) - (age * coef.age) + coef.constant) * COEF_PHYSICAL_ACTIVITY[physicalActivityPerWeek]);
    }
};
