import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from './Components/Pages/Login.jsx';
import Register from './Components/Pages/Register.jsx';
import Password from './Components/Pages/ForgotPassword.jsx';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Login />}/>
        <Route Path="register" element={<Register />}/>
        <Route Path="forgotpassword" element={<Password />}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
