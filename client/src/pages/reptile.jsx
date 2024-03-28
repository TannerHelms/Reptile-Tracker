import { Button, Divider, Paper, Select, Space, Text } from "@mantine/core";
import useAuth from "../hooks/use_auth";
import useReptiles from "../hooks/use_reptiles";
import { useState } from "react";
import useSchedule from "../hooks/use_schedules";
import { useQueryClient } from "@tanstack/react-query";
import capitlize from "capitalize";

const Reptile = () => {
  const { user, isLoading } = useAuth();
  const { reptiles } = useReptiles();
  const queryClient = useQueryClient();
  const [reptile, setReptile] = useState(queryClient.getQueryData(["reptile"]));
  const { deleteSchedule } = useSchedule();
  console.log(reptile);

  const handleDelete = async (e) => {
    const id = e.currentTarget.dataset.key;
    const newReptile = await deleteSchedule({ reptileId: reptile.id, id });
    setReptile(newReptile);
  };

  if (isLoading) return null;

  return (
    <div className="flex flex-col gap-3 text-left">
      <Select
        placeholder="Select Reptile"
        data={reptiles?.map((reptile) => ({
          label: reptile.name,
          value: `${reptile.id}`,
        }))}
        value={reptile?.id.toString() || ""}
        // defaultValue={622}
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
          <div className="color-secondary">
            <h1>{reptile.name}</h1>
            <h1>{reptile.species}</h1>
            <h1>{reptile.sex}</h1>
            <h1>{reptile.sex}</h1>
          </div>

          {/* Container for Reptile Schedules */}
          <p>Schedules ({reptile?.Schedule?.length || 0})</p>
          <div className="flex gap-10 overflow-y-auto">
            {reptile?.Schedule.map((schedule) => {
              return (
                <div
                  className="color-secondary  p-5 rounded shadow-md flex flex-col gap-3 w-96 min-w-96"
                  key={schedule.id}
                >
                  <Text size="xl" fw={600} ta="center">
                    {capitlize.words(schedule.type)}
                  </Text>
                  <p>{schedule.description}</p>
                  <Divider my="xs" label="Days" labelPosition="center" />
                  <div className="flex between justify-between w-full">
                    <p>Monday</p>
                    <p>{`${schedule.monday}`}</p>
                  </div>
                  <div className="flex between justify-between w-full">
                    <p>Tuesday</p>
                    <p>{`${schedule.tuesday}`}</p>
                  </div>
                  <div className="flex between justify-between w-full">
                    <p>Wednesday</p>
                    <p>{`${schedule.wednesday}`}</p>
                  </div>
                  <div className="flex between justify-between w-full">
                    <p>Thursday</p>
                    <p>{`${schedule.thursday}`}</p>
                  </div>
                  <div className="flex between justify-between w-full">
                    <p>Friday</p>
                    <p>{`${schedule.friday}`}</p>
                  </div>
                  <div className="flex between justify-between w-full">
                    <p>Saturday</p>
                    <p>{`${schedule.saturday}`}</p>
                  </div>
                  <div className="flex between justify-between w-full">
                    <p>Sunday</p>
                    <p>{`${schedule.sunday}`}</p>
                  </div>
                  <Button
                    color="red"
                    data-key={schedule.id}
                    onClick={handleDelete}
                  >
                    Delete
                  </Button>
                  <Button>Edit</Button>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
export default Reptile;
