import React, { useContext, useEffect, useState } from "react";
import { useCustomBottomInset } from "~hooks";
import { Button, Input, LocationPicker } from "~components";
import {
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
  View,
  Modal,
} from "react-native";
import { ThemeContext } from "styled-components/native";

import { StatusBar } from "expo-status-bar";
import {
  ErrorLabel,
  Container,
  FormControl,
  ContentCard,
} from "../Signup/styles";
import { useFormik } from "formik";
import * as yup from "yup";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Iconify } from "react-native-iconify";
import { arrayUnion } from "firebase/firestore";
import {
  formatLatLng,
  getFirebaseErrorMessage,
  getFormattedAddressFromGeocode,
  getUser,
  saveUserDetails,
  showAlert,
  updateUser,
} from "~services";
import { useAppDispatch, useAppSelector } from "~store/hooks/useTypedRedux";
import { LocationParams, VerifiedUser } from "~src/@types/types";
import ACTION_TYPES from "~store/actionTypes";
import uuid from "react-native-uuid";

export const locationSchema = yup.object().shape({
  name: yup.string().required(),
  location: yup.object<LocationParams>().required("Address required!"),
});

const AddOrEditLocation = ({
  navigation,
  route,
}: NativeStackScreenProps<any>) => {
  const bottomInset = useCustomBottomInset();
  const themeContext = useContext(ThemeContext);
  const [visible, setVisible] = useState(false);
  const user: VerifiedUser = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();

  const locationInitialValues = route.params?.address
    ? route.params.address
    : {
        name: "",
        location: {
          latitude: 0,
          longitude: 0,
          accuracy: null,
          altitude: null,
          altitudeAccuracy: null,
          heading: null,
          latitudeDelta: 0,
          longitudeDelta: 0,
          speed: null,
        },
      };

  const formik = useFormik<{
    name: string;
    location: LocationParams;
  }>({
    initialValues: locationInitialValues,
    validationSchema: locationSchema,
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      try {
        const formatted_address = await getFormattedAddressFromGeocode(
          values.location.latitude,
          values.location.longitude
        );
        await updateUser(user.id, {
          locations: arrayUnion({
            id: route.params?.address.id || (uuid.v4() as string),
            name: values.name,
            address: formatted_address,
            location: values.location,
          }),
        })
          .then(async () => {
            const userDataFromDB = await getUser(user.id);
            await saveUserDetails(userDataFromDB);
            dispatch({
              type: ACTION_TYPES.UPDATE_USER_DATA,
              payload: userDataFromDB,
            });
            resetForm();
            navigation.goBack();
          })
          .catch((error) => {
            showAlert("Oops!", getFirebaseErrorMessage(error.code));
          });
      } catch (error) {
        showAlert("Oops!", "Something went wrong while updating your address");
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
            <TouchableOpacity onPress={() => setVisible(true)}>
              <Input
                readOnly
                onBlur={formik.handleBlur("location")}
                value={formatLatLng(
                  formik.values.location.latitude,
                  formik.values.location.longitude
                )}
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
            </TouchableOpacity>

            {formik.touched?.location && formik.errors?.location ? (
              <ErrorLabel>{formik.errors?.location}</ErrorLabel>
            ) : null}
          </FormControl>
        </ContentCard>
        <View style={{ position: "absolute", bottom: 0, width: "100%" }}>
          <Button
            loading={formik.isSubmitting}
            // @ts-ignore
            onPress={formik.handleSubmit}
          >
            Save
          </Button>
        </View>
      </KeyboardAvoidingView>
      <Modal
        visible={visible}
        onDismiss={() => setVisible(false)}
        animationType="slide"
        presentationStyle="fullScreen"
      >
        <LocationPicker
          onClose={() => setVisible(false)}
          selectedLocation={formik.values.location}
          setSelectedLocation={(coords) =>
            formik.setFieldValue("location", coords)
          }
        />
      </Modal>
    </Container>
  );
};

export default AddOrEditLocation;
