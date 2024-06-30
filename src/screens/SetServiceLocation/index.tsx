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
import { APP_PAGES } from "~src/shared/constants";
import { Iconify } from "react-native-iconify";

export const locationSchema = yup.object().shape({
  location: yup.string().required("Address required!"),
});

const SetServiceLocation = ({
  navigation,
  route,
}: NativeStackScreenProps<any>) => {
  const bottomInset = useCustomBottomInset();
  const themeContext = useContext(ThemeContext);
  // const {}: VerifiedUser = useAppSelector((state) => state.user);

  const formik = useFormik({
    initialValues: { location: "" },
    validationSchema: locationSchema,
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      try {
        navigation.navigate(APP_PAGES.SET_USER_TYPE);
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
            <HeroText text={"Service Location"} />
            <Description
              style={{
                marginTop: 10,
                color: themeContext?.colors.secondaryText2,
              }}
            >
              Set your service location.
            </Description>
          </View>
          <View style={{ marginTop: 40, width: "100%" }}>
            <FormControl>
              <View style={{ flexDirection: "row" }}>
                <Input
                  onChangeText={formik.handleChange("location")}
                  onBlur={formik.handleBlur("location")}
                  value={formik.values.location}
                  textContentType="addressCityAndState"
                  placeholder="Location"
                  icon={
                    <Iconify
                      icon="solar:map-point-outline"
                      size={18}
                      color={themeContext?.colors.secondaryText2}
                    />
                  }
                />
              </View>

              {formik.touched?.location && formik.errors?.location ? (
                <ErrorLabel>{formik.errors?.location}</ErrorLabel>
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
            Finish up
          </Button>
        </View>
      </KeyboardAvoidingView>
    </Container>
  );
};

export default SetServiceLocation;
