import { List, ThemeIcon, Tooltip, rem } from "@mantine/core";
import { useState } from "react";
import { FaPencilAlt } from "react-icons/fa";
import { IoFastFoodOutline } from "react-icons/io5";
import { MdCleanHands } from "react-icons/md";

function TaskTile({ task, click }) {
  const [fade, setFade] = useState(false);

  const completeTask = () => {
    setFade(true);
    setTimeout(() => {
      click(task.id);
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
