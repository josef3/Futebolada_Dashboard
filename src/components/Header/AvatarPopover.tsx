import { useState } from 'react';
import { useHistory } from 'react-router-dom';
//-------------------- MUI --------------------------
import { Avatar, Divider, Menu, MenuItem, Typography, Button, IconButton } from '@mui/material';
import LockRoundedIcon from '@mui/icons-material/LockRounded';
//-------------------- Components --------------------------
import ConfirmationDialog from 'components/ConfirmationDialog';
import ChangePasswordModal from './ChangePasswordModal';
//-------------------- Utils --------------------------
import { useAuth } from 'contexts/auth';
import useToggle from 'hooks/useToggle';
//----------------------------------------------------------

const AvatarPopover = () => {
    const { auth, authDispatch } = useAuth();
    const history = useHistory();

    const logout = () => {
        authDispatch({ type: 'LOGOUT' });
        history.push('/login');
    }

    const [popoverRef, setPopoverRef] = useState<null | HTMLElement>(null);
    const popoverOpen = !!popoverRef;
    const handlePopoverClick = (event: React.MouseEvent<HTMLElement>) => setPopoverRef(event.currentTarget);
    const handlePopoverClose = () => setPopoverRef(null);

    const [dialogIsOpen, toggleDialog] = useToggle(false);
    const [changePassModalIsOpen, toggleChangePassModal] = useToggle(false);

    return (
        <>
            <IconButton onClick={handlePopoverClick}>
                <Avatar />
            </IconButton>
            <Menu
                anchorEl={popoverRef}
                open={popoverOpen}
                onClose={handlePopoverClose}
                onClick={handlePopoverClose}
                PaperProps={{
                    elevation: 0,
                    sx: {
                        overflow: 'visible',
                        filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                        mt: 1.5,
                        pt: 1,
                        //arrow
                        '&:before': {
                            content: '""',
                            display: 'block',
                            position: 'absolute',
                            top: 0,
                            right: 14,
                            width: 10,
                            height: 10,
                            bgcolor: 'background.paper',
                            transform: 'translateY(-50%) rotate(45deg)',
                            zIndex: 0,
                        },
                    },
                }}
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            >
                <Typography sx={{ ml: 2, mb: 1 }} variant='subtitle2'>{auth.username} (Admin)</Typography>
                <Divider />

                <MenuItem onClick={toggleChangePassModal} sx={{ py: 2 }}>
                    <LockRoundedIcon sx={{ mr: 3 }} />
                    <Typography variant='body2'>Alterar palavra-passe</Typography>
                </MenuItem>

                <MenuItem
                    onClick={toggleDialog}
                    sx={{
                        '&:hover': {
                            backgroundColor: 'transparent'
                        }
                    }}
                >
                    <Button color='error' fullWidth>Terminar sessão</Button>
                </MenuItem>
            </Menu>

            <ChangePasswordModal
                isOpen={changePassModalIsOpen}
                handleClose={toggleChangePassModal}
            />

            <ConfirmationDialog
                isOpen={dialogIsOpen}
                handleClose={toggleDialog}
                handleConfirm={logout}
                title='Terminar sessão'
                message='Tens a certeza que pretendes terminar sessão?'
                type='error'
            />
        </>
    );
}

export default AvatarPopover;