import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
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
  createReview,
  getFirebaseErrorMessage,
  showAlert,
  showToast,
} from "~services";
import uuid from "react-native-uuid";
import { Review, VerifiedUser } from "~src/@types/types";
import { useAppSelector } from "~store/hooks/useTypedRedux";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import moment from "moment";
import { BookingInfoCard } from "../BookingSummary/styles";
import { BookingInfoHeaderLabel } from "../BookingDetail/styles";

export const reviewSchema = yup.object().shape({
  serviceProviderReviewMsg: yup
    .string()
    .min(3, "Name not valid!")
    .required("Name required!"),
  appReviewMsg: yup
    .string()
    .min(3, "Name not valid!")
    .required("Name required!"),
  rating: yup
    .number()
    .min(1, "Minimum rating is 1")
    .max(5, "Maximum rating is 5")
    .required(),
});

const WriteReview = ({ navigation, route }: NativeStackScreenProps<any>) => {
  const user: VerifiedUser = useAppSelector((state) => state.user);
  const themeContext = useContext(ThemeContext);
  const reviewInitialValues = {
    serviceProviderReviewMsg: "",
    appReviewMsg: "",
    rating: 0,
  };

  const formik = useFormik({
    initialValues: reviewInitialValues,
    validationSchema: reviewSchema,
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      setSubmitting(true);
      try {
        setSubmitting(true);
        const reviewData: Review = {
          ...values,
          id: uuid.v4() as string,
          bookingId: route.params?.bookingId,
          userId: user.id,
          serviceId: route.params?.serviceId,
          providerId: route.params?.providerId,
          reviewerName: user.username,
          createdAt: moment(new Date()).format("dddd, MMMM Do YYYY"),
        };
        console.log(reviewData);
        await createReview(reviewData)
          .then(() => {
            showToast("Review submitted successfully");
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

  const handleRating = (index: number) => {
    formik.setFieldValue("rating", index + 1);
  };

  return (
    <Container>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        style={{ flexGrow: 1 }}
      >
        <ScrollView style={{ width: "100%" }}>
          <FormControl>
            <BookingInfoHeaderLabel>How would you rate your service provision?</BookingInfoHeaderLabel>
            <View style={{ flexDirection: "row" }}>
              {[...new Array(5)].map((_, index) => {
                return (
                  <TouchableOpacity
                    key={index}
                    style={{ marginRight: 10 }}
                    onPress={() => handleRating(index)}
                  >
                    {index < formik.values.rating ? (
                      <Iconify
                        icon="fluent-emoji-flat:star"
                        size={40}
                        strokeWidth={10}
                      />
                    ) : (
                      <Iconify
                        icon="solar:star-outline"
                        size={40}
                        strokeWidth={10}
                        color={themeContext?.colors.primary}
                      />
                    )}
                  </TouchableOpacity>
                );
              })}
            </View>
            {formik.touched?.rating && formik.errors?.rating ? (
              <ErrorLabel>{formik.errors?.rating}</ErrorLabel>
            ) : null}
          </FormControl>
          <FormControl>
            <BookingInfoHeaderLabel>How was your service provision?</BookingInfoHeaderLabel>
            <Input
              onChangeText={formik.handleChange("serviceProviderReviewMsg")}
              onBlur={formik.handleBlur("serviceProviderReviewMsg")}
              value={formik.values?.serviceProviderReviewMsg}
              textContentType="name"
              placeholder="e.g The service provider was very patient"
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
            <BookingInfoHeaderLabel>How was the overall app usage?</BookingInfoHeaderLabel>
            <Input
              onChangeText={formik.handleChange("appReviewMsg")}
              onBlur={formik.handleBlur("appReviewMsg")}
              value={formik.values?.appReviewMsg}
              textContentType="name"
              placeholder="e.g I really like this app"
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
        </ScrollView>
        <View style={{ position: "absolute", bottom: 0, width: "100%" }}>
          <Button
            loading={formik.isSubmitting}
            // @ts-ignore
            onPress={formik.handleSubmit}
          >
            Submit review
          </Button>
        </View>
      </KeyboardAvoidingView>
    </Container>
  );
};

export default WriteReview;

const styles = StyleSheet.create({});
