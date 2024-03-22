import { IconDashboard, IconLogout, IconPaperclip } from "@tabler/icons-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import classes from "../css/navbar.module.css";
import useAuth from "../hooks/use_auth";
import { useDispatch } from "react-redux";
import { logout } from "../store/auth_slice";

const data = [
  { link: "/", label: "Dashboard", icon: IconDashboard },
  { link: "/reptile", label: "Reptile", icon: IconPaperclip },
];

function Navbar({ setPage, close }) {
  const [active, setActive] = useState("Dashboard");
  const navigate = useNavigate();
  const { user } = useAuth();
  const dispatch = useDispatch();

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
        setPage(item.label);
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
        <a
          href="#"
          className={classes.link}
          onClick={(event) => event.preventDefault()}
        >
          <IconLogout className={classes.linkIcon} stroke={1.5} />
          <span onClick={handleSignOut}>Logout</span>
        </a>
      </div>
    </nav>
  );
}
export default Navbar;
