import { Typography, Box, Button, IconButton, Collapse } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { Container } from '@mui/system';
import { useEffect, useState } from 'react';
import { productHelper, Product } from '../Common/Helper/productHelper';
import Layout from '../Common/Layout';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import QrCodeScannerIcon from '@mui/icons-material/QrCodeScanner';

const useStyles = makeStyles({
    container: {
        textAlign: 'center',
        paddingTop: 15
    },
    link: {
        marginTop: '10px',
        textDecoration: 'none',
    },
    infoNoProductRegistered: {
        margin: '50px auto !important'
    }
});

function Row(props: { product: Product }) {
    const { product } = props;
    const [open, setOpen] = useState(false);

    function handleDelete(id?: string) {
        console.log('test delete');
    }

    function handleEdit(id?: string) {
        console.log('test edit')
    }

    return (
        <>
            <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
                <TableCell component="th" scope="row" colSpan={3} >
                    {product.name}
                </TableCell>
                <TableCell style={{ width: '20px' }}>
                    <IconButton
                        aria-label="expand row"
                        size="small"

                        onClick={() => setOpen(!open)}
                    >
                        {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                    </IconButton>
                </TableCell>
            </TableRow>
            <TableRow>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={4}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Box sx={{ marginTop: 1, marginBottom: 1 }}>
                            <Table size="small" aria-label="purchases">
                                <TableBody>
                                    <TableRow
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                        <TableCell align="left" style={{ paddingLeft: 0 }}>
                                            {product.kcal100g} kcal
                                        </TableCell>
                                        <TableCell align="center" style={{ width: 20 }}>
                                            <EditIcon onClick={() => handleEdit(product.id)} />
                                        </TableCell>
                                        <TableCell align="center" style={{ width: 20, paddingRight: 0 }}>
                                            <DeleteIcon onClick={() => handleDelete(product.id)} />
                                        </TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </Box>
                    </Collapse>
                </TableCell>
            </TableRow>
        </>
    );
}



export default function ProductsPage() {
    const classes = useStyles();

    const [products, setProducts] = useState<Product[] | null>(productHelper.getc());

    console.log(products);

    if (products === null) {
        return (
            <Layout>
                <Container className={classes.container}>
                    <Typography variant={'h5'} component={'h1'}>
                        Mes produits
                    </Typography>
                    <Typography variant={'body1'} component={'p'} className={classes.infoNoProductRegistered}>
                        Vous n'avez aucun produit enregistré
                    </Typography>
                    <Button variant={'contained'} href={'/ajouter-un-produit'}>
                        Ajouter un produit
                    </Button>
                </Container>
            </Layout>
        );
    }

    return (
        <Layout>
            <Container className={classes.container}>
                <Typography variant={'h5'} component={'h1'}>
                    Mes produits
                </Typography>
                <TableContainer component={Paper}>
                    <Table aria-label="table de mes produits">
                        <TableBody>
                            {products.map((product) => (
                                <Row key={product.id} product={product} />
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                <Box mt={2}>
                    <Button variant={'contained'} href={'/ajouter-un-produit'}>
                        Ajouter un produit
                    </Button>
                </Box>
            </Container>
        </Layout>
    )
}
