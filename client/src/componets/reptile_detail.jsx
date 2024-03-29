import { Button, Modal, Select, Text, TextInput } from "@mantine/core";
import { useDisclosure, useSetState } from "@mantine/hooks";
import capitalize from "capitalize";
import React from "react";
import useReptile from "../hooks/use_reptile";
const ReptileDetail = ({ reptile }) => {
  const [opened, { open, close }] = useDisclosure(false);
  const [newReptile, setNewReptile] = useSetState({ ...reptile });
  const { updateReptile } = useReptile();

  const handleUpdate = () => {
    updateReptile.mutate(newReptile);
    close();
  };

  const handleNameChange = (e) => {
    setNewReptile({ name: e.target.value });
  };
  const handleSpeciesChange = (value, option) => {
    setNewReptile({ species: value });
  };
  const handleSexChange = (value, option) => {
    setNewReptile({ sex: value });
  };

  return (
    <>
      <Modal opened={opened} onClose={close} title="Authentication">
        <form className="flex flex-col gap-5">
          <TextInput
            placeholder="Name"
            defaultValue={reptile.name}
            required
            size="md"
            data-key="name"
            onChange={handleNameChange}
          />
          <Select
            data={["corn snake", "ball python", "king snake", "redtail boa"]}
            defaultValue={reptile.species.slice(0).replace("_", " ")}
            size="md"
            data-key="species"
            onChange={handleSpeciesChange}
          />
          <Select
            data={["M", "F"]}
            defaultValue={reptile.sex.toLocaleUpperCase()}
            size="md"
            data-key="sex"
            onChange={handleSexChange}
          />
          <Button fullWidth onClick={handleUpdate}>
            Update
          </Button>
        </form>
      </Modal>
      <div className="color-secondary p-3 flex flex-col gap-3 rounded-lg">
        <Text size="xl" weight={700} fw={"bold"} ta={"center"}>
          {reptile.name}
        </Text>
        <div className="flex justify-between min-w-80">
          <Text size="m" weight={700} ta={"center"}>
            Species
          </Text>
          <Text size="m" weight={700} ta={"center"}>
            {capitalize.words(reptile.species.replace("_", " "))}
          </Text>
        </div>
        <div className="flex justify-between max-w-80">
          <Text size="m" weight={700} ta={"center"}>
            Sex
          </Text>
          <Text size="m" weight={700} ta={"center"}>
            {reptile.sex.toUpperCase()}{" "}
          </Text>
        </div>
        <div className="flex justify-between max-w-80">
          <Text size="m" weight={700} ta={"center"}>
            Created At
          </Text>
          <Text size="m" weight={700} ta={"center"}>
            {reptile.createdAt.split("T")[0]}{" "}
          </Text>
        </div>
        <div className="flex justify-between max-w-80">
          <Text size="m" weight={700} ta={"center"}>
            Updated At
          </Text>
          <Text size="m" weight={700} ta={"center"}>
            {reptile.updatedAt.split("T")[0]}{" "}
          </Text>
        </div>
        <Button onClick={open}>Edit</Button>
      </div>
    </>
  );
};

export default ReptileDetail;
