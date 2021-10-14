import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Button,
  Flex,
} from "@chakra-ui/react";
import { useState } from "react";
import { FiChevronDown } from "react-icons/fi";

const Dropdown = ({ onSelect, activeItem, items }) => {
  //   const [title, setTitle] = useState(items[0]);
  const selectItem = (e, item) => {
    e.preventDefault();
    onSelect(item);
  };

  return (
    <Flex color="gray.400" my={4}>
      <Menu>
        <MenuButton bgColor="black" as={Button} rightIcon={<FiChevronDown />}>
          {activeItem.label}
        </MenuButton>
        <MenuList bgColor="black">
          {items &&
            items.map((item, i) => (
              <MenuItem onClick={(e) => selectItem(e, item.value)} key={i}>
                {item.label}
              </MenuItem>
            ))}
        </MenuList>
      </Menu>
    </Flex>
  );
};

export default Dropdown;
