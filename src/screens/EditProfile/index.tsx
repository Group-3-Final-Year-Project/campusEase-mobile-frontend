import React, { useContext, useState } from "react";
import { HeaderCard, ProfileImage, ProfileImageView } from "../Profile/styles";
import { Container } from "../Home/styles";
import { Button, IconBtn, Input } from "~components";
import { Iconify } from "react-native-iconify";
import { ThemeContext } from "styled-components/native";
import { VerifiedUser } from "~src/@types/types";
import { useAppSelector } from "~store/hooks/useTypedRedux";
import { getFirebaseErrorMessage, pickImageAsync, showAlert } from "~services";
import { useFormik } from "formik";
import * as yup from "yup";
import { ScrollView, View } from "react-native";
import { ErrorLabel, FormControl } from "../Signup/styles";
import { CountryCodeContainer, CountryCodeText } from "../EnterPhone/styles";

export const profileSchema = yup.object().shape({
  email: yup.string().email("Email not valid!").required("Email required!"),
  name: yup
    .string()
    .min(3, "Name should be more than 3 characters!")
    .required("Name required!"),
  phoneNumber: yup
    .string()
    .min(9, "Phone number not valid!")
    .max(10, "Phone number is not valid!")
    .required("Phone number required!"),
});

const EditProfile = () => {
  const user: VerifiedUser = useAppSelector((state) => state.user);

  const themeContext = useContext(ThemeContext);
  const [userPic, setUserPic] = useState<string>(
    user?.profilePicture ? user?.profilePicture : ""
  );

  const profileInitialValues = {
    email: user?.email || "",
    name: user?.username || "",
    phoneNumber: user?.phoneNumber || "",
  };

  const formik = useFormik({
    initialValues: profileInitialValues,
    validationSchema: profileSchema,
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      try {
        console.log(values);
      } catch (error) {
        showAlert("Oops, authentication failed!", getFirebaseErrorMessage());
        throw Error(error as any);
      } finally {
        setSubmitting(false);
      }
    },
  });

  return (
    <Container>
      <ScrollView>
        <HeaderCard>
          <ProfileImageView>
            <ProfileImage
              source={{
                uri: userPic
                  ? userPic
                  : "https://cdn-icons-png.flaticon.com/512/149/149071.png",
              }}
            />
            <IconBtn
              style={{
                position: "absolute",
                bottom: 0,
                right: 0,
                backgroundColor: themeContext?.colors.primary,
              }}
              onPress={() =>
                pickImageAsync().then(
                  (images) =>
                    images && images.length && setUserPic(images[0].uri)
                )
              }
            >
              <Iconify
                icon="solar:camera-outline"
                size={18}
                strokeWidth={18}
                color={themeContext?.colors.text}
              />
            </IconBtn>
          </ProfileImageView>
        </HeaderCard>
        <View>
          <FormControl>
            <Input
              onChangeText={formik.handleChange("name")}
              onBlur={formik.handleBlur("name")}
              value={formik.values?.name}
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
            {formik.touched?.name && formik.errors?.name ? (
              <ErrorLabel>{formik.errors?.name}</ErrorLabel>
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
            <View style={{ flexDirection: "row" }}>
              <CountryCodeContainer>
                <CountryCodeText>🇬🇭 {"  "}+233</CountryCodeText>
              </CountryCodeContainer>
              <Input
                onChangeText={formik.handleChange("phoneNumber")}
                onBlur={formik.handleBlur("phoneNumber")}
                value={formik.values.phoneNumber}
                textContentType="telephoneNumber"
                keyboardType="phone-pad"
                placeholder="Phone number"
              />
            </View>
            {formik.touched?.phoneNumber && formik.errors?.phoneNumber ? (
              <ErrorLabel>{formik.errors?.phoneNumber}</ErrorLabel>
            ) : null}
          </FormControl>
        </View>
      </ScrollView>
      <View style={{ position: "absolute", bottom: 0, width: "100%" }}>
        <Button
          loading={formik.isSubmitting}
          // @ts-ignore
          onPress={formik.handleSubmit}
        >
          Save
        </Button>
      </View>
    </Container>
  );
};

export default EditProfile;
