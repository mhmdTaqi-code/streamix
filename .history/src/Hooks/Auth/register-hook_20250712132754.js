// File: src/Hooks/Auth/register-hook.js
import { useState } from "react";
import notify from "../../utils/notify";
import Baseurl from "../../Api/BaceUrl";

const useRegisterHook = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const onChangeName = (e) => setName(e.target.value);
  const onChangeEmail = (e) => setEmail(e.target.value);
  const onChangePassword = (e) => setPassword(e.target.value);

  const validationValues = () => {
    if (name.trim() === "") {
      notify("من فضلك ادخل اسم المستخدم", "error");
      return false;
    }
    if (email.trim() === "") {
      notify("من فضلك ادخل البريد الإلكتروني", "error");
      return false;
    }
    if (password.length < 6) {
      notify("كلمة المرور يجب أن تكون على الأقل 6 أحرف", "error");
      return false;
    }
    return true;
  };

  const onSubmit = async () => {
    const isValid = validationValues();
    if (!isValid) return false;

    setLoading(true);
    try {
      const res = await Baseurl.post("/api/register/", {
        username: name,
        email,
        password,
      });

      console.log("📦 Response from server:", res.data);

      const data = res.data;

      const access = data.access || data.token || data.tokens?.access;
      const refresh = data.refresh || data.tokens?.refresh;
      const username = data.username || data.user?.username || name;
      const userEmail = data.email || data.user?.email || email;

      if (access) localStorage.setItem("accessToken", access);
      if (refresh) localStorage.setItem("refreshToken", refresh);
      if (username) localStorage.setItem("username", username);
      if (userEmail) localStorage.setItem("email", userEmail);

      // ✅ تحديث حالة الضيف
      localStorage.setItem("isGuest", "false");

      notify("تم التسجيل بنجاح", "success");
      setLoading(false);
      return true;
    } catch (err) {
      console.error("Register Error:", err);
      const msg =
        err.response?.data?.message ||
        err.response?.data?.error ||
        err.response?.data?.detail ||
        "فشل في التسجيل";
      notify(msg, "error");
      setLoading(false);
      return false;
    }
  };

  return {
    name,
    email,
    password,
    loading,
    onChangeName,
    onChangeEmail,
    onChangePassword,
    onSubmit,
  };
};

export default useRegisterHook;
