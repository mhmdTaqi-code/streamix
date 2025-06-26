// themeReducer.js

// ✅ قراءة الوضع من localStorage أو تعيين "light" كافتراضي
const initialState = {
  mode: localStorage.getItem("themeMode") || "light",
};

// ✅ Reducer
const themeReducer = (state = initialState, action) => {
  switch (action.type) {
    case "TOGGLE_THEME": {
      const newMode = state.mode === "light" ? "dark" : "light";
      localStorage.setItem("themeMode", newMode); // ✅ حفظ الوضع الجديد
      return {
        ...state,
        mode: newMode,
      };
    }

    case "SET_THEME": {
      localStorage.setItem("themeMode", action.payload); // ✅ حفظ الوضع المحدد
      return {
        ...state,
        mode: action.payload,
      };
    }

    default:
      return state;
  }
};

// ✅ Action Creators
export const toggleTheme = () => ({ type: "TOGGLE_THEME" });
export const setTheme = (mode) => ({ type: "SET_THEME", payload: mode });

export default themeReducer;
