import { Button, Container, Divider, SpeedDial, Typography } from '@mui/material';
import Layout from '../Common/Layout';

import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import AddIcon from '@mui/icons-material/Add';

const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
    height: 10,
    borderRadius: 5,
    [`&.${linearProgressClasses.colorPrimary}`]: {
        backgroundColor: theme.palette.grey[theme.palette.mode === 'light' ? 200 : 800],
    },
    [`& .${linearProgressClasses.bar}`]: {
        borderRadius: 5,
        backgroundColor: theme.palette.mode === 'light' ? '#1a90ff' : '#308fe8',
    },
}));

function createData(
    name: string,
    calories: number,
    fat: number,
    protein: number,
) {
    return { name, calories, fat, protein };
}

const rows = [
    createData('Frozen yoghurt', 159, 6.0, 24),
    createData('Ice cream sandwich', 237, 9.0, 37),
    createData('Eclair', 262, 16.0, 24),
    createData('Cupcake', 305, 3.7, 67),
    createData('Gingerbread', 356, 16.0, 49),
];

function handleClick() {
    console.log('click')
}

export default function DashboardPage() {

    return (
        <>
            <Layout>
                <Container>
                    <Box mt={2} mb={1} display={'flex'} justifyContent={'center'}>
                        <Typography variant={'h5'} component={'h1'}>
                            Aujourd'hui
                        </Typography>
                    </Box>
                    <Box sx={{ flexGrow: 1 }}>
                        <BorderLinearProgress variant="determinate" value={90} />
                    </Box>
                    <Box mt={3}>
                        <TableContainer component={Paper}>
                            <Table aria-label="simple table">
                                <TableBody>
                                    {rows.map((row) => (
                                        <TableRow
                                            key={row.name}
                                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                        >
                                            <TableCell align="right">12h35</TableCell>
                                            <TableCell component="th" scope="row">
                                                Semoule de blé
                                            </TableCell>
                                            <TableCell align="right">100g</TableCell>
                                            <TableCell align="right">360kcal</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Box>
                    <Box my={2} display={'flex'} justifyContent={'center'}>
                        <Button variant="contained" href={'ajouter-une-consommation'}>
                            Ajouter
                        </Button>
                    </Box>
                    <Divider />
                    <Box mt={2} mb={1} display={'flex'} justifyContent={'center'}>
                        <Typography variant={'h6'} component={'h2'}>
                            Mon objectif
                        </Typography>
                    </Box>
                    <Box sx={{ flexGrow: 1 }}>
                        <BorderLinearProgress variant="determinate" value={90} />
                    </Box>
                    <Box my={2} display={'flex'} justifyContent={'center'}>
                        <Button variant={'contained'} href={'ajouter-une-mesure'}>
                            Ajouter une mesure
                        </Button>
                    </Box>
                </Container>
            </Layout>
            <SpeedDial
                ariaLabel="SpeedDial basic example"
                sx={{ position: 'sticky',direction: 'left',  bottom: 16, right: 16 }}
                onClick={handleClick}
                icon={<AddIcon />}
            />
        </>
    )
}