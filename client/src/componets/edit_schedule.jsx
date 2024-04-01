import { Button, Modal, Select, Space } from "@mantine/core";
import useSchedules from "../hooks/use_schedules";
import { useSetState } from "@mantine/hooks";

const EditSchedule = ({ schedule, opened, onClose }) => {
  const [updatedSchedule, setUpdatedSchedule] = useSetState(schedule);
  const { update } = useSchedules();

  if (!schedule) return null;

  const handleUpdate = () => {
    console.log(updatedSchedule);
  };

  return (
    <Modal opened={opened} onClose={onClose} title="Edit Schedule">
      <div className="flex flex-col gap-3 mb-3">
        <Day
          text="Monday"
          value={schedule.monday}
          onChange={(v) => setUpdatedSchedule({ monday: v })}
        />
        <Day text="Tuesday" value={schedule.tuesday} />
        <Day text="Wednesday" value={schedule.wednesday} />
        <Day text="Thursday" value={schedule.thursday} />
        <Day text="Friday" value={schedule.friday} />
        <Day text="Saturday" value={schedule.saturday} />
        <Day text="Sunday" value={schedule.sunday} />
      </div>
      <Button size="lg" fullWidth onClick={handleUpdate}>
        Update
      </Button>
    </Modal>
  );
};

export default EditSchedule;

const Day = ({ text, value, onChange }) => {
  return (
    <div className="flex justify-between">
      <p>{text}</p>
      <Select
        data={["T", "F"]}
        defaultValue={value ? "T" : "F"}
        className="w-20"
        onChange={(v) => onChange(v)}
      />
    </div>
  );
};
