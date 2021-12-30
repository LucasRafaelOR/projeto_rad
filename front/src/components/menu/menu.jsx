import * as React from "react";
import "./menu.css";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { isLoggedIn, logout } from "../../services/AuthService";

const Menu = () => {
  const location = useLocation();
  const [isLogged, setIsLogged] = React.useState(false);
  const navigate = useNavigate();

  React.useEffect(() => {
    setIsLogged(isLoggedIn());
  }, [location]);

  const handleLogout = () => {
    console.log("logout");
    setIsLogged(false);
    logout();
  };

  return (
    <div className="menu_container">
      {isLogged ? (
        <div className="menu">
          <Link to="/tasks">Tasks</Link>
          <Link to="/users">Usuarios</Link>
          <Link to="/perfil">Meu Perfil</Link>
          <Link to="/login" onClick={handleLogout}>
            Logout
          </Link>
        </div>
      ) : (
        <div className="menu">
          <a href="/login">Log In / Register</a>
        </div>
      )}
    </div>
  );
};

export default Menu;
