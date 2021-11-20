import React from 'react';
//-------------------- MUI --------------------------
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
//-------------------- Icons --------------------------
import DeleteIcon from '@mui/icons-material/DeleteRounded';
//----------------------------------------------------------

interface IProps {
    length: number;
    handleDelete: () => void;
}

const DeleteSelected: React.FC<IProps> = ({ length, handleDelete }) => {
    return (
        <Box
            sx={{
                display: { xs: 'flex', sm: 'flex' },
                alignItems: 'center',
                my: 2,
                gap: '2rem'
            }}
        >
            <Typography variant='body2'>
                <strong>{length}</strong> linha(s) selecionada(s)
            </Typography>
            <Button onClick={handleDelete} variant='outlined'>
                <DeleteIcon />
                <Typography sx={{ ml: 1, display: { xs: 'none', md: 'inline-flex' } }}>
                    Apagar
                </Typography>
            </Button>
        </Box>
    )
}

export default DeleteSelected;