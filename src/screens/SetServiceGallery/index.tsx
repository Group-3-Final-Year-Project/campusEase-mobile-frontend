import React, { useState, useContext } from "react";
import { useCustomBottomInset } from "~hooks";
import { Button, HeroText } from "~components";
import { KeyboardAvoidingView, Platform, View } from "react-native";
import { ThemeContext } from "styled-components/native";

import { StatusBar } from "expo-status-bar";
import { APP_PAGES } from "~src/shared/constants";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useFormik } from "formik";
import * as yup from "yup";
import {
  ContentCard,
  Container,
  Description,
  ErrorLabel,
  FormControl,
} from "../Signup/styles";
import Animated, {
  useAnimatedStyle,
  withSpring,
} from "react-native-reanimated";
import {
  AddRemoveContainer,
  numOfColumns,
  UserPictureContainer,
  UserPictureContent,
  userPictureHeight,
} from "./styles";
import {
  pictures,
  sortByUrl,
  deleteUrlFromItem,
  pickImages,
  uploadServiceGallery,
} from "./utils";
import { DraggableGrid } from "react-native-draggable-grid";
import { getFirebaseErrorMessage, pickImageAsync, showAlert } from "~services";
import { Iconify } from "react-native-iconify";
import { ImageForGallery } from "~src/@types/types";
import { useAppDispatch } from "~store/hooks/useTypedRedux";
import ACTION_TYPES from "~store/actionTypes";

export const serviceGallerySchema = yup.object().shape({
  gallery: yup
    .array()
    .of(yup.object().required())
    .min(1, "At least one image should be provided")
    .required("Name required!"),
});

const SetServiceGallery = ({ navigation }: NativeStackScreenProps<any>) => {
  const bottomInset = useCustomBottomInset();
  const themeContext = useContext(ThemeContext);
  const dispatch = useAppDispatch();
  const [gesturesEnabled, setgesturesEnabled] = useState(true);

  const serviceGalleryInitialValues = {
    gallery: [...pictures],
  };

  const formik = useFormik<{
    gallery: ImageForGallery[];
  }>({
    initialValues: serviceGalleryInitialValues,
    validationSchema: serviceGallerySchema,
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      const updatedGallery = values.gallery.filter((value) => value.url);
      try {
        const res = await uploadServiceGallery(updatedGallery);
        if (!res.length) {
          formik.setFieldError("gallery", "No image selected!");
          return;
        }
        dispatch({
          type: ACTION_TYPES.UPDATE_SERVICE_IN_CREATION_DATA,
          payload: {
            coverImage: res[0]?.downloadURL,
            gallery: res,
          },
        });

        resetForm();
        navigation.navigate(APP_PAGES.SET_SERVICE_PRICING);
      } catch (error) {
        showAlert("Ooops...", getFirebaseErrorMessage());
      } finally {
        setSubmitting(false);
      }
    },
  });

  const AddUserPhoto = ({
    picture,
    onDelete,
    onAdd,
  }: {
    picture: any;
    onDelete: any;
    onAdd: any;
  }) => {
    const themeContext = useContext(ThemeContext);

    const hasPicture = !!picture.url;

    const style = useAnimatedStyle(() => {
      const rotation = withSpring(hasPicture ? `45deg` : `0deg`);
      return { transform: [{ rotateZ: rotation }] };
    });

    return (
      <UserPictureContainer>
        <UserPictureContent
          key={picture?.url}
          {...(picture?.url && { source: { uri: picture?.url } })}
        ></UserPictureContent>
        <AddRemoveContainer
          inverted={hasPicture}
          onPress={hasPicture ? onDelete : onAdd}
        >
          <Animated.View style={style}>
            {/* <Svg>
            <AddRemove
              fill={hasPicture ? themeContext?.colors.primary : "white"}
            />
          </Svg> */}
            {hasPicture ? (
              <Iconify
                size={30}
                color={themeContext?.colors.secondary}
                icon="solar:close-circle-bold"
              />
            ) : (
              <Iconify
                size={30}
                color={themeContext?.colors.primary}
                icon="solar:add-circle-bold"
              />
            )}
          </Animated.View>
        </AddRemoveContainer>
      </UserPictureContainer>
    );
  };

  return (
    <Container>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        style={{ flexGrow: 1 }}
      >
        <StatusBar style={themeContext?.dark ? "light" : "dark"} />
        <ContentCard style={{ paddingBottom: bottomInset }}>
          <View>
            <HeroText text={"Service Gallery"} />
            <Description
              style={{
                marginTop: 10,
                color: themeContext?.colors.secondaryText2,
              }}
            >
              Upload images about your service. First image will be used as the
              cover image of service
            </Description>
          </View>
          <View style={{ marginTop: 40, width: "100%" }}>
            <FormControl>
              <DraggableGrid
                numColumns={numOfColumns}
                renderItem={(picture) => (
                  <View>
                    <AddUserPhoto
                      onDelete={() => {
                        const newPics = formik.values.gallery
                          .map(deleteUrlFromItem(picture))
                          .sort(sortByUrl);
                        formik.setFieldValue("gallery", newPics);
                      }}
                      onAdd={async () => {
                        const res = await pickImageAsync(pickImages, {
                          allowsMultipleSelection: false,
                          base64: true,
                        });
                        const newPics = formik.values.gallery
                          .map((p) => {
                            return p.key === picture.key
                              ? {
                                  ...picture,
                                  fileName: res?.[0].fileName,
                                  base64URL: res?.[0].base64,
                                  url: res?.[0].uri ?? "",
                                  disabledDrag: false,
                                  disabledReSorted: false,
                                  fileType: res?.[0].mimeType,
                                  fileSize: res?.[0].fileSize,
                                }
                              : p;
                          })
                          .sort(sortByUrl);

                        formik.setFieldValue("gallery", newPics);
                      }}
                      picture={picture}
                    />
                  </View>
                )}
                data={formik.values.gallery}
                itemHeight={userPictureHeight}
                style={{ zIndex: 10 }}
                onDragStart={() => setgesturesEnabled(false)}
                onDragRelease={(newPics) => {
                  setgesturesEnabled(true);
                  formik.setFieldValue("gallery", newPics);
                }}
              />
            </FormControl>
          </View>
          {formik.touched?.gallery && formik.errors?.gallery ? (
            <ErrorLabel style={{ zIndex: 1000 }}>
              {formik.errors?.gallery}
            </ErrorLabel>
          ) : null}
        </ContentCard>
        <View style={{ position: "absolute", bottom: 0, width: "100%" }}>
          <Button
            loading={formik.isSubmitting}
            // @ts-ignore
            onPress={formik.handleSubmit}
            // onPress={() => navigation.navigate(APP_PAGES.VERIFY_EMAIL)}
          >
            Continue
          </Button>
        </View>
      </KeyboardAvoidingView>
    </Container>
  );
};

export default SetServiceGallery;
