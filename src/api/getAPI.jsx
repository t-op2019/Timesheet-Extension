const getAPI = () => {
  return {
    allTimesheets: `timesheets/user`,
    matters: `matter/user`,
    matterNames: `matterName`,
    matterCodes: `getMatterCode`,
  };
};

export default getAPI;
