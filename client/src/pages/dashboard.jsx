import { Button, List, Table, ThemeIcon, Tooltip, rem } from "@mantine/core";
import { IconCircleCheck } from "@tabler/icons-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ReptileTile from "../componets/reptile_tile";
import TaskTile from "../componets/task_tile";
import useAuth from "../hooks/use_auth";
import reptiles from "../mock/reptile";
import Schedule from "../mock/schedule";

const Dashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [tasks, setTasks] = useState(Schedule);

  console.log(tasks);

  if (!user) {
    return null;
  }

  const completeTask = (id) => {
    setTasks((prev) => prev.filter((task) => task.id !== id));
  };

  return (
    <>
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
            {tasks.map((task) => (
              <div
                className="flex flex-col gap-4 items-center w-60 p-3 rounded-lg shadow-md"
                key={task.id}
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
              {reptiles.map((reptile) => (
                <ReptileTile key={reptile.id} reptile={reptile} />
              ))}
            </Table.Tbody>
          </Table>
        </Table.ScrollContainer>
      </div>
    </>
  );
};

export default Dashboard;
