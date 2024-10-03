import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import { ToastContainer } from 'react-toastify';
import Home from "./Components/Pages/Home";
import Legal from "./Components/Customer/Home/Legal/Legal";
import NotFound from "./Components/Customer/Home/NotFound/NotFound";
import Appointment from "./Components/Customer/Appointment/Appointment";
import { LanguageProvider } from './Config/LanguageContext';
import Auth from './Components/Customer/Login/Login';
// import Auth from './Components/Customer/Auth/Auth';

function App() {
  return (
    <LanguageProvider>
      <div className="App">
        <ToastContainer />
        <Router basename="/an-tam">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Auth />} />
            <Route path="/legal" element={<Legal />} />
            <Route path="/appointment" element={<Appointment />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Router>
      </div>
    </LanguageProvider>
  );
}

export default App;
