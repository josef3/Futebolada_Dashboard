import React, { useState } from 'react';
//-------------------- MUI --------------------------
import { Typography, Alert, IconButton } from '@mui/material';
//-------------------- Icons --------------------------
import CloseIcon from '@mui/icons-material/CloseRounded';
//----------------------------------------------------------

const TEST_USER = 'test';
const TEST_PASSWORD = 'test123';

const ReadOnlyAlert: React.FC = () => {
    const [alertOpen, setAlertOpen] = useState(true);

    return (
        <>
            {alertOpen && (
                <Alert severity='info' sx={{ mb: 5 }}
                    action={
                        <IconButton
                            aria-label='close'
                            color='inherit'
                            size='small'
                            onClick={() => setAlertOpen(false)}
                        >
                            <CloseIcon fontSize='inherit' />
                        </IconButton>
                    }
                >
                    <Typography>Usar a combinação: <strong>{TEST_USER} / {TEST_PASSWORD}</strong> para testar apenas com permissões de leitura</Typography>
                </Alert>
            )}
        </>
    )
}

export default ReadOnlyAlert;