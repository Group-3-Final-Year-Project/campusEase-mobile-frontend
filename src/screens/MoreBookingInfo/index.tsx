import { FlatList, ScrollView } from "react-native";
import React, { useContext, useState } from "react";
import { useCustomBottomInset } from "~hooks";
import { ThemeContext } from "styled-components/native";
import { Iconify } from "react-native-iconify";
import {
  Container,
  DateContainer,
  DateContainerWrapper,
  DateIconContainer,
} from "./styles";
import { Button, Input } from "~components";
import { BottomCard } from "../Service/styles";
import {
  BookingInfoContainer,
  BookingInfoHeaderLabel,
} from "../BookingDetail/styles";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { APP_PAGES } from "~src/shared/constants";
import { ErrorLabel, FormControl } from "../Signup/styles";
import * as yup from "yup";
import { useFormik } from "formik";
import { BookingStatus, GalleryFile, VerifiedUser } from "~src/@types/types";
import { useAppDispatch, useAppSelector } from "~store/hooks/useTypedRedux";
import { CountryCodeText } from "../EnterPhone/styles";
import ACTION_TYPES from "~store/actionTypes";
import moment from "moment";
import BookingAttachments from "./components/BookingAttachments";
import { DocumentPickerAsset } from "expo-document-picker";
import {
  getFirebaseErrorMessage,
  showAlert,
  uploadFileToFirebaseStorage,
} from "~services";
import uuid from "react-native-uuid";
import VirtualisedContainer from "~src/hocs/VirtualisedContainer";
import { bookingStates } from "~src/data/bookingStatesData";
import {
  reverseFormatPhoneNumber,
  formatPhoneNumber,
} from "../../services/uiService";

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
  const [attachments, setAttachments] = useState<DocumentPickerAsset[]>([]);
  const user: VerifiedUser = useAppSelector((state) => state.user);
  // const booking: Booking = useAppSelector((state) => state.booking);

  const uploadAttachments = async (filesToUpload: DocumentPickerAsset[]) => {
    const files: GalleryFile[] = [];
    for (const file of attachments) {
      const getDownloadURL = await uploadFileToFirebaseStorage({
        base64String: file.uri,
        fileName: file.name,
        fileSize: file.size ?? 0,
        fileType: file.mimeType ?? "",
      });
      files.push({
        downloadURL: getDownloadURL,
        fileName: file.name,
        fileSize: file.size ?? 0,
        fileType: file.mimeType ?? "",
        key: uuid.v4() as string,
      });
    }
    return files;
  };

  const dispatch = useAppDispatch();
  const bookingInfoInitialValues = {
    username: user.username,
    email: user.email,
    phoneNumber: reverseFormatPhoneNumber(user.phoneNumber),
    scheduledTime: new Date(),
    scheduledDate: new Date(),
    noteToProvider: "",
  };

  const formik = useFormik({
    initialValues: bookingInfoInitialValues,
    validationSchema: bookingInfoSchema,
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      try {
        await uploadAttachments(attachments)
          .then((uploadedFiles) => {
            dispatch({
              type: ACTION_TYPES.UPDATE_BOOKING_DATA,
              payload: {
                customerEmail: values.email,
                customerName: values.username,
                customerPhone: formatPhoneNumber(values.phoneNumber),
                notes: values.noteToProvider,
                bookingStatus: BookingStatus.PENDING,
                bookingStates: [bookingStates.Pending],
                scheduledDate: moment(values.scheduledDate).format(
                  "dddd, MMMM Do YYYY"
                ),
                scheduledTime: moment(values.scheduledTime).format("h:mm:ss a"),
                createdAt: moment(new Date()).format(
                  "dddd, MMMM Do YYYY  h:mm a"
                ),
                requestCompletedConfirmationFromUser: false,
                requestCompletedConfirmationFromProvider: false,
                attachments: uploadedFiles,
              },
            });
            resetForm();
            navigation.navigate(APP_PAGES.CHECKOUT);
          })
          .catch(() =>
            showAlert("Ooops...", "Could not upload attachments. Try again")
          );
      } catch (error) {
        showAlert("Ooops...", getFirebaseErrorMessage());
      } finally {
        setSubmitting(false);
      }
    },
  });

  const FlatListForOptimisation = ({
    children,
  }: {
    children: React.ReactElement;
  }) => (
    <FlatList
      style={{
        paddingBottom: bottomInset,
        paddingHorizontal: 15,
      }}
      data={[]}
      renderItem={() => null}
      ListHeaderComponent={children}
    />
  );

  return (
    <Container>
      <FlatListForOptimisation>
        <>
          <BookingInfoContainer style={{ marginTop: 0 }}>
            <BookingInfoHeaderLabel>
              Customer Information
            </BookingInfoHeaderLabel>
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
                  dateTimeFormatter={(value) =>
                    moment(value).format("dddd, MMMM Do YYYY")
                  }
                  placeholder={"Select scheduled date for service"}
                  mode={"date"}
                  minimumDate={new Date()}
                  maximumDate={new Date(Date.now() + 15 * 24 * 60 * 60 * 1000)}
                  onChange={(date: string | number | Date) =>
                    formik.setFieldValue("scheduledDate", new Date(date))
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
                  dateTimeFormatter={(value) =>
                    moment(value).format("h:mm:ss a")
                  }
                  placeholder={"Select scheduled time for service"}
                  mode={"time"}
                  onChange={(date: string | number | Date) =>
                    formik.setFieldValue("scheduledTime", new Date(date))
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
        </>
      </FlatListForOptimisation>
      <BottomCard>
        <Button
          style={{ width: "100%", height: 60, padding: 12 }}
          loading={formik.isSubmitting}
          onPress={formik.submitForm}
        >
          Continue
        </Button>
      </BottomCard>
    </Container>
  );
};

export default MoreBookingInfo;
