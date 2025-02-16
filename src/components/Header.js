import { useState } from "react";
import { LOGO_URL } from "../utils/constant";
import { Link } from "react-router-dom";

const Header = () => {
  const [btChange, setBtChange] = useState("Login");

  return (
    <div className="header">
      <div className="logo-container">
        <img className="logo" src={LOGO_URL} />
      </div>
      <div className="nav-items">
        <ul>
          <li>
            <Link to={"/"}>Home</Link>
          </li>
          <li>
            <Link to={"/about"}>ContactUs</Link>
          </li>
          <li>
            <Link to={"/contact"}>AboutUs</Link>
          </li>
          <li>Cart</li>
          <button
            onClick={() => {
              btChange == "Login"
                ? setBtChange("Logout")
                : setBtChange("Login");
            }}
            className="login">
            {btChange}
          </button>
        </ul>
      </div>
    </div>
  );
};

export default Header;
