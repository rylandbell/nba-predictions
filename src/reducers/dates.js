//format: 'YYYY-MM-DD'
export const activeDate = (state = moment().format("YYYY-MM-DD"), action) => {
  switch (action.type) {
    case "SET_ACTIVE_DATE":
      return action.date;
    default:
      return state;
  }
};

//format: 'YYYY-MM'
export const activeMonth = (state = moment().format("YYYY-MM"), action) => {
  switch (action.type) {
    case "SET_ACTIVE_DATE":
      return action.date.substring(0, 7);
    case "SET_ACTIVE_MONTH":
      return action.month;
    default:
      return state;
  }
};

export const currentDate = (state = moment().format("YYYY-MM-DD")) => {
  return state;
};

export const currentMonth = (state = moment().format("YYYY-MM")) => {
  return state;
};
