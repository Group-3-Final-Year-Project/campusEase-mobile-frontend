import React, { useContext, useEffect, useState } from "react";
import { useCustomBottomInset } from "~hooks";
import { Button, Input, HeroText, LocationPicker } from "~components";
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
  Description,
  ContentCard,
} from "../Signup/styles";
import { useFormik } from "formik";
import * as yup from "yup";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { APP_PAGES } from "~src/shared/constants";
import { Iconify } from "react-native-iconify";
import {
  formatLatLng,
  getFirebaseErrorMessage,
  getFormattedAddressFromGeocode,
  showAlert,
  updateUser,
} from "~services";
import { useAppSelector } from "~store/hooks/useTypedRedux";
import { LocationParams, VerifiedUser } from "~src/@types/types";
import * as Location from "expo-location";
import uuid from "react-native-uuid";

export const locationSchema = yup.object().shape({
  name: yup.string().required(),
  location: yup.object<LocationParams>().required("Address required!"),
});

const SetLocation = ({ navigation, route }: NativeStackScreenProps<any>) => {
  const bottomInset = useCustomBottomInset();
  const themeContext = useContext(ThemeContext);
  const [visible, setVisible] = useState(false);
  const user: VerifiedUser = useAppSelector((state) => state.user);

  const locationInitialValues = {
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
          locations: [
            {
              id: uuid.v4() as string,
              name: values.name,
              address: formatted_address,
              location: values.location,
            },
          ],
        })
          .then(() => {
            resetForm();
            navigation.navigate(APP_PAGES.SET_USER_TYPE);
          })
          .catch((err) => {
            showAlert("Oops!", getFirebaseErrorMessage(err.code));
          });
      } catch (error) {
        showAlert("Oops!", "Something went wrong");
      } finally {
        setSubmitting(false);
      }
    },
  });
  useEffect(() => {
    const getLocationPermission = async () => {
      const { granted } = await Location.requestForegroundPermissionsAsync();
      if (!granted) {
        showAlert(
          "Location permission not granted!",
          "You can go to settings to grant permission for location"
        );
        return;
      }
    };
    getLocationPermission();
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
            <HeroText text={"Address"} />
            <Description
              style={{
                marginTop: 10,
                color: themeContext?.colors.secondaryText2,
              }}
            >
              Set your home address to get personalised services.
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

export default SetLocation;
