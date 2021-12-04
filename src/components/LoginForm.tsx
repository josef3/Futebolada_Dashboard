import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { useSnackbar } from 'notistack';
//-------------------- MUI --------------------------
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import LoadingButton from '@mui/lab/LoadingButton';
//-------------------- Components --------------------------
import ShowPasswordIcon from './ShowPasswordIcon';
import FormError from './FormError';
//-------------------- Utils --------------------------
import { useAuth } from 'contexts/auth';
import useToggle from 'hooks/useToggle';
import { login } from 'Api';
import { generalError, requiredMessage } from 'utils';
// ----------------------------------------------------------------------

interface IFormInputs {
    username: string;
    password: string;
}

const loginSchema = Yup.object({
    username: Yup.string().required(requiredMessage('Utilizador')),
    password: Yup.string().required(requiredMessage('Palavra-passe')),
}).required();

const LoginForm = () => {
    const { enqueueSnackbar } = useSnackbar();
    const history = useHistory();
    const { authDispatch } = useAuth();

    const [showPassword, toggleShowPassword] = useToggle(false);
    const [loginError, setLoginError] = useState('');

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting }
    } = useForm<IFormInputs>({
        resolver: yupResolver(loginSchema)
    });

    const onSubmit = async (formData: IFormInputs) => {
        setLoginError('');
        try {
            const { data: { accessToken, username } } = await login(formData);
            authDispatch({ type: 'LOGIN', payload: { accessToken, username } });
            enqueueSnackbar(`Início de sessão com sucesso`, { variant: 'success' });
            history.push('/dashboard/jogadores');
        } catch (error: any) {
            setLoginError(error?.response?.data?.message || generalError);
        }
    }

    return (
        <form noValidate onSubmit={handleSubmit(onSubmit)}>

            {loginError && <FormError message={loginError} />}

            <Stack spacing={3}>
                <TextField
                    {...register('username')}
                    type='text'
                    autoComplete='username'
                    label='Utilizador'
                    error={!!errors.username}
                    helperText={errors?.username?.message}
                />

                <TextField
                    {...register('password')}
                    type={showPassword ? 'text' : 'password'}
                    autoComplete='current-password'
                    label='Palavra-passe'
                    InputProps={{
                        endAdornment: <ShowPasswordIcon value={showPassword} toggle={toggleShowPassword} />
                    }}
                    error={!!errors.password}
                    helperText={errors?.password?.message}
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
                Iniciar sessão
            </LoadingButton>
        </form>
    );
}

export default LoginForm;