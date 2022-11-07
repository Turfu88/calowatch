type Objective = {
    lossExpectation: number | null,
    lossRate: number,
    weightWished: number | null
}

export const objectiveHelper = {
    post: function(objective: Objective) {
        localStorage.setItem('objective', JSON.stringify(objective));
    },
    get: function(): Objective | null {
        const objective = localStorage.getItem('objective');
        if (objective === null) {
            return null;
        }

        return JSON.parse(objective);
    },
    update: function(updatedValues: Objective) {
        const objective = localStorage.getItem('objective');
        if (objective === null) {
            localStorage.setItem('objective', JSON.stringify(updatedValues));
            return;
        }
        localStorage.setItem('objective', JSON.stringify({...JSON.parse(objective), updatedValues}));
    },
    getLossRate: function(rate: number) {
        return [-10, -15, -20, 0, 10][rate];
    }
}