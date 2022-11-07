import { useState, useEffect } from "react";
import { Container } from "@mui/system";
import Layout from "../Common/Layout";
import makeStyles from '@mui/styles/makeStyles';
import Typography from "@mui/material/Typography";
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import { Button, Divider } from "@mui/material";
import { startHelper } from "./startHelper";
import { useLocation } from "wouter";


const useStyles = makeStyles({
    pageContainer: {
        paddingTop: '16px',
        textAlign: 'center'
    },
    input: {
        margin: '16px 0 !important',
        minWidth: '200px !important'
    },
    text: {
        textAlign: 'left'
    },
    errorMessage: {
        color: 'red'
    }
});

export type StartForm = {
    size: number | null,
    age: number | null,
    weight: number | null,
    gender: string | null,
    physicalActivityPerWeek: number | null,
    lossExpectation: string | null,
    wishedWeight: number | null,
}

const userDefault = {
    size: null,
    age: null,
    weight: null,
    gender: null,
    physicalActivityPerWeek: null,
    lossExpectation: null,
    wishedWeight: null,
};

export default function StartPage() {
    const classes = useStyles();
    const [location, setLocation] = useLocation();
    const [user, setUser] = useState<StartForm>(userDefault);
    const [userCanSubmit, setUserCanSubmit] = useState<boolean>(false);
    const [errorDisplay, setErrorDisplay] = useState<boolean | null>(null);

    const handleSetSize = (event: React.ChangeEvent<HTMLInputElement>) => {
        setUser({ ...user, size: Number(event.target.value) });
    };
    const handleSetAge = (event: React.ChangeEvent<HTMLInputElement>) => {
        setUser({ ...user, age: Number(event.target.value) });
    };
    const handleSetWeight = (event: React.ChangeEvent<HTMLInputElement>) => {
        setUser({ ...user, weight: Number(event.target.value) });
    };
    const handleSetGender = (event: React.ChangeEvent<HTMLInputElement>) => {
        setUser({ ...user, gender: event.target.value });
    };
    const handleSetPhysicalActivityPerWeek = (event: React.ChangeEvent<HTMLInputElement>) => {
        setUser({ ...user, physicalActivityPerWeek: Number(event.target.value) });
    };
    const handleSetLossExpectation = (event: React.ChangeEvent<HTMLInputElement>) => {
        setUser({ ...user, lossExpectation: event.target.value });
    };
    const handleSetWishedWeight = (event: React.ChangeEvent<HTMLInputElement>) => {
        setUser({ ...user, wishedWeight: Number(event.target.value) });
    };

    function submit(event: React.SyntheticEvent<HTMLFormElement>) {
        event.preventDefault();
        if (userCanSubmit) {
            startHelper.createUserProfile(user);
            console.log('submit')
            console.log(user)
            // setLocation("/dashboard")
            return;
        }
        setErrorDisplay(true);
    }

    function checkIfFormCanBeSubmited(u: StartForm) {
        let formCanBeSubmited = true;
        Object.entries(u).forEach((value: [string, string | number | null]) => {
            if (value[0] === 'wishedWeight' && u.lossExpectation === '4') {
                return;
            }
            if (value[1] === null) {
                formCanBeSubmited = false;
            }
        })
        setUserCanSubmit(formCanBeSubmited);
        if (errorDisplay && formCanBeSubmited) {
            setErrorDisplay(false);
        }
    }

    useEffect(() => {
        checkIfFormCanBeSubmited(user);
    }, [user])

    return (
        <Layout>
            <Container className={classes.pageContainer}>
                <form onSubmit={submit}>
                    <Typography component={"h1"}>On commence en douceur</Typography>
                    
                    <Box my={2}>
                        <Divider />
                    </Box>
                    <Typography>D'abord les informations basiques</Typography>
                    <Box mt={2}>
                        <FormControl>
                            <FormLabel id="select-gender">Genre</FormLabel>
                            <RadioGroup
                                aria-labelledby="select-gender-label"
                                name="gender"
                                onChange={handleSetGender}
                            >
                                <FormControlLabel value="H" control={<Radio />} label="Homme" />
                                <FormControlLabel value="F" control={<Radio />} label="Femme" />
                            </RadioGroup>
                        </FormControl>
                    </Box>
                    <TextField id="size" label="Taille en cm" variant="outlined" onChange={handleSetSize} className={classes.input} type="number" inputProps={{ inputMode: 'numeric', pattern: '[0-9]*', min: '40', max: '300' }} />
                    <TextField id="age" label="Age" variant="outlined" onChange={handleSetAge} className={classes.input} type="number" inputProps={{ inputMode: 'numeric', pattern: '[0-9]*', min: '15', max: '99' }} />
                    <Box mt={2}>
                        <FormControl>
                            <FormLabel id="select-physical-activity-per-week">Activité physique</FormLabel>
                            <RadioGroup
                                aria-labelledby="select-physical-activity-per-week-label"
                                name="physicalActivityPerWeek"
                                onChange={handleSetPhysicalActivityPerWeek}
                            >
                                <FormControlLabel value="0" control={<Radio />} label="Peu ou pas d'activité" />
                                <FormControlLabel value="1" control={<Radio />} label="Sport 1 à 3 fois par semaine" />
                                <FormControlLabel value="2" control={<Radio />} label="Sport 4 à 5 fois par semaine" />
                                <FormControlLabel value="3" control={<Radio />} label="Sport 6 à 7 fois par semaine" />
                            </RadioGroup>
                        </FormControl>
                    </Box>
                    <Box my={2}>
                        <Divider />
                    </Box>
                    <Typography>Passons aux informations sensibles</Typography>
                    <TextField id="weight" label="Poids en kg" variant="outlined" onChange={handleSetWeight} className={classes.input} type="number" inputProps={{ step: '0.1', pattern: '[0-9]*(.[0-9]+)?', min: '40', max: '300' }} />
                    <Box mt={2}>
                        <FormControl>
                            <FormLabel id="select-loss-expectation">Je souhaite perdre du poids</FormLabel>
                            <RadioGroup
                                aria-labelledby="select-loss-expectation-label"
                                name="lossExpectation"
                                onChange={handleSetLossExpectation}
                            >
                                <FormControlLabel value="0" control={<Radio />} label="En douceur" />
                                <FormControlLabel value="1" control={<Radio />} label="Normalement" />
                                <FormControlLabel value="2" control={<Radio />} label="En y allant à fond" />
                                <FormControlLabel value="4" control={<Radio />} label="Je ne souhaite pas perdre de poids" />
                                <FormControlLabel value="3" control={<Radio />} label="Je souhaite plutôt prendre du poids" />
                            </RadioGroup>
                        </FormControl>
                    </Box>
                    {user.lossExpectation === '4' ?
                        <>
                            <Typography className={classes.text}>
                                Vous ne souhaitez pas perdre de poids ? Parfait ! Peut être que vous souhaitez simplement faire attention à votre alimentation. En choisissant cette option, certaines fonctions de l'application ne seront pas accessibles. Cependant, vous pourrez modifier votre souhait à tout moment dans les paramètres.
                            </Typography>
                        </>
                        :
                        <>
                            <Typography>Poids que je souhaite atteindre</Typography>
                            <TextField id="wishedWeight" label="Poids visé" variant="outlined" onChange={handleSetWishedWeight} className={classes.input} type="number" inputProps={{ step: '0.1', pattern: '[0-9]*(.[0-9]+)?', min: '40', max: '300' }} />
                        </>
                    }
                    {errorDisplay === true &&
                        <>
                            <Typography className={classes.errorMessage}>Il manque des informations à renseigner, veillez à ne rien manquer.</Typography>
                        </>
                    }
                    <Box mt={2} mb={5}>
                        <Button type="submit" variant="contained">
                            Valider
                        </Button>
                    </Box>
                </form>
            </Container>
        </Layout>
    )
}
