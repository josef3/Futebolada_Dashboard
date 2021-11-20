import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useSnackbar } from 'notistack';
//-------------------- MUI --------------------------
import { GridActionsCellItem, GridRenderCellParams, GridRowParams } from '@mui/x-data-grid';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import Chip from '@mui/material/Chip';
//-------------------- Icons --------------------------
import DeleteIcon from '@mui/icons-material/DeleteRounded';
import EditIcon from '@mui/icons-material/EditRounded';
//-------------------- Components --------------------------
import Loading from '../../components/Loading';
import Header from '../../components/ListPages/Header';
import DeleteSelected from '../../components/ListPages/DeleteSelected';
import Table from '../../components/ListPages/Table';
import ConfirmationDialog from '../../components/ConfirmationDialog';
//-------------------- Utils --------------------------
import useToggle from '../../hooks/useToggle';
import useFetch from '../../hooks/useFetch';
import useWindowSize from '../../hooks/useWindowSize';
import API from '../../Api';
import IWeek from '../../interfaces/weeks';
import { ListContent } from '../../components/ListPages/styles';
//----------------------------------------------------------

const Weeks: React.FC = () => {
    const { enqueueSnackbar } = useSnackbar();
    const { width } = useWindowSize();
    const history = useHistory();

    const { data: weeks, mutate } = useFetch<IWeek[]>('weeks');

    const [selected, setSelected] = useState<number[]>([]);

    const [isLoading, toggleLoading] = useToggle(false);
    const [dialogIsOpen, toggleDialog] = useToggle(false);

    async function deleteWeekById(id: number) {
        try {
            await API.delete(`/weeks/${id}`);
        }
        catch (error) {
            throw error;
        }
    }

    async function handleDelete() {
        toggleLoading();
        try {
            for (let i = 0; i < selected.length; i++) {
                await deleteWeekById(selected[i]);
            }
            enqueueSnackbar('Semanas eliminadas com sucesso', { variant: 'success' });
        }
        catch (error) {
            enqueueSnackbar('Ocorreu um erro', { variant: 'error' });
        }
        finally {
            mutate();
            setSelected([]);
            toggleLoading();
        }
    }

    const goToEditPage = (id: number) => history.push(`/dashboard/semanas/${id}/editar`);

    function handleSingleDelete(id: number) {
        setSelected([id]);
        toggleDialog();
    }

    const columns = React.useMemo(
        () => [
            {
                field: 'id_week',
                headerName: 'Id',
                minWidth: 50,
                type: 'number'
            },
            {
                field: 'date',
                headerName: 'Data',
                flex: 1,
                minWidth: 125,
                type: 'date',
                renderCell: ({ value }: GridRenderCellParams) => new Date(value).toLocaleDateString()
            },
            {
                field: 'vote_finished',
                headerName: 'Estado Votação',
                flex: 1,
                minWidth: 150,
                renderCell: ({ value }: GridRenderCellParams) => (
                    <Chip
                        label={!!value ? 'Terminada' : 'A decorrer'}
                        color={!!value ? 'error' : 'success'}
                    />
                )
            },
            {
                field: 'vote_finish_date',
                headerName: 'Data Fecho Votação',
                flex: 1,
                minWidth: 200,
                type: 'dateTime',
                renderCell: ({ value }: GridRenderCellParams) => new Date(value).toLocaleString()
            },
            {
                field: 'actions',
                type: 'actions',
                flex: 1,
                sortable: false,
                disableColumnMenu: true,
                getActions: ({ id }: GridRowParams) => [
                    <GridActionsCellItem
                        icon={
                            <Tooltip title='Editar'>
                                <IconButton color='info'>
                                    <EditIcon />
                                </IconButton>
                            </Tooltip>
                        }
                        label='Editar'
                        onClick={() => goToEditPage(id as number)}
                        showInMenu={width < 1200}
                    />
                    ,
                    <GridActionsCellItem
                        icon={
                            <Tooltip title='Apagar'>
                                <IconButton color='error'>
                                    <DeleteIcon />
                                </IconButton>
                            </Tooltip>
                        }
                        label='Apagar'
                        onClick={() => handleSingleDelete(id as number)}
                        showInMenu={width < 1200}
                    />,
                ],
            },
        ],
        [width]
    );

    if (!weeks) return <Loading />;

    return (
        <>
            {isLoading && <Loading />}

            <ListContent style={{ maxWidth: 1200 }}>
                <Header
                    title='Lista de Semanas'
                    newLabel='Nova Semana'
                    newUrl='/dashboard/semanas/criar'
                />

                {selected.length > 0 && (
                    <DeleteSelected
                        length={selected.length}
                        handleDelete={toggleDialog}
                    />
                )}
                <Table
                    idField='id_week'
                    rows={weeks}
                    columns={columns}
                    onSelectionModelChange={(ids) => setSelected(ids as number[])}
                />
            </ListContent>

            <ConfirmationDialog
                isOpen={dialogIsOpen}
                handleClose={() => {
                    toggleDialog();
                    setSelected([]);
                }}
                handleConfirm={handleDelete}
                title='Apagar registos'
                message={`Tens a certeza que pretendes eliminar ${selected.length} ${selected.length === 1 ? 'jogador' : 'jogadores'}? Cuidado: As alterações serão permanentes!`}
                type='error'
            />
        </>
    );
}

export default Weeks;