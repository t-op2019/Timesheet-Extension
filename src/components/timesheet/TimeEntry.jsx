import React, { useState } from "react";

// components
import TimePicker from "rc-time-picker";
import DatePicker from "react-datepicker";
import TextareaAutosize from "react-textarea-autosize";
import "rc-time-picker/assets/index.css";
import moment from "moment";
import "react-datepicker/dist/react-datepicker.css";

import AddCircleIcon from "@mui/icons-material/AddCircle";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";

function TimeEntry({ matterNames, matterPairs, createTimesheet }) {
  // const role = JSON.parse(localStorage.getItem("user")).role;
  const [selectedValue, setSelectedValue] = useState(
    moment("Thu Dec 30 2021 00:00:00 GMT+0700")
  );

  const [data, setData] = useState({
    matterCode: "",
    matterName: "",
    description: "",
    duration: "00:00",
    date: new Date(),
  });

  const [suggestionState, setSuggestionState] = useState({
    value: data.matterName,
    suggestions: [],
  });

  const [isBlurred, setIsBlurred] = useState(true);

  const onChangeTimePicker = (value) => {
    if (true) {
      if (value.format("mm") == 3) {
        setData((prevState) => ({
          ...prevState,
          duration: value.format("03:00"),
        }));
        setSelectedValue(moment("Thu Dec 30 2021 00:03:00 GMT+0700"));
      } else if (value.format("mm") > 3) {
        alert("You cannot choose duration value bigger than 3");
      } else {
        setData((prevState) => ({
          ...prevState,
          duration: value.format("mm:ss"),
        }));
        setSelectedValue(moment(value));
      }
    } else {
      setData((prevState) => ({
        ...prevState,
        duration: value.format("mm:ss"),
      }));
      setSelectedValue(moment(value));
    }
  };

  const onChangeDate = (date) => {
    // console.log(moment(new Date()).format("yyyy-mm-DD"));
    setData((prevState) => ({
      ...prevState,
      date,
    }));
  };

  const getSuggestions = (value) => {
    const inputValue = value.trim().toLowerCase();
    const inputLength = inputValue.length;

    return inputLength === 0
      ? []
      : matterNames?.filter((matterName) => {
          const regex = new RegExp(`${value}`, "gi");
          return matterName.match(regex);
        });
  };

  const onChangeMatterName = (e) => {
    const value = e.target.value;
    setSuggestionState({
      value: value,
      suggestions: getSuggestions(value),
    });
  };

  const onClick = (suggestion) => {
    console.log(suggestion);
    console.log(matterPairs[suggestion]);
    setData((prevState) => ({
      ...prevState,
      matterName: suggestion,
      matterCode: matterPairs[suggestion],
    }));
    setSuggestionState({
      value: suggestion,
      suggestions: [],
    });
  };

  const changeBlur = () => {
    setIsBlurred(!isBlurred);
  };

  const onChangeDescription = (e) => {
    const value = e.target.value;
    setData((prevState) => ({
      ...prevState,
      description: value,
    }));
  };

  const handleKeyPress = (e) => {
    const { key } = e;
    if (key === "Enter") {
      saveNew();
    }
  };

  const saveNew = () => {
    createTimesheet(data);
    setData({
      matterCode: "",
      matterName: "",
      description: "",
      duration: "00:00",
      date: moment(new Date()).format("yyyy-mm-DD"),
    });
    setSelectedValue(moment("Thu Dec 30 2021 00:00:00 GMT+0700"));
    setSuggestionState({
      value: "",
      suggestions: [],
    });
  };

  const saveDuplicate = () => {
    createTimesheet(data);
  };

  return (
    <div className="entry-container">
      <div
        style={{
          width: "100%",
          marginBottom: 20,
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        {/* calendar input */}
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <span
            style={{
              fontSize: 14,
              color: "#666",
              fontWeight: "bold",
              marginRight: 10,
            }}
          >
            Date:
          </span>
          <DatePicker
            // dateFormat="DD/MM/YYYY"
            keyboardType="none"
            className="custom-input z-2"
            selected={data.date}
            onChange={(date) => onChangeDate(date)}
            onChangeRaw={onChangeDate}
            dateFormat="dd/MM/yyyy"
          />
        </div>
        {/* duration input */}
        {/* <TimePicker
          value={selectedValue}
          // className="input"
          allowEmpty={false}
          showHour={false}
          style={{ width: "25%" }}
          onChange={onChangeTimePicker}
        /> */}
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <span
            style={{
              fontSize: 14,
              color: "#666",
              fontWeight: "bold",
              marginLeft: 10,
              marginRight: 10,
            }}
          >
            Duration:
          </span>
          <div className="d-flex flex-row w-100 align-items-center">
            <div className="d-flex flex-column align-items-start primary-font custom-input">
              <TimePicker
                keyboardType="none"
                showHour={false}
                value={selectedValue}
                onChangeRaw={onChangeTimePicker}
                onChange={onChangeTimePicker}
                allowEmpty={false}
                style={{
                  fontSize: 14,
                  color: "black",
                  width: 50,
                }}
              />
            </div>
            {/* {chooseDuration ? (
              <a
                className="rounded"
                style={{
                  padding: 5,
                  marginLeft: 5,
                  backgroundColor: "#ca3636",
                }}
                onClick={() =>
                  setData((prevState) => ({
                    ...prevState,
                    duration: `${hour < 10 ? "0" : ""}${hour}:${
                      minute < 10 ? "0" : ""
                    }${minute}`,
                  }))
                }
              >
                Done
              </a>
            ) : null} */}
          </div>
        </div>
      </div>
      {/* matter name input */}
      {suggestionState.suggestions.length > 0 && (
        <div
          className="suggestion-container"
          onClick={() => setIsBlurred(false)}
        >
          {suggestionState.suggestions.map((suggestion, index) => (
            <a
              key={index}
              className="suggestion"
              onClick={() => onClick(suggestion)}
            >
              {suggestion}
            </a>
          ))}
        </div>
      )}
      <input
        style={{ marginBottom: 20 }}
        value={suggestionState.value}
        type="text"
        placeholder="Matter name"
        className="custom-input w-100"
        onChange={onChangeMatterName}
        // onBlur={changeBlur}
        // onFocus={changeBlur}
      />
      {/* description input */}
      {/* <textarea
        value={data.description}
        type="text"
        placeholder="Description"
        className="input"
        onChange={onChangeDescription}
        onKeyDown={handleKeyPress}
      /> */}
      <div
        style={{ width: "100%", marginBottom: 20 }}
        className="d-flex flex-row align-items-center justify-content-between primary-font"
      >
        <div className="d-flex flex-column align-items-start w-100">
          <TextareaAutosize
            // onBlur={() =>
            //   setData((prevState) => ({
            //     ...prevState,
            //     description: description,
            //   }))
            // }
            value={data.description}
            placeholder="Description"
            onChange={onChangeDescription}
            minRows={2}
            className="custom-input w-100 primary-font"
          />
        </div>
      </div>

      <div
        style={{
          width: "100%",
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <a
          className="button active"
          style={{
            width: "40%",
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
          }}
          onClick={saveNew}
        >
          <span
            style={{
              marginLeft: 5,
              fontSize: 14,
              fontWeight: "400",
              color: "white",
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <AddCircleIcon style={{ marginRight: 5, width: 20, height: 20 }} />
            Save & New
          </span>
        </a>
        <a
          className="button active"
          style={{ width: "40%" }}
          onClick={saveDuplicate}
        >
          <span
            style={{
              marginLeft: 5,
              fontSize: 14,
              fontWeight: "400",
              color: "white",
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <ContentCopyIcon
              style={{ marginRight: 5, width: 20, height: 20 }}
            />
            Save & Duplicate
          </span>
        </a>
      </div>
    </div>
  );
}

export default TimeEntry;
