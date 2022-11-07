import React, { useState } from 'react';
import Drawer from '@mui/material/Drawer';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { Divider, Typography } from '@mui/material';
import { Container } from '@mui/system';
import ChevronRightOutlinedIcon from '@mui/icons-material/ChevronRightOutlined';
import { makeStyles } from '@mui/styles';
import { Link } from 'wouter';

const useStyles = makeStyles({
    link: {
        textDecoration: 'none',
        color: 'black'
    }
});

const links = [
    {
        url: '/dashboard',
        label: 'Dashboard'
    },
    {
        url: '/parametres',
        label: 'Paramètres'
    },
    {
        url: '/mes-produits',
        label: 'Mes produits enregistrés'
    },
    {
        url: '/mes-plats',
        label: 'Mes plats enregistrés'
    }
];

type Props = {
    children: React.ReactNode;
};

export default function Layout(props: Props) {
    const classes = useStyles();
    const [state, setState] = useState(false);

    function toggleDrawer() {
        setState(!state);
    }

    return (
        <>
            <Box sx={{ flexGrow: 1 }}>
                <AppBar position="static">
                    <Toolbar>
                        <IconButton
                            size="large"
                            edge="start"
                            color="inherit"
                            aria-label="menu"
                            sx={{ mr: 2 }}
                            onClick={toggleDrawer}
                        >
                            <MenuIcon />
                        </IconButton>
                    </Toolbar>
                </AppBar>
            </Box>
            <Drawer
                anchor={'left'}
                open={state}
                onClose={toggleDrawer}
            >
                <Box
                    sx={{ width: 250 }}
                    onClick={toggleDrawer}
                >
                    <Box display={'flex'} justifyContent={'center'} p={2}>
                        <Typography variant={'h5'} component={'h2'}>
                            Calowatch
                        </Typography>
                    </Box>
                    <Divider />
                    <Container>
                        <Box mt={3} display={'flex'} flexDirection={'column'} gap={3}>
                            {links.map((link: {url: string,label: string}, index: number) => (
                                <Link href={link.url} className={classes.link} key={index}>
                                    <Box display={'flex'} justifyContent={'space-between'}>
                                        <Typography>
                                            {link.label}
                                        </Typography>
                                        <ChevronRightOutlinedIcon />
                                    </Box>
                                </Link>
                            ))}
                        </Box>
                    </Container>
                </Box>
            </Drawer>
            {props.children}
        </>
    )
}