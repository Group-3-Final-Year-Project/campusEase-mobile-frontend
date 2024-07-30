import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";
import React, { useContext } from "react";
import * as yup from "yup";
import { useFormik } from "formik";
import { Container } from "../Home/styles";
import { ErrorLabel, FormControl } from "../Signup/styles";
import { Button, Input } from "~components";
import { Iconify } from "react-native-iconify";
import { ThemeContext } from "styled-components/native";
import {
  createReport,
  getFirebaseErrorMessage,
  showAlert,
  showToast,
} from "~services";
import uuid from "react-native-uuid";
import { ReportObj,  VerifiedUser } from "~src/@types/types";
import { useAppSelector } from "~store/hooks/useTypedRedux";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import moment from "moment";
import { BookingInfoHeaderLabel } from "../BookingDetail/styles";

export const reportSchema = yup.object().shape({
  message: yup
    .string()
    .min(3, "Name not valid!")
    .required("Name required!"),
});

const Report = ({ navigation, route }: NativeStackScreenProps<any>) => {
  const user: VerifiedUser = useAppSelector((state) => state.user);
  const themeContext = useContext(ThemeContext);
  const reportInitialValues = {
    message:""
  };

  const formik = useFormik({
    initialValues: reportInitialValues,
    validationSchema: reportSchema,
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      setSubmitting(true);
      try {
        setSubmitting(true);
        const reportData: ReportObj = {
          ...values,
          id: uuid.v4() as string,
          bookingId: route.params?.bookingId,
          userId: user.id,
          serviceId: route.params?.serviceId,
          providerId: route.params?.providerId,
          reporterName: user.username,
          createdAt: moment(new Date()).format("dddd, MMMM Do YYYY"),
        };
        await createReport(reportData)
          .then(() => {
            showToast("Your report has been submitted successfully");
            resetForm();
            navigation.goBack();
          })
          .catch((error) => {
            showAlert("Ooops...", getFirebaseErrorMessage(error.code));
          });
      } catch (error) {
        showAlert("Ooops...", getFirebaseErrorMessage());
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
        <ScrollView style={{ width: "100%" }}>
          <FormControl>
            <BookingInfoHeaderLabel>Your report</BookingInfoHeaderLabel>
            <Input
              onChangeText={formik.handleChange("message")}
              onBlur={formik.handleBlur("message")}
              value={formik.values?.message}
              textContentType="name"
              placeholder="e.g The service provider was a scam"
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
            {formik.touched?.message && formik.errors?.message ? (
              <ErrorLabel>{formik.errors?.message}</ErrorLabel>
            ) : null}
          </FormControl>
        </ScrollView>
        <View style={{ position: "absolute", bottom: 0, width: "100%" }}>
          <Button
            loading={formik.isSubmitting}
            // @ts-ignore
            onPress={formik.handleSubmit}
          >
            Submit report
          </Button>
        </View>
      </KeyboardAvoidingView>
    </Container>
  );
};

export default Report;

const styles = StyleSheet.create({});
