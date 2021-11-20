//-------------------- MUI --------------------------
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
//----------------------------------------------------------

const Loading = () => {
    return (
        <Backdrop open sx={{ zIndex: 2000 }}>
            <CircularProgress />
        </Backdrop>
    )
}

export default Loading;