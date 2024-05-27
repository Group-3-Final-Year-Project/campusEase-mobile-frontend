import React, { useState, useContext } from "react";
import {
  Container,
  Description,
  FormControl,
  ContentCard,
  ErrorLabel,
} from "./styles";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Button, Input } from "~components";
import HeroText from "./components/HeroText";
import { KeyboardAvoidingView, Platform, Pressable, View } from "react-native";
import { ThemeContext } from "styled-components/native";

import { StatusBar } from "expo-status-bar";
import Checkbox from "react-native-ui-lib/checkbox";
import { Iconify } from "react-native-iconify";
import { APP_PAGES } from "~src/shared/constants";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useFormik } from "formik";
import * as yup from "yup";
import { signUserIn, signUserUp } from "~services";
import { useAppDispatch } from "~store/hooks/useTypedRedux";
import { updateUserData } from "~store/actions/userActions";
import { User } from "~src/@types/types";

export const useCustomBottomInset = () => {
  const insets = useSafeAreaInsets();
  return Math.max(20, insets.bottom + 5);
};

export const signupSchema = {
  name: yup.string().min(3, "Name not valid!").required("Name required!"),
  email: yup.string().email("Email not valid!").required("Email required!"),
  password: yup
    .string()
    .min(8, "Password should be 8 characters long!")
    .required("Password required!"),
  phoneNumber: yup
    .string()
    .min(10, "Phone number not valid!")
    .required("Phone number required!"),
  acceptedTerms: yup
    .boolean()
    .oneOf([true], "Agree to terms and conditions to continue")
    .required("Agree to terms and conditions to continue"),
};
export const signinSchema = {
  email: yup.string().email("Email not valid!").required("Email required!"),
  password: yup.string().required("Password required!"),
};

const SignInOrUp = ({ navigation, route }: NativeStackScreenProps<any>) => {
  const insets = useSafeAreaInsets();
  const bottomInset = useCustomBottomInset();
  const themeContext = useContext(ThemeContext);
  const [showPassword, setShowPassword] = useState(true);
  const [isSignup, setIsSignup] = useState<boolean>(
    route.params?.isSignup || true
  );
  const dispatch = useAppDispatch();

  const signinInitialValues = {
    email: "",
    password: "",
  };
  const signupInitialValues = {
    name: "",
    email: "",
    password: "",
    phoneNumber: "",
    acceptedTerms: false,
  };

  const signUpFormik = useFormik({
    initialValues: signupInitialValues,
    validationSchema: signupSchema,
    onSubmit: async (values, { setSubmitting }) => {
      await signUserUp(values)
        .then((res) => {
          dispatch(updateUserData(res as User));
          navigation.navigate(APP_PAGES.VERIFY_EMAIL);
        })
        .catch((err) => {
          // will show a toast or modal here for failed auth
          throw Error(err);
        })
        .finally(() => setSubmitting(false));
    },
  });

  const signInFormik = useFormik({
    initialValues: signinInitialValues,
    validationSchema: signinSchema,
    onSubmit: async (values, { setSubmitting }) => {
      await signUserIn(values)
        .then((res) => {
          dispatch(updateUserData(res as User));
          navigation.navigate(APP_PAGES.HOME);
        })
        .catch((err) => {
          // will show a toast or modal here for failed auth
          throw Error(err);
        })
        .finally(() => setSubmitting(false));
    },
  });

  const formik = isSignup ? signUpFormik : signInFormik;

  return (
    <Container>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        style={{ flexGrow: 1 }}
      >
        <StatusBar style={themeContext?.dark ? "light" : "dark"} />
        <ContentCard
          style={{ paddingTop: insets.top, paddingBottom: bottomInset }}
        >
          <HeroText isSignup={isSignup} />

          <Description
            style={{ marginTop: 20, color: themeContext?.colors.secondaryText }}
          >
            {isSignup
              ? "Hey there! Sign up with your email to continue."
              : "Hey there! Welcome back. You've been missed."}
          </Description>
          <View style={{ marginTop: 40, width: "100%" }}>
            {isSignup && (
              <FormControl>
                <Input
                  onChangeText={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values["name"]}
                  textContentType="name"
                  placeholder="john doe"
                  icon={
                    <Iconify
                      color={themeContext?.colors.secondaryText2}
                      icon="solar:user-rounded-outline"
                    />
                  }
                />
                {formik.touched["name"] && formik.errors["name"] ? (
                  <ErrorLabel>{formik.errors["name"]}</ErrorLabel>
                ) : null}
              </FormControl>
            )}
            <FormControl>
              <Input
                onChangeText={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values["email"]}
                textContentType="emailAddress"
                placeholder="johndoe@gmail.com"
                icon={
                  <Iconify
                    color={themeContext?.colors.secondaryText2}
                    icon="solar:letter-outline"
                  />
                }
              />
              {formik.touched["email"] && formik.errors["email"] ? (
                <ErrorLabel>{formik.errors["email"]}</ErrorLabel>
              ) : null}
            </FormControl>
            <FormControl>
              <Input
                onChangeText={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values["password"]}
                textContentType={isSignup ? "newPassword" : "password"}
                secureTextEntry={!showPassword}
                placeholder="********"
                icon={
                  <Iconify
                    color={themeContext?.colors.secondaryText2}
                    icon="solar:shield-keyhole-outline"
                  />
                }
                rightIcon={
                  <Pressable onPress={() => setShowPassword(!showPassword)}>
                    {showPassword ? (
                      <Iconify
                        color={themeContext?.colors.secondaryText2}
                        icon="solar:eye-closed-outline"
                      />
                    ) : (
                      <Iconify
                        color={themeContext?.colors.secondaryText2}
                        icon="solar:eye-outline"
                      />
                    )}
                  </Pressable>
                }
              />
              {formik.touched["password"] && formik.errors["password"] ? (
                <ErrorLabel>{formik.errors["password"]}</ErrorLabel>
              ) : null}
            </FormControl>
            {isSignup && (
              <FormControl>
                <Checkbox
                  value={formik.values["acceptedTerms"]}
                  label="I have read and agree to the terms and conditions"
                  labelStyle={{
                    color: themeContext?.colors.secondaryText,
                  }}
                  color={themeContext?.colors.secondaryText2}
                  iconColor={themeContext?.colors.primary}
                  onValueChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
              </FormControl>
            )}
            <FormControl>
              <Button
                loading={formik.isSubmitting}
                // @ts-ignore
                onPress={formik.handleSubmit}
                // onPress={() => navigation.navigate(APP_PAGES.VERIFY_EMAIL)}
              >
                {isSignup ? "Continue" : "Sign in"}
              </Button>
            </FormControl>
          </View>
        </ContentCard>
      </KeyboardAvoidingView>
    </Container>
  );
};

export default SignInOrUp;
