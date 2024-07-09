import { ScrollView } from "react-native";
import React, { useContext, useState } from "react";
import { useCustomBottomInset } from "~hooks";
import { ThemeContext } from "styled-components/native";
import { Iconify } from "react-native-iconify";
import {
  AddAttachmentBtn,
  Container,
  DateContainer,
  DateContainerWrapper,
  DateIconContainer,
  Description,
} from "./styles";
import { Button, Input } from "~components";
import { BottomCard } from "../Service/styles";
import {
  BookingInfoContainer,
  BookingInfoHeaderLabel,
} from "../BookingDetail/styles";
import { pickDocuments } from "~services";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { APP_PAGES } from "~src/shared/constants";
import { ErrorLabel, FormControl } from "../Signup/styles";
import * as yup from "yup";
import { useFormik } from "formik";
import { BookingStatus, VerifiedUser } from "~src/@types/types";
import { useAppDispatch, useAppSelector } from "~store/hooks/useTypedRedux";
import { CountryCodeText } from "../EnterPhone/styles";
import ACTION_TYPES from "~store/actionTypes";
import uuid from "react-native-uuid";
import moment from "moment";
import BookingAttachments from "./components/BookingAttachments";
import { DocumentPickerAsset } from "expo-document-picker";

export const bookingInfoSchema = yup.object().shape({
  username: yup.string().required("Username required!"),
  email: yup.string().email("Email not valid!").required("Email required!"),
  phoneNumber: yup.string().required("Phone number required!"),
  scheduledTime: yup.string().notRequired(),
  scheduledDate: yup.string().notRequired(),
  noteToProvider: yup.string().notRequired(),
});

const MoreBookingInfo = ({ navigation }: NativeStackScreenProps<any>) => {
  const bottomInset = useCustomBottomInset();
  const themeContext = useContext(ThemeContext);
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [attachments, setAttachments] = useState<DocumentPickerAsset[]>([]);
  const user: VerifiedUser = useAppSelector((state) => state.user);
  // const booking: Booking = useAppSelector((state) => state.booking);
  const dispatch = useAppDispatch();
  const bookingInfoInitialValues = {
    username: user.username,
    email: user.email,
    phoneNumber: user.phoneNumber,
    scheduledTime: moment(new Date()).format("h:mm:ss a"),
    scheduledDate: moment(new Date()).format("dddd, MMMM Do YYYY"),
    noteToProvider: "",
  };

  const formik = useFormik({
    initialValues: bookingInfoInitialValues,
    validationSchema: bookingInfoSchema,
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      try {
        dispatch({
          type: ACTION_TYPES.UPDATE_BOOKING_DATA,
          payload: {
            id: uuid.v4() as string,
            customerEmail: values.email,
            customerName: values.username,
            customerPhone: values.phoneNumber,
            notes: values.noteToProvider,
            bookingStatus: BookingStatus.PENDING,
            scheduledDate: new Date(values.scheduledDate).toLocaleString(),
            scheduledTime: new Date(values.scheduledTime).toLocaleString(),
            createdAt: new Date().toLocaleString(),
            requestCompletedConfirmationFromUser: false,
            requestCompletedConfirmationFromProvider: false,
          },
        });
        resetForm();
        navigation.navigate(APP_PAGES.PAYSTACK_PAYMENT_VIEW);
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
          paddingBottom: bottomInset,
          paddingHorizontal: 15,
        }}
      >
        <BookingInfoContainer style={{ marginTop: 0 }}>
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
                  size={18}
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
            <DateContainerWrapper>
              <DateIconContainer>
                <Iconify
                  size={18}
                  color={themeContext?.colors.secondaryText2}
                  icon="solar:calendar-outline"
                />
              </DateIconContainer>
              <DateContainer
                placeholder={"Select scheduled date for service"}
                mode={"date"}
                minimumDate={new Date()}
                maximumDate={new Date(Date.now() + 15 * 24 * 60 * 60 * 1000)}
                onChange={(date: string | number | Date) =>
                  formik.setFieldValue(
                    "scheduledDate",
                    moment(new Date(date)).format("dddd, MMMM Do YYYY")
                  )
                }
                onBlur={formik.handleBlur("scheduledDate")}
                value={formik.values?.scheduledDate}
              />
            </DateContainerWrapper>
          </FormControl>
          <FormControl>
            <DateContainerWrapper>
              <DateIconContainer>
                <Iconify
                  size={18}
                  color={themeContext?.colors.secondaryText2}
                  icon="solar:clock-circle-outline"
                />
              </DateIconContainer>
              <DateContainer
                placeholder={"Select scheduled time for service"}
                mode={"time"}
                onChange={(date: string | number | Date) =>
                  formik.setFieldValue(
                    "scheduledTime",
                    moment(new Date(date)).format("h:mm:ss a")
                  )
                }
                onBlur={formik.handleBlur("scheduledTime")}
                value={formik.values?.scheduledTime}
              />
            </DateContainerWrapper>
          </FormControl>
          <FormControl>
            <Input
              onChangeText={formik.handleChange("noteToProvider")}
              onBlur={formik.handleBlur("noteToProvider")}
              value={formik.values?.noteToProvider}
              textContentType="name"
              placeholder={
                "Note to service provider\ne.g I want you to please call me when you are ready."
              }
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
        </BookingInfoContainer>
        <BookingInfoContainer>
          <BookingInfoHeaderLabel>
            Attachments for service provider
          </BookingInfoHeaderLabel>
          <FormControl>
            <BookingAttachments
              attachments={attachments}
              setAttachments={setAttachments}
            />
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
    </Container>
  );
};

export default MoreBookingInfo;
