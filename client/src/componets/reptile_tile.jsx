import {
  Avatar,
  Table,
  Group,
  Text,
  ActionIcon,
  Menu,
  rem,
} from "@mantine/core";
import {
  IconPencil,
  IconMessages,
  IconNote,
  IconReportAnalytics,
  IconTrash,
  IconDots,
  IconEye,
} from "@tabler/icons-react";
const ReptileTile = ({ reptile, details }) => {
  return (
    <Table.Tr key={reptile.id}>
      {/* Name of reptile and type */}
      <Table.Td>
        <Text fz="sm" fw={500}>
          {reptile.name}
        </Text>
        <Text c="dimmed" fz="xs">
          {reptile.species.replace("_", " ")}
        </Text>
      </Table.Td>

      {/* Sex of reptile */}
      <Table.Td>
        <Text fz="xs" c="dimmed">
          {reptile.sex.toUpperCase()}
        </Text>
      </Table.Td>

      {/* Created at */}
      <Table.Td>
        <Text fz="xs" c="dimmed">
          {reptile.createdAt.toLocaleString({ timeStyle: "short" })}
        </Text>
      </Table.Td>
      <Table.Td>
        <Group gap={0} justify="flex-end">
          <Menu
            transitionProps={{ transition: "pop" }}
            withArrow
            position="bottom-end"
            withinPortal
          >
            <Menu.Target>
              <ActionIcon variant="subtle" color="gray">
                <IconDots
                  style={{ width: rem(16), height: rem(16) }}
                  stroke={1.5}
                />
              </ActionIcon>
            </Menu.Target>

            <Menu.Dropdown>
              <Menu.Item
                onClick={() => details(reptile, "Details")}
                leftSection={
                  <IconEye
                    style={{ width: rem(16), height: rem(16) }}
                    stroke={1.5}
                  />
                }
              >
                View
              </Menu.Item>
              <Menu.Item
              onClick={() => details(reptile, "Edit")}
                leftSection={
                  
                  <IconPencil
                    style={{ width: rem(16), height: rem(16) }}
                    stroke={1.5}
                  />
                }
              >
                Edit
              </Menu.Item>
              <Menu.Item
                leftSection={
                  <IconTrash
                    style={{ width: rem(16), height: rem(16) }}
                    stroke={1.5}
                  />
                }
                color="red"
              >
                Delete
              </Menu.Item>
            </Menu.Dropdown>
          </Menu>
        </Group>
      </Table.Td>
    </Table.Tr>
  );
};

export default ReptileTile;
