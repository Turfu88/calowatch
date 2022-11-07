import React, { useEffect, useState } from 'react';
import { Typography, Box, TextField, Container, IconButton, Divider, Button } from '@mui/material';
import { makeStyles } from '@mui/styles';
import Layout from '../Common/Layout';
import { useLocation } from "wouter";
import { productHelper } from '../Common/Helper/productHelper';

const useStyles = makeStyles({
    link: {
        marginTop: '10px',
        textDecoration: 'none',
    },
    input: {
        margin: '16px 0 !important',
    },
    buttonAction: {
        height: 50
    }
});

const productDefault = {
    name: '',
    hasImage: false,
    kcal100g: 0,
    barCode: null,
}

export type ProductForm = {
    name: string,
    hasImage: boolean,
    kcal100g: number,
    barCode: string | null
}

export default function AddProductPage() {
    const classes = useStyles();
    const [location, setLocation] = useLocation();
    const [productForm, setProductForm] = useState<ProductForm>(productDefault);
    const [canSubmit, setCanSubmit] = useState<boolean>(false);


    const handleSetProductName = (event: React.ChangeEvent<HTMLInputElement>) => {
        setProductForm({ ...productForm, name: event.target.value });
    };
    const handleSetProductkcal100g = (event: React.ChangeEvent<HTMLInputElement>) => {
        setProductForm({ ...productForm, kcal100g: Number(event.target.value) });
    };

    function handleSubmit() {
        productHelper.post(productForm);
        setLocation("/mes-produits");
    }
    function checkIfFormCanBeSubmited() {
        if (productForm.name !== '' && productForm.kcal100g !== 0) {
            setCanSubmit(true);
            return;
        }
        setCanSubmit(false);
    }

    useEffect(checkIfFormCanBeSubmited, [productForm])
    

    return (
        <Layout>
            <Container>
                <Box display={'flex'} justifyContent={'center'} mt={4}>
                    <Typography variant={'h5'} component={'h1'}>
                        Ajouter un produit
                    </Typography>
                </Box>

                <Box mt={2} display={'flex'} justifyContent={'center'} flexDirection={'column'}>
                    <Typography variant={'body1'} component={'p'}>
                        Nom de l'aliment
                    </Typography>
                    <TextField
                        id="name"
                        variant="outlined"
                        value={productForm.name}
                        onChange={handleSetProductName}
                        className={classes.input}
                    />
                    <Typography variant={'body1'} component={'p'}>
                        Quantité kcal pour 100g
                    </Typography>
                    <Box display={'flex'} justifyContent={'center'}>
                        <TextField
                            id="kcal100g"
                            variant="outlined"
                            onChange={handleSetProductkcal100g}
                            className={classes.input}
                            type="number"
                            inputProps={{ inputMode: 'numeric', step: '1', pattern: '[0-9]*(.[0-9]+)?', min: '0', max: '3000', style: { textAlign: 'center', fontSize: '25px' } }}
                        />   
                    </Box>
                </Box>
                <Divider />
                <Box mt={2} display={'flex'} justifyContent={'center'}>
                    <Button variant={'contained'} onClick={handleSubmit} disabled={!canSubmit} >
                        Ajouter
                    </Button>
                </Box>
            </Container>
        </Layout>
    )
}