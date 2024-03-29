import { AppShell, Burger, Title } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useSelector } from "react-redux";
import { Outlet, useLocation } from "react-router-dom";
import Navbar from "./componets/navbar";
import { nav } from "./store/navbar_slice";

// todo: check if route is on a auth page or not

const App = () => {
  const location = useLocation().pathname.split("/")[1];
  const navbar = useSelector(nav);
  const [opened, { toggle }] = useDisclosure();
  const page = useLocation().pathname.substring(1);

  if (!navbar) {
    return <Outlet />;
  }

  return (
    <AppShell
      header={{ height: 60 }}
      navbar={{
        width: 200,
        breakpoint: "sm",
        collapsed: { mobile: !opened },
      }}
      main={{ padding: 20 }}
      padding="md"
    >
      <AppShell.Header p={5}>
        <div className="float-start ">
          <Burger opened={opened} onClick={toggle} size="lg" hiddenFrom="sm" />
        </div>
        <div className="fixed inset-x-0 -z-10">
          <Title order={1} ta="center">
            {
              (page.charAt(0).toUpperCase() + page.slice(1))
                .replace("_", " ")
                .split("/")[0]
            }
          </Title>
        </div>
      </AppShell.Header>
      <AppShell.Navbar>
        <Navbar close={toggle} active={location} />
      </AppShell.Navbar>
      <AppShell.Main>
        <Outlet />
      </AppShell.Main>
    </AppShell>
  );
};

export default App;
