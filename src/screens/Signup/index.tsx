import React, { useState, useContext } from "react";
import {
  Container,
  Description,
  FormControl,
  ContentCard,
  ErrorLabel,
  HighlightedDescription,
} from "./styles";
import { useCustomBottomInset } from "~hooks";
import { Button, Input, HeroText } from "~components";
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  View,
  ScrollView,
} from "react-native";
import { ThemeContext } from "styled-components/native";

import { StatusBar } from "expo-status-bar";
import Checkbox from "react-native-ui-lib/checkbox";
import { Iconify } from "react-native-iconify";
import { APP_PAGES } from "~src/shared/constants";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useFormik } from "formik";
import * as yup from "yup";
import { useAppDispatch } from "~store/hooks/useTypedRedux";
import {
  getFirebaseErrorMessage,
  showAlert,
  signupUserWithEmailAndPassword,
} from "~services";
import ACTION_TYPES from "~store/actionTypes";

export const signupSchema = yup.object().shape({
  name: yup
    .string()
    .min(3, "Name should be more than 3 characters!")
    .required("Name required!"),
  email: yup.string().email("Email not valid!").required("Email required!"),
  password: yup
    .string()
    .min(8, "Password should be 8 characters long!")
    .required("Password required!"),
  acceptedTerms: yup
    .boolean()
    .oneOf([true], "Agree to terms and conditions to continue")
    .required("Agree to terms and conditions to continue"),
});

const SignUp = ({ navigation, route }: NativeStackScreenProps<any>) => {
  const bottomInset = useCustomBottomInset();
  const themeContext = useContext(ThemeContext);
  const [showPassword, setShowPassword] = useState<boolean>(true);

  const dispatch = useAppDispatch();

  const signupInitialValues = {
    name: "",
    email: "",
    password: "",
    acceptedTerms: false,
  };

  const formik = useFormik({
    initialValues: signupInitialValues,
    validationSchema: signupSchema,
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      try {
        const result = await signupUserWithEmailAndPassword(
          values.name,
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
          navigation.navigate(APP_PAGES.ENTER_PHONE);
        } else {
          showAlert(
            "Oops, authentication failed!",
            getFirebaseErrorMessage(result.error.errorCode ?? "")
          );
        }
      } catch (error) {
        showAlert("Oops, authentication failed!", getFirebaseErrorMessage());
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
        <ScrollView showsVerticalScrollIndicator={false}>
          <StatusBar style={themeContext?.dark ? "light" : "dark"} />
          <ContentCard style={{ paddingBottom: bottomInset }}>
            <View>
              <HeroText text={"Sign up"} />
              <Description
                style={{
                  marginTop: 10,
                  color: themeContext?.colors.secondaryText2,
                }}
              >
                Hey there! Sign up with your email to continue.
              </Description>
            </View>

            <View style={{ marginTop: 40, width: "100%" }}>
              <FormControl>
                <Input
                  onChangeText={formik.handleChange("name")}
                  onBlur={formik.handleBlur("name")}
                  value={formik.values?.name}
                  textContentType="name"
                  placeholder="Username"
                  icon={
                    <Iconify
                      size={18}
                      color={themeContext?.colors.secondaryText2}
                      icon="solar:user-rounded-outline"
                    />
                  }
                />
                {formik.touched?.name && formik.errors?.name ? (
                  <ErrorLabel>{formik.errors?.name}</ErrorLabel>
                ) : null}
              </FormControl>
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
                  textContentType={"newPassword"}
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
              <FormControl>
                <Checkbox
                  value={formik.values?.acceptedTerms}
                  label="I have read and agree to the terms and conditions"
                  labelStyle={{
                    color: themeContext?.colors.secondaryText,
                    fontFamily: themeContext?.typography.fontFamily.regular,
                    fontSize: 12,
                  }}
                  color={themeContext?.colors.secondaryBackground}
                  iconColor={themeContext?.colors.primary}
                  onValueChange={(value: boolean) =>
                    formik.setFieldValue("acceptedTerms", value)
                  }
                  onBlur={formik.handleBlur("acceptedTerms")}
                />
              </FormControl>
            </View>
          </ContentCard>
        </ScrollView>
        <View style={{ position: "absolute", bottom: 0, width: "100%" }}>
          <Button
            loading={formik.isSubmitting}
            // @ts-ignore
            onPress={formik.handleSubmit}
          >
            Continue
          </Button>
          <Pressable onPress={() => navigation.navigate(APP_PAGES.SIGNIN)}>
            <Description
              style={{
                textAlign: "center",
                marginTop: 10,
                fontSize: 12,
              }}
            >
              Already have an account?{" "}
              <HighlightedDescription
                style={{
                  textAlign: "center",
                  fontSize: 12,
                }}
              >
                Log in
              </HighlightedDescription>
            </Description>
          </Pressable>
        </View>
      </KeyboardAvoidingView>
    </Container>
  );
};

export default SignUp;
