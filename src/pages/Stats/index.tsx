import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useSnackbar } from 'notistack';
//-------------------- MUI --------------------------
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import { GridActionsCellItem, GridRowParams, GridRenderCellParams } from '@mui/x-data-grid';
//-------------------- Icons --------------------------
import DeleteIcon from '@mui/icons-material/DeleteRounded';
import EditIcon from '@mui/icons-material/EditRounded';
//-------------------- Components --------------------------
import Loading from '../../components/Loading';
import Table from '../../components/ListPages/Table';
import Header from '../../components/ListPages/Header';
import DeleteSelected from '../../components/ListPages/DeleteSelected';
import StyledLink from '../../components/StyledLink';
import ConfirmationDialog from '../../components/ConfirmationDialog';
import { ListContent } from '../../components/ListPages/styles';
//-------------------- Utils --------------------------
import useToggle from '../../hooks/useToggle';
import useFetch from '../../hooks/useFetch';
import useWindowSize from '../../hooks/useWindowSize';
import API from '../../Api';
import IStats from '../../interfaces/stats';
import { generalError } from '../../utils';
//----------------------------------------------------------

const Stats: React.FC = () => {
    const { enqueueSnackbar } = useSnackbar();
    const { width } = useWindowSize();
    const history = useHistory();

    const { data: stats, mutate } = useFetch<IStats[]>(`stats`);

    const [selected, setSelected] = useState<number[]>([]);

    const [isLoading, toggleLoading] = useToggle(false);
    const [dialogIsOpen, toggleDialog] = useToggle(false);

    async function deleteStatById(id: number) {
        try {
            await API.delete(`/stats/${id}`);
        }
        catch (error) {
            throw error;
        }
    }

    async function handleDelete() {
        toggleLoading();
        try {
            for (let i = 0; i < selected.length; i++) {
                await deleteStatById(selected[i]);
            }
            enqueueSnackbar('Estatísticas eliminadas com sucesso', { variant: 'success' });
        }
        catch (error: any) {
            enqueueSnackbar(error?.response?.data?.message || generalError, { variant: 'error' });
        }
        finally {
            mutate();
            setSelected([]);
            toggleLoading();
        }
    }

    const goToEditPage = (id: number) => history.push(`/dashboard/estatisticas/${id}/editar`);

    function handleSingleDelete(id: number) {
        setSelected([id]);
        toggleDialog();
    }

    const columns = React.useMemo(
        () => [
            {
                field: 'id_stats',
                headerName: 'Id',
                width: 75,
                type: 'number'
            },
            {
                field: 'id_player',
                headerName: 'Id Jogador',
                width: 75,
                flex: 1,
                type: 'number',
                renderCell: ({ value }: GridRenderCellParams) => (
                    <StyledLink to={`/dashboard/jogadores/${value}/editar`}>
                        {value}
                    </StyledLink>
                )
            },
            {
                field: 'id_week',
                headerName: 'Id Semana',
                minWidth: 50,
                flex: 1,
                type: 'number',
                renderCell: ({ value }: GridRenderCellParams) => (
                    <StyledLink to={`/dashboard/semanas/${value}/editar`}>
                        {value}
                    </StyledLink>
                )
            },
            { field: 'goals', headerName: 'Golos', minWidth: 50, flex: 1, type: 'number' },
            { field: 'assists', headerName: 'Assistências', minWidth: 50, flex: 1, type: 'number' },
            { field: 'shots_target', headerName: 'Remates Enquadrados', minWidth: 50, flex: 1, type: 'number' },
            { field: 'total_shots', headerName: 'Total Remates', minWidth: 50, flex: 1, type: 'number' },
            { field: 'tackles', headerName: 'Desarmes', minWidth: 50, flex: 1, type: 'number' },
            { field: 'interceptions', headerName: 'Recuperações', minWidth: 50, flex: 1, type: 'number' },
            { field: 'blocks', headerName: 'Bloqueios', minWidth: 50, flex: 1, type: 'number' },
            { field: 'nutmegs_made', headerName: 'Cuecas Efetuadas', minWidth: 50, flex: 1, type: 'number' },
            { field: 'nutmegs_suffered', headerName: 'Cuecas Sofridas', minWidth: 50, flex: 1, type: 'number' },
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
                        showInMenu={width < 1500}
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
                        showInMenu={width < 1500}
                    />,
                ],
            },
        ],
        [width]
    );

    if (!stats) return <Loading />;

    return (
        <>
            {isLoading && <Loading />}

            <ListContent>
                <Header
                    title='Lista de Estatísticas'
                    newLabel='Nova Estatística'
                    newUrl='/dashboard/estatisticas/criar'
                />

                {selected.length > 0 && (
                    <DeleteSelected
                        length={selected.length}
                        handleDelete={toggleDialog}
                    />
                )}

                <Table
                    idField='id_stats'
                    rows={stats}
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
                message={`Tens a certeza que pretendes eliminar ${selected.length} ${selected.length === 1 ? 'mvp' : 'mvps'}? Cuidado: As alterações serão permanentes!`}
                type='error'
            />
        </>
    );
}

export default Stats;