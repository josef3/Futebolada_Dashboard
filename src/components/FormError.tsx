import React from 'react';
//-------------------- MUI --------------------------
import Alert from '@mui/material/Alert';
import Typography from '@mui/material/Typography';
//----------------------------------------------------------

interface IProps {
    message: string;
}

const FormError: React.FC<IProps> = ({ message }) => {
    return (
        <Alert variant='filled' severity='error' sx={{ mb: '2rem' }}>
            <Typography>{message}</Typography>
        </Alert>
    )
}

export default FormError;