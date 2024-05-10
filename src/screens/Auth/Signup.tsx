import {
  Heading,
  FormControl,
  useToast,
  Toast,
  ToastTitle,
  VStack,
  Box,
  InputIcon,
  InputSlot,
  EyeIcon,
  EyeOffIcon,
  Text,
  Pressable,
} from "@gluestack-ui/themed";
import { StyleSheet, StatusBar } from "react-native";
import { useFormik } from "formik";
import * as yup from "yup";
import { useState } from "react";
import { APP_PAGES } from "../../shared/constants";
import BeautyButton from "../../components/BeautyButton";
import BeautyInputField from "../../components/BeautyInputField";
import { theme } from "../../shared/theme";
import { COMMON_STYLES } from "../../shared/constants";
import { CustomNavigationProp } from "../../shared/types";
import MainContainer from "../../hocs/MainContainer";
import Logo from "../../components/Logo";
import SocialAccountAuth from "./SocialAccountAuth";

const registerSchema = yup.object().shape({
  name: yup
    .string()
    .required("Name is required")
    .min(3, "Name must be at least 3 characters")
    .max(50, "Name must be at most 50 characters"),
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup
    .string()
    .min(8, "Password must be at least 8 characters")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
      "Password must contain at least one uppercase letter, one lowercase letter, one digit, and one special character"
    )
    .required("Password is required"),
  confirm_password: yup
    .string()
    .oneOf([yup.ref("password")], "Passwords must match")
    .required("Confirm password is required"),
});

const registerInitialValues = {
  name: "",
  email: "",
  password: "",
  confirm_password: "",
};
const Signup = ({ navigation }: CustomNavigationProp) => {
  const toast = useToast();
  const formik = useFormik({
    initialValues: registerInitialValues,
    validationSchema: registerSchema,
    onSubmit: (values, { resetForm }) => {
      navigation.navigate(APP_PAGES.SET_LOCATION_PROMPT);
      toast.show({
        placement: "bottom",
        render: ({ id }) => {
          return (
            <Toast variant="accent" action="success">
              <ToastTitle>Signed in successfully</ToastTitle>
            </Toast>
          );
        },
      });
      resetForm();
    },
  });
  const [showPassword, setShowPassword] = useState(false);

  const handleState = () => {
    setShowPassword((showState) => {
      return !showState;
    });
  };
  return (
    <MainContainer>
      <Box height="$full">
        <Box
          flex={1}
          alignSelf="center"
          justifyContent="center"
          w="$full"
          paddingHorizontal={20}
          paddingTop={97 - (StatusBar?.currentHeight || 0)}
        >
          <Box
            marginBottom={30}
            height={64}
            width={116}
            alignSelf="center"
            justifyContent="center"
            alignItems="center"
            w="$full"
          >
            <Logo />
          </Box>
          <VStack>
            <VStack marginBottom={20} paddingHorizontal={19}>
              <Heading style={styles.headerText}>Create New Account</Heading>
              <Text style={[styles.subHeaderText, COMMON_STYLES.text]}>
                Set up your username and password <>{"\n"}</> You can always
                change it later
              </Text>
            </VStack>

            <VStack>
              <FormControl
                isRequired={true}
                isInvalid={!!formik.errors.name}
                style={styles.formControl}
              >
                <BeautyInputField
                  placeholder="Enter Name"
                  type="text"
                  onChangeText={formik.handleChange("name")}
                  onBlur={formik.handleBlur("name")}
                  value={formik.values?.name}
                />
              </FormControl>
              <FormControl
                isRequired={true}
                isInvalid={!!formik.errors.email}
                style={styles.formControl}
              >
                <BeautyInputField
                  placeholder="Enter Email"
                  type="text"
                  onChangeText={formik.handleChange("email")}
                  onBlur={formik.handleBlur("email")}
                  value={formik.values?.email}
                />
              </FormControl>
              <FormControl
                isRequired={true}
                isInvalid={!!formik.errors.password}
                style={styles.formControl}
              >
                <BeautyInputField
                  placeholder="Enter Password"
                  onChangeText={formik.handleChange("password")}
                  onBlur={formik.handleBlur("password")}
                  value={formik.values?.password}
                  type={showPassword ? "text" : "password"}
                  rightInputSlot={
                    <InputSlot onPress={handleState} pr="$3">
                      <InputIcon as={showPassword ? EyeIcon : EyeOffIcon} />
                    </InputSlot>
                  }
                />
              </FormControl>
              <FormControl
                isRequired={true}
                isInvalid={!!formik.errors.confirm_password}
                style={styles.formControl}
              >
                <BeautyInputField
                  placeholder="Re-enter Password"
                  onChangeText={formik.handleChange("confirm_password")}
                  onBlur={formik.handleBlur("confirm_password")}
                  value={formik.values?.confirm_password}
                  type={showPassword ? "text" : "password"}
                  rightInputSlot={
                    <InputSlot onPress={handleState} pr="$3">
                      <InputIcon as={showPassword ? EyeIcon : EyeOffIcon} />
                    </InputSlot>
                  }
                />
              </FormControl>
              <BeautyButton
                variant="solid"
                title="Sign up"
                onPress={formik.handleSubmit}
                styles={{ marginTop: 10 }}
                isRounded
              />
            </VStack>

            <Box
              marginTop={30}
              marginBottom={20}
              display="flex"
              flexDirection="row"
              alignSelf="center"
              justifyContent="center"
              w="$full"
            >
              <SocialAccountAuth />
            </Box>

            <Box marginTop={10}>
              <Pressable onPress={() => navigation.replace(APP_PAGES.SIGNIN)}>
                <Text style={styles.changeAuthPageText}>
                  Already have an account?{" "}
                  <Text color="$primary500" fontSize="$xs">
                    Login
                  </Text>
                </Text>
              </Pressable>
            </Box>
          </VStack>
        </Box>
      </Box>
    </MainContainer>
  );
};

const styles = StyleSheet.create({
  headerText: {
    marginBottom: 5,
    fontSize: 24,
    fontWeight: "900",
    textAlign: "center",
    verticalAlign: "middle",
  },
  subHeaderText: {
    fontSize: 14,
    fontWeight: "100",
    lineHeight: 22,
    textAlign: "center",
    verticalAlign: "middle",
    color: theme.ACCENT,
  },
  changeAuthPageText: {
    fontSize: 14,
    fontWeight: "100",
    lineHeight: 22,
    textAlign: "center",
    verticalAlign: "middle",
  },
  formControl: {
    marginBottom: 20,
  },
});

export default Signup;
