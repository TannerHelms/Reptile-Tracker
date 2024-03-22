import { AppShell, Burger, Title } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { Outlet, useLocation } from "react-router-dom";
import Navbar from "./componets/navbar";
import useAuth from "./hooks/use_auth";
import { useState } from "react";

const App = () => {
  const { user } = useAuth(false);
  const [opened, { toggle }] = useDisclosure();
  const page = useLocation().pathname.substring(1);
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
            {page.charAt(0).toUpperCase() + page.slice(1)}
          </Title>
        </div>
      </AppShell.Header>
      <AppShell.Navbar>
        <Navbar close={toggle} />
      </AppShell.Navbar>
      <AppShell.Main>
        <Outlet />
      </AppShell.Main>
    </AppShell>
  );
};

export default App;
