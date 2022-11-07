export type Parameters = {
    memorizeScansByDefault: boolean,
    isWeightLess: boolean,
}

export const parametersHelper = {
    post: function(parameters: Parameters) {
        localStorage.setItem('parameters', JSON.stringify(parameters));
    },
    get: function(): Parameters | null {
        const parameters = localStorage.getItem('parameters');
        if (parameters === null) {
            return null;
        }

        return JSON.parse(parameters);
    },
    update: function(updatedValues: Parameters) {
        localStorage.setItem('parameters', JSON.stringify(updatedValues));
    }
};
