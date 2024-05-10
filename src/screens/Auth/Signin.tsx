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
  LinkText,
  Link,
  Divider,
  Pressable,
  HStack,
  ButtonIcon,
} from "@gluestack-ui/themed";
import { StyleSheet, StatusBar } from "react-native";
import { useFormik } from "formik";
import * as yup from "yup";
import { useState } from "react";
import { APP_PAGES } from "../../shared/constants";
import BeautyButton from "../../components/BeautyButton";
import BeautyInputField from "../../components/BeautyInputField";
import { theme } from "../../shared/theme";
import { CustomNavigationProp } from "../../shared/types";
import MainContainer from "../../hocs/MainContainer";
import Logo from "../../components/Logo";
import { Iconify } from "react-native-iconify";
import SocialAccountAuth from "./SocialAccountAuth";

const signinSchema = yup.object().shape({
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup.string().required("Password is required"),
});

const signinInitialValues = {
  email: "",
  password: "",
};
const Signin = (props: CustomNavigationProp) => {
  const toast = useToast();
  const formik = useFormik({
    initialValues: signinInitialValues,
    validationSchema: signinSchema,
    onSubmit: (values, { resetForm }) => {
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
              <Heading style={styles.headerText}>Welcome Back</Heading>
              <Text style={styles.subHeaderText}>
                Log in to your account using <>{"\n"}</> mobile number or social
                networks
              </Text>
            </VStack>

            <VStack>
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
              <Box
                w="$full"
                flexDirection={"row"}
                justifyContent="flex-end"
                marginBottom={20}
              >
                <Link>
                  <LinkText color={theme.PRIMARY_COLOR}>
                    Forgot password?
                  </LinkText>
                </Link>
              </Box>
              <BeautyButton
                variant="solid"
                title="Login"
                isRounded
                onPress={formik.handleSubmit}
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
              <Pressable
                onPress={() => props.navigation.replace(APP_PAGES.SIGNUP)}
              >
                <Text style={styles.changeAuthPageText}>
                  Don't have an account?{" "}
                  <Text color="$primary500" fontSize="$xs">
                    Sign Up
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

export default Signin;
