import { Button, Modal, Select, Space } from "@mantine/core";
import useSchedules from "../hooks/use_schedules";
import { useSetState } from "@mantine/hooks";
import { useEffect, useState } from "react";

const EditSchedule = ({ schedule, opened, onClose }) => {
  const [state, setState] = useState(structuredClone(schedule));
  const { updateSchedule } = useSchedules();

  useEffect(() => {
    setState(structuredClone(schedule));
  }, [schedule]);

  if (!schedule) return null;

  const handleUpdate = () => {
    onClose();
    updateSchedule(state);
  };

  const handleState = (v, t) => {
    setState((old) => {
      return {
        ...old,
        [t.toLowerCase()]: v === "T" ? true : false,
      };
    });
  };

  return (
    <Modal opened={opened} onClose={onClose} title="Edit Schedule">
      <div className="flex flex-col gap-3 mb-3">
        <Day text="Monday" value={schedule.monday} change={handleState} />
        <Day text="Tuesday" value={schedule.tuesday} change={handleState} />
        <Day text="Wednesday" value={schedule.wednesday} change={handleState} />
        <Day text="Thursday" value={schedule.thursday} change={handleState} />
        <Day text="Friday" value={schedule.friday} change={handleState} />
        <Day text="Saturday" value={schedule.saturday} change={handleState} />
        <Day text="Sunday" value={schedule.sunday} change={handleState} />
      </div>
      <Button size="lg" fullWidth onClick={handleUpdate}>
        Update
      </Button>
    </Modal>
  );
};

export default EditSchedule;

const Day = ({ text, value, change }) => {
  return (
    <div className="flex justify-between">
      <p>{text}</p>
      <Select
        data={["T", "F"]}
        defaultValue={value ? "T" : "F"}
        className="w-20"
        onChange={(v) => change(v, text)}
      />
    </div>
  );
};
