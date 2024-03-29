import { Button, Modal, Select, Space, Text, TextInput } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { useNavigate, useParams } from "react-router-dom";
import ConfirmDelete from "../componets/confirm_delete";
import ReptileDetail from "../componets/reptile_detail";
import ReptileSchedule from "../componets/reptile_schedule";
import useAuth from "../hooks/use_auth";
import useReptile from "../hooks/use_reptile";
import useReptiles from "../hooks/use_reptiles";
import useSchedule from "../hooks/use_schedules";
import capitalize from "capitalize";
import { FaTrash } from "react-icons/fa";
import { useDisclosure } from "@mantine/hooks";
import useFoodItem from "../hooks/use_food_item";
import { useState } from "react";

const Reptile = () => {
  useAuth();
  const id = useParams().id;
  const reptiles = useReptiles();
  const { reptile } = useReptile(id);
  const { createFoodItem, deleteFoodItem } = useFoodItem(reptile?.data?.id);
  const navigate = useNavigate();
  const { deleteSchedule } = useSchedule();
  const [opened, { open, close }] = useDisclosure(false);
  const [foodItem, setFoodItem] = useState("");
  const handleDelete = async (e) => {
    const id = e.currentTarget.dataset.key;
    ConfirmDelete({
      title: `Delete your schedule for ${reptile.name}`,
      message:
        "Are you sure you want to delete your schedule? This action will permanently delete your schedule and all of its data.",
      confirm: "Delete Schedule",
      cancel: "No don't delete it",
      onConfirm: async () => {
        await deleteSchedule({ reptileId: reptile.id, id });
        notifications.show({
          title: "Success",
          message: "Successfully deleted the schedule",
        });
      },
    });
  };

  const handleSetReptile = (id) => {
    navigate(`/reptiles/${id}`);
  };

  const handleCreateFoodItem = () => {
    createFoodItem(foodItem);
    close();
  };

  if (reptile.isLoading) return null;

  return (
    <>
      {/* Create Feeding Modal */}
      <Modal
        opened={opened}
        onClose={close}
        title="Create Feeding"
        size="sm"
        padding="md"
      >
        <div className="flex flex-col gap-3">
          <Text size="xl" weight={700} ta={"center"}>
            {reptile?.data?.name}
          </Text>
          <TextInput
            placeholder="Food Item"
            onChange={(item) => setFoodItem(item.target.value)}
          />
          <Button size="lg" fullWidth onClick={handleCreateFoodItem}>
            Create
          </Button>
        </div>
      </Modal>

      <div className="flex flex-col gap-3 text-left">
        {/* Select Reptile */}
        <Select
          placeholder="Select Reptile"
          data={reptiles?.data?.map((reptile) => ({
            label: reptile.name,
            value: `${reptile.id}`,
          }))}
          value={reptile?.data?.id.toString() || ""}
          className="max-600"
          onChange={handleSetReptile}
        />
        <Space direction="vertical" size="xl" />
        {reptile?.data && (
          <div className="flex flex-col gap-3 ">
            {/* Container for Reptile Details */}
            <div className="flex gap-3 overflow-y-auto p-2">
              {reptile?.data && <ReptileDetail reptile={reptile.data} />}

              <div className="color-secondary p-3 flex flex-col gap-3 rounded-lg items-center justify-between">
                <Text size="xl" weight={700} fw={"bold"} ta={"center"}>
                  Feedings
                </Text>
                <div className="w-fit flex flex-col gap-2 mx-5">
                  {reptile.data?.Feeding?.map((feeding) => {
                    return (
                      <div key={feeding.id} className="flex gap-2">
                        <FaTrash
                          color="red"
                          size={"20px"}
                          className="cursor-pointer"
                          onClick={() => deleteFoodItem(feeding.id)}
                        />
                        <Text size="m" weight={700} ta={"center"}>
                          {feeding.date}
                        </Text>
                        <Text size="m" weight={700} ta={"center"}>
                          {capitalize.words(feeding.foodItem)}
                        </Text>
                      </div>
                    );
                  })}
                </div>
                <Button size="compact-sm" p={0} fullWidth onClick={open}>
                  Create
                </Button>
              </div>
            </div>

            {/* Container for Reptile Schedules */}
            <p>Schedules ({reptile?.data?.Schedule?.length || 0})</p>
            <div className="flex gap-10 overflow-y-auto p-2">
              {reptile?.data?.Schedule.map((schedule) => {
                return (
                  <ReptileSchedule
                    key={schedule.id}
                    schedule={schedule}
                    handleDelete={handleDelete}
                  />
                );
              })}
            </div>
          </div>
        )}
      </div>
    </>
  );
};
export default Reptile;
