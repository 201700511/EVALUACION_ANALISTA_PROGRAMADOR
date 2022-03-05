import React, {Component} from "react";
import {IonSelect, IonSelectOption
        } from '@ionic/react';
import { makeData } from "./Utils";
import Select from "react-select";
import ReactTable from 'react-table-6'
import 'react-table-6/react-table.css'
import Cookies from 'universal-cookie'
import Swal from 'sweetalert2'

const cookies = new Cookies()
var jwt = require('jsonwebtoken');
let params = []

class Table extends Component {

  constructor() {
    super();
    this.state = {
      data: makeData(),
      filtered: [],
      select2: undefined,
      cursos : []
    };
  }

  onFilteredChangeCustom = (value, accessor) => {
    let filtered = this.state.filtered;
    let insertNewFilter = 1;

    if (filtered.length) {
      filtered.forEach((filter, i) => {
        if (filter["id"] === accessor) {
          if (value === "" || !value.length) filtered.splice(i, 1);
          else filter["value"] = value;

          insertNewFilter = 0;
        }
      });
    }

    if (insertNewFilter) {
      filtered.push({ id: accessor, value: value });
    }

    this.setState({ filtered: filtered });
  };

  async datos(cell){
    cookies.set('cursos', cell, { path: '/' });
    cookies.set('CambioHorario', 1, { path: '/' });
  }

  render() {
    params = this.props.params

    return (
      <div className="table">
        <br />
        {
          <ReactTable
            data={this.props.data}
            // filterable  // Field para buscar fila por celda
            filtered={this.state.filtered}
            onFilteredChange={(filtered, column, value) => {
              this.onFilteredChangeCustom(value, column.id || column.accessor);
            }}
            defaultFilterMethod={(filter, row, column) => {
              const id = filter.pivotId || filter.id;
              if (typeof filter.value === "object") {
                return row[id] !== undefined
                  ? filter.value.indexOf(row[id]) > -1
                  : true;
              } else {
                return row[id] !== undefined
                  ? String(row[id]).indexOf(filter.value) > -1
                  : true;
              }
            }}
            columns={[
              {
                Header: this.props.type === 'rep1' ?
                         "listado de clientes"
                        : "monto de gastos de los servicios prestados",
                columns: [
                  {
                    Header: params.dato0 ,
                    accessor: "dato0"
                  },
                  {
                    Header: params.dato1 ,
                    accessor: "dato1"
                  },
                  {
                    Header: params.dato2 ,
                    accessor: "dato2",
                    show: this.props.type === 'rep2' ? false: true,
                  },
                  {
                    Header: params.dato3 ,
                    accessor: "dato3",
                    show: this.props.type === 'rep2' ? false: true,
                  },
                  {
                    Header: params.dato4 ,
                    accessor: "dato4",
                    show: this.props.type === 'rep2' ? false: false,
                  } 
                ]
              }
            ]}
            defaultPageSize={5}
            className="-highlight -table"
          />
        }
        <br />
      </div>
    );
  }
}


export default Table;