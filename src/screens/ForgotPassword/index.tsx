import React, { useContext } from "react";
import { useCustomBottomInset } from "~hooks";
import { Button, Input, HeroText } from "~components";
import { KeyboardAvoidingView, Platform, View } from "react-native";
import { ThemeContext } from "styled-components/native";

import { StatusBar } from "expo-status-bar";
import {
  ErrorLabel,
  Container,
  FormControl,
  Description,
  ContentCard,
} from "../Signup/styles";
import { useFormik } from "formik";
import * as yup from "yup";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Iconify } from "react-native-iconify";
import {
  getFirebaseErrorMessage,
  handleUserForgotPassword,
  showAlert,
} from "~services";

export const forgotPasswordSchema = yup.object().shape({
  email: yup.string().email("Email not valid!").required("Email required!"),
});

const ForgotPassword = ({ navigation }: NativeStackScreenProps<any>) => {
  const bottomInset = useCustomBottomInset();
  const themeContext = useContext(ThemeContext);

  const forgotPasswordInitialValues = {
    email: "",
  };

  const formik = useFormik<{
    email: string;
  }>({
    initialValues: forgotPasswordInitialValues,
    validationSchema: forgotPasswordSchema,
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      try {
        await handleUserForgotPassword(values.email)
          .then(() => {
            showAlert(
              "Sent!",
              "A password reset link has been sent to your email"
            );
          })
          .catch((err: any) => {
            showAlert("Oops!", getFirebaseErrorMessage(err.code));
          });
      } catch (error) {
        showAlert("Oops!", "Something went wrong");
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
            <HeroText text={"Forgot Password?"} />
            <Description
              style={{
                marginTop: 10,
                color: themeContext?.colors.secondaryText2,
              }}
            >
              Don't worry. We've got you. Enter your email to get a reset
              password link
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
          </View>
        </ContentCard>
        <View style={{ position: "absolute", bottom: 0, width: "100%" }}>
          <Button
            loading={formik.isSubmitting}
            // @ts-ignore
            onPress={formik.handleSubmit}
          >
            Continue
          </Button>
        </View>
      </KeyboardAvoidingView>
    </Container>
  );
};

export default ForgotPassword;
