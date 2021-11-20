import React from 'react';
//-------------------- MUI --------------------------
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
//-------------------- Icons --------------------------
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
//----------------------------------------------------------

interface IProps {
    value: boolean;
    toggle: () => void;
}

const ShowPasswordIcon: React.FC<IProps> = ({ value, toggle }) => {
    return (
        <InputAdornment position='end'>
            <IconButton onClick={toggle} edge='end'>
                {value ? <VisibilityOffIcon /> : <VisibilityIcon />}
            </IconButton>
        </InputAdornment>
    )
}

export default ShowPasswordIcon;