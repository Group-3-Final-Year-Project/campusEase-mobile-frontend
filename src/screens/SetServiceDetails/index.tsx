import React, { useState, useContext } from "react";
import { useCustomBottomInset } from "~hooks";
import { Button, Input, HeroText } from "~components";
import {
  KeyboardAvoidingView,
  Platform,
  View,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { ThemeContext } from "styled-components/native";

import { StatusBar } from "expo-status-bar";
import { Iconify } from "react-native-iconify";
import { APP_PAGES } from "~src/shared/constants";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useFormik } from "formik";
import * as yup from "yup";
import {
  getFirebaseErrorMessage,
  getServiceCategories,
  showAlert,
} from "~services";
import {
  ContentCard,
  Container,
  Description,
  ErrorLabel,
  FormControl,
} from "../Signup/styles";
import AdvancedActionSheet from "~components/AdvancedActionSheet";
import { Service, ServiceCategory, VerifiedUser } from "~src/@types/types";
import { useAppDispatch, useAppSelector } from "~store/hooks/useTypedRedux";
import ACTION_TYPES from "~store/actionTypes";
import uuid from "react-native-uuid";

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
  const serviceInCreation: Service = useAppSelector(
    (state) => state.serviceInCreation
  );
  const user: VerifiedUser = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();

  const serviceDetailsInitialValues = {
    name: serviceInCreation?.name || "",
    email: serviceInCreation?.email || "",
    description: serviceInCreation?.description || "",
    website: serviceInCreation?.website || "",
    category: {
      id: serviceInCreation.category?.id || "",
      name: serviceInCreation.category.name || "",
      description: serviceInCreation.category?.description || "",
    },
  };

  const formik = useFormik({
    initialValues: serviceDetailsInitialValues,
    validationSchema: serviceDetailsSchema,
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      if (!values.category?.id) {
        formik.setFieldError("category", "Category must be specified");
        return;
      }
      try {
        dispatch({
          type: ACTION_TYPES.UPDATE_SERVICE_IN_CREATION_DATA,
          payload: {
            id: serviceInCreation?.id
              ? serviceInCreation.id
              : (uuid.v4() as string),
            ...values,
          },
        });
        resetForm();
        navigation.navigate(APP_PAGES.SET_SERVICE_GALLERY);
      } catch (error) {
        showAlert("Ooops...", getFirebaseErrorMessage());
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
        <ScrollView>
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
                  multiline
                  numberOfLines={5}
                  textAlignVertical="top"
                  inputContainerStyles={{ height: 5 * 50 }}
                  icon={
                    <Iconify
                      size={18}
                      color={themeContext?.colors.secondaryText2}
                      icon="solar:notebook-outline"
                      style={{ marginBottom: 4 * 51 }}
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
                {formik.errors?.category ? (
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
        </ScrollView>

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
