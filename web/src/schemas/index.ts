import * as yup from "yup";

// Must contain at least 12 Characters, 1 Uppercase, 1 Lowercase, 1 Special Character, and 1 Number
const passwordPattern =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*[\]{}()?"\\,><':;|_~`=+-])[a-zA-Z\d!@#$%^&*[\]{}()?"\\,><':;|_~`=+-]{12,99}$/;

export const ProcessPaymentSchema = yup.object().shape({
  amountDue: yup.number().optional(),
  amount: yup
    .number()
    .required("This field is required.")
    .min(1, "Amount should be greater than 0"),
});

export const LoginSchema = yup.object().shape({
  username: yup.string().required("This field is required"),
  password: yup.string().required("This field is required"),
});

export const RoomSchema = yup.object().shape({
  id: yup.number().optional(),
  type: yup.string().required("This field is required").nonNullable(),
  description: yup.string().optional(),
  amount: yup
    .number()
    .required("This field is required and should not be equal to 0.")
    .min(1),
  status: yup.string().optional(),
  roomNumber: yup
    .number()
    .min(0, "Value should be greater than 0.")
    .required("This field is required.")
    .nonNullable(),
});

export const SecurityFormSchema = yup.object().shape({
  currentPassword: yup.string().required("This field is required"),
  newPassword: yup
    .string()
    .min(6, "Password must be at least 6 characters")
    .matches(
      passwordPattern,
      "Must contain at least 12 Characters, 1 Uppercase, 1 Lowercase, 1 Special Character, and 1 Number"
    )
    .required("This field is required"),
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
  roomId: yup.number().min(1, "This field is required"),
});

export const CategoryFormSchema = yup.object().shape({
  name: yup.string().required("This field is required"),
  description: yup.string().required("This field is required"),
});
