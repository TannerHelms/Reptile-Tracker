import {
  IconLayoutDashboard,
  IconLogout,
  IconSpider,
} from "@tabler/icons-react";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import classes from "../css/navbar.module.css";
import useInit from "../hooks/use_init";
import { logout } from "../store/auth_slice";

const data = [
  { link: "/dashboard", label: "Dashboard", icon: IconLayoutDashboard },
  { link: "/reptile", label: "Reptile", icon: IconSpider },
];

function Navbar({ close }) {
  const location = useLocation();
  const [active, setActive] = useState(
    location.pathname.substring(1).charAt(0).toUpperCase() +
      location.pathname.slice(2).replace("_", " ")
  );
  const { navigate, dispatch } = useInit();

  const handleSignOut = () => {
    close();
    window.localStorage.removeItem("jwt");
    dispatch(logout());
    navigate("/login");
  };

  const links = data.map((item) => (
    <a
      className={classes.link}
      data-active={item.label === active || undefined}
      href={item.link}
      key={item.label}
      onClick={(event) => {
        event.preventDefault();
        setActive(item.label);
        navigate(item.link);
        close();
      }}
    >
      <item.icon className={classes.linkIcon} stroke={1.5} />
      <span>{item.label}</span>
    </a>
  ));

  return (
    <nav className={classes.navbar}>
      <div className={classes.navbarMain}>{links}</div>
      <div className={classes.footer}>
        <a href="#" className={classes.link} onClick={handleSignOut}>
          <IconLogout className={classes.linkIcon} stroke={1.5} />
          <span>Logout</span>
        </a>
      </div>
    </nav>
  );
}
export default Navbar;
