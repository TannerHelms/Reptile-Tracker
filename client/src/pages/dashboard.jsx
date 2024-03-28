import {
  Anchor,
  List,
  Modal,
  Space,
  Table,
  Text,
  ThemeIcon,
  rem,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { modals } from "@mantine/modals";
import { notifications } from "@mantine/notifications";
import { IconCircleCheck } from "@tabler/icons-react";
import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import CreateReptileModal from "../componets/create_reptile_modal";
import { ReptileModal } from "../componets/reptile_modal";
import ReptileTile from "../componets/reptile_tile";
import ScheduleTile from "../componets/schedule_tile";
import useAuth from "../hooks/use_auth";
import useReptile from "../hooks/use_reptile";
import useReptiles from "../hooks/use_reptiles";
import useSchedules from "../hooks/use_schedules";

const Dashboard = () => {
  const { user, isLoading } = useAuth();
  const { deleteReptile } = useReptile();
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const [opened, { open, close }] = useDisclosure(false);
  const [createModal, { open: openCreate, close: closeCreate }] =
    useDisclosure(false);

  const { reptiles } = useReptiles();
  const { schedules } = useSchedules();
  const [tab, setTab] = useState("Details");

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

  const handleViewReptile = (reptile) => {
    queryClient.setQueryData(["reptile"], reptile);
    navigate("/reptiles");
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
            {schedules?.map((reptile, idx) => {
              if (reptile.schedules.length == 0) return null;
              return (
                <ScheduleTile
                  key={idx}
                  idx={idx}
                  reptile={reptile}
                  handleViewReptile={handleViewReptile}
                />
              );
            })}
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
