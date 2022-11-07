import { Container, Typography, Box } from '@mui/material';
import { Link } from 'wouter';
import { makeStyles } from '@mui/styles';
import Layout from '../Common/Layout';

const useStyles = makeStyles({
    pageContainer: {
        paddingTop: '16px',
        textAlign: 'center'
    },
    title: {
        fontWeight: 'bold !important',
        fontSize: '20px !important',
        marginBottom: '10px !important'
    },
});

export default function Homepage() {
    const classes = useStyles();

    return (
        <Layout>
            <Container className={classes.pageContainer}>
                <Typography component={'h1'} className={classes.title}>
                    Calowatch
                </Typography>
                <Typography component={'p'}>
                    Ceci est une application pour mobile pour controller les aliments que l'on consomme.
                </Typography>
                <Box pt={10}>
                    <Link href={'/start'}>
                        Commencer
                    </Link>
                </Box>

            </Container>

        </Layout>
    )
}
