import React, { forwardRef } from 'react';
import MaterialTable from 'material-table';
import ArrowDownward from '@material-ui/icons/ArrowDownward';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Clear from '@material-ui/icons/Clear';
import FilterList from '@material-ui/icons/FilterList';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import Remove from '@material-ui/icons/Remove';
import Search from '@material-ui/icons/Search';
import ViewColumn from '@material-ui/icons/ViewColumn';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import Edit from '@material-ui/icons/Edit';
import Save from '@material-ui/icons/Save';
import PersonAdd from '@material-ui/icons/PersonAdd';

import {
  Container
} from './styles';

function Table({
  title,
  columns,
  data,
  actions,
  detail,
  options,
  editable
}) {

  const tableIcons = {
    Add: forwardRef((props, ref) => <PersonAdd {...props} ref={ref} />),
    Check: forwardRef((props, ref) => <Save {...props} ref={ref} />),
    Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
    Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
    DetailPanel: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
    FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
    LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
    NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} ref={ref} />),
    ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
    SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
    ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
    ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />)
  };

  return (
    <Container>
      <MaterialTable
        icons={tableIcons}
        columns={columns}
        data={data}
        title={title}
        actions={actions}
        options={options}
        detailPanel={detail}
        editable={editable}
        localization={{
          body: {
            emptyDataSourceMessage: 'Nenhum registro para exibir',
            editRow: {
              cancelTooltip: 'Cancelar',
              saveTooltip: 'Salvar',
              deleteText: 'Tem certeza que deseja remover esta linha?'
            },
            deleteTooltip: 'Remover',
            editTooltip: 'Editar',
          },
          toolbar: {
            searchTooltip: 'Pesquisar'
          },
          header: {
            actions: 'Ações'
          },
          pagination: {
            labelRowsSelect: 'linhas',
            labelDisplayedRows: '{count} de {from}-{to}',
            firstTooltip: 'Primeira página',
            previousTooltip: 'Página anterior',
            nextTooltip: 'Próxima página',
            lastTooltip: 'Última página'
          }
        }}
      />
    </Container>
  );
};
export default Table;