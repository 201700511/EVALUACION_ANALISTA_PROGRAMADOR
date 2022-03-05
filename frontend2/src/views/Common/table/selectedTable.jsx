import React from "react";
import BootstrapTable from "react-bootstrap-table-next";
import cellEditFactory from "react-bootstrap-table2-editor";

import { useSelector, useDispatch } from "react-redux";
import {
  update,
  selected,
  unSelected,
  updateSelected,
  unSelectedAll
} from "./Utils";

function SelectedTable() {
  const dispatch = useDispatch();
  const tableState = useSelector((state) => state.tableState);
  const tableData = useSelector((state) => state.tableData);
  const columns = [
    {
      dataField: "value",
      text: "Use(to/yr)",
      validator: (newValue, row, column) => {
        if (isNaN(newValue)) {
          alert("Value should be numeric");
          return {
            valid: false,
            message: "Value should be numeric"
          };
        }
        if (newValue <= 0) {
          alert("value should be greater than 0");
          return {
            valid: false,
            message: "Value should be greater than 0"
          };
        }
        return true;
      }
    },
    {
      dataField: "Country",
      text: "Country"
    }
  ];

  function onRowSelect(row, isSelect, e) {
    if (row.value <= 0) {
      alert("value cannot be less than or equal to 0");
      return false;
    } else {
      if (isSelect) {
        console.log(row, "selected");
        dispatch(selected(row));
        console.log(tableState);
      } else {
        console.log(row, "unselected");
        let clone = { ...tableState };
        console.log(clone, "clonebefore");
        var index = clone.selectedList.indexOf(row.Country);
        console.log(index);
        if (index !== -1) {
          clone.selected.splice(index, 1);
          clone.selectedList.splice(index, 1);
        }
        console.log(clone, "cloneafter");
        dispatch(unSelected(clone));
        console.log(tableState, "unselected");
      }
    }
  }

  function afterSave(oldValue, newValue, row, column) {
    var data = [...tableData];
    var tablestatedata = { ...tableState };

    console.log("After Saving Cell!!");
    console.log(row);

    for (var j = 0; j < tablestatedata.selected.length; j++) {
      if (tablestatedata.selectedList[j] === row.Country) {
        tablestatedata.selected[j].value = newValue;
      }
    }

    dispatch(updateSelected(tablestatedata));

    for (var i = 0; i < data.length; i++) {
      if (data[i].Country === row.Country) {
        console.log(data[i].Country, "name");
        data[i].value = row.value;
      }
    }

    dispatch(update(data));
  }

  return (
    <BootstrapTable
      keyField="Country"
      data={tableState.selected}
      columns={columns}
      selectRow={{
        mode: "checkbox",
        clickToSelect: false,
        onSelect: onRowSelect,
        // onSelectAll: onRowSelectAll
        hideSelectAll: true,
        clickToEdit: true,
        selected: tableState.selectedList
      }}
      cellEdit={cellEditFactory({
        mode: "click",
        blurToSave: true,
        afterSaveCell: afterSave
      })}
    />
  );
}

export default SelectedTable;
