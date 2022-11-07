import { Typography, Box, Switch } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { Container } from '@mui/system';
import { useEffect, useState } from 'react';
import { parametersHelper, Parameters } from '../Common/Helper/parametersHelper';
import Layout from '../Common/Layout';

const useStyles = makeStyles({
    container: {
        textAlign: 'center',
        paddingTop: 15
    },
    link: {
        marginTop: '10px',
        textDecoration: 'none',
    }
});

export default function ParametersPage() {
    const classes = useStyles();

    const [parameters, setParameters] = useState<Parameters | null>(parametersHelper.get());
    const [needUpdate, setNeedUpdate] = useState<boolean>(false);
    
    const handleChangeMemorizeByDefault = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (parameters === null) {
            return;
        }
        setParameters({ ...parameters, memorizeScansByDefault: event.target.checked });
        setNeedUpdate(true);
    };

    function updateParameters() {
        if (needUpdate && null !== parameters) {
            console.log('update parameters', parameters)
            parametersHelper.update(parameters);
            setNeedUpdate(false);
        }
    }

    useEffect(updateParameters, [needUpdate, parameters])

    if (parameters === null) {
        return <></>;
    }

    return (
        <Layout>
            <Container className={classes.container}>
                <Typography variant={'h5'} component={'h1'}>
                    Paramètres
                </Typography>
                <Box display={'flex'} justifyContent={'space-between'}>
                    <Typography variant={'body1'} component={'label'}>
                        Mémoriser par défaut les produits scannés
                    </Typography>
                    <Switch
                        checked={parameters.memorizeScansByDefault}
                        onChange={handleChangeMemorizeByDefault}
                        inputProps={{ 'aria-label': 'controlled' }}
                    />
                </Box>
            </Container>
        </Layout>
    )
}
