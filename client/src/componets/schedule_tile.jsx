import React from "react";
import TaskTile from "./task_tile";
import { Button } from "@mantine/core";
const ScheduleTile = ({ idx, schedule, reptile, handleViewReptile }) => {

  return (
    <div
      className="flex flex-col gap-4 items-center p-3 rounded-lg shadow-md color-secondary"
      key={idx}
    >
      <div className="flex flex-col gap-3 overflow-x-auto w-52">
        <p className="text-center">{reptile.name}</p>
        <div className="w-full flex flex-row justify-between px-3">
          <p>Species</p>
          <p>{reptile.species.slice(0).replace("_", " ")}</p>
        </div>
        <div className="w-full flex flex-row justify-between px-3">
          <p>Sex</p>
          <p>{reptile.sex.toLocaleUpperCase()}</p>
        </div>
      </div>
      <div className="flex justify-center">
        {reptile.schedules.map((schedule) => (
          <TaskTile key={schedule.id} task={schedule}></TaskTile>
        ))}
      </div>
      <Button
        fullWidth
        data-reptile={reptile}
        onClick={() => handleViewReptile(reptile)}
      >
        View
      </Button>
    </div>
  );
};

export default ScheduleTile;
