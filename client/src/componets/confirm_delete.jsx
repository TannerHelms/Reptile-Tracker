import { Text } from "@mantine/core";
import { modals } from "@mantine/modals";

const ConfirmDelete = ({ title, message, confirm, cancel, onConfirm }) => {
  modals.openConfirmModal({
    title,
    centered: true,
    children: <Text size="sm">{message}</Text>,
    labels: { confirm, cancel },
    confirmProps: { color: "red" },
    onConfirm,
  });
};

export default ConfirmDelete;
