import React, { useState, useContext } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useCustomBottomInset } from "~hooks";
import { Button, Input, HeroText } from "~components";
import { KeyboardAvoidingView, Platform, Pressable, View } from "react-native";
import { ThemeContext } from "styled-components/native";

import { StatusBar } from "expo-status-bar";
import { Iconify } from "react-native-iconify";
import { APP_PAGES } from "~src/shared/constants";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useFormik } from "formik";
import * as yup from "yup";
import {
  getFirebaseErrorMessage,
  navigateAndResetStack,
  showAlert,
  signinUserWithEmailAndPassword,
} from "~services";
import { useAppDispatch } from "~store/hooks/useTypedRedux";
import {
  ContentCard,
  Container,
  Description,
  ErrorLabel,
  FormControl,
  HighlightedDescription,
} from "../Signup/styles";
import ACTION_TYPES from "~store/actionTypes";

export const signinSchema = yup.object().shape({
  email: yup.string().email("Email not valid!").required("Email required!"),
  password: yup.string().required("Password required!"),
});

const Login = ({ navigation, route }: NativeStackScreenProps<any>) => {
  const insets = useSafeAreaInsets();
  const bottomInset = useCustomBottomInset();
  const themeContext = useContext(ThemeContext);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const [dialogVisible, setDialogVisible] = useState<boolean>(false);

  const signinInitialValues = {
    email: "",
    password: "",
  };

  const formik = useFormik({
    initialValues: signinInitialValues,
    validationSchema: signinSchema,
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      try {
        const result = await signinUserWithEmailAndPassword(
          values.email,
          values.password
        );
        console.log("User: ", result);
        if (result.user) {
          dispatch({
            type: ACTION_TYPES.UPDATE_USER_DATA,
            payload: result.user,
          });
          resetForm();
          navigateAndResetStack(navigation, APP_PAGES.USER_TAB);
        } else {
          showAlert(
            "Oops, authentication failed!",
            getFirebaseErrorMessage(result.error.errorCode ?? "")
          );
        }
      } catch (error) {
        showAlert("Oops, authentication failed!", getFirebaseErrorMessage());
        throw Error(error as any);
      } finally {
        setSubmitting(false);
      }
    },
  });

  return (
    <Container>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        style={{ flexGrow: 1 }}
      >
        <StatusBar style={themeContext?.dark ? "light" : "dark"} />
        <ContentCard style={{ paddingBottom: bottomInset }}>
          <View>
            <HeroText text={"Sign in"} />
            <Description
              style={{
                marginTop: 10,
                color: themeContext?.colors.secondaryText2,
              }}
            >
              Hey there! Welcome back. You've been missed.
            </Description>
          </View>
          <View style={{ marginTop: 40, width: "100%" }}>
            <FormControl>
              <Input
                onChangeText={formik.handleChange("email")}
                onBlur={formik.handleBlur("email")}
                value={formik.values?.email}
                textContentType="emailAddress"
                placeholder="Email"
                icon={
                  <Iconify
                    size={18}
                    color={themeContext?.colors.secondaryText2}
                    icon="solar:letter-outline"
                  />
                }
              />
              {formik.touched?.email && formik.errors?.email ? (
                <ErrorLabel>{formik.errors?.email}</ErrorLabel>
              ) : null}
            </FormControl>
            <FormControl>
              <Input
                onChangeText={formik.handleChange("password")}
                onBlur={formik.handleBlur("password")}
                value={formik.values?.password}
                textContentType={"password"}
                secureTextEntry={!showPassword}
                placeholder="Password"
                icon={
                  <Iconify
                    size={18}
                    color={themeContext?.colors.secondaryText2}
                    icon="solar:shield-keyhole-outline"
                  />
                }
                rightIcon={
                  <Pressable onPress={() => setShowPassword(!showPassword)}>
                    {showPassword ? (
                      <Iconify
                        size={18}
                        color={themeContext?.colors.secondaryText2}
                        icon="solar:eye-closed-outline"
                      />
                    ) : (
                      <Iconify
                        size={18}
                        color={themeContext?.colors.secondaryText2}
                        icon="solar:eye-outline"
                      />
                    )}
                  </Pressable>
                }
              />
              {formik.touched?.password && formik.errors?.password ? (
                <ErrorLabel>{formik.errors?.password}</ErrorLabel>
              ) : null}
            </FormControl>
          </View>
        </ContentCard>
        <View style={{ position: "absolute", bottom: 0, width: "100%" }}>
          <Button
            loading={formik.isSubmitting}
            // @ts-ignore
            onPress={formik.handleSubmit}
            // onPress={() => navigation.navigate(APP_PAGES.VERIFY_EMAIL)}
          >
            Sign in
          </Button>
          <Pressable onPress={() => navigation.navigate(APP_PAGES.SIGNUP)}>
            <Description
              style={{
                textAlign: "center",
                marginTop: 10,
                fontSize: 12,
              }}
            >
              Don't have an account?{" "}
              <HighlightedDescription
                style={{
                  textAlign: "center",
                  marginTop: 20,
                  fontSize: 12,
                }}
              >
                Sign up
              </HighlightedDescription>
            </Description>
          </Pressable>
        </View>
      </KeyboardAvoidingView>
    </Container>
  );
};

export default Login;
