import { BrowserRouter, Route, Routes } from "react-router-dom"
import APOD from "./pages/APOD"
import SignUp from "./pages/SignUp"
import SignIn from "./pages/SignIn"
import Header from "./components/Header"
import Earth from "./pages/Earth"
import Mars from "./pages/Mars"


function App() {
  
  return(
    <BrowserRouter>
    <Header/>
      <Routes>
        <Route path="/" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/apod" element={< APOD/>} />
        <Route path="/earth" element={<Earth />} />
        <Route path="/mars" element={<Mars/>}/>
      </Routes>
    </BrowserRouter>
  )
  
}

export default App
