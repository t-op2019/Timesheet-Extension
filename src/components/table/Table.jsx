import React, { useState } from "react";
import moment from "moment";

// components
import { DataGrid } from "@mui/x-data-grid";

// icons
import MoreVertIcon from "@mui/icons-material/MoreVert";

// style
import "./styles.css";

function Table({ data, viewmode, matterPairs, toggle, deleteTimesheet }) {
  const [selections, setSelections] = useState([]);

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
            headerName: "Matter",
            field: "matterName",
            width: 150,
            renderCell: (param) => {
              if (param.value == null) {
                return "";
              }

              return (
                <div>
                  <div className="primary-font">{param.value}</div>
                  <div style={{ fontSize: 10 }} className="primary-font">
                    {matterPairs[param.value]}
                  </div>
                </div>
              );
            },
          },
          {
            headerName: "Description",
            field: "description",
            width: 200,
          },
          {
            headerName: "Duration",
            field: "duration",
            width: 70,
          },
          {
            headerName: "Date",
            field: "date",
            width: 100,
            valueFormatter: (param) => {
              if (param.value == null) {
                return "";
              }

              return moment(param.value).format("DD/MM/YYYY");
            },
          },
          {
            headerName: "",
            field: "id",
            width: 5,
            renderCell: RenderActions,
          },
        ];

  const onSelectionChange = (selection) => {
    setSelections(selection);
  };

  return (
    <div style={{ height: 500, width: "95%", fontSize: 12 }}>
      <DataGrid
        rows={data}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        getRowHeight={() => "auto"}
        // checkboxSelection
        // selectionModel={selections}
        // onSelectionModelChange={onSelectionChange}
      />
    </div>
  );
}

export default Table;
