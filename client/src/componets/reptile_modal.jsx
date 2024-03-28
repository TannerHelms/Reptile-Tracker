import { Button, Select, TextInput } from "@mantine/core";
import React, { useState } from "react";
import useReptile from "../hooks/use_reptile";
import { useSetState } from "@mantine/hooks";
import { useQueryClient } from "@tanstack/react-query";
import { Container, Tabs, Text } from "@mantine/core";
import { IoCloseSharp } from "react-icons/io5";
import classes from "../css/header_tabs.module.css";
import { notifications } from "@mantine/notifications";

const tabs = ["Details", "Edit"];

export function ReptileModal({ state, close }) {
  const queryClient = useQueryClient();
  const reptile = queryClient.getQueryData(["reptile"]);
  const [newReptile, setNewReptile] = useSetState({ ...reptile });
  const { updateReptile } = useReptile();
  const [tab, setTab] = useState(state);

  const handleUpdateReptile = async () => {
    const resp = await updateReptile.mutateAsync(newReptile);
    if (resp.updatedReptile) {
      notifications.show({
        title: "Success",
        message: "Successfully updated reptile",
      });
    } else {
      notifications.show({
        title: "Error",
        message: "Failed to update reptile",
      });
    }
  };

  const handleNameChange = (e) => {
    setNewReptile({ name: e.target.value });
  };
  const handleSpeciesChange = (value, option) => {
    setNewReptile({ species: value });
  };
  const handleSexChange = (value, option) => {
    setNewReptile({ sex: value });
  };

  const handleTabChange = (value) => {
    setTab(value.currentTarget.dataset.id);
  };

  const handleClose = () => {
    queryClient.setQueryData(["reptile"], null);
    close();
  };

  if (!reptile) return null;

  return (
    <>
      <div className={classes.header}>
        <div className="flex justify-center">
          <Text fz="xl" fw={500} className="text-center ">
            {reptile.name}
          </Text>
          <p className="absolute right-4 cursor-pointer" onClick={handleClose}>
            <IoCloseSharp />
          </p>
        </div>
        <Container size="md">
          <Tabs
            defaultValue={tab || "Details"}
            variant="outline"
            classNames={{
              root: classes.tabs,
              list: classes.tabsList,
              tab: classes.tab,
            }}
          >
            <Tabs.List>
              {tabs.map((tab) => (
                <Tabs.Tab
                  data-id={tab}
                  value={tab}
                  key={tab}
                  onClick={handleTabChange}
                >
                  {tab}
                </Tabs.Tab>
              ))}
            </Tabs.List>
          </Tabs>
        </Container>
      </div>
      <div className="p-4">
        {tab === "Details" && (
          <div className="flex flex-col gap-5">
            <div className="flex justify-between">
              <p>Species</p>
              <p>{reptile.species.slice(0).replace("_", " ")}</p>
            </div>

            <div className="flex justify-between">
              <p>Sex</p>
              <p>{reptile.sex.toLocaleUpperCase()}</p>
            </div>

            <div className="flex justify-between">
              <p>CreatedAt</p>
              <p> {reptile.createdAt.split("T")[0]}</p>
            </div>

            <div className="flex justify-between">
              <p>updatedAt</p>
              <p> {reptile.updatedAt.split("T")[0]}</p>
            </div>
          </div>
        )}
        {tab === "Edit" && (
          <form className="flex flex-col gap-5">
            <TextInput
              placeholder="Name"
              defaultValue={reptile.name}
              required
              size="md"
              onChange={handleNameChange}
            />
            <Select
              data={["corn snake", "ball python", "king snake"]}
              defaultValue={reptile.species.slice(0).replace("_", " ")}
              size="md"
              onChange={handleSpeciesChange}
            />
            <Select
              data={["M", "F"]}
              defaultValue={reptile.sex.toLocaleUpperCase()}
              size="md"
              onChange={handleSexChange}
            />
            <Button fullWidth onClick={handleUpdateReptile}>
              Update
            </Button>
          </form>
        )}
      </div>
    </>
  );
}
