import {
  Anchor,
  Button,
  List,
  Modal,
  Select,
  Space,
  Table,
  Text,
  TextInput,
  ThemeIcon,
  rem,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconCircleCheck } from "@tabler/icons-react";
import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { ReptileModal } from "../componets/reptile_modal";
import ReptileTile from "../componets/reptile_tile";
import TaskTile from "../componets/task_tile";
import useAuth from "../hooks/use_auth";
import useReptiles from "../hooks/use_reptiles";
import Schedule from "../mock/schedule";
import { notifications } from "@mantine/notifications";
import { modals } from "@mantine/modals";
import useReptile from "../hooks/use_reptile";
import CreateReptileModal from "../componets/create_reptile_modal";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const { user, isLoading } = useAuth();
  const { deleteReptile } = useReptile();
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const [opened, { open, close }] = useDisclosure(false);
  const [createModal, { open: openCreate, close: closeCreate }] =
    useDisclosure(false);

  const [tasks, setTasks] = useState(Schedule);
  const { reptiles } = useReptiles();
  const [tab, setTab] = useState("Details");
  const completeTask = (id) => {
    console.log(id);
    setTasks((prev) => prev.filter((task) => task.id !== id));
  };
  const handleDelete = (reptile) => {
    modals.openConfirmModal({
      title: "Delete your reptile",
      centered: true,
      children: (
        <>
          <Text size="sm">
            Are you sure you want to delete your reptile? This action will
            permanently delete your reptile and all of its data.
          </Text>
          <Space h="md" />
          <Text size="lg">Reptile Name: {reptile.name}</Text>
          <Text size="lg">Species: {reptile.species}</Text>
          <Text size="lg">Sex: {reptile.sex}</Text>
        </>
      ),
      labels: { confirm: "Delete reptile", cancel: "No don't delete it" },
      confirmProps: { color: "red" },
      onConfirm: () => {
        const resp = deleteReptile.mutateAsync(reptile.id);
        if (resp.error) {
          notifications.show({
            title: "Error",
            message: "Failed to delete reptile",
          });
        } else {
          notifications.show({
            title: "Success",
            message: "Successfully deleted reptile",
          });
        }
      },
    });
  };

  const handleCreateSchedule = () => {
    navigate("/create_schedule");
  };
  const handleCreateReptile = () => {
    openCreate();
  };

  if (isLoading) return null;

  if (!user) {
    return null;
  }
  return (
    <>
      <Modal
        opened={createModal}
        onClose={closeCreate}
        centered
        padding={0}
        withCloseButton={false}
      >
        <CreateReptileModal close={closeCreate} />
      </Modal>
      <Modal
        opened={opened}
        onClose={close}
        centered
        padding={0}
        withCloseButton={false}
      >
        <ReptileModal state={tab} close={close} />
      </Modal>

      <div className="flex flex-col gap-4">
        <div className="flex w-full justify-between align-middle">
          <p>Today's Schedule</p>
          <Anchor onClick={handleCreateSchedule}>Create</Anchor>
        </div>
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
        <div className="flex w-full justify-between items-center">
          <p>Reptiles</p>
          <Anchor onClick={handleCreateReptile}>Create</Anchor>
        </div>
        <Table.ScrollContainer h={400}>
          <Table verticalSpacing="md" striped highlightOnHover withTableBorder>
            <Table.Tbody>
              {reptiles?.map((reptile) => (
                <ReptileTile
                  key={reptile.id}
                  reptile={reptile}
                  details={(reptile, tab) => {
                    queryClient.setQueryData(["reptile"], reptile);
                    setTab(tab);
                    open();
                  }}
                  deleteFn={handleDelete}
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
