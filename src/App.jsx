import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from './Components/Pages/Login.jsx';
import Register from './Components/Pages/Register.jsx';
import ChangePass from './Components/Pages/ForgotPassword.jsx';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Login />}/>
        <Route path="register" element={<Register />}/>
        <Route path="forgotpassword" element={<ChangePass />}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
