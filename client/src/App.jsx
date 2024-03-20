import { useDisclosure } from "@mantine/hooks";
import { AppShell, Burger, Group, Title } from "@mantine/core";
import { Outlet } from "react-router-dom";
import useCurrentUser from "./hooks/use_User";
import Navbar from "./componets/navbar";
import { useState } from "react";

const App = () => {
  const currentUser = useCurrentUser();
  const [page, setPage] = useState("Dashboard");
  const [opened, { toggle }] = useDisclosure();

  return (
    <>
      {!currentUser.user ? (
        <Outlet />
      ) : (
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
              <Burger
                opened={opened}
                onClick={toggle}
                size="lg"
                hiddenFrom="sm"
              />
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
      )}
    </>
  );
};

export default App;
