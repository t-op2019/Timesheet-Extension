import React from "react";
import { DataGrid } from "@mui/x-data-grid";

function Table({ data, columns }) {
  return (
    <div style={{ height: 500, width: "95%", fontSize: 12 }}>
      <DataGrid
        rows={data}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
      />
    </div>
  );
}

export default Table;
