import { Route, Switch } from 'wouter';
import Homepage from '../Homepage/Homepage';
import DashboardPage from '../Dashboard/DashboardPage';
import NotFound404Page from '../NotFound404/NotFound404Page';
import StartPage from '../Start/StartPage';
import AddWeightPage from '../AddWeight/AddWeightPage';
import ParametersPage from '../Parameters/ParametersPage';
import ProductsPage from '../Products/ProductsPage';
import AddProductPage from '../Products/AddProductPage';
import MealsPage from '../Meals/MealsPage';
import AddMealPage from '../Meals/AddMealPage';
import { ConsumptionPage } from './Consumption/ConsumptionPage';
import { ConsumptionAdd } from './Consumption/ConsumptionAdd';

export default function Router() {

    return (
        <Switch>
            <Route path="/" component={Homepage} />
            <Route path="/dashboard" component={DashboardPage} />
            <Route path="/start" component={StartPage} />
            <Route path="/ajouter-une-mesure" component={AddWeightPage} />
            <Route path="/parametres" component={ParametersPage} />
            <Route path="/mes-produits" component={ProductsPage} />
            <Route path="/ajouter-un-produit" component={AddProductPage} />
            <Route path="/mes-plats" component={MealsPage} />
            <Route path="/ajouter-un-plat" component={AddMealPage} />
            <Route path="/mes-consommations" component={ConsumptionPage} />
            <Route path="/ajouter-une-consommation" component={ConsumptionAdd} />

            <Route path="/:rest*" component={NotFound404Page} />
        </Switch>
    )
}