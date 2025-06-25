import {Route,Routes,BrowserRouter} from "react-router-dom";
import Main from "./Pages/Main";
import LiveUi from "./Pages/LiveUi";
import Profile from "./Pages/Profile";




function App() {
  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path="/streamix" element={<Main/>}/>
        <Route path="/LiveUi" element={<LiveUi/>}/>
        <Route path="/profile" element={<Profile/>}/>


      </Routes>
    </BrowserRouter>
    </>
  );
}
export default App;
