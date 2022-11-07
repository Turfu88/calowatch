import { Typography, Box } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { Link } from 'wouter';

const useStyles = makeStyles({
    container: {
        textAlign: 'center',
    },
    link: {
        marginTop: '10px',
        textDecoration: 'none',
    }
});

export default function NotFound404Page() {
    const classes = useStyles();

    return (
        <Box display={'flex'} justifyContent={'center'} flexDirection={'column'} flexWrap={'nowrap'} mt={20} className={classes.container}>
            <Typography component={'div'} >Not found 404...</Typography>
            <Link href={'/'} className={classes.link}>
                Retour vers l'accueil
            </Link>
        </Box>
    )
}