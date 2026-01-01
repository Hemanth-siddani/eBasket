import { NavLink, Link, useLocation } from "react-router-dom";
import { LiaOpencart } from "react-icons/lia";
import "../styles/css_for_layout/Header.css";


function Header() {
  const { pathname } = useLocation();

  let menuItems = [];

  if (pathname === "/login") {
    menuItems = [
      { name: "Dashboard", path: "/" },
      { name: "Register", path: "/register" },
    ];
  } else if (pathname === "/register") {
    menuItems = [
      { name: "Dashboard", path: "/" },
      { name: "Login", path: "/login" },
    ];
  } else if (pathname === "/") {
    menuItems = [];
  } else {
    menuItems = [
      { name: "Dashboard", path: "/" },
      { name: "Home", path: "/products_list" },
      { name: "About", path: "/about" },
      { name: "Contact", path: "/contact" },
      { name: "Register", path: "/register" },
      { name: "Login", path: "/login" },
      { name: "Cart", path: "/cart" },
    ];
  }

  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container-fluid">
        <Link to="/" className="navbar-brand fs-3 main_title_logo">
          eBasket <LiaOpencart />
        </Link>

        {menuItems.length > 0 && (
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarMenu"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
        )}

        {menuItems.length > 0 && (
          <div className="collapse navbar-collapse" id="navbarMenu">
            <ul className="navbar-nav ms-auto">
              {menuItems.map((item, index) => (
                <li className="nav-item" key={index}>
                  <NavLink to={item.path} className="nav-link">
                    {item.name}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </nav>
  );
}

export default Header;
