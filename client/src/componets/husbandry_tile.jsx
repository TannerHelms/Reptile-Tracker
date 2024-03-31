import {
  Divider,
  Text,
} from "@mantine/core";

const HusbandryTile = ({ record }) => {
  return (
    <div
      className="color-secondary  p-5 rounded-lg shadow-md flex flex-col gap-3 w-96 min-w-96"
      key={record.id}
    >
      <Text size="xl" fw={600} ta="center">
        Husbandry Record
      </Text>
      <Divider my="xs" label="Details" labelPosition="center" />
      <div className="flex between justify-between w-full">
        <p>Length</p>
        <p>{`${record.length.toFixed(1)} ft`}</p>
      </div>
      <div className="flex between justify-between w-full">
        <p>Weight</p>
        <p>{`${record.weight.toFixed(1)} grams`}</p>
      </div>
      <div className="flex between justify-between w-full">
        <p>Temperature</p>
        <p>{`${record.temperature.toFixed(1)} degrees Fahrenheit`}</p>
      </div>
      <div className="flex between justify-between w-full">
        <p>Humidity</p>
        <p>{`${(record.humidity * 100).toFixed(1)}%`}</p>
      </div>
      <div className="flex between justify-between w-full">
        <p>Created At</p>
        <p>{`${record.createdAt.split("T")[0]}`}</p>
      </div>
      <div className="flex between justify-between w-full">
        <p>Updated At</p>
        <p>{`${record.updatedAt.split("T")[0]}`}</p>
      </div>
    </div>
  );
};
  
export default HusbandryTile;
  