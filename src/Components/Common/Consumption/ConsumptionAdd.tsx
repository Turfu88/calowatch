import { useState } from "react";
import Layout from "../Layout";
import { ConsumptionScan } from "./ConsumptionScan";
import { ConsumptionScanProductFound } from "./ConsumptionScanProductFound";
import { ConsumptionScanProductNotFound } from "./ConsumptionScanProductNotFound";
import { ConsumptionSelectMeal } from "./ConsumptionSelectMeal";
import { ConsumptionSelectProduct } from "./ConsumptionSelectProduct";
import { ConsumptionSelectQuantity } from "./ConsumptionSelectQuantity";
import { ConsumptionMenu } from "./ConsumtionMenu";

type ConsumptionPage = 'menu' | 'scan' | 'scan-product-found' | 'scan-product-not-found' | 'select-meal' | 'select-product' | 'quantity';

export function ConsumptionAdd() {
    const [page, setPage] = useState<ConsumptionPage>('menu')

    function DisplayView(props: { view: ConsumptionPage }) {
        switch (props.view) {
            case 'menu':
                return <ConsumptionMenu />
            case 'scan':
                return <ConsumptionScan />
            case 'scan-product-found':
                return <ConsumptionScanProductFound />
            case 'scan-product-not-found':
                return <ConsumptionScanProductNotFound />
            case 'select-meal':
                return <ConsumptionSelectMeal />
            case 'select-product':
                return <ConsumptionSelectProduct />
            case 'quantity':
                return <ConsumptionSelectQuantity />
            default:
                return <p>Erreur</p>
        }
    }

    return (
        <Layout>
            <DisplayView view={page} />
        </Layout>
    );
}