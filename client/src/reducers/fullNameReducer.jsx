// fullNameReducer.js
import { SET_FULL_NAME_DATA } from '../pages/users/admin/pages/AdminCreateForm/FormUtils/elements/FormFields/actions/types';

// fullNameReducer.js

const initialState = {
  fullNameData: [],
};

export default function(state = initialState, action) {
  switch (action.type) {
    case SET_FULL_NAME_DATA:
      return {
        ...state,
        fullNameData: [...state.fullNameData, action.payload],
      };
    default:
      return state;
  }
}

