import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import Hotel from "./pages/hotelpage/Hotel";
import Signup from "./pages/createAccount/Signup";
import Login from "./pages/createAccount/Login";
import SingleHotel from "./pages/singleHotel/SingleHotel";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/hotellist" element={<Hotel />} />
        <Route
          path="/hotellist/singlehotel/:hotelId"
          element={<SingleHotel />}
        />
        <Route path="/register" element={<Signup />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
