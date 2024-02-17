import * as yup from "yup";

export const LoginSchema = yup.object().shape({
  username: yup.string().required("This field is required"),
  password: yup.string().required("This field is required"),
});

export const RoomSchema = yup.object().shape({
  id: yup.number().optional(),
  type: yup.string().required("This field is required"),
  description: yup.string().optional(),
  amount: yup.number().required("This field is required"),
  status: yup.string().optional(),
});

export const SecurityFormSchema = yup.object().shape({
  currentPassword: yup.string().required("This field is required"),
  newPassword: yup.string().required("This field is required"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("newPassword"), ""], "Password must match")
    .required("This field is required"),
});

export const TenantFormSchema = yup.object().shape({
  id: yup.number().optional(),
  name: yup.string().required("This field is required"),
  contact: yup.string().required("This field is required"),
  address: yup.string().required("This field is required"),
  roomId: yup.number().optional(),
  amount: yup.number().optional(),
});
