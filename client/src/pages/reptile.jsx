import { Paper, Select, Space } from "@mantine/core";
import useAuth from "../hooks/use_auth";
import useReptiles from "../hooks/use_reptiles";
import { useState } from "react";
import useSchedule from "../hooks/use_schedule";

const Reptile = () => {
  const { user, isLoading } = useAuth();
  const { reptiles } = useReptiles();
  const schedule = useSchedule();
  const [reptile, setReptile] = useState(null);

  if (isLoading) return null;

  return (
    <div className="flex flex-col gap-3 text-left">
      <Select
        placeholder="Select Reptile"
        className="max-600"
        data={reptiles.map((reptile) => ({
          label: reptile.name,
          value: `${reptile.id}`,
        }))}
        onChange={(value, option) => {
          const reptile = reptiles.find(
            (reptile) => reptile.id === parseInt(value)
          );
          setReptile(reptile);
        }}
      />
      <Space direction="vertical" size="xl" />
      {reptile && (
        <div>
          {/* Container for Reptile Details */}
          <div>
            <h1>{reptile.name}</h1>
            <h1>{reptile.species}</h1>
            <h1>{reptile.sex}</h1>
            <h1>{reptile.sex}</h1>
          </div>

          {/* Container for Reptile Schedules */}
        </div>
      )}
    </div>
  );
};
export default Reptile;
