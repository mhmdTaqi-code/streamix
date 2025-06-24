// File: src/Hooks/Auth/useLoginHook.js
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import notify from "../../utils/notify";
import Baseurl from "../../Api/BaceUrl";

const useLoginHook = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onChangeEmail = (e) => setUsername(e.target.value);
  const onChangePassword = (e) => setPassword(e.target.value);

  const onSubmit = async () => {
    if (!username || !password) {
      notify("يرجى إدخال اسم المستخدم وكلمة المرور", "error");
      return;
    }

    setLoading(true); // بدأ التحميل
    try {
      const res = await Baseurl.post(
        "https://devhunter123.pythonanywhere.com/api/login/",
        { username, password },
        { headers: { "Content-Type": "application/json" } }
      );

      const accessToken = res.data.access;
      const refreshToken = res.data.refresh;

      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("refreshToken", refreshToken);

      notify("تم تسجيل الدخول بنجاح", "success");
      localStorage.setItem("username", username); 
      setTimeout(() => {
        navigate("/home");
        setLoading(false); // انتهى التحميل
      }, 1200);
    } catch (error) {
      const msg = error.response?.data?.error || "فشل تسجيل الدخول";
      notify(msg, "error");
      setLoading(false); // انتهى التحميل حتى لو فشل
    }
  };

  return {
    email: username,
    password,
    loading, 
    onChangeEmail,
    onChangePassword,
    onSubmit,
  };
};

export default useLoginHook;
