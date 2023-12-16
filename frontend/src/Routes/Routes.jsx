import { Route, Routes } from "react-router-dom";

import { Home } from "../components/Home/Home";
import { LoginPage }  from "../pages/Login/LoginBox/LoginBox";
import { SignUpPage } from "../pages/Login/SignUpBox/SignUpBox";

export const RoutesOfAllPages = () => {

  
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route exact path="/signup" element={<SignUpPage />} />
        <Route exact path="/login" element={<LoginPage />} />
        {/* <Route path="*" element={<ErrorPage />} /> */}
      </Routes>
    </div>
  );
};