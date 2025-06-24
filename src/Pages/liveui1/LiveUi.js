import Header from "../../components/header/Header"
import Sidebar from '../../components/sidebar/Sidebar';
import StreamChat from "../../components/streamchat/StreamChat";
import StreamerProfile from "../../components/streamerprofile/StreamerProfile";

export default function LiveUi() {
  return (
<>
    <Header></Header>
  <Sidebar></Sidebar >
  <StreamChat></StreamChat>
  <StreamerProfile></StreamerProfile>
    </>
  )
}