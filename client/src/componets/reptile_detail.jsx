import { Text } from "@mantine/core";
import capitalize from "capitalize";
import React from "react";
const ReptileDetail = ({ reptile }) => {
  return (
    <>
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
      </div>
    </>
  );
};

export default ReptileDetail;
