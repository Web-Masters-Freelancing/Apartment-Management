import { SelectChangeEvent } from "@mui/material";
import { FormikHelpers } from "formik";
import { useState } from "react";
import { MenuItems } from "../../components/Select";
import { ERoomType } from "../../utils/enums";

type IRoomsFormValues = {
  id?: number;
  room: string;
  type: string;
  description?: string;
  amount: number;
};

export const useHooks = () => {
  // const [type, setType] = useState("");
  // const [open, setOpen] = useState(false);

  // /**
  //  * Modal Hooks
  //  */
  // const toggleModal = () => setOpen((state) => !state);

  // const handleModalSubmit = async (
  // 	values: IRoomsFormValues,
  // 	actions: FormikHelpers<IRoomsFormValues>
  // ) => {
  // 	console.log("values", values);
  // };

  // /**
  //  * Rooms Hooks
  //  */
  // // Initialize Menu items
  // const optionSelect: OptionSelect[] = [];

  // const roomsType = Object.values(ERoomType);

  // // Select options list
  // roomsType.map((value) => {
  // 	optionSelect.push({ key: value, value });
  // });

  // const handleRoomSubmit = async (
  // 	values: SearchValue,
  // 	actions: FormikHelpers<SearchValue>
  // ) => {
  // 	console.log("values", values);
  // };

  // // Select Handle Change
  // const handleChange = (event: SelectChangeEvent<any>) => {
  // 	setType(event.target.value);
  // };

  // const modalSchema: ModalSchema[] = [
  // 	{
  // 		fieldType: "selectField",
  // 		id: "type",
  // 		label: "Room type",
  // 		options: optionSelect,
  // 		value: type,
  // 		name: "type",
  // 		inputLabelId: "type",
  // 		labelId: "type",
  // 		onChange: handleChange,
  // 		margin: "dense",
  // 	},
  // 	{
  // 		fieldType: "textField",
  // 		label: "Description",
  // 		name: "description",
  // 		id: "description",
  // 		type: "text",
  // 		margin: "dense",
  // 		inputLabelId: "description",
  // 	},
  // 	{
  // 		fieldType: "textField",
  // 		label: "Amount",
  // 		name: "amount",
  // 		id: "amount",
  // 		type: "number",
  // 		margin: "dense",
  // 		inputLabelId: "amount",
  // 	},
  // ];

  // return {
  // 	handleModalSubmit,
  // 	optionSelect,
  // 	type,
  // 	handleRoomSubmit,
  // 	open,
  // 	toggleModal,
  // 	modalSchema,
  // };
  const handleCreateRoomSubmission = async (
    values: IRoomsFormValues,
    actions: FormikHelpers<IRoomsFormValues>
  ) => {
    console.log("values", values);
  };

  const [type, setType] = useState("");

  const handleChange = (event: SelectChangeEvent<any>) => {
    setType(event.target.value);
  };

  // Initialize Menu items
  const menuItems: MenuItems[] = [];

  const roomsType = Object.values(ERoomType);
  roomsType.forEach((value) => {
    menuItems.push({ key: value, value });
  });

  return {
    handleCreateRoomSubmission,
    type,
    handleChange,
    menuItems,
  };
};
