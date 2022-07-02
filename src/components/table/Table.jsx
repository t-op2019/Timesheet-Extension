import React, { useState } from "react";
import moment from "moment";

// components
import MaterialTable, { MTableToolbar } from "@material-table/core";

// icons
import MoreVertIcon from "@mui/icons-material/MoreVert";

// style
import "./styles.css";

function Table({ data, viewmode, toggleSelect }) {
  const [dateStart, setDateStart] = useState(new Date());
  const [dateEnd, setDateEnd] = useState(new Date());

  const columns =
    viewmode === "All matters"
      ? [
          {
            title: "Matter Code",
            field: "matterCode",
            width: 230,
          },
          {
            title: "Matter Name",
            field: "matterName",
            width: 230,
          },
        ]
      : [
          {
            title: "Matter",
            field: "matterName",
            render: (rowData) => (
              <div>
                <div className="primary-font">{rowData.matterName}</div>
                <div style={{ fontSize: 8 }} className="primary-font">
                  {rowData.matterCode}
                </div>
              </div>
            ),
            width: 110,
          },
          {
            title: "Description",
            field: "description",
          },
          {
            title: "Duration",
            field: "duration",
            type: "numeric",
            align: "left",
            width: 70,
          },
          {
            title: "Date",
            field: "date",
            render: (rowData) => {
              return moment(rowData.date).format("DD/MM/YYYY");
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

  return (
    <div style={{ height: 500, width: "95%", fontSize: 14 }}>
      <MaterialTable
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
      />
    </div>
  );
}

export default Table;
