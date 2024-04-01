import { Button, Divider, Text } from "@mantine/core";
import React from "react";
import capitilize from "capitalize";
const ReptileSchedule = ({ schedule, handleDelete, click }) => {
  return (
    <div
      className="color-secondary  p-5 rounded-lg shadow-md flex flex-col gap-3 w-96 min-w-96"
      key={schedule.id}
    >
      <Text size="xl" fw={600} ta="center">
        {capitilize.words(schedule.type)}
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
      <Button color="red" data-key={schedule.id} onClick={handleDelete}>
        Delete
      </Button>
      <Button onClick={click}>Edit</Button>
    </div>
  );
};

export default ReptileSchedule;
