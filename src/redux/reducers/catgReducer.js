import { GetALLCatg } from "../type";

const init = {
  catg: [],
  isLoding: true,
};

const CatgReducer = (state = init, action) => {
  switch (action.type) {
    case GetALLCatg:
      return {
        ...state,
        catg: action.payload,
        isLoding: false,
      };
    default:
      return state;
  }
};

export default CatgReducer;
