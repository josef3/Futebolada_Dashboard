import React, { useState, useEffect } from 'react';
//-------------------- MUI --------------------------
import Paper from '@mui/material/Paper';
import { DataGrid, GridSelectionModel, GridCallbackDetails } from '@mui/x-data-grid';
//-------------------- Utils --------------------------
import useWindowSize from '../../hooks/useWindowSize';
import PT_LOCALE_TEXT from '../../utils/gridLocaleText';
//----------------------------------------------------------

interface IProps {
    idField: string;
    rows: any;
    columns: any;
    onSelectionModelChange: (selectionModel: GridSelectionModel, details: GridCallbackDetails) => void;
}

const Table: React.FC<IProps> = ({ idField, rows, columns, onSelectionModelChange }) => {
    const { height } = useWindowSize();
    const [rowsPerPage, setRowsPerPage] = useState(5);

    //set row per pages as 10 if the height of the screen is higher than 1000 
    useEffect(() => {
        height > 1000 && setRowsPerPage(10);
    }, [height])

    return (
        <Paper>
            <DataGrid
                //data
                getRowId={(r) => r[idField]}
                rows={rows}
                columns={columns}
                //pages control
                pageSize={rowsPerPage}
                rowsPerPageOptions={[5, 10, 25]}
                onPageSizeChange={(number) => setRowsPerPage(number)}
                //selection control
                onSelectionModelChange={onSelectionModelChange}
                checkboxSelection
                disableSelectionOnClick
                //style
                density='comfortable'
                autoHeight
                localeText={PT_LOCALE_TEXT}
            />
        </Paper>
    )
}

export default Table;