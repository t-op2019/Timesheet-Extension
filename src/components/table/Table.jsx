import React, { useState } from "react";
import moment from "moment";

// components
// import MaterialTable, { MTableToolbar } from "@material-table/core";
import { DataGrid } from "@mui/x-data-grid";

// style
import "./styles.css";

function Table({ data, viewmode, toggleSelect, matterPairs }) {
  const [dateStart, setDateStart] = useState(new Date());
  const [dateEnd, setDateEnd] = useState(new Date());

  const columns =
    viewmode === "All matters"
      ? [
          {
            headerName: "Matter Code",
            field: "matterCode",
            width: 230,
          },
          {
            headerName: "Matter Name",
            field: "matterName",
            width: 230,
          },
        ]
      : [
          {
            headerName: "Matter",
            field: "matterName",
            renderHeader: (param) => <strong>Matter</strong>,
            render: (param) => (
              <div>
                <div className="primary-font">{param.value}</div>
                <div style={{ fontSize: 8 }} className="primary-font">
                  {matterPairs[param.value]}
                </div>
              </div>
            ),
            width: 140,
          },
          {
            headerName: "Description",
            field: "description",
            renderHeader: (param) => <strong>Description</strong>,
            width: 200,
          },
          {
            headerName: "Duration",
            field: "duration",
            renderHeader: (param) => <strong>Duration</strong>,
            type: "numeric",
            align: "left",
            width: 70,
          },
          {
            headerName: "Date",
            field: "date",
            renderHeader: (param) => <strong>Date</strong>,
            renderCell: (param) => {
              return moment(param.value).format("DD/MM/YYYY");
            },
            width: 90,
          },
        ];

  const options = {
    draggable: false,
    showTextRowsSelected: false,
    selection: false,
    paging: true,
    pageSize: 10,
    search: false,
    showTitle: false,
    rowStyle: {
      height: 28,
      fontFamily: "Source Sans Pro",
      fontSize: 12,
    },
    headerStyle: {
      paddingTop: 10,
      paddingBottom: 10,
      fontFamily: "Source Sans Pro",
      backgroundColor: "#eee",
      fontSize: 14,
      fontWeight: "bold",
    },
    tableLayout: "fixed",
  };

  const onChangeDateRangePicker = (props) => {
    let startDate = props.startDate;
    let endDate = props.endDate;
    // dateRangeSearch(startDate, endDate);
    setDateStart(startDate);
    setDateEnd(endDate);
  };

  const handleRowlick = (param) => {
    console.log(param.row);
    if (viewmode !== "All matters") {
      toggleSelect(param.row);
    }
  };

  return (
    <div style={{ height: 500, width: "95%", fontSize: 14 }}>
      <DataGrid
        className="primary-font"
        sx={{
          fontSize: 12,
        }}
        options={options}
        rows={data}
        columns={columns}
        pageSize={7}
        onRowClick={handleRowlick}
      />
      {/* <MaterialTable
        data={data}
        columns={columns}
        pageSize={5}
        getRowHeight={() => "auto"}
        rowsPerPageOptions={[5]}
        className="primary-font"
        style={{
          fontSize: 12,
        }}
        options={options}
        onRowClick={(event, rowData) => {
          if (viewmode !== "All matters") {
            toggleSelect(rowData);
          }
        }}
        components={{
          Toolbar: (props) => (
            <div
              style={{
                height: "0px",
              }}
            >
              <MTableToolbar {...props} />
            </div>
          ),
        }}
      /> */}
    </div>
  );
}

export default Table;
