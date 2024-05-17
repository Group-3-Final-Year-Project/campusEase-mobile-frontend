import { StyleSheet, Text, View } from "react-native";
import React from "react";

const SignInOrUp = () => {
  return (
    <View>
      <Text>SignInOrUp</Text>
    </View>
  );
};

export default SignInOrUp;

const styles = StyleSheet.create({});

// const registerSchema = yup.object().shape({
//   name: yup
//     .string()
//     .required("Name is required")
//     .min(3, "Name must be at least 3 characters")
//     .max(50, "Name must be at most 50 characters"),
//   email: yup.string().email("Invalid email").required("Email is required"),
//   password: yup
//     .string()
//     .min(8, "Password must be at least 8 characters")
//     .matches(
//       /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
//       "Password must contain at least one uppercase letter, one lowercase letter, one digit, and one special character"
//     )
//     .required("Password is required"),
//   phone_number: yup
//     .string()
//     .min(8, "Phone number must be at least 8 characters")
//     .required("Phone number is required"),
// });

// const signinSchema = yup.object().shape({
//   email: yup.string().email("Invalid email").required("Email is required"),
//   password: yup.string().required("Password is required"),
// });
// const signinInitialValues = {
//   email: "",
//   password: "",
// };

// const registerInitialValues = {
//   name: "",
//   email: "",
//   password: "",
//   phone_number: "",
// };
