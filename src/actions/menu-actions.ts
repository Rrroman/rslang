const TOP_MENU_STATUS = 'TOP_MENU_STATUS';
const BOTTOM_MENU_STATUS = 'BOTTOM_MENU_STATUS';
const LEVEL_VISIBILITY_STATUS = 'LEVEL_VISIBILITY_STATUS';

const setLevelVisibility = (value: boolean) => ({
  type: LEVEL_VISIBILITY_STATUS,
  payload: value,
});

const topMenuOpen = (value: boolean) => ({
  type: TOP_MENU_STATUS,
  payload: value,
});

const bottomMenuOpen = (value: boolean) => ({
  type: BOTTOM_MENU_STATUS,
  payload: value,
});

export type MenuOpenActionType = {
  type: string;
  payload: boolean;
};

export {
  topMenuOpen,
  bottomMenuOpen,
  setLevelVisibility,
  TOP_MENU_STATUS,
  BOTTOM_MENU_STATUS,
  LEVEL_VISIBILITY_STATUS,
};
