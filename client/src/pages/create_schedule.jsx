import {
  Button,
  Group,
  List,
  Select,
  Stepper,
  TextInput,
  rem,
} from "@mantine/core";
import { useSetState } from "@mantine/hooks";
import { useState } from "react";
import DayTile from "../componets/day_tile";
import useAuth from "../hooks/use_auth";
import useReptiles from "../hooks/use_reptiles";
import useSchedules from "../hooks/use_schedules";
import { notifications } from "@mantine/notifications";
import { useNavigate } from "react-router-dom";

const CreateSchedule = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [active, setActive] = useState(0);
  const { reptiles, error, isLoading } = useReptiles();
  const { createSchedule, createError } = useSchedules();
  const [schedule, setSchedule] = useSetState({
    userId: user?.id,
    reptileId: "",
    type: "",
    description: "",
    monday: false,
    tuesday: false,
    wednesday: false,
    thursday: false,
    friday: false,
    saturday: false,
    sunday: false,
  });
  const nextStep = () =>
    setActive((current) => (current < 3 ? current + 1 : current));
  const prevStep = () =>
    setActive((current) => (current > 0 ? current - 1 : current));

  const handleCreateSchedule = async () => {
    await createSchedule(schedule);
    if (createError) {
      console.log(createError);
    } else {
      notifications.show({
        title: "Success",
        message: "Successfully created the schedule",
      });
      navigate("/dashboard");
    }
  };

  if (isLoading) return null;

  return (
    <>
      <div className="text-center m-auto p-5" style={{ maxWidth: "800px" }}>
        <Stepper
          active={active}
          className="div div-col justify-center align-middle"
        >
          <Stepper.Step label="First step" description="Select a reptile">
            Step 1 content: Select a reptile
            <Select
              key={1}
              value={schedule.reptileId}
              placeholder="Select Reptile"
              data={reptiles.map((reptile) => ({
                label: reptile.name,
                value: `${reptile.id}`,
              }))}
              onChange={(value) => setSchedule({ reptileId: value })}
            />
          </Stepper.Step>
          <Stepper.Step
            label="Second step"
            description="Choose type of Schedule"
          >
            Step 2 content: Choose type of Scheule and a descriptions
            <Select
              key={2}
              defaultValue=""
              value={schedule.type}
              placeholder="Select Schedule Type"
              data={["feed", "clean", "record"]}
              onChange={(value) => setSchedule({ type: value })}
              className="m-3"
            />
            <TextInput
              label="Schedule Description"
              onChange={(e) => setSchedule({ description: e.target.value })}
              className="m-3"
            />
          </Stepper.Step>
          <Stepper.Step label="Final step" description="Setup Scheule">
            Step 3 content: Select Days
            <List spacing="xs" size="sm" className="flex flex-col text-left">
              <div className="text-left m-auto mt-3">
                <DayTile
                  value={schedule.monday}
                  schedule={schedule}
                  setSchedule={(value) => setSchedule({ monday: value })}
                  rem={rem}
                  day={"Monday"}
                />
                <DayTile
                  value={schedule.tuesday}
                  schedule={schedule}
                  setSchedule={(value) => setSchedule({ tuesday: value })}
                  rem={rem}
                  day={"Tuesday"}
                />
                <DayTile
                  value={schedule.wednesday}
                  schedule={schedule}
                  setSchedule={(value) => setSchedule({ wednesday: value })}
                  rem={rem}
                  day={"Wednesday"}
                />
                <DayTile
                  value={schedule.thursday}
                  schedule={schedule}
                  setSchedule={(value) => setSchedule({ thursday: value })}
                  rem={rem}
                  day={"Thursday"}
                />
                <DayTile
                  value={schedule.friday}
                  schedule={schedule}
                  setSchedule={(value) => setSchedule({ friday: value })}
                  rem={rem}
                  day={"Friday"}
                />
                <DayTile
                  value={schedule.saturday}
                  schedule={schedule}
                  setSchedule={(value) => setSchedule({ saturday: value })}
                  rem={rem}
                  day={"Saturday"}
                />
                <DayTile
                  value={schedule.sunday}
                  schedule={schedule}
                  setSchedule={(value) => setSchedule({ sunday: value })}
                  rem={rem}
                  day={"Sunday"}
                />
              </div>
            </List>
          </Stepper.Step>
          <Stepper.Completed>
            Click on the button to create your schedule!
            <div className="flex flex-col gap-2">
              <p>Reptile Id: {schedule.reptileId}</p>
              <p>Schedule type: {schedule.type}</p>
              <p>Schedule description: {schedule.description}</p>
              <p>Monday: {schedule.monday ? "true" : "false"}</p>
              <p>Tuesday: {schedule.tuesday ? "true" : "false"}</p>
              <p>Wednesday: {schedule.wednesday ? "true" : "false"}</p>
              <p>Thursday: {schedule.thursday ? "true" : "false"}</p>
              <p>Friday: {schedule.friday ? "true" : "false"}</p>
              <p>Saturday: {schedule.saturday ? "true" : "false"}</p>
              <p>Sunday: {schedule.sunday ? "true" : "false"}</p>
            </div>
          </Stepper.Completed>
        </Stepper>

        <Group justify="center" mt="xl">
          {active < 3 && (
            <>
              <Button variant="default" onClick={prevStep}>
                Back
              </Button>
              <Button onClick={nextStep}>Next step</Button>
            </>
          )}
          {active === 3 && (
            <Button onClick={handleCreateSchedule}>Create Schedule</Button>
          )}
        </Group>
      </div>
    </>
  );
};
export default CreateSchedule;
