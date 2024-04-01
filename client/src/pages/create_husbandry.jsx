import {
    Button,
    Group,
    Select,
    Stepper,
    NumberInput,
  } from "@mantine/core";
  import { useSetState } from "@mantine/hooks";
  import { useState } from "react";
  import useAuth from "../hooks/use_auth";
  import useHusbandry from "../hooks/use_husbandry";
  import useReptiles from "../hooks/use_reptiles";
  import { notifications } from "@mantine/notifications";
  import { useNavigate } from "react-router-dom";
  
  const CreateHusbandryRecord = () => {
    const navigate = useNavigate();
    const { createHusbandry } = useHusbandry();
    const [active, setActive] = useState(0);
    const reptiles = useReptiles();
    const [reptileId, setReptileId] = useState(0);
    const [length, setLength] = useState(0);
    const [weight, setWeight] = useState(0);
    const [temperature, setTemperature] = useState(0);
    const [humidity, setHumidity] = useState(0);

    const nextStep = () =>
      setActive((current) => (current < 3 ? current + 1 : current));
    const prevStep = () =>
      setActive((current) => (current > 0 ? current - 1 : current));
  
    const handleCreateHusbandryRecord = async (e) => {
        e.preventDefault();
        const res = await createHusbandry(reptileId, {length, weight, temperature, humidity});

        console.log(res)
        if (res) {
            notifications.show({
                title: "Success",
                message: "Successfully created the husbandry record",
            });
            navigate("/dashboard");
        } else {
            notifications.show({
                title: "Failed",
                message: "Failed to create the husbandry record",
            });
            navigate("/dashboard");
        }
    };
  
    if (reptiles?.isLoading) return null;
  
    return (
      <>
        <div className="text-center m-auto p-5" style={{ maxWidth: "800px" }}>
          <Stepper
            active={active}
            className="div div-col justify-center align-middle"
          >
            <Stepper.Step label="First step" description="Select a reptile">
              Step 1 content: Select a reptile
              <Select
                key={1}
                value={reptileId}
                placeholder="Select Reptile"
                data={reptiles?.data?.map((reptile) => ({
                  label: reptile.name,
                  value: `${reptile.id}`,
                }))}
                onChange={setReptileId}
              />
            </Stepper.Step>
            <Stepper.Step
              label="Second step"
              description="Choose type of Schedule"
            >
              Step 2 content: Complete details of the new husbandry record
              <NumberInput
                label="Length (ft)"
                value={length}
                onChange={setLength}
                className="m-3"
              />
              <NumberInput
                label="Weight (g)"
                value={weight}
                onChange={setWeight}
                className="m-3"
              />
              <NumberInput
                label="Temperature (degrees Fahrenheit)"
                value={temperature}
                onChange={setTemperature}
                className="m-3"
              />
              <NumberInput
                label="Humidity (%)"
                value={humidity}
                onChange={setHumidity}
                className="m-3"
              />
            </Stepper.Step>
            <Stepper.Completed>
              Click on the button to create your schedule!
              <div className="flex flex-col gap-2">
                <p>Reptile Id: {reptileId}</p>
                <p>Length: {length}</p>
                <p>Weight: {weight}</p>
                <p>Temperature: {temperature}</p>
                <p>Humidity: {humidity}</p>
              </div>
            </Stepper.Completed>
          </Stepper>
  
          <Group justify="center" mt="xl">
            {active < 3 && (
              <>
                <Button variant="default" onClick={prevStep}>
                  Back
                </Button>
                <Button onClick={nextStep}>Next step</Button>
              </>
            )}
            {active === 3 && (
              <Button onClick={handleCreateHusbandryRecord}>Create Husbandry Record</Button>
            )}
          </Group>
        </div>
      </>
    );
  };
  export default CreateHusbandryRecord;
  