// redux/reducers/followingReducer.js
import { SET_FOLLOWING, REMOVE_FOLLOWING } from "../type";

const initialState = {
  list: [],
};

const followingReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_FOLLOWING:
      return {
        ...state,
        list: action.payload,
      };

    case REMOVE_FOLLOWING:
      return {
        ...state,
        list: state.list.filter(
          (user) => user.username !== action.payload
        ),
      };

    default:
      return state;
  }
};

export default followingReducer;
