import React, { useContext } from "react";
import { useCustomBottomInset } from "~hooks";
import { Button, Input, HeroText } from "~components";
import { KeyboardAvoidingView, Platform, View } from "react-native";
import { ThemeContext } from "styled-components/native";

import { StatusBar } from "expo-status-bar";
import { APP_PAGES } from "~src/shared/constants";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useFormik } from "formik";
import * as yup from "yup";
import {
  ContentCard,
  Container,
  Description,
  ErrorLabel,
  FormControl,
  InputLabel,
} from "../Signup/styles";
import { SubService } from "~src/@types/types";
import { CountryCodeContainer, CountryCodeText } from "../EnterPhone/styles";
import { Iconify } from "react-native-iconify";
import { AddAttachmentBtn } from "../MoreBookingInfo/styles";

export const servicePricingSchema = yup.object().shape({
  startingPrice: yup.string().required("Starting price required!"),
  subServices: yup
    .array()
    .of(yup.object<SubService>("Sub service invalid"))
    .notRequired(),
});

const SetServicePricing = ({
  navigation,
  route,
}: NativeStackScreenProps<any>) => {
  const bottomInset = useCustomBottomInset();
  const themeContext = useContext(ThemeContext);

  const servicePricingInitialValues = {
    startingPrice: "",
    subServices: [],
  };

  const formik = useFormik({
    initialValues: servicePricingInitialValues,
    validationSchema: servicePricingSchema,
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      try {
        navigation.navigate(APP_PAGES.SET_SERVICE_LOCATION);
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
        <ContentCard style={{ paddingBottom: bottomInset }}>
          <View>
            <HeroText text={"Service Pricing"} />
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
              <InputLabel>Starting price</InputLabel>
              <View style={{ flexDirection: "row" }}>
                <CountryCodeContainer>
                  <CountryCodeText>🇬🇭 {"  "}GHS</CountryCodeText>
                </CountryCodeContainer>
                <Input
                  onChangeText={formik.handleChange("startingPrice")}
                  onBlur={formik.handleBlur("startingPrice")}
                  value={formik.values.startingPrice}
                  textContentType="telephoneNumber"
                  keyboardType="phone-pad"
                  placeholder="Starting price"
                />
              </View>
              {formik.touched?.startingPrice && formik.errors?.startingPrice ? (
                <ErrorLabel>{formik.errors?.startingPrice}</ErrorLabel>
              ) : null}
            </FormControl>
            <FormControl>
              <InputLabel>Sub services</InputLabel>
              {formik.values.subServices.flatMap((service) => (
                <View style={{ flexDirection: "row" }} key={service?.id}>
                  <CountryCodeContainer>
                    <CountryCodeText>{service?.name}</CountryCodeText>
                  </CountryCodeContainer>
                  <Input
                    // onChangeText={formik.handleChange("startingPrice")}
                    // onBlur={formik.handleBlur("startingPrice")}
                    value={service?.price}
                    textContentType="telephoneNumber"
                    keyboardType="phone-pad"
                    placeholder="Phone number"
                  />
                </View>
              ))}
              <AddAttachmentBtn onPress={() => null}>
                <Iconify
                  color={themeContext?.colors.secondaryText2}
                  icon="solar:add-square-outline"
                  style={{ marginRight: 7 }}
                />
                <Description
                  style={{ color: themeContext?.colors.secondaryText2 }}
                >
                  Add attachments
                </Description>
              </AddAttachmentBtn>

              {formik.touched?.startingPrice && formik.errors?.subServices ? (
                <ErrorLabel>{formik.errors?.subServices}</ErrorLabel>
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
            Continue
          </Button>
        </View>
      </KeyboardAvoidingView>
    </Container>
  );
};

export default SetServicePricing;
