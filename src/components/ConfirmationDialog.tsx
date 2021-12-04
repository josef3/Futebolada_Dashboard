import React from 'react';
//-------------------- MUI --------------------------
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle
} from '@mui/material';
//----------------------------------------------------------

interface IProps {
    isOpen: boolean;
    handleClose: () => void;
    handleConfirm: () => void;
    title?: string;
    message: string;
    type: 'error' | 'success' | 'warning';
}

const ConfirmationDialog: React.FC<IProps> = ({ isOpen, handleClose, handleConfirm, title, message, type }) => {
    function handleConfirmClick() {
        handleConfirm();
        handleClose();
    }

    return (
        <Dialog
            open={isOpen}
            onClose={handleClose}
            aria-labelledby='confirmation-dialog-title'
            aria-describedby='confirmation-dialog-desc'
        >
            {title && <DialogTitle id='confirmation-dialog-title'>{title}</DialogTitle>}

            <DialogContent>
                <DialogContentText id='confirmation-dialog-desc'>
                    {message}
                </DialogContentText>
            </DialogContent>

            <DialogActions>
                <Button color='inherit' onClick={handleClose}>Cancelar</Button>
                <Button variant='contained' color={type} onClick={handleConfirmClick} autoFocus>Confirmar</Button>
            </DialogActions>
        </Dialog>
    )
}

export default ConfirmationDialog;