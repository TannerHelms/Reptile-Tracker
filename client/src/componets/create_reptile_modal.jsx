import { Button, Select, Text, TextInput } from "@mantine/core";
import { useSetState } from "@mantine/hooks";
import { notifications } from "@mantine/notifications";
import { useState } from "react";
import { IoCloseSharp } from "react-icons/io5";
import useReptile from "../hooks/use_reptile";

const CreateReptileModal = ({ close }) => {
  const [reptile, setReptile] = useSetState(null);
  const { createReptile } = useReptile();
  const [error, setError] = useState(null);

  const handleCreateReptile = async () => {
    if (!reptile || !reptile.name || !reptile.species || !reptile.sex) {
      setError("Please fill out all fields");
      return;
    }
    const resp = await createReptile(reptile);
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
      {error && (
        <p className="text-red-500 text-center">
          Please fill in all the fields
        </p>
      )}
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
