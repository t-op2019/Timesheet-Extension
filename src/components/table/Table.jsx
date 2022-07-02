import React, { useState } from "react";
import moment from "moment";

// components
import MaterialTable, { MTableToolbar } from "@material-table/core";

// icons
import MoreVertIcon from "@mui/icons-material/MoreVert";

// style
import "./styles.css";

function Table({ data, viewmode, matterPairs, toggle, deleteTimesheet }) {
  const [selections, setSelections] = useState([]);
  const [dateStart, setDateStart] = useState(new Date());
  const [dateEnd, setDateEnd] = useState(new Date());

  function RenderActions(param) {
    const [showActions, setShowActions] = useState(false);

    const toggleActions = () => {
      setShowActions(!showActions);
    };

    const handleEdit = () => {
      toggle();
      toggleActions();
    };

    const handleDelete = () => {
      deleteTimesheet(param.value);
      toggleActions();
    };

    return (
      <div>
        <a className="switch" onClick={toggleActions}>
          <MoreVertIcon />
        </a>
        {showActions && (
          <div className="option-container">
            <a className="option" onClick={handleEdit}>
              Edit
            </a>
            <a className="option" onClick={handleDelete}>
              Delete
            </a>
          </div>
        )}
      </div>
    );
  }

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

  const onSelectionChange = (selection) => {
    setSelections(selection);
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
        options={{
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
        }}
        onRowClick={(event, rowData) => {
          console.log("rowData", rowData);
        }}
        components={{
          Pagination: (props) => {
            // let hour = 0;
            // let minute = 0;
            // // if viewmode is entry mode, calculate duration with timesheets state
            // // else, caculate with all timesheets
            // for (let i = 0; i < data.length; i++) {
            //   hour += Number(timesheets[i].duration.slice(0, 2));
            //   if (minute + Number(timesheets[i].duration.slice(3)) >= 60) {
            //     hour += 1;
            //     minute = minute + Number(timesheets[i].duration.slice(3)) - 60;
            //   } else {
            //     minute += Number(timesheets[i].duration.slice(3));
            //   }
            // }
            // return (
            //   <>
            //     {viewmode === "matter" ? null : (
            //       <div
            //         style={{
            //           backgroundColor: "#eee",
            //           padding: 15,
            //           fontSize: 14,
            //           fontWeight: "bold",
            //         }}
            //         className="d-flex flex-row primary-font justify-content-between"
            //       >
            //         <div>
            //           {`Total: ${hour < 10 ? "0" : ""}${hour}:${
            //             minute < 10 ? "0" : ""
            //           }${minute}`}
            //         </div>
            //         {viewmode === "timesheet" ? null : (
            //           <div
            //             className="d-flex flex-column"
            //             style={{
            //               color: hour < 30 || valid ? "#ca3636" : "green",
            //             }}
            //           >
            //             {hour < 30 ? "At least 30 hours/week \n" : "\n"}
            //             {valid ? "KM/BD & PR exceeded 25% total duration" : ""}
            //           </div>
            //         )}
            //       </div>
            //     )}
            //     <TablePagination {...props} />
            //   </>
            // );
          },
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
