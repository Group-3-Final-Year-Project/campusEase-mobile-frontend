import React, { useState, useContext } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Button, Input, AdvancedDialog } from "~components";
import { KeyboardAvoidingView, Platform, Pressable, View } from "react-native";
import { ThemeContext } from "styled-components/native";

import { StatusBar } from "expo-status-bar";
import { Iconify } from "react-native-iconify";
import { APP_PAGES } from "~src/shared/constants";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useFormik } from "formik";
import * as yup from "yup";
import { signUserIn } from "~services";
import { useAppDispatch } from "~store/hooks/useTypedRedux";
import { updateUserData } from "~store/actions/userActions";
import { User } from "~src/@types/types";
import {
  ContentCard,
  Container,
  Description,
  ErrorLabel,
  FormControl,
  HighlightedDescription,
} from "../SignInOrUp/styles";
import HeroText from "../SignInOrUp/components/HeroText";

export const useCustomBottomInset = () => {
  const insets = useSafeAreaInsets();
  return Math.max(20, insets.bottom + 5);
};

export const signinSchema = yup.object().shape({
  email: yup.string().email("Email not valid!").required("Email required!"),
  password: yup.string().required("Password required!"),
});

const Login = ({ navigation, route }: NativeStackScreenProps<any>) => {
  const insets = useSafeAreaInsets();
  const bottomInset = useCustomBottomInset();
  const themeContext = useContext(ThemeContext);
  const [showPassword, setShowPassword] = useState<boolean>(true);
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
      await signUserIn(values)
        .then((res) => {
          dispatch(updateUserData(res as User));
          resetForm();

          navigation.navigate(APP_PAGES.HOME);
        })
        .catch((err) => {
          // will show a toast or modal here for failed auth
          setDialogVisible(true);
          throw Error(err);
        })
        .finally(() => setSubmitting(false));
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
          <HeroText isSignup={false} />

          <Description
            style={{ marginTop: 20, color: themeContext?.colors.secondaryText }}
          >
            Hey there! Welcome back. You've been missed.
          </Description>
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
              {formik.touched?.password && formik.errors?.password ? (
                <ErrorLabel>{formik.errors?.password}</ErrorLabel>
              ) : null}
            </FormControl>
            <FormControl>
              <Button
                loading={formik.isSubmitting}
                // @ts-ignore
                onPress={formik.handleSubmit}
                // onPress={() => navigation.navigate(APP_PAGES.VERIFY_EMAIL)}
              >
                Sign in
              </Button>
            </FormControl>
            <Pressable onPress={() => navigation.navigate(APP_PAGES.SIGNUP)}>
              <Description
                style={{
                  textAlign: "center",
                }}
              >
                Don't have an account?{" "}
                <HighlightedDescription>Sign up</HighlightedDescription>
              </Description>
            </Pressable>
          </View>
        </ContentCard>
      </KeyboardAvoidingView>
      <AdvancedDialog
        centerH
        centerV
        ignoreBackgroundPress={false}
        visible={dialogVisible}
      ></AdvancedDialog>
    </Container>
  );
};

export default Login;