import { List, ThemeIcon } from "@mantine/core";
import { IconCircleCheck } from "@tabler/icons-react";
import React from "react";
const DayTile = ({ value, schedule, setSchedule, rem, day }) => {
  return (
    <List.Item
      icon={
        <ThemeIcon
          className="cursor-pointer"
          color={value ? "teal" : "red"}
          size={24}
          radius="xl"
          onClick={() => setSchedule(!value)}
        >
          <IconCircleCheck
            style={{
              width: rem(16),
              height: rem(16),
            }}
          />
        </ThemeIcon>
      }
    >
      {day}
    </List.Item>
  );
};

export default DayTile;
