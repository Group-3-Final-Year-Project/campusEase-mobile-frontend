import React, { useContext, useState } from "react";
import { useCustomBottomInset } from "~hooks";
import { Button, Input, HeroText } from "~components";
import {
  KeyboardAvoidingView,
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
import { useAppDispatch, useAppSelector } from "~store/hooks/useTypedRedux";
import { UserType, VerifiedUser } from "~src/@types/types";
import { APP_PAGES, STORAGE_KEYS } from "~src/shared/constants";
import { Iconify } from "react-native-iconify";
import AdvancedActionSheet from "~components/AdvancedActionSheet";
import {
  getFirebaseErrorMessage,
  getUser,
  navigateAndResetStack,
  saveUserDetails,
  showAlert,
} from "~services";
import { firestoreDatabase } from "firebaseConfig";
import { doc, updateDoc } from "firebase/firestore";
import ACTION_TYPES from "~store/actionTypes";

export const userTypeSchema = yup.object().shape({
  userType: yup
    .string()
    .oneOf(
      [UserType.SERVICE_PROVIDER, UserType.USER],
      "User type should either User or Service rovider"
    )
    .required("User type required!"),
});

const SetUserType = ({ navigation, route }: NativeStackScreenProps<any>) => {
  const bottomInset = useCustomBottomInset();
  const themeContext = useContext(ThemeContext);
  const user: VerifiedUser = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();

  const formik = useFormik({
    initialValues: { userType: "" },
    validationSchema: userTypeSchema,
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      try {
        const docRef = doc(firestoreDatabase, STORAGE_KEYS.DB_USERS, user.id);
        await updateDoc(docRef, {
          userType: values.userType,
        })
          .then(async () => {
            resetForm();
            const userDataFromDB = await getUser(user.id);
            await saveUserDetails(userDataFromDB);
            dispatch({
              type: ACTION_TYPES.UPDATE_USER_DATA,
              payload: userDataFromDB,
            });
            navigateAndResetStack(navigation, APP_PAGES.USER_CREATION_SUCCESS);
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

  const [isVisible, setIsVisible] = useState(false);

  const options = [
    {
      label: "User",
      onPress: () => formik.setFieldValue("userType", UserType.USER),
    },
    {
      label: "Service Provider",
      onPress: () =>
        formik.setFieldValue("userType", UserType.SERVICE_PROVIDER),
    },
  ];

  return (
    <Container>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        style={{ flexGrow: 1 }}
      >
        <StatusBar style={themeContext?.dark ? "light" : "dark"} />
        <ContentCard style={{ paddingBottom: bottomInset }}>
          <View>
            <HeroText text={"Start as..."} />
            <Description
              style={{
                marginTop: 10,
                color: themeContext?.colors.secondaryText2,
              }}
            >
              Choose whether to start as a service proovider or user. You can
              change it later.
            </Description>
          </View>
          <View style={{ marginTop: 40, width: "100%" }}>
            <FormControl>
              <TouchableOpacity onPress={() => setIsVisible(true)}>
                <Input
                  readOnly
                  onBlur={formik.handleBlur("userType")}
                  value={formik.values.userType}
                  textContentType="addressCityAndState"
                  placeholder="User Type"
                  icon={
                    <Iconify
                      icon="solar:map-point-outline"
                      size={18}
                      color={themeContext?.colors.secondaryText2}
                    />
                  }
                />
              </TouchableOpacity>

              {formik.touched?.userType && formik.errors?.userType ? (
                <ErrorLabel>{formik.errors?.userType}</ErrorLabel>
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
      <AdvancedActionSheet
        visible={isVisible}
        message="Select user type"
        options={options}
        title="Select user type"
        useNativeIOS
        onDismiss={() => setIsVisible(false)}
      />
    </Container>
  );
};

export default SetUserType;
