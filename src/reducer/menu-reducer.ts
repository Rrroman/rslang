import {
  BOTTOM_MENU_STATUS,
  LEVEL_VISIBILITY_STATUS,
  MenuOpenActionType,
  TOP_MENU_STATUS,
} from '../actions/menu-actions';

export type MenuState = {
  topMenuIsOpen: boolean;
  bottomMenuIsOpen: boolean;
  isLevelVisible: boolean;
};

const initialState: MenuState = {
  topMenuIsOpen: false,
  bottomMenuIsOpen: false,
  isLevelVisible: true,
};
const menuReducer = (state = initialState, action: MenuOpenActionType) => {
  switch (action.type) {
    case TOP_MENU_STATUS:
      return { ...state, topMenuIsOpen: action.payload };
    case BOTTOM_MENU_STATUS:
      return { ...state, bottomMenuIsOpen: action.payload };
    case LEVEL_VISIBILITY_STATUS:
      return { ...state, isLevelVisible: action.payload };
    default:
      return state;
  }
};

export { menuReducer };
