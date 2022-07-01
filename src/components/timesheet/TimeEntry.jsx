import React, { useState } from "react";

// components
import TimePicker from "rc-time-picker";

// styles
import "rc-time-picker/assets/index.css";
import moment from "moment";

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
    date: moment(new Date()).format("yyyy-mm-DD"),
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
      date: date.target.value,
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
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        {/* calendar input */}
        <input
          value={data.date}
          type="date"
          className="input"
          style={{ width: "50%" }}
          onChange={onChangeDate}
        />
        {/* duration input */}
        <TimePicker
          value={selectedValue}
          className="input"
          allowEmpty={false}
          showHour={false}
          style={{ width: "25%" }}
          onChange={onChangeTimePicker}
        />
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
        value={suggestionState.value}
        type="text"
        placeholder="Matter name"
        className="input"
        onChange={onChangeMatterName}
        // onBlur={changeBlur}
        // onFocus={changeBlur}
      />
      {/* description input */}
      <textarea
        value={data.description}
        type="text"
        placeholder="Description"
        className="input"
        onChange={onChangeDescription}
      />

      <div
        style={{
          width: "100%",
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <a className="button active" style={{ width: "40%" }} onClick={saveNew}>
          Save & New
        </a>
        <a
          className="button active"
          style={{ width: "40%" }}
          onClick={saveDuplicate}
        >
          Save & Duplicate
        </a>
      </div>
    </div>
  );
}

export default TimeEntry;
