import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { useSnackbar } from 'notistack';
//-------------------- MUI --------------------------
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
//-------------------- Components --------------------------
import ShowPasswordIcon from 'components/ShowPasswordIcon';
import Loading from 'components/Loading';
import FormError from 'components/FormError';
//-------------------- Utils --------------------------
import { generalError, requiredMessage } from 'utils';
import useToggle from 'hooks/useToggle';
import API from 'Api';
//----------------------------------------------------------

interface IProps {
    isOpen: boolean;
    handleClose: () => void;
}

interface IFormInputs {
    newPassword: string;
    confirmPassword: string;
}

const loginSchema = Yup.object().shape({
    newPassword: Yup.string()
        .required(requiredMessage('Nova palavra-passe')),
    confirmPassword: Yup.string()
        .required(requiredMessage('Confirmar palavra-passe'))
        .oneOf([Yup.ref('newPassword'), null], 'As palavra-passes devem correspender'),
}).required();

const ChangePasswordModal: React.FC<IProps> = ({ isOpen, handleClose }) => {
    const { enqueueSnackbar } = useSnackbar();

    const [showPassword, toggleShowPassword] = useToggle(false);
    const [showConfirmPassword, toggleShowConfirmPassword] = useToggle(false);

    const [submitError, setSubmitError] = useState('');

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting }
    } = useForm<IFormInputs>({
        resolver: yupResolver(loginSchema)
    });

    async function onSubmit({ newPassword }: IFormInputs) {
        setSubmitError('');
        try {
            await API.put('/admin/password-change', { password: newPassword });
            enqueueSnackbar(`Palavra-passe alterada com sucesso`, { variant: 'success' });
            handleClose();
        } catch (error: any) {
            setSubmitError(error?.response?.data?.message || generalError);
        }
    }

    return (
        <>
            {isSubmitting && <Loading />}

            <Dialog open={isOpen} onClose={handleClose}>
                <DialogTitle>Alterar palavra-passe</DialogTitle>
                <DialogContent>
                    <DialogContentText sx={{ mb: 5 }}>Introduza uma nova palavra-passe</DialogContentText>

                    {submitError && <FormError message={submitError} />}

                    <TextField
                        autoFocus
                        {...register('newPassword')}
                        fullWidth
                        sx={{ mb: 3 }}
                        id='new-password'
                        label='Nova Palavra-passe'
                        type={showPassword ? 'text' : 'password'}
                        autoComplete='new-password'
                        InputProps={{
                            endAdornment: <ShowPasswordIcon value={showPassword} toggle={toggleShowPassword} />
                        }}
                        error={!!errors.newPassword}
                        helperText={errors?.newPassword?.message}
                    />
                    <TextField
                        {...register('confirmPassword')}
                        fullWidth
                        id='confirm-password'
                        label='Confirmar Palavra-passe'
                        type={showConfirmPassword ? 'text' : 'password'}
                        InputProps={{
                            endAdornment: <ShowPasswordIcon value={showConfirmPassword} toggle={toggleShowConfirmPassword} />
                        }}
                        error={!!errors.confirmPassword}
                        helperText={errors?.confirmPassword?.message}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color='inherit'>Cancelar</Button>
                    <Button onClick={handleSubmit(onSubmit)}>Alterar</Button>
                </DialogActions>
            </Dialog>
        </>
    )
}

export default ChangePasswordModal;