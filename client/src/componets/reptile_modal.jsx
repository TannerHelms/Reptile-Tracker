import React, { useState } from "react";

export function ReptileModal({ reptile, updating }) {
  const [tab, setTab] = useState("Details");

  const handleUpdateReptile = () => {};

  return (
    <div className="p-4">
      {tab === "Details" && (
        <div className="flex flex-col gap-5">
          <div className="flex justify-between">
            <p>Species</p>
            <p>{reptile.species.slice(0).replace("_", " ")}</p>
          </div>

          <div className="flex justify-between">
            <p>Sex</p>
            <p>{reptile.sex.toLocaleUpperCase()}</p>
          </div>

          <div className="flex justify-between">
            <p>CreatedAt</p>
            <p> {reptile.createdAt.split("T")[0]}</p>
          </div>

          <div className="flex justify-between">
            <p>updatedAt</p>
            <p> {reptile.updatedAt.split("T")[0]}</p>
          </div>
        </div>
      )}
      {tab === "Edit" && (
        <form className="flex flex-col gap-5">
          <TextInput
            placeholder="Name"
            defaultValue={reptile.name}
            required
            size="md"
          />
          <Select
            data={["corn snake", "ball python", "king snake"]}
            defaultValue={reptile.species.slice(0).replace("_", " ")}
            size="md"
          />
          <Select
            data={["M", "F"]}
            defaultValue={reptile.sex.toLocaleUpperCase()}
            size="md"
          />
          {updating && (
            <Button fullWidth loading>
              Update
            </Button>
          )}
          {!updating && (
            <Button fullWidth onClick={handleUpdateReptile}>
              Update
            </Button>
          )}
        </form>
      )}
    </div>
  );
}
