import { FormikHelpers } from "formik";
import { useState } from "react";
import { Field, InputFieldProps } from "@/components/hooks/useModal";
import { useRoomApi } from "@/hooks/api/room";
import { useSnackbar } from "@/hooks/useSnackbar";
import { OptionSelect, SelectFieldProps } from "@/components/Select";
import { ActionButtonProps, Column, TableActions } from "@/components/Table";
import { ButtonName } from "@/components/Modal";

export type RoomsFormValues = {
	id?: number;
	type: string;
	description?: string;
	amount: number;
	status?: string;
};

export type SearchRoom = {
	keyword: string;
};

/**
 * Schema Properties
 * extend of {@link TableActions} props
 */
interface Schema extends RoomsFormValues, TableActions {}

export const useHooks = () => {
	const { handleCreateRoom } = useRoomApi();
	const { setSnackbarProps } = useSnackbar();
	const [btnName, setBtnName] = useState<ButtonName>("Save");
	const [open, setOpen] = useState(false);
	const [title, setTitle] = useState("CREATE ROOMS");

	const [initialValues, setInitialValues] = useState<RoomsFormValues>({
		id: undefined,
		type: "",
		description: "",
		amount: 0,
		status: "",
	});

	const toggleModal = () => setOpen((modalState) => !modalState);

	const roomTypes: OptionSelect[] = [
		{ key: "room1", value: "Family" },
		{ key: "room2", value: "Deluxe" },
		{ key: "room3", value: "Standard" },
		{ key: "room4", value: "Barkada" },
	];

	// Form fields
	const fields: Field<InputFieldProps | SelectFieldProps>[] = [
		{
			fieldType: "select",
			fieldProps: <SelectFieldProps>{
				id: "type",
				label: "Room type",
				options: roomTypes,
				inputLabelId: "type",
				labelId: "type",
				margin: "dense",
				name: "type",
				defaultValue: "",
			},
		},
		{
			fieldType: "text",
			fieldProps: <InputFieldProps>{
				label: "Description",
				name: "description",
				id: "description",
				type: "text",
				margin: "dense",
			},
		},
		{
			fieldType: "text",
			fieldProps: <InputFieldProps>{
				label: "Amount",
				name: "amount",
				id: "amount",
				type: "number",
				margin: "dense",
			},
		},
	];

	const dataSource: RoomsFormValues[] = [
		{
			id: 1,
			type: "room1",
			description:
				"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua",
			amount: 1000,
			status: "Available",
		},
		{
			id: 2,
			type: "room2",
			description:
				"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua",
			amount: 2000,
			status: "Available",
		},
		{
			id: 3,
			type: "room3",
			description:
				"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua",
			amount: 3000,
			status: "Available",
		},
	];

	const columnSchema: Column<Schema>[] = [
		{
			key: "type",
			label: "type",
		},
		{
			key: "description",
			label: "description",
		},
		{
			key: "amount",
			label: "amount",
			format: (value: number) => value.toLocaleString("en-US"),
		},
		{
			key: "status",
			label: "status",
		},
		{
			key: "actions",
			label: "actions",
		},
	];

	const handleSearch = async (
		values: SearchRoom,
		_: FormikHelpers<SearchRoom>
	) => {
		console.log("values", values);
	};

	const handleSave = async (
		{ description, amount, type }: RoomsFormValues,
		{ setSubmitting, resetForm }: FormikHelpers<RoomsFormValues>
	) => {
		try {
			await handleCreateRoom({
				amount,
				type,
				description,
			});

			setSnackbarProps({
				open: true,
				message: "Room is successfully created!",
				severity: "success",
			});

			setSubmitting(false);
			resetForm({ values: initialValues });

			toggleModal();
		} catch (e: any) {
			setSnackbarProps({
				open: true,
				message: e.message || "Something went wrong, please try again later.",
				severity: "success",
			});

			toggleModal();
		}
	};

	const handleSaveChanges = (
		{ id, description, amount, type }: RoomsFormValues,
		{ setSubmitting, resetForm }: FormikHelpers<RoomsFormValues>
	) => {
		console.log("values", id, description, amount, type);
	};

	/**
	 * Handle Click event
	 * @param element
	 */
	const handleEditClick = (element: RoomsFormValues) => {
		setTitle("EDIT ROOMS");
		setBtnName("Save changes");
		setInitialValues({ ...element });
		toggleModal();
	};

	const handleAddTenantClick = (element: RoomsFormValues) => {
		console.log("Add tenant element", element);
	};

	const tableActions: ActionButtonProps<RoomsFormValues>[] = [
		{
			name: "tenant",
			variant: "contained",
			color: "secondary",
			handleClick: handleAddTenantClick,
		},
		{
			name: "Edit",
			variant: "contained",
			handleClick: handleEditClick,
		},
	];

	const handleSubmit = btnName === "Save" ? handleSave : handleSaveChanges;

	return {
		handleSubmit,
		btnName,
		fields,
		toggleModal,
		open,
		initialValues,
		handleSearch,
		dataSource,
		columnSchema,
		tableActions,
		title,
	};
};
