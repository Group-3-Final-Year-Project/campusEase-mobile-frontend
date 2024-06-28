import React, { useState, useContext } from "react";
import {
  Container,
  Description,
  InputLabel,
  FormControl,
  ContentCard,
  Title,
} from "./styles";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useCustomBottomInset } from "~hooks";
import { Button, Input } from "~components";
import { KeyboardAvoidingView, Platform, View } from "react-native";
import { ThemeContext } from "styled-components/native";

import { StatusBar } from "expo-status-bar";
import PhoneInput from "./components/PhoneInput";
import { CountryCodeText, ErrorLabel } from "../SignInOrUp/styles";
import { useFormik } from "formik";
import * as yup from "yup";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useAppSelector } from "~store/hooks/useTypedRedux";
import { VerifiedUser } from "~src/@types/types";

export const phoneNumberSchema = yup.object().shape({
  phoneNumber: yup
    .string()
    .min(9, "Phone number not valid!")
    .max(10, "Phone number is not valid!")
    .required("Phone number required!"),
});

const EnterPhone = ({ navigation, route }: NativeStackScreenProps<any>) => {
  const insets = useSafeAreaInsets();
  const bottomInset = useCustomBottomInset();
  const themeContext = useContext(ThemeContext);
  const {}: VerifiedUser = useAppSelector((state) => state.user);

  const formik = useFormik({
    initialValues: { phoneNumber: "" },
    validationSchema: phoneNumberSchema,
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      try {
        // if (result.user) {
        //   dispatch(updateUserData(result.user));
        //   resetForm();
        //   navigation.navigate(APP_PAGES.VERIFY_EMAIL);
        // } else {
        // }
      } catch (error) {
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
        <ContentCard
          style={{ paddingTop: insets.top, paddingBottom: bottomInset }}
        >
          <Title>Phone number</Title>

          <Description
            style={{ marginTop: 20, color: themeContext?.colors.secondaryText }}
          >
            We've sent you an email with a 6-digit verification code. Enter the
            code to verify your email.
          </Description>
          <View style={{ marginTop: 40, width: "100%" }}>
            <FormControl>
              <InputLabel>Your phone number</InputLabel>
              <Input
                onChangeText={formik.handleChange("phoneNumber")}
                onBlur={formik.handleBlur("phoneNumber")}
                value={formik.values?.phoneNumber}
                textContentType="telephoneNumber"
                keyboardType="phone-pad"
                placeholder="Phone number"
                icon={<CountryCodeText>🇬🇭 +233</CountryCodeText>}
              />
              {formik.touched?.phoneNumber && formik.errors?.phoneNumber ? (
                <ErrorLabel>{formik.errors?.phoneNumber}</ErrorLabel>
              ) : null}
            </FormControl>

            <FormControl>
              <Button
                loading={formik.isSubmitting}
                onPress={() => formik.handleSubmit}
              >
                Continue
              </Button>
            </FormControl>
          </View>
        </ContentCard>
      </KeyboardAvoidingView>
    </Container>
  );
};

export default EnterPhone;
