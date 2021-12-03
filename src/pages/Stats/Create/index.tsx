import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm, useFieldArray } from 'react-hook-form';
//-------------------- MUI --------------------------
import {
    Box,
    Autocomplete,
    FormGroup,
    MenuItem,
    TextField,
    AutocompleteChangeReason
} from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
//-------------------- Components --------------------------
import BackButton from '../../../components/BackButton';
import Loading from '../../../components/Loading';
import StatsTable from './StatsTable';
import ConfirmationDialog from '../../../components/ConfirmationDialog';
import FormError from '../../../components/FormError';
//-------------------- Utils --------------------------
import useFetch from '../../../hooks/useFetch';
import useToggle from '../../../hooks/useToggle';
import IWeek from '../../../interfaces/weeks';
import IPlayer, { IWeekPlayer } from '../../../interfaces/players';
import API from '../../../Api';
import { generalError } from '../../../utils';
import autocompleteLocaleText from '../../../utils/autocompleteLocaleText';
import schema from './validationSchema';
//----------------------------------------------------------

export interface IFormInputs {
    idWeek: number;
    stats: {
        idPlayer: number;
        goals: number;
        assists: number;
        shotsTarget: number;
        totalShots: number;
        tackles: number;
        interceptions: number;
        blocks: number;
        nutmegsSuffered: number;
        nutmegsMade: number;
    }[];
}

const statsDefaultValues = {
    goals: 0,
    assists: 0,
    shotsTarget: 0,
    totalShots: 0,
    tackles: 0,
    interceptions: 0,
    blocks: 0,
    nutmegsSuffered: 0,
    nutmegsMade: 0,
}

const CreateStats: React.FC = () => {
    const history = useHistory();
    const { data: weeks } = useFetch<IWeek[]>('weeks');
    const { data: players } = useFetch<IPlayer[]>('players');

    const [submitError, setSubmitError] = useState('');

    const {
        watch,
        register,
        control,
        handleSubmit,
        formState: { errors, isSubmitting }
    } = useForm<IFormInputs>({
        resolver: yupResolver(schema),
    });

    const { fields, append, remove } = useFieldArray({ name: 'stats', control });

    const weekId = watch('idWeek');

    const { data: weekPlayers } = useFetch<IWeekPlayer[]>(!!weekId ? `weeks/${weekId}/players` : '');

    const availablePlayers = weekPlayers && players?.filter(player => !weekPlayers?.some(({ id_player }) => player.id_player === id_player));

    const [dialogIsOpen, toggleDialog] = useToggle(false);

    const [selected, setSelected] = useState<number[]>([]);

    function handleSelectedChange(newValue: IPlayer[], reason: AutocompleteChangeReason) {
        if (reason === 'clear') {
            //set selected players to empty array...
            setSelected([]);
            //and also remove all fields from stats array
            remove();
            return;
        }

        const newIdsArray = [...newValue.map(({ id_player }) => id_player)];
        setSelected(newIdsArray)

        const newLength = newIdsArray.length;
        const previousLength = fields.length;

        if (newLength > previousLength) {
            // append new line to field array
            const newId = newIdsArray.filter((id) => !fields.some((field) => id === field.idPlayer))?.[0];
            if (!newId) return;
            append({ idPlayer: newId, ...statsDefaultValues });
        }
        else {
            // remove line from field array
            const idRemoved = fields.filter((field) => !newIdsArray.some((id) => field.idPlayer === id))?.[0]?.idPlayer;
            if (!idRemoved) return;
            remove(fields.map((field) => field.idPlayer).indexOf(idRemoved));
        }
    }

    async function onSubmit(formData: IFormInputs) {
        setSubmitError('');
        try {
            for (let i = 0; i < formData.stats.length; i++) {
                await API.post('/stats', { idWeek: formData.idWeek, ...formData.stats[i] });
            }
            history.push('/dashboard/estatisticas');
        } catch (error: any) {
            setSubmitError(error?.response?.data?.message || generalError);
        }
    }

    if (!weeks) return <Loading />;

    return (
        <div style={{ display: 'flex', flexDirection: 'column', padding: '1.6rem 5vw', gap: '2rem', }}>
            <BackButton />

            {submitError && <FormError message={submitError} />}

            <FormGroup sx={{ width: '100%', maxWidth: 300, gap: '2rem' }}>
                <TextField
                    {...register('idWeek')}
                    select
                    fullWidth
                    label='Semana'
                    defaultValue=''
                    error={!!errors.idWeek}
                    helperText={errors.idWeek?.message}
                >
                    {weeks.map(({ id_week, date }) => (
                        <MenuItem key={id_week} value={id_week}>
                            ID: {id_week} - {(new Date(date)).toLocaleDateString()}
                        </MenuItem>
                    ))}
                </TextField>
            </FormGroup>


            {availablePlayers && (
                <FormGroup sx={{ maxWidth: '100%', gap: '2rem' }}>
                    <Autocomplete
                        multiple
                        options={availablePlayers}
                        getOptionLabel={(player) => `${player.first_name} ${player.last_name} (${player.id_player})`}
                        renderOption={(props, option) => (
                            <Box key={option.id_player} component='li' sx={{ '& > img': { mr: 2, flexShrink: 0 } }} {...props}>
                                <img
                                    loading='lazy'
                                    width='30'
                                    src={option.avatar}
                                    alt=''
                                    style={{ borderRadius: '50%' }}
                                />
                                {option.first_name} {option.last_name}
                            </Box>
                        )}
                        onChange={(event, newValue, reason) => handleSelectedChange(newValue, reason)}
                        filterSelectedOptions
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                label='Jogadores'
                                placeholder='Jogadores'
                            />
                        )}
                        {...autocompleteLocaleText}
                    />
                </FormGroup>
            )}



            {availablePlayers && fields.length > 0 && (
                <>
                    <StatsTable
                        fields={fields}
                        players={availablePlayers}
                        register={register}
                        errors={errors}
                    />

                    <LoadingButton
                        fullWidth
                        size='large'
                        // type='submit'
                        variant='contained'
                        loading={isSubmitting}
                        onClick={handleSubmit(onSubmit)}
                    >
                        Criar
                    </LoadingButton>
                </>
            )}

            <ConfirmationDialog
                title='Criação de Estatísticas'
                message='Confirma que pretende adicionar as estatísticas?'
                type='success'
                isOpen={dialogIsOpen}
                handleClose={toggleDialog}
                handleConfirm={handleSubmit(onSubmit)}
            />
        </div>
    )
}

export default CreateStats;