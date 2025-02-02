import { ActionType } from "../actions/actionTypes";

const initialState = {
  title: "",
  showSidebarCategories: false,
  showSidebarMenu: false,
  isLoading: false,
  showSearchArea: true,
  showOrHideDropdownCart: false,
  showSidebarFilter: false,
};

const primaryReducer = (state = initialState, action) => {
  switch (action.type) {
    // show sidebar categories
    case ActionType.SHOW_SIDEBAR_CATEGORIES:
      return {
        ...state,
        showSidebarCategories: action.payload,
      };

    // show sidebar menu
    case ActionType.SHOW_SIDEBAR_MENU:
      return {
        ...state,
        showSidebarMenu: action.payload,
      };

    // change isLoading value
    case ActionType.IS_LOADING:
      return {
        ...state,
        isLoading: action.payload,
      };

    // get title
    case ActionType.GET_TITLE:
      return {
        ...initialState,
        title: action.payload,
      };

    // show search area
    case ActionType.SHOW_SEARCH_AREA:
      return {
        ...state,
        showSearchArea: action.payload,
      };

    // show or hide dropdown cart
    case ActionType.SHOW_OR_HIDE_DROPDOWNCART:
      return {
        ...state,
        showOrHideDropdownCart: !state.showOrHideDropdownCart,
      };

    // show sidebar filter
    case ActionType.SHOW_SIDEBAR_FILTER:
      return {
        ...state,
        showSidebarFilter: action.payload,
      };

    default:
      return state;
  }
};

export default primaryReducer;
