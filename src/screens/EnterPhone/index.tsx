import React, { useCallback, useContext } from "react";
import { CountryCodeContainer, CountryCodeText } from "./styles";
import { useSafeAreaInsets } from "react-native-safe-area-context";
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
import { useAppSelector } from "~store/hooks/useTypedRedux";
import { VerifiedUser } from "~src/@types/types";
import { MaskService } from "react-native-masked-text";
import { APP_PAGES } from "~src/shared/constants";

export const phoneNumberSchema = yup.object().shape({
  phoneNumber: yup
    .string()
    .min(9, "Phone number not valid!")
    .max(10, "Phone number is not valid!")
    .required("Phone number required!"),
});

const EnterPhone = ({ navigation, route }: NativeStackScreenProps<any>) => {
  const bottomInset = useCustomBottomInset();
  const themeContext = useContext(ThemeContext);
  const {}: VerifiedUser = useAppSelector((state) => state.user);

  const formik = useFormik({
    initialValues: { phoneNumber: "" },
    validationSchema: phoneNumberSchema,
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      try {
        navigation.navigate(APP_PAGES.SET_LOCATION);
      } catch (error) {
        throw Error(error as any);
      } finally {
        setSubmitting(false);
      }
    },
  });

  const formatPhone = useCallback((tel: string) => {
    const formattedNumber = MaskService.toMask("cel-phone", tel || "");
    return formattedNumber;
  }, []);

  return (
    <Container>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        style={{ flexGrow: 1 }}
      >
        <StatusBar style={themeContext?.dark ? "light" : "dark"} />
        <ContentCard style={{ paddingBottom: bottomInset }}>
          <View>
            <HeroText text={"Phone number"} />
            <Description
              style={{
                marginTop: 10,
                color: themeContext?.colors.secondaryText2,
              }}
            >
              Enter your phone number so that we can send you notifications.
            </Description>
          </View>
          <View style={{ marginTop: 40, width: "100%" }}>
            <FormControl>
              <View style={{ flexDirection: "row" }}>
                <CountryCodeContainer>
                  <CountryCodeText>🇬🇭 {"  "}+233</CountryCodeText>
                </CountryCodeContainer>
                <Input
                  onChangeText={formik.handleChange("phoneNumber")}
                  onBlur={formik.handleBlur("phoneNumber")}
                  value={formik.values.phoneNumber}
                  textContentType="telephoneNumber"
                  keyboardType="phone-pad"
                  placeholder="Phone number"
                />
              </View>

              {formik.touched?.phoneNumber && formik.errors?.phoneNumber ? (
                <ErrorLabel>{formik.errors?.phoneNumber}</ErrorLabel>
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

export default EnterPhone;
