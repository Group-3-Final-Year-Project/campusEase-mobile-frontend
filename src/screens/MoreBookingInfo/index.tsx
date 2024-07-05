import { ScrollView } from "react-native";
import React, { useContext, useState } from "react";
import { useCustomBottomInset } from "~hooks";
import { ThemeContext } from "styled-components/native";
import { Iconify } from "react-native-iconify";
import {
  AddAttachmentBtn,
  Container,
  DateContainer,
  Description,
} from "./styles";
import { Button, Input } from "~components";
import { BottomCard } from "../Service/styles";
import {
  BookingInfoContainer,
  BookingInfoHeaderLabel,
} from "../BookingDetail/styles";
import { createBooking, navigateAndResetStack, pickDocuments } from "~services";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { APP_PAGES } from "~src/shared/constants";
import { ErrorLabel, FormControl } from "../Signup/styles";
import ResultPrompt from "~components/ResultPrompt";
import * as yup from "yup";
import { useFormik } from "formik";
import { Booking, VerifiedUser } from "~src/@types/types";
import { useAppDispatch, useAppSelector } from "~store/hooks/useTypedRedux";
import moment from "moment";
import DateTimePicker from "react-native-ui-lib/dateTimePicker";
import {
  clearBookingData,
  updateBookingData,
} from "~store/actions/bookingActions";
import { NavigationProp } from "@react-navigation/native";
import { CountryCodeText } from "../EnterPhone/styles";

export const bookingInfoSchema = yup.object().shape({
  username: yup.string().required("Username required!"),
  email: yup.string().email("Email not valid!").required("Email required!"),
  phoneNumber: yup.string().required("Phone number required!"),
  scheduledTime: yup.date().notRequired(),
  scheduledDate: yup.date().notRequired(),
  noteToProvider: yup.string().notRequired(),
});

const MoreBookingInfo = ({ navigation }: NativeStackScreenProps<any>) => {
  const bottomInset = useCustomBottomInset();
  const themeContext = useContext(ThemeContext);
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const user: VerifiedUser = useAppSelector((state) => state.user);
  const booking: Booking = useAppSelector((state) => state.booking);
  const dispatch = useAppDispatch();
  const bookingInfoInitialValues = {
    username: user.username,
    email: user.email,
    phoneNumber: user.phoneNumber,
    scheduledTime: new Date(),
    scheduledDate: new Date(),
    noteToProvider: "",
  };

  const formik = useFormik({
    initialValues: bookingInfoInitialValues,
    validationSchema: bookingInfoSchema,
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      try {
        dispatch(
          updateBookingData({
            customerEmail: values.email,
            customerName: values.username,
            customerPhone: values.phoneNumber,
            notes: values.noteToProvider,
            scheduledDate: moment(values.scheduledDate).toLocaleString(),
            scheduledTime: moment(values.scheduledTime).toLocaleString(),
            createdAt: new Date().toLocaleString(),
          })
        );
        createBooking(booking);
        setIsVisible(true);
        resetForm();
      } catch (error) {
        throw Error(error as any);
      } finally {
        setSubmitting(false);
      }
    },
  });

  return (
    <Container>
      <ScrollView
        style={{
          // paddingTop: insets.top,
          paddingBottom: bottomInset,
          paddingHorizontal: 15,
        }}
      >
        <BookingInfoContainer>
          <BookingInfoHeaderLabel>Customer Information</BookingInfoHeaderLabel>
          <FormControl>
            <Input
              onChangeText={formik.handleChange("username")}
              onBlur={formik.handleBlur("username")}
              value={formik.values?.username}
              textContentType="name"
              placeholder="Username"
              icon={
                <Iconify
                  color={themeContext?.colors.secondaryText2}
                  icon="solar:user-rounded-outline"
                />
              }
            />
            {formik.touched?.username && formik.errors?.username ? (
              <ErrorLabel>{formik.errors?.username}</ErrorLabel>
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
              onChangeText={formik.handleChange("phoneNumber")}
              onBlur={formik.handleBlur("phoneNumber")}
              value={formik.values?.phoneNumber}
              textContentType="telephoneNumber"
              keyboardType="phone-pad"
              placeholder="Phone number"
              icon={<CountryCodeText>🇬🇭 +233</CountryCodeText>}
            />
            {formik.touched?.phoneNumber && formik.errors?.phoneNumber ? (
              <ErrorLabel>{formik.errors?.phoneNumber}</ErrorLabel>
            ) : null}
          </FormControl>
        </BookingInfoContainer>
        <BookingInfoContainer>
          <BookingInfoHeaderLabel>Other Information</BookingInfoHeaderLabel>
          <FormControl>
            <DateContainer
              placeholder={"Placeholder"}
              mode={"date"}
              onChange={(date: string | number | Date) =>
                formik.setFieldValue("scheduledDate", new Date(date))
              }
              onBlur={formik.handleBlur("scheduledDate")}
              value={formik.values?.scheduledDate}
            />
          </FormControl>
          <FormControl>
            <DateContainer
              leadingAccessory={
                <Iconify
                  color={themeContext?.colors.secondaryText2}
                  icon="solar:clock-circle-outline"
                />
              }
              placeholder={"Placeholder"}
              mode={"time"}
              onChange={(date: string | number | Date) =>
                formik.setFieldValue("scheduledTime", date)
              }
              onBlur={formik.handleBlur("scheduledTime")}
              value={formik.values?.scheduledTime}
            />
          </FormControl>
          <FormControl>
            <Input
              onChangeText={formik.handleChange("noteToProvider")}
              onBlur={formik.handleBlur("noteToProvider")}
              value={formik.values?.noteToProvider}
              textContentType="name"
              placeholder="Note to service provider"
              multiline
              numberOfLines={7}
              textAlignVertical="top"
              icon={
                <Iconify
                  color={themeContext?.colors.secondaryText2}
                  icon="solar:notebook-outline"
                  style={{ marginBottom: 6 * 16 }}
                />
              }
            />
          </FormControl>
        </BookingInfoContainer>
        <BookingInfoContainer>
          <BookingInfoHeaderLabel>
            Attachments for service provider
          </BookingInfoHeaderLabel>
          <FormControl>
            <AddAttachmentBtn onPress={() => pickDocuments()}>
              <Iconify
                color={themeContext?.colors.secondaryText2}
                icon="solar:add-square-outline"
                style={{ marginRight: 7 }}
              />
              <Description
                style={{ color: themeContext?.colors.secondaryText2 }}
              >
                Add attachments
              </Description>
            </AddAttachmentBtn>
          </FormControl>
        </BookingInfoContainer>
      </ScrollView>
      <BottomCard>
        <Button
          style={{ width: "100%", height: 60, padding: 12 }}
          loading={formik.isSubmitting}
          onPress={formik.submitForm}
        >
          Confirm booking
        </Button>
      </BottomCard>
      <ResultPrompt
        navigation={navigation as NavigationProp<any>}
        bookingId={booking.id}
        visible={isVisible}
        setIsVisible={setIsVisible}
      />
    </Container>
  );
};

export default MoreBookingInfo;
