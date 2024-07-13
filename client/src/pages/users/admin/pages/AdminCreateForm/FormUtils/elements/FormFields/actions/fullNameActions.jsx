// actions/fullNameActions.js
import { SET_FULL_NAME_DATA } from './types';

export const setFullNameData = (fullName, componentName) => ({
  type: SET_FULL_NAME_DATA,
  payload: {
    title: fullName,
    type: componentName,
  },
});
