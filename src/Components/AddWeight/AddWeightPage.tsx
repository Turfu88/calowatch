import React, { useState } from 'react';
import { Typography, Box, TextField, Container, IconButton, Divider, Button } from '@mui/material';
// import { Checkbox, FormControlLabel } from '@mui/material';
import { makeStyles } from '@mui/styles';
import Layout from '../Common/Layout';
import { weightHelper } from '../Common/Helper/weightHelper';
import RemoveCircleOutlineOutlinedIcon from '@mui/icons-material/RemoveCircleOutlineOutlined';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import { useLocation } from "wouter";

const useStyles = makeStyles({
    link: {
        marginTop: '10px',
        textDecoration: 'none',
    },
    input: {
        margin: '16px 0 !important',
        minWidth: '100px !important'
    },
    buttonAction: {
        height: 50
    }
});

export type WeightForm = {
    weight: number | null,
    moment: number,
}

export default function AddWeightPage() {
    const classes = useStyles();
    const [location, setLocation] = useLocation();
    const [weightForm, setWeightForm] = useState<WeightForm>({ weight: weightHelper.getLastWeight(), moment: 0 });
    console.log(weightForm);

    const handleSetWeight = (event: React.ChangeEvent<HTMLInputElement>) => {
        setWeightForm({ ...weightForm, weight: Number(event.target.value) });
    };

    function incrementWeight(action: 'increment' | 'decrement') {
        if (weightForm.weight === null) {
            return;
        }
        let incrementValue = 1;
        if (action === 'decrement') {
            incrementValue = -1;
        }
        setWeightForm({ ...weightForm, weight: ((weightForm.weight * 10) + incrementValue) / 10 });
    }

    function handleSubmit() {
        if (weightForm.weight === null) {
            return;
        }
        weightHelper.post(weightForm.weight);
        setLocation("/dashboard");
    }
    // const handleChangeMeasureIsNow = (event: React.ChangeEvent<HTMLInputElement>) => {
    //     setWeightForm({ ...weightForm, measureIsNow: event.target.checked });
    // };

    return (
        <Layout>
            <Container>
                <Box display={'flex'} justifyContent={'center'} mt={4}>
                    <Typography variant={'h5'} component={'h1'}>
                        Ajouter une nouvelle mesure
                    </Typography>
                </Box>

                <Box display={'flex'} justifyContent={'center'} gap={5} alignItems={'center'}>
                    <IconButton aria-label="plus" className={classes.buttonAction} size={'large'} onClick={() => incrementWeight('decrement')}>
                        <RemoveCircleOutlineOutlinedIcon fontSize="inherit" />
                    </IconButton>
                    <TextField
                        id="weight"
                        variant="outlined"
                        value={weightForm.weight}
                        onChange={handleSetWeight}
                        className={classes.input}
                        type="number"
                        inputProps={{ step: '0.1', pattern: '[0-9]*(.[0-9]+)?', min: '40', max: '300', style: { textAlign: 'center', fontSize: '25px' } }}
                    />
                    <IconButton aria-label="plus" className={classes.buttonAction} size={'large'} onClick={() => incrementWeight('increment')}>
                        <AddCircleOutlineOutlinedIcon fontSize="inherit" />
                    </IconButton>
                </Box>
                <Divider />
                {/* <Box mt={2} display={'flex'} justifyContent={'center'}>
                    <FormControlLabel
                        control=
                        {
                            <Checkbox
                                checked={weightForm.measureIsNow}
                                onChange={handleChangeMeasureIsNow}
                                inputProps={{ 'aria-label': 'la mesure se fait-elle maintenant' }}
                            />
                        }
                        label="La mesure est pour aujourd'hui"
                    />
               </Box> */}
                <Box mt={2} display={'flex'} justifyContent={'center'}>
                    <Button variant={'contained'} onClick={handleSubmit} disabled={weightForm.weight === null}>
                        Ajouter
                    </Button>
                </Box>

            </Container>
        </Layout>

    )
}