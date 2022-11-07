import { objectiveHelper } from "../Common/Helper/objectiveHelper";
import { parametersHelper } from "../Common/Helper/parametersHelper";
import { User, userHelper } from "../Common/Helper/userHelper"
import { weightHelper } from "../Common/Helper/weightHelper";
import { StartForm } from "./StartPage";

export const startHelper = {
    createUserProfile: function (form: StartForm) {
        // créer user, créer objectif, paramètres, une mesure weight
        console.log('test')
        const newUser: User = {
            size: Number(form.size),
            age: Number(form.age),
            physicalActivityPerWeek: Number(form.physicalActivityPerWeek),
            currentWeight: form.weight,
            gender: form.gender as string,
            bmi: null,
            caloriesNeedsPerDay: null
        };

        if (form.weight !== null && form.size !== null) {
            newUser.bmi = userHelper.getUserMBI(form.weight, form.size);
        }
        if (form.weight !== null && form.size !== null && form.age !== null && form.gender !== null && form.physicalActivityPerWeek !== null) {
            newUser.caloriesNeedsPerDay = userHelper.getUserCaloriesNeeds(form.weight, form.size, form.age, form.gender, form.physicalActivityPerWeek);
        }
        userHelper.post(newUser);

        if (null !== form.weight) {
            weightHelper.post(Number(form.weight));
        }

        parametersHelper.post({
            memorizeScansByDefault: true,
            isWeightLess: form.lossExpectation === '4',
        });

        objectiveHelper.post({
            lossExpectation: form.lossExpectation === '4' ? 0 : Number(form.weight) - Number(form.wishedWeight),
            lossRate: objectiveHelper.getLossRate(Number(form.lossExpectation)),
            weightWished: form.wishedWeight
        })
    }
}
