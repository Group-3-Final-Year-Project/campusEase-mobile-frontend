import React, { useContext, useState } from "react";
import { useCustomBottomInset } from "~hooks";
import { Button, Input, HeroText, LocationPicker } from "~components";
import {
  KeyboardAvoidingView,
  Modal,
  Platform,
  TouchableOpacity,
  View,
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
import { LocationObj, LocationParams } from "~src/@types/types";
import { formatLatLng, getFormattedAddressFromGeocode } from "~services";
import { useAppDispatch } from "~store/hooks/useTypedRedux";
import ACTION_TYPES from "~store/actionTypes";

export const locationSchema = yup.object().shape({
  location: yup.object<LocationParams>().required("Address required!"),
});

const SetServiceLocation = ({
  navigation,
  route,
}: NativeStackScreenProps<any>) => {
  const bottomInset = useCustomBottomInset();
  const themeContext = useContext(ThemeContext);
  const [visible, setVisible] = useState(false);
  // const {}: VerifiedUser = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();

  const formik = useFormik<{
    location: LocationParams;
  }>({
    initialValues: {
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
    },
    validationSchema: locationSchema,
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      try {
        const formatted_address = await getFormattedAddressFromGeocode(
          values.location.latitude,
          values.location.longitude
        ).then(() => {
          dispatch({
            type: ACTION_TYPES.UPDATE_SERVICE_IN_CREATION_DATA,
            payload: {
              location: {
                name: "Main",
                address: formatted_address,
                location: values.location,
              },
            },
          });
          resetForm();
          navigation.navigate(APP_PAGES.USER_TAB);
        });
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
            Finish up
          </Button>
        </View>
      </KeyboardAvoidingView>
      <Modal
        visible={visible}
        onRequestClose={() => setVisible(false)}
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

export default SetServiceLocation;