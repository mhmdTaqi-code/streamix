import { GetALLCatg, GetErr } from "../type";

const init = {
  catg: [],
  isLoading: true, // ✅ تصحيح الاسم
  error: null,
};

const CatgReducer = (state = init, action) => {
  switch (action.type) {
    case GetALLCatg:
      return {
        ...state,
        catg: action.payload,
        isLoading: false,
        error: null,
      };
    case GetErr:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default CatgReducer;
