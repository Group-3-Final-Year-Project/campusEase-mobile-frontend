import React, { useContext, useState } from "react";
import { useCustomBottomInset } from "~hooks";
import { Button, Input, HeroText, IconBtn } from "~components";
import {
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
  View,
} from "react-native";
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
import { Service, SubService } from "~src/@types/types";
import { CountryCodeContainer, CountryCodeText } from "../EnterPhone/styles";
import { Iconify } from "react-native-iconify";
import { AddAttachmentBtn } from "../MoreBookingInfo/styles";
import { uniqueId } from "lodash";
import { ScrollView } from "react-native";
import { useAppDispatch, useAppSelector } from "~store/hooks/useTypedRedux";
import ACTION_TYPES from "~store/actionTypes";
import { getFirebaseErrorMessage, showAlert } from "~services";

export const servicePricingSchema = yup.object().shape({
  startingPrice: yup.string().required("Starting price required!"),
});

const SetServicePricing = ({
  navigation,
  route,
}: NativeStackScreenProps<any>) => {
  const bottomInset = useCustomBottomInset();
  const themeContext = useContext(ThemeContext);
  const serviceInCreation: Service = useAppSelector(
    (state) => state.serviceInCreation
  );
  const dispatch = useAppDispatch();
  const [subServiceForms, setSubServiceForms] = useState<SubService[]>(
    serviceInCreation.subServices || []
  );

  const servicePricingInitialValues = {
    startingPrice: serviceInCreation.startingPrice?.toString() || "",
  };

  const formik = useFormik<{
    startingPrice: string;
  }>({
    initialValues: servicePricingInitialValues,
    validationSchema: servicePricingSchema,
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      try {
        const updatedSubServices = subServiceForms
          .filter((s) => s.name && s.price)
          .map((s) => {
            return {
              ...s,
              price: parseFloat(s.price.toString() ?? "0.0"),
            };
          });

        dispatch({
          type: ACTION_TYPES.UPDATE_SERVICE_IN_CREATION_DATA,
          payload: {
            startingPrice: parseFloat(values.startingPrice ?? "0.0"),
            subServices: updatedSubServices,
          },
        });
        resetForm();
        navigation.navigate(APP_PAGES.SET_SERVICE_LOCATION);
      } catch (error) {
        showAlert("Ooops...", getFirebaseErrorMessage());
      } finally {
        setSubmitting(false);
      }
    },
  });

  const handleAddSubServiceForm = () => {
    setSubServiceForms([
      ...subServiceForms,
      {
        id: uniqueId(),
        name: "",
        description: "",
        price: 0,
      },
    ]);
  };

  const handleDeleteFromSubServiceForms = (id: string) => {
    const updatedSubServiceForms = subServiceForms.filter(
      (form) => form.id !== id
    );
    setSubServiceForms(updatedSubServiceForms);
  };

  const handleSubSerFormInputChange = (
    idx: number,
    event: { target: { name: string; value: string } }
  ) => {
    const updatedFields = subServiceForms.map((subServiceForm, index) =>
      index === idx
        ? { ...subServiceForm, [event.target.name]: event.target.value }
        : subServiceForm
    );
    setSubServiceForms(updatedFields);
  };

  const renderSubServiceForm = (form: SubService, index: number) => {
    return (
      <View style={{ width: "100%", marginBottom: 15 }} key={index}>
        <View
          style={{
            flexDirection: "row",
            marginBottom: 5,
            alignItems: "center",
          }}
          key={form?.id}
        >
          <Input
            onChangeText={(text) =>
              handleSubSerFormInputChange(index, {
                target: { name: "name", value: text },
              })
            }
            value={form.name}
            textContentType="name"
            keyboardType="default"
            placeholder="Name"
          />
          <View style={{ marginHorizontal: 5 }} />
          <Input
            onChangeText={(text) =>
              handleSubSerFormInputChange(index, {
                target: { name: "price", value: text },
              })
            }
            value={form.price.toString()}
            keyboardType="decimal-pad"
            placeholder="Price"
            icon={<CountryCodeText>🇬🇭 {"  "}GHS</CountryCodeText>}
          />
          <View style={{ marginHorizontal: 5 }} />

          <TouchableOpacity
            onPress={() => handleDeleteFromSubServiceForms(form.id)}
            style={{ borderRadius: 100 }}
          >
            <Iconify
              size={18}
              color={themeContext?.colors.secondary}
              icon="solar:close-circle-bold"
            />
          </TouchableOpacity>
        </View>
        <Input
          onChangeText={(text) =>
            handleSubSerFormInputChange(index, {
              target: { name: "description", value: text },
            })
          }
          value={form.description ?? ""}
          textContentType="name"
          keyboardType="default"
          placeholder="Description"
        />
      </View>
    );
  };

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
          <ScrollView style={{ width: "100%" }}>
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
                    keyboardType="decimal-pad"
                    placeholder="Starting price"
                  />
                </View>
                {formik.touched?.startingPrice &&
                formik.errors?.startingPrice ? (
                  <ErrorLabel>{formik.errors?.startingPrice}</ErrorLabel>
                ) : null}
              </FormControl>
              <FormControl>
                <InputLabel>Sub services</InputLabel>
                {subServiceForms.map((form, index) =>
                  renderSubServiceForm(form, index)
                )}
                <AddAttachmentBtn onPress={handleAddSubServiceForm}>
                  <Iconify
                    color={themeContext?.colors.secondaryText2}
                    icon="solar:add-square-outline"
                    style={{ marginRight: 7 }}
                  />
                  <Description
                    style={{ color: themeContext?.colors.secondaryText2 }}
                  >
                    Add sub service
                  </Description>
                </AddAttachmentBtn>
              </FormControl>
            </View>
          </ScrollView>
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
