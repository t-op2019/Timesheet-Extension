import React, { useState, useEffect } from "react";

// components
import ButtonGroup from "./ButtonGroup";
import TimeEntry from "./TimeEntry";
import Table from "../table/Table";

// styles
import "./styles.css";

// api
import AxiosInstance from "../../utils/axios";
import { getAPI, postAPI, deleteAPI } from "../../api";
import axiosInstance from "../../utils/axios";

function Timesheet() {
  const dateIndex = [6, 0, 1, 2, 3, 4, 5];

  const [editmode, setEditmode] = useState(false);
  const [viewmode, setViewmode] = useState("Time entry");
  const [toggleEdit, setToggleEdit] = useState(false);
  const [timesheets, setTimesheets] = useState([]);
  const [allTimesheets, setAllTimesheets] = useState([]);
  const [userMatters, setUserMatters] = useState([]);
  const [matterPairs, setMatterPairs] = useState({});
  const [matterNames, setMatterNames] = useState([]);

  const data =
    viewmode === "Time entry"
      ? timesheets
      : viewmode === "All timesheets"
      ? allTimesheets
      : userMatters;

  useEffect(() => {
    fetch();

    const currentDate = new Date();
    // get start date of last week
    const firstDate =
      currentDate.getDate() - dateIndex[currentDate.getDay()] - 7;
    // get current date
    const lastDate = currentDate.getDate();

    const dateStart = new Date(currentDate.setDate(firstDate));
    const dateEnd = new Date(currentDate.setDate(lastDate));
    const firstDay = dateStart.getDate();
    const lastDay = dateEnd.getDate();

    if (firstDay > lastDay) {
      dateEnd.setMonth(dateEnd.getMonth() + 1);
    }

    dateRangeSearch(dateStart, dateEnd);
  }, []);

  const fetch = async () => {
    try {
      const resName = await AxiosInstance.get(getAPI().matterNames);
      const names = resName.data.matterName;
      // console.log(names);
      const resCode = await AxiosInstance.get(getAPI().matterCodes);
      const codes = resCode.data.matterCode;
      setMatterNames(names);
      let pairs = {};
      names?.map((name, index) => {
        pairs[name] = codes[index];
      });
      setMatterPairs(pairs);
    } catch (err) {
      console.log(err);
    }
  };

  const dateRangeSearch = async (date1, date2) => {
    const newDate1 = new Date(
      date1.getFullYear(),
      date1.getMonth(),
      date1.getDate(),
      0,
      0,
      0
    );
    const newDate2 = new Date(
      date2.getFullYear(),
      date2.getMonth(),
      date2.getDate(),
      23,
      59,
      59
    );

    try {
      const res = await axiosInstance.post(postAPI().searchTimesheets, {
        date1: newDate1,
        date2: newDate2,
        query: "",
      });
      const timesheets = res.data.timesheets.map((timesheet) => {
        let temp = { ...timesheet };
        temp.id = timesheet._id;
        return temp;
      });
      if (viewmode === "Time entry") {
        setTimesheets(timesheets);
      } else if (viewmode === "All timesheets") {
        setAllTimesheets(timesheets);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const createTimesheet = async (data) => {
    try {
      const res = await axiosInstance.post(postAPI().createTimesheet, data);
      let timesheet = res.data.timesheet;
      timesheet.id = timesheet._id;
      setTimesheets([res.data.timesheet, ...timesheets]);
      setAllTimesheets([res.data.timesheet, ...allTimesheets]);
    } catch (err) {
      console.log(err);
    }
  };

  const deleteTimesheet = async (id) => {
    try {
      const idArr = [id];
      await axiosInstance.delete(deleteAPI().deleteTimesheets, {
        data: { arrayTimesheets: idArr },
      });

      const newTimesheets = timesheets.filter(
        (timesheet) => timesheet._id !== id
      );
      setTimesheets(newTimesheets);

      const newAllTimesheets = allTimesheets.filter(
        (timesheet) => timesheet._id !== id
      );
      setAllTimesheets(newAllTimesheets);
    } catch (err) {
      console.log(err);
    }
  };

  const toggle = () => {
    setToggleEdit(!toggleEdit);
  };

  return (
    <div className="container">
      <div className="title-container">Time Entry</div>

      {!editmode && (
        <ButtonGroup viewmode={viewmode} setViewmode={setViewmode} />
      )}

      {viewmode === "Time entry" && (
        <TimeEntry
          matterNames={matterNames}
          matterPairs={matterPairs}
          createTimesheet={createTimesheet}
        />
      )}

      {!editmode && (
        <Table
          data={data}
          viewmode={viewmode}
          matterPairs={matterPairs}
          toggle={toggle}
          deleteTimesheet={deleteTimesheet}
        />
      )}
    </div>
  );
}

export default Timesheet;
