import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { useSnackbar } from 'notistack';
//-------------------- MUI --------------------------
import FormGroup from '@mui/material/FormGroup';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import InputAdornment from '@mui/material/InputAdornment';
import LoadingButton from '@mui/lab/LoadingButton';
//-------------------- Components --------------------------
import BackButton from '../../components/BackButton';
import Loading from '../../components/Loading';
import FormError from '../../components/FormError';
//-------------------- Utils --------------------------
import useFetch from '../../hooks/useFetch';
import API from '../../Api';
import { requiredMessage, typeErrorMessage } from '../../utils';
import IWeek from '../../interfaces/weeks';
import { IWeekPlayers } from '../../interfaces/players';
//----------------------------------------------------------

interface IFormInputs {
    idWeek: number;
    idPlayer: number;
    percentage: number;
}

const schema = Yup.object({
    idWeek: Yup.number()
        .typeError(typeErrorMessage('Id Semana'))
        .required(requiredMessage('Id semana')),
    idPlayer: Yup.number()
        .typeError(typeErrorMessage('Id Jogador'))
        .required(requiredMessage('Id jogador')),
    percentage: Yup.number()
        .typeError(typeErrorMessage('percentagem'))
        .min(1, 'A percentagem deve ser superior a 0')
        .max(100, 'A percentagem deve ser inferior a 100')
        .required(requiredMessage('percentagem')),
}).required();

const CreateMvp: React.FC = () => {
    const { enqueueSnackbar } = useSnackbar();
    const history = useHistory();

    const [submitError, setSubmitError] = useState('');
    const { data: weeks } = useFetch<IWeek[]>('weeks');

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors, isSubmitting }
    } = useForm<IFormInputs>({
        resolver: yupResolver(schema),
    });

    const weekId = watch('idWeek');

    const { data: players, isValidating } = useFetch<IWeekPlayers[]>(!!weekId ? `weeks/${weekId}/players` : '');

    const onSubmit = async (formData: IFormInputs) => {
        setSubmitError('');
        try {
            await API.post('/mvps', formData);
            enqueueSnackbar('Mvp criado com sucesso', { variant: 'success' });
            history.push('/dashboard/mvps');
        } catch (error: any) {
            setSubmitError(error?.response?.data.message);
        }
    }

    if (!weeks) return <Loading />;

    return (
        <FormGroup sx={{ width: '100%', maxWidth: 500, padding: '2rem', gap: '2rem', }}>
            <BackButton />

            <form autoComplete='off' noValidate onSubmit={handleSubmit(onSubmit)}>
                <Stack spacing={3}>
                    {submitError && <FormError message={submitError} />}

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

                    <TextField
                        {...register('idPlayer')}
                        select
                        fullWidth
                        label='Jogador'
                        defaultValue=''
                        error={!!errors.idPlayer}
                        helperText={errors.idPlayer?.message}
                    >
                        {!!!weekId && <Typography sx={{ p: 2 }}>Seleciona uma semana</Typography>}
                        {isValidating && <Typography sx={{ p: 2 }}>A carregar...</Typography>}
                        {players?.length === 0 && !isValidating && <Typography sx={{ p: 2 }}>Nenhum jogador encontrado para a semana selecionada</Typography>}
                        {!!players && !isValidating && players?.map(({ id_player, first_name, last_name, avatar }) => (
                            <MenuItem key={id_player} value={id_player}>
                                <div style={{ display: 'flex', alignItems: 'center' }}>
                                    <img
                                        loading='lazy'
                                        width='30'
                                        src={avatar}
                                        alt=''
                                        style={{ borderRadius: '50%', marginRight: '1rem' }}
                                    />
                                    <Typography>{first_name} {last_name}</Typography>
                                </div>
                            </MenuItem>
                        ))}
                    </TextField>

                    <TextField
                        {...register('percentage')}
                        fullWidth
                        label='Percentagem'
                        InputProps={{
                            startAdornment: <InputAdornment position='start'>%</InputAdornment>,
                            inputProps: { min: 1, max: 100 }
                        }}
                        type='number'
                        error={!!errors.percentage}
                        helperText={errors.percentage?.message}
                    />
                </Stack>


                <LoadingButton
                    fullWidth
                    size='large'
                    type='submit'
                    variant='contained'
                    loading={isSubmitting}
                    sx={{ marginTop: '2rem' }}
                >
                    Criar
                </LoadingButton>
            </form>
        </FormGroup>
    )
}

export default CreateMvp;