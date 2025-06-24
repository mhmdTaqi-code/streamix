// src/utils/notify.js
import { toast } from "react-toastify";

 const notify = (msg, type = "success") => {
  if (type === "success") toast.success(msg);
  else if (type === "error") toast.error(msg);
  else toast(msg);
};

export  default notify