import React, { useContext, useState } from "react";
import { useCustomBottomInset } from "~hooks";
import { Button, Input, HeroText } from "~components";
import { Keyboard, KeyboardAvoidingView, Platform, View } from "react-native";
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
import { UserType, VerifiedUser } from "~src/@types/types";
import { APP_PAGES } from "~src/shared/constants";
import { Iconify } from "react-native-iconify";
import AdvancedActionSheet from "~components/AdvancedActionSheet";
import { navigateAndResetStack } from "~services";

export const userTypeSchema = yup.object().shape({
  userType: yup
    .string()
    .oneOf(
      [UserType.SERVICE_PROVIDER, UserType.USER],
      "User type should either User or Service rovider"
    )
    .required("User type required!"),
});

const SetUserType = ({ navigation, route }: NativeStackScreenProps<any>) => {
  const bottomInset = useCustomBottomInset();
  const themeContext = useContext(ThemeContext);
  const {}: VerifiedUser = useAppSelector((state) => state.user);

  const formik = useFormik({
    initialValues: { userType: "" },
    validationSchema: userTypeSchema,
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      try {
        if (values.userType === UserType.USER)
          navigateAndResetStack(navigation, APP_PAGES.HOME);
        else if (values.userType === UserType.SERVICE_PROVIDER)
          navigateAndResetStack(navigation, APP_PAGES.SET_SERVICE_DETAILS);
        else return;
      } catch (error) {
        throw Error(error as any);
      } finally {
        setSubmitting(false);
      }
    },
  });

  const [isVisible, setIsVisible] = useState(false);

  const options = [
    {
      label: "User",
      onPress: () => formik.setFieldValue("userType", UserType.USER),
    },
    {
      label: "Service Provider",
      onPress: () =>
        formik.setFieldValue("userType", UserType.SERVICE_PROVIDER),
    },
  ];

  return (
    <Container>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        style={{ flexGrow: 1 }}
      >
        <StatusBar style={themeContext?.dark ? "light" : "dark"} />
        <ContentCard style={{ paddingBottom: bottomInset }}>
          <View>
            <HeroText text={"Start as..."} />
            <Description
              style={{
                marginTop: 10,
                color: themeContext?.colors.secondaryText2,
              }}
            >
              Choose whether to start as a service proovider or user. You can
              change it later.
            </Description>
          </View>
          <View style={{ marginTop: 40, width: "100%" }}>
            <FormControl>
              <View style={{ flexDirection: "row" }}>
                <Input
                  // readOnly

                  onPress={() => {
                    setIsVisible(true);
                    Keyboard.dismiss();
                  }}
                  onBlur={formik.handleBlur("userType")}
                  value={formik.values.userType}
                  textContentType="addressCityAndState"
                  placeholder="User Type"
                  icon={
                    <Iconify
                      icon="solar:map-point-outline"
                      size={18}
                      color={themeContext?.colors.secondaryText2}
                    />
                  }
                />
              </View>

              {formik.touched?.userType && formik.errors?.userType ? (
                <ErrorLabel>{formik.errors?.userType}</ErrorLabel>
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
      <AdvancedActionSheet
        visible={isVisible}
        message="Select user type"
        options={options}
        title="Select user type"
        useNativeIOS
        onDismiss={() => setIsVisible(false)}
      />
    </Container>
  );
};

export default SetUserType;
