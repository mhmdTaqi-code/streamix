import Header from "../components/home/Header";
import Sidebar from "../components/home/Sidebar";
import StreamChat from "../components/home/StreamChat";
import StreamerProfile from "../components/home/StreamerProfile";

import { Button } from "@mui/material";

export default function LiveUi() {
  return (
    <>
      <Header></Header>
      <Sidebar></Sidebar>
      <StreamChat></StreamChat>
      <StreamerProfile></StreamerProfile>
    </>
  );
}
