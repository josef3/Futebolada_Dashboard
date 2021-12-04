import { useHistory } from 'react-router-dom';
//-------------------- MUI --------------------------
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
//-------------------- Icons --------------------------
import BackIcon from '@mui/icons-material/KeyboardBackspaceRounded';
//----------------------------------------------------------

const BackButton = () => {
    const history = useHistory();

    return (
        <Button
            color='inherit'
            startIcon={<BackIcon />}
            onClick={() => history.goBack()}
            sx={{ width: 100, mb: 3 }}
        >
            <Typography>Voltar</Typography>
        </Button>
    )
}

export default BackButton;