import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useSnackbar } from 'notistack';
//-------------------- MUI --------------------------
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import { GridActionsCellItem, GridRenderCellParams, GridRowParams } from '@mui/x-data-grid';
//-------------------- Icons --------------------------
import DeleteIcon from '@mui/icons-material/DeleteRounded';
import EditIcon from '@mui/icons-material/EditRounded';
//-------------------- Components --------------------------
import Loading from 'components/Loading';
import Header from 'components/ListPages/Header';
import Table from 'components/ListPages/Table';
import DeleteSelected from 'components/ListPages/DeleteSelected';
import ConfirmationDialog from 'components/ConfirmationDialog';
import StyledLink from 'components/StyledLink';
import { ListContent } from 'components/ListPages/styles';
//-------------------- Utils --------------------------
import useFetch from 'hooks/useFetch';
import useToggle from 'hooks/useToggle';
import useWindowSize from 'hooks/useWindowSize';
import API from 'Api';
import IBestFive from 'interfaces/bestFives';
import { generalError } from 'utils';
//----------------------------------------------------------

const BestFives = () => {
    const { enqueueSnackbar } = useSnackbar();
    const { width } = useWindowSize();
    const history = useHistory();
    const { data: bestFives, mutate } = useFetch<IBestFive[]>('best-fives');

    const [selected, setSelected] = useState<number[]>([]);

    const [isLoading, toggleLoading] = useToggle(false);
    const [dialogIsOpen, toggleDialog] = useToggle(false);

    async function deleteBestFiveById(id: number) {
        try {
            await API.delete(`/best-fives/${id}`);
        }
        catch (error) {
            throw error;
        }
    }

    async function handleDelete() {
        toggleLoading();
        try {
            for (let i = 0; i < selected.length; i++) {
                await deleteBestFiveById(selected[i]);
            }
            enqueueSnackbar('Melhores 5 eliminados com sucesso', { variant: 'success' });
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

    const goToEditPage = (id: number) => history.push(`/dashboard/best-fives/${id}/editar`);

    function handleSingleDelete(id: number) {
        setSelected([id]);
        toggleDialog();
    }

    const columns = React.useMemo(
        () => [
            {
                field: 'id_best_five',
                headerName: 'Id',
                width: 75,
                type: 'number'
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
            {
                field: 'id_player',
                headerName: 'Id Jogador',
                minWidth: 50,
                flex: 1,
                type: 'number',
                renderCell: ({ value }: GridRenderCellParams) => (
                    <StyledLink to={`/dashboard/jogadores/${value}/editar`}>
                        {value}
                    </StyledLink>
                )
            },
            {
                field: 'field_position',
                headerName: 'Posi????o Campo',
                flex: 1,
                minWidth: 100,
                type: 'number',
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

    if (!bestFives) return <Loading />;

    return (
        <>
            {isLoading && <Loading />}

            <ListContent style={{ maxWidth: 1200 }}>
                <Header
                    title='Lista de Melhores 5'
                    newLabel='Novo Melhor 5'
                    newUrl='/dashboard/best-fives/criar'
                />

                {selected.length > 0 && (
                    <DeleteSelected
                        length={selected.length}
                        handleDelete={toggleDialog}
                    />
                )}
                <Table
                    idField='id_best_five'
                    rows={bestFives}
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
                message={`Tens a certeza que pretendes eliminar ${selected.length} ${selected.length === 1 ? 'melhor 5' : 'melhores 5'}? Aten????o: As altera????es ser??o permanentes!`}
                type='warning'
            />
        </>
    );
}

export default BestFives;