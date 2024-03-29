import { Select, Space } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { useNavigate, useParams } from "react-router-dom";
import ConfirmDelete from "../componets/confirm_delete";
import ReptileDetail from "../componets/reptile_detail";
import ReptileSchedule from "../componets/reptile_schedule";
import useAuth from "../hooks/use_auth";
import useReptile from "../hooks/use_reptile";
import useReptiles from "../hooks/use_reptiles";
import useSchedule from "../hooks/use_schedules";

const Reptile = () => {
  useAuth();
  const id = useParams().id;
  const { reptiles } = useReptiles();
  const { reptile, isLoading } = useReptile(id);
  const navigate = useNavigate();
  const { deleteSchedule } = useSchedule();

  const handleDelete = async (e) => {
    const id = e.currentTarget.dataset.key;
    ConfirmDelete({
      title: `Delete your schedule for ${reptile.name}`,
      message:
        "Are you sure you want to delete your schedule? This action will permanently delete your schedule and all of its data.",
      confirm: "Delete Schedule",
      cancel: "No don't delete it",
      onConfirm: async () => {
        await deleteSchedule({ reptileId: reptile.id, id });
        notifications.show({
          title: "Success",
          message: "Successfully deleted the schedule",
        });
      },
    });
  };

  const handleSetReptile = (id) => {
    navigate(`/reptiles/${id}`);
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
        onChange={handleSetReptile}
      />
      <Space direction="vertical" size="xl" />
      {reptile && (
        <div className="flex flex-col gap-3">
          {/* Container for Reptile Details */}
          <ReptileDetail reptile={reptile} />

          {/* Container for Reptile Schedules */}
          <p>Schedules ({reptile?.Schedule?.length || 0})</p>
          <div className="flex gap-10 overflow-y-auto">
            {reptile?.Schedule.map((schedule) => {
              return (
                <ReptileSchedule
                  key={schedule.id}
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
