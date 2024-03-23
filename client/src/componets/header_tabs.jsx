import { Container, Tabs, Text } from "@mantine/core";
import { IoCloseSharp } from "react-icons/io5";
import classes from "../css/header_tabs.module.css";

const tabs = ["Details", "Edit"];

const HeaderTabs = ({ state, reptile, close, tab }) => {
  const handleTabChange = (value) => {
    state(value.currentTarget.dataset.id);
  };

  return (
    <div className={classes.header}>
      <div className="flex justify-center">
        <Text fz="xl" fw={500} className="text-center ">
          {reptile.name}
        </Text>
        <p className="absolute right-4 cursor-pointer" onClick={close}>
          <IoCloseSharp />
        </p>
      </div>
      <Container size="md">
        <Tabs
          defaultValue={tab || "Details"}
          variant="outline"
          visibleFrom="sm"
          classNames={{
            root: classes.tabs,
            list: classes.tabsList,
            tab: classes.tab,
          }}
        >
          <Tabs.List>
            {tabs.map((tab) => (
              <Tabs.Tab
                data-id={tab}
                value={tab}
                key={tab}
                onClick={handleTabChange}
              >
                {tab}
              </Tabs.Tab>
            ))}
          </Tabs.List>
        </Tabs>
      </Container>
    </div>
  );
};

export default HeaderTabs;
