export const enteredChatText = (state = "", action) => {
  switch (action.type) {
    case "CHAT_TEXT_ENTRY":
      return action.enteredChatText;
    case "SEND_MESSAGE_PENDING":
      return "";
    default:
      return state;
  }
};

export const enteredLeagueName = (state = "", action) => {
  switch (action.type) {
    case "LEAGE_NAME_ENTRY":
      return action.payload;
    case "CREATE_LEAGUE_PENDING":
      return "";
    default:
      return state;
  }
};

export const enteredJoinPhrase = (state = "", action) => {
  switch (action.type) {
    case "LEAGUE_ID_ENTRY":
      return action.payload;
    case "JOIN_LEAGUE_PENDING":
      return "";
    default:
      return state;
  }
};

export const showDashboardTour = (state = false, action) => {
  switch (action.type) {
    case "ENABLE_DASHBOARD_TOUR":
      return true;
    case "DISABLE_DASHBOARD_TOUR":
      return false;
    default:
      return state;
  }
};

export const showPicksTour = (state = false, action) => {
  switch (action.type) {
    case "ENABLE_PICKS_TOUR":
      return true;
    case "DISABLE_PICKS_TOUR":
      return false;
    default:
      return state;
  }
};
