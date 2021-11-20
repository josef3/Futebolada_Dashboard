import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useSnackbar } from 'notistack';
//-------------------- MUI --------------------------
import Tooltip from '@mui/material/Tooltip';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import { GridActionsCellItem, GridRenderCellParams, GridRowParams } from '@mui/x-data-grid';
//-------------------- Icons --------------------------
import DeleteIcon from '@mui/icons-material/DeleteRounded';
import EditIcon from '@mui/icons-material/EditRounded';
//-------------------- Components --------------------------
import Loading from '../../components/Loading';
import Header from '../../components/ListPages/Header';
import Table from '../../components/ListPages/Table';
import DeleteSelected from '../../components/ListPages/DeleteSelected';
import ConfirmationDialog from '../../components/ConfirmationDialog';
import { ListContent } from '../../components/ListPages/styles';
//-------------------- Utils --------------------------
import useFetch from '../../hooks/useFetch';
import useToggle from '../../hooks/useToggle';
import useWindowSize from '../../hooks/useWindowSize';
import API from '../../Api';
import IPlayer from '../../interfaces/players';
//----------------------------------------------------------

const Players: React.FC = () => {
    const { enqueueSnackbar } = useSnackbar();
    const { width } = useWindowSize();
    const history = useHistory();

    const { data: players, mutate } = useFetch<IPlayer[]>('players');

    const [selected, setSelected] = useState<number[]>([]);

    const [isLoading, toggleLoading] = useToggle(false);
    const [dialogIsOpen, toggleDialog] = useToggle(false);

    async function deletePlayerById(id: number) {
        try {
            await API.delete(`/players/${id}`);
        }
        catch (error) {
            throw error;
        }
    }

    async function handleDelete() {
        toggleLoading();
        try {
            for (let i = 0; i < selected.length; i++) {
                await deletePlayerById(selected[i]);
            }
            enqueueSnackbar('Jogadore(s) eliminado(s) com sucesso', { variant: 'success' });
        }
        catch (error: any) {
            enqueueSnackbar(error?.response?.data?.message || 'Ocorreu um erro', { variant: 'error' });
        }
        finally {
            mutate();
            setSelected([]);
            toggleLoading();
        }
    }

    const goToEditPage = (id: number) => history.push(`/dashboard/jogadores/${id}/editar`);

    function handleSingleDelete(id: number) {
        setSelected([id]);
        toggleDialog();
    }

    const columns = React.useMemo(
        () => [
            {
                field: 'id_player',
                headerName: 'Id',
                width: 75
            },
            {
                field: 'avatar',
                headerName: 'Avatar',
                width: 80,
                disableColumnMenu: true,
                sortable: false,
                renderCell: (params: GridRenderCellParams) => <Avatar src={params.value} sx={{ width: 50, height: 50 }} />
            },
            {
                field: 'first_name',
                headerName: '1º Nome',
                flex: 1,
                minWidth: 100,
            },
            {
                field: 'last_name',
                headerName: 'Apelido',
                flex: 1,
                minWidth: 100
            },
            {
                field: 'username',
                headerName: 'Nome Utilizador',
                flex: 1,
                minWidth: 150
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

    if (!players) return <Loading />;

    return (
        <>
            {isLoading && <Loading />}

            <ListContent style={{ maxWidth: 1200 }}>
                <Header
                    title='Lista de Jogadores'
                    newLabel='Novo Jogador'
                    newUrl='/dashboard/jogadores/criar'
                />

                {selected.length > 0 && (
                    <DeleteSelected
                        length={selected.length}
                        handleDelete={toggleDialog}
                    />
                )}
                <Table
                    idField='id_player'
                    rows={players}
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
                message={`Tens a certeza que pretendes eliminar ${selected.length} ${selected.length === 1 ? 'jogador' : 'jogadores'}? Atenção: As alterações serão permanentes!`}
                type='error'
            />
        </>
    );
}

export default Players;