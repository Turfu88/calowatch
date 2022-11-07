import React, { useEffect, useState } from 'react';
import { Typography, Box, TextField, Container, Divider, Button } from '@mui/material';
import { makeStyles } from '@mui/styles';
import Layout from '../Common/Layout';
import { useLocation } from "wouter";
import { Ingredient, mealHelper } from '../Common/Helper/mealHelper';
import { v4 as uuidv4 } from 'uuid';

const useStyles = makeStyles({
    link: {
        marginTop: '10px',
        textDecoration: 'none',
    },
    input: {
        margin: '8px 0 !important',
    },
    buttonAction: {
        height: 50
    }
});

const mealDefault = {
    name: '',
    ingredients: [],
    kcal100g: 0,
    totalKcal: 0
}

const ingredientDefault = {
    id: uuidv4(),
    name: '',
    quantity: 0,
    kcal100g: 0
}

export type MealForm = {
    name: string,
    ingredients: Ingredient[],
    kcal100g: number,
    totalKcal: number
}

export default function AddMealPage() {
    const classes = useStyles();
    const [location, setLocation] = useLocation();
    const [mealForm, setMealForm] = useState<MealForm>(mealDefault);
    const [canSubmit, setCanSubmit] = useState<boolean>(false);
    const [ingredients, setIngredients] = useState<Ingredient[]>([ingredientDefault]);

    const handleSetIngredientName = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, id: string) => {
        const ingredientsToSet = ingredients.map((ingredient: Ingredient) => {
            if (ingredient.id === id) {
                ingredient.name = event.target.value;
            }
            return ingredient;
        })
        setIngredients(ingredientsToSet);
    };
    const handleSetIngredientkcal100g = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, id: string) => {
        const ingredientsToSet = ingredients.map((ingredient: Ingredient) => {
            if (ingredient.id === id) {
                ingredient.kcal100g = Number(event.target.value);
            }
            return ingredient;
        })
        setIngredients(ingredientsToSet);
        setMealForm({...mealForm, totalKcal: mealHelper.updateTotalKcal(ingredientsToSet), kcal100g: mealHelper.updateKcal100g(ingredientsToSet)});

    };
    const handleSetIngredientQuantity = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, id: string) => {
        const ingredientsToSet = ingredients.map((ingredient: Ingredient) => {
            if (ingredient.id === id) {
                ingredient.quantity = Number(event.target.value);
            }
            return ingredient;
        })
        setIngredients(ingredientsToSet);
        setMealForm({...mealForm, totalKcal: mealHelper.updateTotalKcal(ingredientsToSet), kcal100g: mealHelper.updateKcal100g(ingredientsToSet)});
    };

    const handleSetMealName = (event: React.ChangeEvent<HTMLInputElement>) => {
        setMealForm({ ...mealForm, name: event.target.value });
    };

    function handleSubmit() {
        console.log(mealForm);
        mealHelper.post({...mealForm, ingredients: ingredients});
        // setLocation("/mes-produits");
    }

    function checkIfFormCanBeSubmited() {
        const ingredientsFilled = ingredients.every((ingredient: Ingredient) => {
            return ingredient.name !== '' && ingredient.kcal100g !== 0 && ingredientDefault.quantity !== 0;
        })

        if (ingredientsFilled && mealForm.name !== '') {
            setCanSubmit(true);
            return;
        }
        setCanSubmit(false);
    }

    // console.log(ingredients, canSubmit, mealForm)


    function handleAddIngredient() {
        const newIngredient = {
            id: uuidv4(),
            name: '',
            quantity: 0,
            kcal100g: 0
        }
        setIngredients([...ingredients, newIngredient]);
    }

    console.log(mealForm)

    useEffect(checkIfFormCanBeSubmited, [ingredients, mealForm.name]);

    return (
        <Layout>
            <Container>
                <Box display={'flex'} justifyContent={'center'} mt={4}>
                    <Typography variant={'h5'} component={'h1'}>
                        Ajouter un plat
                    </Typography>

                </Box>
                <Box display={'flex'} justifyContent={'center'} mt={2}>
                    <Typography variant={'body1'} component={'p'}>
                        Composez votre plat avec une liste d'ingrédients. L'application calculera le reste.
                    </Typography>
                </Box>
                <Box display={'flex'} justifyContent={'center'} flexDirection={'column'} my={2}>
                    <Typography variant={'body1'} component={'p'}>
                        Nom du plat
                    </Typography>
                    <TextField
                        variant="outlined"
                        required
                        onChange={handleSetMealName}
                        className={classes.input}
                    />
                </Box>
                <Divider/>
                {ingredients.map((ingredient: Ingredient, key: number) => (
                    <Box mt={2} display={'flex'} justifyContent={'center'} flexDirection={'column'} key={key}>
                        <Typography variant={'body1'} component={'p'}>
                            Nom de l'aliment
                        </Typography>
                        <TextField
                            variant="outlined"
                            required
                            onChange={(event) => handleSetIngredientName(event, ingredient.id)}
                            className={classes.input}
                        />
                        <Box display={'flex'} justifyContent={'space-between'}>
                            <Typography variant={'body1'} component={'label'}>
                                Quantité (g)
                            </Typography>
                            <Typography variant={'body1'} component={'label'}>
                                Kcal pour 100g
                            </Typography>
                        </Box>
                        <Box display={'flex'} justifyContent={'space-between'}>
                            <TextField
                                variant="outlined"
                                onChange={(event) => handleSetIngredientQuantity(event, ingredient.id)}
                                className={classes.input}
                                required
                                type="number"
                                inputProps={{ inputMode: 'numeric', step: '1', pattern: '[0-9]*(.[0-9]+)?', min: '0', max: '3000', style: { textAlign: 'center', fontSize: '15px' } }}
                            />
                            <TextField
                                variant="outlined"
                                onChange={(event) => handleSetIngredientkcal100g(event, ingredient.id)}
                                className={classes.input}
                                required
                                type="number"
                                inputProps={{ inputMode: 'numeric', step: '1', pattern: '[0-9]*(.[0-9]+)?', min: '0', max: '3000', style: { textAlign: 'center', fontSize: '15px' } }}
                            />
                        </Box>

                    </Box>
                ))}
                <Box my={2} display={'flex'} justifyContent={'center'}>
                    <Button variant={'contained'} onClick={handleAddIngredient} >
                        Ajouter
                    </Button>
                </Box>
                <Divider />
                <Box mt={2} display={'flex'} justifyContent={'center'}>
                    <Button variant={'contained'} onClick={handleSubmit} disabled={!canSubmit} >
                        Terminé
                    </Button>
                </Box>
            </Container>
        </Layout>
    )
}