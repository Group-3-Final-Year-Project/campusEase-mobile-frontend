import {
  KeyboardAvoidingView,
  Platform,
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

export const reviewSchema = yup.object().shape({
  message: yup.string().min(3, "Name not valid!").required("Name required!"),
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
    message: "",
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
        <View style={{ width: "100%" }}>
          <FormControl>
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
                      size={30}
                      strokeWidth={30}
                    />
                  ) : (
                    <Iconify
                      icon="solar:add-circle-outline"
                      size={30}
                      strokeWidth={30}
                    />
                  )}
                </TouchableOpacity>
              );
            })}
            {formik.touched?.rating && formik.errors?.rating ? (
              <ErrorLabel>{formik.errors?.rating}</ErrorLabel>
            ) : null}
          </FormControl>
          <FormControl>
            <Input
              onChangeText={formik.handleChange("message")}
              onBlur={formik.handleBlur("message")}
              value={formik.values?.message}
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
        </View>
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
