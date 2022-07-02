const patchAPI = (id) => {
  return {
    updateTimesheet: `timesheets/${id}/update`,
  };
};

export default patchAPI;
