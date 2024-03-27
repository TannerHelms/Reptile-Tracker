import {
  IconCalendar,
  IconLayoutDashboard,
  IconLogout,
  IconSpider,
} from "@tabler/icons-react";
import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import classes from "../css/navbar.module.css";
import useInit from "../hooks/use_init";
import useLogout from "../hooks/use_logout";

const data = [
  { link: "/dashboard", label: "Dashboard", icon: IconLayoutDashboard },
  { link: "/reptiles", label: "Reptiles", icon: IconSpider },
  { link: "/create_schedule", label: "Schedule", icon: IconCalendar },
];

function Navbar({ close }) {
  const queryClient = useQueryClient();
  const location = useLocation();
  const { logout } = useLogout();
  const [active, setActive] = useState(location.pathname);

  const { navigate } = useInit();

  const handleSignOut = async () => {
    close();
    logout();
  };

  const links = data.map((item) => (
    <a
      className={classes.link}
      data-active={item.link === active || undefined}
      href={item.link}
      key={item.label}
      onClick={(event) => {
        event.preventDefault();
        setActive(item.link);
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
