import React, { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { useSnackbar } from 'notistack';
//-------------------- MUI --------------------------
import Paper from '@mui/material/Paper';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import InputAdornment from '@mui/material/InputAdornment';
import LoadingButton from '@mui/lab/LoadingButton';
//-------------------- Components --------------------------
import BackButton from '../../components/BackButton';
import Loading from '../../components/Loading';
import FormError from '../../components/FormError';
//-------------------- Utils --------------------------
import useFetch from '../../hooks/useFetch';
import API from '../../Api';
import { requiredMessage, shallowEqual, numberTypeErrorMessage, generalError } from '../../utils';
import { IWeekPlayer } from '../../interfaces/players';
import IMvp from '../../interfaces/mvps';
//----------------------------------------------------------

interface IFormInputs {
    id_week: number;
    id_player: number;
    percentage: number;
}

const schema = Yup.object({
    id_week: Yup.number()
        .typeError(numberTypeErrorMessage('Id semana'))
        .required(requiredMessage('Id semana')),
    id_player: Yup.number()
        .typeError(numberTypeErrorMessage('Id Jogador'))
        .required(requiredMessage('Id jogador')),
    percentage: Yup.number()
        .typeError(numberTypeErrorMessage('percentagem'))
        .min(1, 'A percentagem deve ser superior a 0')
        .max(100, 'A percentagem deve ser inferior a 100')
        .required(requiredMessage('percentagem')),
}).required();

const EditMvp: React.FC = () => {
    const { enqueueSnackbar } = useSnackbar();
    const history = useHistory();
    const { id } = useParams<{ id: string }>();

    const [submitError, setSubmitError] = useState('');

    const { data: mvp } = useFetch<IMvp>(`mvps/${id}`);
    const { data: players } = useFetch<IWeekPlayer[]>(!!mvp ? `weeks/${mvp.id_week}/players` : '');

    const {
        register,
        handleSubmit,
        reset,
        watch,
        formState: { errors, isSubmitting }
    } = useForm<IFormInputs>({
        resolver: yupResolver(schema),
    });

    //when mvp data comes it should reset the form data
    useEffect(() => {
        reset({ id_week: mvp?.id_week, id_player: mvp?.id_player, percentage: mvp?.percentage });
    }, [mvp]);

    //watch eventual changes on the form data to show the save changes button when form data is different than the original data 
    const formData = watch();

    //it should only let submit if theres no errors and changes on data were made
    const isReadyToSubmit = Object.keys(errors).length === 0 && !!mvp && !shallowEqual({ id_week: mvp.id_week, id_player: mvp.id_player, percentage: mvp.percentage }, formData);

    const onSubmit = async (formData: IFormInputs) => {
        setSubmitError('');
        try {
            await API.put(`/mvps/${id}`, formData);
            enqueueSnackbar('Mvp alterado com sucesso', { variant: 'success' });
            history.push('/dashboard/mvps');
        } catch (error: any) {
            setSubmitError(error?.response?.data?.message || generalError);
        }
    }

    if (!mvp || !players) return <Loading />;

    return (
        <div style={{ padding: '1.6rem 5vw' }}>
            <BackButton />

            <Paper sx={{ width: '100%', maxWidth: 500, padding: '2rem 2rem 4rem 2rem', }}>

                <form autoComplete='off' noValidate onSubmit={handleSubmit(onSubmit)}>
                    <Stack spacing={3}>
                        {submitError && <FormError message={submitError} />}

                        <TextField
                            {...register('id_week')}
                            label='Id Semana'
                            disabled
                        />

                        <TextField
                            {...register('id_player')}
                            select
                            label='Jogador'
                            defaultValue={mvp.id_player}
                            error={!!errors.id_player}
                            helperText={errors.id_player?.message}
                        >
                            {!players && <p>A carregar...</p>}
                            {!!players && players?.map(({ id_player, first_name, last_name, avatar }) => (
                                <MenuItem key={id_player} value={id_player} sx={{ alignItems: 'center' }}>
                                    <div style={{ display: 'flex', alignItems: 'center' }}>
                                        <img
                                            loading='lazy'
                                            width='30'
                                            src={avatar}
                                            alt={first_name}
                                            style={{ borderRadius: '50%', marginRight: '1rem' }}
                                        />
                                        {first_name} {last_name}
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


                    {isReadyToSubmit && (
                        <LoadingButton
                            fullWidth
                            size='large'
                            type='submit'
                            variant='contained'
                            loading={isSubmitting}
                            sx={{ marginTop: '2rem' }}
                        >
                            Guardar alterações
                        </LoadingButton>
                    )}
                </form>
            </Paper>
        </div>
    )
}

export default EditMvp;