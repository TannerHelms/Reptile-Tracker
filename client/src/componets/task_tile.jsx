import { List, ThemeIcon, Tooltip, rem } from "@mantine/core";
import { useState } from "react";
import { FaPencilAlt } from "react-icons/fa";
import { IoFastFoodOutline } from "react-icons/io5";
import { MdCleanHands } from "react-icons/md";
import useSchedules from "../hooks/use_schedules";
import { notifications } from "@mantine/notifications";

function TaskTile({ task }) {
  const [fade, setFade] = useState(false);
  const { updateSchedule } = useSchedules();

  const completeTask = () => {
    setFade(true);
    setTimeout(() => {
      const currentDate = new Date();
      const currentDay = currentDate
        .toLocaleString("en-us", { weekday: "long" })
        .toLowerCase();
      const newTask = { ...task };
      if (currentDay === "monday") {
        newTask.monday = false;
      }
      if (currentDay === "tuesday") {
        newTask.tuesday = false;
      }
      if (currentDay === "wednesday") {
        newTask.wednesday = false;
      }
      if (currentDay === "thursday") {
        newTask.thursday = false;
      }
      if (currentDay === "friday") {
        newTask.friday = false;
      }
      if (currentDay === "saturday") {
        newTask.saturday = false;
      }
      if (currentDay === "sunday") {
        newTask.sunday = false;
      }

      updateSchedule(newTask);
      notifications.show({
        title: `Marked ${task.type} as complete`,
        // message: "Task has been completed",
      });
    }, 500);
  };

  return (
    <List.Item
      className={`item ${fade ? "item-fadeout" : ""}`}
      icon={
        <ThemeIcon
          data-id={task.id}
          color="blue"
          size={40}
          radius="xl"
          onClick={completeTask}
          className="cursor-pointer"
        >
          {task.type === "feed" && (
            <Tooltip label="Feed">
              <div>
                <IoFastFoodOutline
                  style={{
                    width: rem(25),
                    height: rem(25),
                  }}
                />
              </div>
            </Tooltip>
          )}
          {task.type === "clean" && (
            <Tooltip label="Clean">
              <div>
                <MdCleanHands
                  style={{
                    width: rem(25),
                    height: rem(25),
                  }}
                />
              </div>
            </Tooltip>
          )}
          {task.type === "record" && (
            <Tooltip label="Record">
              <div>
                <FaPencilAlt
                  style={{
                    width: rem(25),
                    height: rem(25),
                  }}
                />
              </div>
            </Tooltip>
          )}
        </ThemeIcon>
      }
    >
      {/* {task.description} */}
    </List.Item>
  );
}
export default TaskTile;
