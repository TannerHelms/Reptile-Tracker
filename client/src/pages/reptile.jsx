import { Select, Space, Text } from "@mantine/core";
import { modals } from "@mantine/modals";
import { notifications } from "@mantine/notifications";
import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import ReptileSchedule from "../componets/reptile_schedule";
import useAuth from "../hooks/use_auth";
import useReptiles from "../hooks/use_reptiles";
import useSchedule from "../hooks/use_schedules";
import capitalize from "capitalize";

const Reptile = () => {
  const { user, isLoading } = useAuth();
  const { reptiles } = useReptiles();
  const queryClient = useQueryClient();
  const [reptile, setReptile] = useState(queryClient.getQueryData(["reptile"]));
  const { deleteSchedule } = useSchedule();

  const handleDelete = async (e) => {
    const id = e.currentTarget.dataset.key;
    modals.openConfirmModal({
      title: `Delete your schedule for ${reptile.name}`,
      centered: true,
      children: (
        <>
          <Text size="sm">
            Are you sure you want to delete your schedule? This action will
            permanently delete your schedule and all of its data.
          </Text>
        </>
      ),
      labels: { confirm: "Delete Schedule", cancel: "No don't delete it" },
      confirmProps: { color: "red" },
      onConfirm: async () => {
        await deleteSchedule({ reptileId: reptile.id, id });
        setReptile(queryClient.getQueryData(["reptile"]));
        notifications.show({
          title: "Success",
          message: "Successfully deleted the schedule",
        });
      },
    });
  };

  if (isLoading) return null;

  return (
    <div className="flex flex-col gap-3 text-left">
      {/* Select Reptile */}
      <Select
        placeholder="Select Reptile"
        data={reptiles?.map((reptile) => ({
          label: reptile.name,
          value: `${reptile.id}`,
        }))}
        value={reptile?.id.toString() || ""}
        className="max-600"
        onChange={(value, option) => {
          const reptile = reptiles.find(
            (reptile) => reptile.id === parseInt(value)
          );
          setReptile(reptile);
          queryClient.setQueryData(["reptile"], reptile);
        }}
      />
      <Space direction="vertical" size="xl" />
      {reptile && (
        <div className="flex flex-col gap-3">
          {/* Container for Reptile Details */}
          <Text size="xl" weight={700} fw={"bold"} ta={"center"}>
            {reptile.name}
          </Text>
          <div className="color-secondary p-3 flex flex-col gap-3 m-auto rounded-lg">
            <div className="flex justify-between min-w-80">
              <Text size="m" weight={700} ta={"center"}>
                Species
              </Text>
              <Text size="m" weight={700} ta={"center"}>
                {capitalize.words(reptile.species.replace("_", " "))}
              </Text>
            </div>
            <div className="flex justify-between max-w-80">
              <Text size="m" weight={700} ta={"center"}>
                Sex
              </Text>
              <Text size="m" weight={700} ta={"center"}>
                {reptile.sex.toUpperCase()}{" "}
              </Text>
            </div>
            <div className="flex justify-between max-w-80">
              <Text size="m" weight={700} ta={"center"}>
                Created At
              </Text>
              <Text size="m" weight={700} ta={"center"}>
                {reptile.createdAt.split("T")[0]}{" "}
              </Text>
            </div>
            <div className="flex justify-between max-w-80">
              <Text size="m" weight={700} ta={"center"}>
                Updated At
              </Text>
              <Text size="m" weight={700} ta={"center"}>
                {reptile.updatedAt.split("T")[0]}{" "}
              </Text>
            </div>
          </div>

          {/* Container for Reptile Schedules */}
          <p>Schedules ({reptile?.Schedule?.length || 0})</p>
          <div className="flex gap-10 overflow-y-auto">
            {reptile?.Schedule.map((schedule) => {
              return (
                <ReptileSchedule
                  schedule={schedule}
                  handleDelete={handleDelete}
                />
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
export default Reptile;
