import { useState } from "react";
import { Group, Code } from "@mantine/core";
import {
  IconBellRinging,
  IconFingerprint,
  IconKey,
  IconSettings,
  Icon2fa,
  IconDatabaseImport,
  IconReceipt2,
  IconSwitchHorizontal,
  IconLogout,
  IconDashboard,
  IconPaperclip,
} from "@tabler/icons-react";
import classes from "../css/navbar.module.css";
import { useNavigate } from "react-router-dom";
import useCurrentUser from "../hooks/use_User";

const data = [
  { link: "/", label: "Dashboard", icon: IconDashboard },
  { link: "/reptile", label: "Reptile", icon: IconPaperclip },
];

function Navbar({ setPage, close }) {
  const [active, setActive] = useState("Dashboard");
  const navigate = useNavigate();
  const user = useCurrentUser();

  const handleSignOut = () => {
    close();
    window.localStorage.removeItem("jwt");
    user.updateUser(null);
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
