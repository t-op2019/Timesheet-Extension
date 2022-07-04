import React from "react";

function ButtonGroup({ viewmode, setViewmode, editmode }) {
  const buttons = ["Time entry", "All timesheets", "All matters"];

  return (
    <div className="buttons-container">
      {buttons.map((button, index) => {
        return (
          <a
            key={index}
            onClick={() => setViewmode(button)}
            className={`button ${viewmode === button && "active"} shadow`}
            style={{ gridArea: `button-${index}` }}
          >
            {button}
          </a>
        );
      })}
    </div>
  );
}

export default ButtonGroup;
