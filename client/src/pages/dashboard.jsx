import { Button, List, Modal, Table, ThemeIcon, rem, TextInput, Select } from "@mantine/core";
import { IconCircleCheck } from "@tabler/icons-react";
import { useState } from "react";
import ReptileTile from "../componets/reptile_tile";
import TaskTile from "../componets/task_tile";
import useAuth from "../hooks/use_auth";
import useReptile from "../hooks/use_reptile";
import useSetQuery from "../hooks/use_set_query";
import Schedule from "../mock/schedule";
import { useDisclosure } from "@mantine/hooks";
import HeaderTabs from "../componets/header_tabs";

const Dashboard = () => {
  const { user } = useAuth();
  const [opened, { open, close }] = useDisclosure(false);
  const [reptileFocus, setReptileFocus] = useState(null);
  const [tab, setTab] = useState("Details");
  const { getReptiles } = useReptile();
  const [tasks, setTasks] = useState(Schedule);
  const { data: reptiles } = useSetQuery({
    queryFn: getReptiles,
    mutateFn: () => {},
    key: "reptiles",
  });

  const completeTask = (id) => {
    setTasks((prev) => prev.filter((task) => task.id !== id));
  };

  if (!user) {
    return null;
  }

  return (
    <>
      <Modal
        opened={opened}
        onClose={close}
        centered
        padding={0}
        withCloseButton={false}
      >
        <HeaderTabs state={setTab} reptile={reptileFocus} close={close} tab={tab}/>
        <div className="p-4">
          {tab === "Details" && (
            <div className="flex flex-col gap-5">
              <div className="flex justify-between">
                <p>Species</p>
                <p>{reptileFocus?.species.slice(0).replace("_", " ")}</p>
              </div>
              <div className="flex justify-between">
                <p>Sex</p>
                <p>{reptileFocus?.sex.toLocaleUpperCase()}</p>
              </div>
              <div className="flex justify-between">
                <p>CreatedAt</p>
                <p> {reptileFocus?.createdAt.split("T")[0]}</p>
              </div>
              <div className="flex justify-between">
                <p>updatedAt</p>
                <p> {reptileFocus?.updatedAt.split("T")[0]}</p>
              </div>
            </div>
          )}
          {tab === "Edit" && (
           <form className="flex flex-col gap-5">
            <TextInput
              placeholder="Name"
              defaultValue={reptileFocus?.name}
              required
              size="md"
            />
            <Select
            data={["corn snake", "ball python", "king snake"]}
            defaultValue={reptileFocus?.species.slice(0).replace("_", " ")}
            size="md"
            />
            <Select
            data={["M", "F"]}
            defaultValue={reptileFocus.sex.toLocaleUpperCase()}
            size="md"
            />
            <Button fullWidth>Update</Button>
           </form>
          )}
        </div>
      </Modal>

      <div className="flex flex-col gap-4">
        <p>Today's Schedule</p>
        <List
          size="sm"
          center
          icon={
            <ThemeIcon color="teal" size={24} radius="xl">
              <IconCircleCheck style={{ width: rem(16), height: rem(16) }} />
            </ThemeIcon>
          }
        >
          <div className="flex gap-5 overflow-x-auto p-3">
            {tasks.map((task, idx) => (
              <div
                className="flex flex-col gap-4 items-center w-60 p-3 rounded-lg shadow-md"
                key={idx}
                style={{ backgroundColor: "#EEF2F3" }}
              >
                <div className="flex flex-col gap-3 w-full overflow-x-auto">
                  <p className="text-center">{task.reptile.name}</p>
                  <div className="w-full flex flex-row justify-between px-3">
                    <p>Species</p>
                    <p>{task.reptile.species.slice(0).replace("_", " ")}</p>
                  </div>
                  <div className="w-full flex flex-row justify-between px-3">
                    <p>Sex</p>
                    <p>{task.reptile.sex.toLocaleUpperCase()}</p>
                  </div>
                </div>
                <div className="flex justify-center">
                  {task.schedules.map((schedule) => (
                    <TaskTile
                      key={schedule.id}
                      click={completeTask}
                      task={schedule}
                    ></TaskTile>
                  ))}
                </div>
                <Button fullWidth>View</Button>
              </div>
            ))}
          </div>
        </List>

        <p>Reptiles</p>
        <Table.ScrollContainer h={400}>
          <Table verticalSpacing="md" striped highlightOnHover withTableBorder>
            <Table.Tbody>
              {reptiles?.map((reptile) => (
                <ReptileTile
                  key={reptile.id}
                  reptile={reptile}
                  details={(reptile, tab) => {
                    setReptileFocus(reptile);
                    setTab(tab);
                    open();
                  }}
                />
              ))}
            </Table.Tbody>
          </Table>
        </Table.ScrollContainer>
      </div>
    </>
  );
};

export default Dashboard;
