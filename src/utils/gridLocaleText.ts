import { GridLocaleText } from '@mui/x-data-grid';

const PT_LOCALE_TEXT: GridLocaleText = {

    // Density selector toolbar button text
    toolbarDensity: 'Densidade',
    toolbarDensityLabel: 'Densidade',
    toolbarDensityCompact: 'Compacto',
    toolbarDensityStandard: 'Normal',
    toolbarDensityComfortable: 'Confortável',

    // Columns selector toolbar button text
    toolbarColumns: 'Colunas',
    toolbarColumnsLabel: 'Mostrar seletor colunas',

    // Filters toolbar button text
    toolbarFilters: 'Filtros',
    toolbarFiltersLabel: 'Mostrar Filtros',
    toolbarFiltersTooltipHide: 'Esconder Filtros',
    toolbarFiltersTooltipShow: 'Mostrar Filtros',
    toolbarFiltersTooltipActive: (count) =>
        count !== 1
            ? `${count} filtros ativos`
            : `${count} filtro ativo`,

    // Columns panel text
    columnsPanelTextFieldLabel: 'Encontrar Coluna',
    columnsPanelTextFieldPlaceholder: 'Título Coluna',
    columnsPanelDragIconLabel: 'Reordenar Coluna',
    columnsPanelShowAllButton: 'Mostrar todos',
    columnsPanelHideAllButton: 'Esconder todos',

    // Filter panel text
    filterPanelAddFilter: 'Adicionar Filtro',
    filterPanelDeleteIconLabel: 'Apagar',
    filterPanelOperators: 'Operadores',
    filterPanelOperatorAnd: 'E',
    filterPanelOperatorOr: 'Ou',
    filterPanelColumns: 'Colunas',
    filterPanelInputLabel: 'Valor',
    filterPanelInputPlaceholder: 'Filtrar valor',

    // Column menu text
    columnMenuLabel: 'Menu',
    columnMenuShowColumns: 'Mostrar colunas',
    columnMenuFilter: 'Filtrar',
    columnMenuHideColumn: 'Esconder',
    columnMenuUnsort: 'Desordenar',
    columnMenuSortAsc: 'Ordem Crescente',
    columnMenuSortDesc: 'Ordem Decrescente',

    // Column header text
    columnHeaderFiltersLabel: 'Mostrar Filtros',
    columnHeaderSortIconLabel: 'Ordenar',
    columnHeaderFiltersTooltipActive: (count) =>
        count !== 1
            ? `${count} filtros ativos`
            : `${count} filtro ativo`,

    // Rows selected footer text
    footerRowSelected: (count) => '',

    // Total rows footer text
    footerTotalRows: 'Total Linhas:',

    // Root
    noRowsLabel: 'Sem resultados',
    noResultsOverlayLabel: 'Sem resultados.',
    errorOverlayDefaultLabel: 'Ocorreu um erro.',


    // Export selector toolbar button text
    toolbarExport: 'Exportar',
    toolbarExportLabel: 'Exportar',
    toolbarExportCSV: 'Descarregar como CSV',
    toolbarExportPrint: 'Imprimir',

    // Filter operators text
    filterOperatorContains: 'contém',
    filterOperatorEquals: 'igual a',
    filterOperatorStartsWith: 'começa por',
    filterOperatorEndsWith: 'acaba com',
    filterOperatorIs: 'é',
    filterOperatorNot: 'não é',
    filterOperatorAfter: 'é depois',
    filterOperatorOnOrAfter: 'é durante ou depois',
    filterOperatorBefore: 'é antes',
    filterOperatorOnOrBefore: 'é durante ou antes',
    filterOperatorIsEmpty: 'é vazio',
    filterOperatorIsNotEmpty: 'é não vazio',

    // Filter values text
    filterValueAny: 'qualquer',
    filterValueTrue: 'verdadeiro',
    filterValueFalse: 'falso',

    // Total visible rows footer text
    footerTotalVisibleRows: (visibleCount, totalCount) =>
        `${visibleCount.toLocaleString()} de ${totalCount.toLocaleString()}`,

    // Checkbox selection text
    checkboxSelectionHeaderName: 'Seleções',

    // Boolean cell text
    booleanCellTrueLabel: 'verdadeiro',
    booleanCellFalseLabel: 'falso',

    // Actions cell more text
    actionsCellMore: 'mais',

    // Used core components translation keys
    MuiTablePagination: {
        labelRowsPerPage: 'Linhas por pág.:',
        labelDisplayedRows: ({ from, to, count }) => `${from}-${to} de ${count !== -1 ? count : `mais de ${to}`}`
    }
};

export default PT_LOCALE_TEXT;