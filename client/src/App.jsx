import { AppShell, Burger, Title } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useState } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./componets/navbar";
import useAuth from "./hooks/use_auth";

const App = () => {
  const { user } = useAuth(false);
  console.log(user);
  const [page, setPage] = useState("Dashboard");
  const [opened, { toggle }] = useDisclosure();

  if (!user) {
    return <Outlet />;
  }

  return (
    <AppShell
      header={{ height: 60 }}
      navbar={{
        width: 300,
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
            {page}
          </Title>
        </div>
      </AppShell.Header>
      <AppShell.Navbar>
        <Navbar setPage={(link) => setPage(link)} close={toggle} />
      </AppShell.Navbar>
      <AppShell.Main>
        <Outlet />
      </AppShell.Main>
    </AppShell>
  );
};

export default App;
