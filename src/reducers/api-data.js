import _sortBy from "lodash/sortBy";

export const user = (state = {}, action) => {
  switch (action.type) {
    case "ADD_USER_DATA":
      return action.payload;
    default:
      return state;
  }
};

export const messages = (state = [], action) => {
  switch (action.type) {
    case "ADD_MESSAGE_LOG":
      if (action.payload && action.payload.messages) {
        return action.payload.messages.reverse();
      } else {
        return [];
      }
    default:
      return state;
  }
};

// store all userMonths for active league
export const userMonthsData = (state = [], action) => {
  switch (action.type) {
    case "ADD_USER_MONTH_DATA":
      return action.payload;
    case "SEND_PREDICTION_SUCCESS":
      return state.map(
        userMonth =>
          userMonth._id === action.payload._id ? action.payload : userMonth
      );
    default:
      return state;
  }
};

export const gamesByDay = (state = [], action) => {
  switch (action.type) {
    case "ADD_GAME_DATA":
      return _sortBy(action.payload, [
        function(obj) {
          return obj.date;
        }
      ]);
    default:
      return state;
  }
};

export const standingsData = (state = [], action) => {
  switch (action.type) {
    case "ADD_STANDINGS_DATA":
      return _sortBy(action.payload, [
        function(obj) {
          return obj.standingsData.winCount;
        }
      ]).reverse();
    default:
      return state;
  }
};
