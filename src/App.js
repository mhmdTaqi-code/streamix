import {Route,Routes,BrowserRouter} from "react-router-dom";
import Main from "./Pages/main/Main";

import LiveUi from "./Pages/liveui1/LiveUi";




function App() {
  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path="/streamix" element={<Main/>}/>
        <Route path="/LiveUi" element={<LiveUi/>}/>
      </Routes>
    </BrowserRouter>
    </>
  );
}
export default App;
