import { Button, Modal, Select, Text, TextInput } from "@mantine/core";
import { useSetState } from "@mantine/hooks";
import { modals } from "@mantine/modals";
import { IoCloseSharp } from "react-icons/io5";
import useReptile from "../hooks/use_reptile";
import { notifications } from "@mantine/notifications";

const CreateReptileModal = ({ close }) => {
  const [reptile, setReptile] = useSetState(null);
  const { createReptile } = useReptile();

  const handleCreateReptile = async () => {
    if (!reptile || !reptile.name || !reptile.species || !reptile.sex) return;
    const resp = await createReptile.mutateAsync(reptile);
    if (resp.error) {
      notifications.show({
        title: "Error",
        message: "Failed to create reptile",
      });
    } else {
      notifications.show({
        title: "Success",
        message: "Successfully created reptile",
      });
    }
    close();
  };

  return (
    <div className="p-3">
      <div className="relative">
        <span
          className="absolute right-2 top-1/2  transform -translate-y-1/2 cursor-pointer"
          onClick={close}
        >
          <IoCloseSharp />
        </span>
        <Text size="lg" fw={500} ta={"center"}>
          Create Reptile
        </Text>
      </div>
      <form className="flex flex-col gap-5 mt-2">
        <TextInput
          placeholder="Name"
          required
          size="md"
          onChange={(e) => setReptile({ name: e.target.value })}
        />
        <Select
          placeholder="Select species"
          data={["corn snake", "ball python", "king snake"]}
          size="md"
          onChange={(value) => setReptile({ species: value })}
        />
        <Select
          placeholder="Select sex"
          data={["M", "F"]}
          size="md"
          onChange={(value) => setReptile({ sex: value })}
        />
        <Button fullWidth onClick={handleCreateReptile}>
          Create
        </Button>
      </form>
    </div>
  );
};

export default CreateReptileModal;
