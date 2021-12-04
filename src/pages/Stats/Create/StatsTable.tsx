import React from 'react';
//-------------------- MUI --------------------------
import {
    Box,
    TextField,
    Typography,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Tooltip,
} from '@mui/material';
import ErrorIcon from '@mui/icons-material/ErrorOutlineRounded';
import { FieldArrayWithId, UseFormRegister } from 'react-hook-form';
import { IFormInputs } from './index';
import IPlayer from 'interfaces/players';
import { STATS } from './stats';
//----------------------------------------------------------

const columns = [
    { id: 'player', label: 'Jogador', minWidth: 170 },
    ...STATS.map(({ id, label }) => (
        {
            id,
            label,
            minWidth: 100,
        }
    ))
];

interface IProps {
    fields: FieldArrayWithId<IFormInputs, "stats", "id">[];
    players: IPlayer[];
    register: UseFormRegister<IFormInputs>;
    errors: any;
}

const StatsTable: React.FC<IProps> = ({ fields, players, register, errors }) => {
    return (
        <TableContainer component={Paper} sx={{ maxHeight: '75vh' }} >
            <Table stickyHeader>
                <TableHead>
                    <TableRow>
                        {columns.map((column) => (
                            <Tooltip
                                title={column.label}
                                enterTouchDelay={0}
                                placement='top'
                                key={column.id}
                            >
                                <TableCell
                                    sx={{
                                        maxWidth: 100,
                                        whiteSpace: 'nowrap',
                                        overflow: 'hidden',
                                        textOverflow: 'ellipsis',
                                        userSelect: 'none'
                                    }}
                                >
                                    {column.label}
                                </TableCell>
                            </Tooltip>
                        ))}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {fields.map((field, index) => (
                        <TableRow key={field.idPlayer}>
                            <TableCell key={index}>
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, width: 135 }}>
                                    <img
                                        loading='lazy'
                                        width='40'
                                        height='40'
                                        src={players?.filter((player) => player.id_player === field.idPlayer)?.[0]?.avatar}
                                        alt=''
                                        style={{ borderRadius: '50%' }}
                                    />
                                    <div>
                                        <Typography>{players?.filter((player) => player.id_player === field.idPlayer)?.[0]?.first_name}</Typography>
                                    </div>
                                </Box>
                            </TableCell>

                            {STATS.map(({ id }) => (
                                <TableCell key={id}>
                                    <TextField
                                        {...register(`stats.${index}.${id}` as const)}
                                        InputProps={{
                                            inputProps: { min: 0, max: 60 },
                                            endAdornment: !!errors.stats?.[index]?.[`${id}`] && (
                                                <Tooltip
                                                    enterTouchDelay={0}
                                                    title={<Typography variant='caption' sx={{ color: 'error.main' }}>{errors.stats?.[index]?.[`${id}`]?.message}</Typography>}
                                                >
                                                    <ErrorIcon color='error' />
                                                </Tooltip>
                                            )
                                        }}
                                        type='number'
                                        error={!!errors.stats?.[index]?.[`${id}`]}
                                        sx={{
                                            minWidth: !!errors.stats?.[index]?.[`${id}`] ? 100 : 65
                                        }}
                                    />
                                </TableCell>
                            ))}
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    )
}

export default StatsTable;