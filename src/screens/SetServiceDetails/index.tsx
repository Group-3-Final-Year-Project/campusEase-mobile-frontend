import React, { useState, useContext } from "react";
import { useCustomBottomInset } from "~hooks";
import { Button, Input, HeroText } from "~components";
import {
  KeyboardAvoidingView,
  Platform,
  View,
  TouchableOpacity,
} from "react-native";
import { ThemeContext } from "styled-components/native";

import { StatusBar } from "expo-status-bar";
import { Iconify } from "react-native-iconify";
import { APP_PAGES } from "~src/shared/constants";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useFormik } from "formik";
import * as yup from "yup";
import { getServiceCategories } from "~services";
import {
  ContentCard,
  Container,
  Description,
  ErrorLabel,
  FormControl,
} from "../Signup/styles";
import AdvancedActionSheet from "~components/AdvancedActionSheet";
import { Service, ServiceCategory } from "~src/@types/types";
import { useAppDispatch, useAppSelector } from "~store/hooks/useTypedRedux";
import ACTION_TYPES from "~store/actionTypes";

export const serviceDetailsSchema = yup.object().shape({
  name: yup.string().min(3, "Name not valid!").required("Name required!"),
  email: yup.string().email("Email not valid!").required("Email required!"),
  category: yup.object<ServiceCategory>().required("Category required!"),
  website: yup.string().notRequired(),
  description: yup.string().notRequired(),
});

const SetServiceDetails = ({
  navigation,
  route,
}: NativeStackScreenProps<any>) => {
  const bottomInset = useCustomBottomInset();
  const themeContext = useContext(ThemeContext);
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const serviceInCreation = useAppSelector((state) => state.serviceInCreation);
  const dispatch = useAppDispatch();

  const serviceDetailsInitialValues = {
    name: "",
    email: "",
    description: "",
    website: "",
    category: {
      id: "",
      name: "",
    },
  };

  const formik = useFormik({
    initialValues: serviceDetailsInitialValues,
    validationSchema: serviceDetailsSchema,
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      try {
        dispatch({
          type: ACTION_TYPES.UPDATE_SERVICE_IN_CREATION_DATA,
          payload: values,
        });
        resetForm();
        navigation.navigate(APP_PAGES.SET_SERVICE_GALLERY);
      } catch (error) {
        throw Error(error as any);
      } finally {
        setSubmitting(false);
      }
    },
  });

  const getCategoryOptions = () => {
    const result = getServiceCategories().map((category) => {
      return {
        label: category.name,
        onPress: () => formik.setFieldValue("category", category),
      };
    });
    return result;
  };

  return (
    <Container style={{ paddingTop: 0 }}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        style={{ flexGrow: 1 }}
      >
        <StatusBar style={themeContext?.dark ? "light" : "dark"} />
        <ContentCard style={{ paddingBottom: bottomInset }}>
          <View>
            <HeroText text={"Service Details"} />
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
                onChangeText={formik.handleChange("name")}
                onBlur={formik.handleBlur("name")}
                value={formik.values?.name}
                textContentType="name"
                placeholder="Name"
                icon={
                  <Iconify
                    size={18}
                    color={themeContext?.colors.secondaryText2}
                    icon="solar:buildings-outline"
                  />
                }
              />
              {formik.touched?.name && formik.errors?.name ? (
                <ErrorLabel>{formik.errors?.name}</ErrorLabel>
              ) : null}
            </FormControl>
            <FormControl>
              <Input
                onChangeText={formik.handleChange("description")}
                onBlur={formik.handleBlur("description")}
                value={formik.values?.description}
                textContentType="name"
                placeholder="Service Bio"
                // multiline
                // numberOfLines={7}
                textAlignVertical="top"
                // style={{ height: 7 * 50 }}
                icon={
                  <Iconify
                    size={18}
                    color={themeContext?.colors.secondaryText2}
                    icon="solar:notebook-outline"
                    // style={{ marginBottom: 6 * 16 }}
                  />
                }
              />
            </FormControl>
            <FormControl>
              <TouchableOpacity
                onPress={() => {
                  setIsVisible(true);
                }}
              >
                <Input
                  readOnly
                  onBlur={formik.handleBlur("category")}
                  value={formik.values?.category?.name}
                  textContentType="name"
                  placeholder="Category"
                  icon={
                    <Iconify
                      size={18}
                      color={themeContext?.colors.secondaryText2}
                      icon="solar:global-outline"
                    />
                  }
                />
              </TouchableOpacity>
              {formik.touched?.category && formik.errors?.category ? (
                <ErrorLabel>{formik.errors?.category}</ErrorLabel>
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
                onChangeText={formik.handleChange("website")}
                onBlur={formik.handleBlur("website")}
                value={formik.values?.website}
                textContentType="URL"
                placeholder="Website"
                icon={
                  <Iconify
                    size={18}
                    color={themeContext?.colors.secondaryText2}
                    icon="solar:global-outline"
                  />
                }
              />
              {formik.touched?.website && formik.errors?.website ? (
                <ErrorLabel>{formik.errors?.website}</ErrorLabel>
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
      <AdvancedActionSheet
        visible={isVisible}
        message="Select category"
        options={getCategoryOptions()}
        title="Select category"
        useNativeIOS
        onDismiss={() => setIsVisible(false)}
      />
    </Container>
  );
};

export default SetServiceDetails;
