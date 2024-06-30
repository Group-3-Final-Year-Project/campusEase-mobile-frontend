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
import { pictures, sortByUrl, deleteUrlFromItem, addUrlToItem } from "./utils";
import { DraggableGrid } from "react-native-draggable-grid";

export const serviceGallerySchema = yup.object().shape({
  gallery: yup
    .array()
    .of(yup.string().required())
    // .min(1, "At least one image should be provided")
    .required("Name required!"),
});

const SetServiceGallery = ({
  navigation,
  route,
}: NativeStackScreenProps<any>) => {
  const bottomInset = useCustomBottomInset();
  const themeContext = useContext(ThemeContext);
  const [gesturesEnabled, setgesturesEnabled] = useState(true);
  const [pics, setPics] = useState(pictures);

  const serviceGalleryInitialValues = {
    gallery: [],
  };

  const formik = useFormik({
    initialValues: serviceGalleryInitialValues,
    validationSchema: serviceGallerySchema,
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      try {
        navigation.navigate(APP_PAGES.SET_SERVICE_PRICING);
      } catch (error) {
        throw Error(error as any);
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
                        const newPics = pics
                          .map(deleteUrlFromItem(picture))
                          .sort(sortByUrl);
                        setPics(newPics);
                      }}
                      onAdd={() => {
                        const newPics = pics
                          .map(addUrlToItem(picture))
                          .sort(sortByUrl);
                        setPics(newPics);
                      }}
                      picture={picture}
                    />
                  </View>
                )}
                data={pics}
                itemHeight={userPictureHeight}
                style={{ zIndex: 10 }}
                onDragStart={() => setgesturesEnabled(false)}
                onDragRelease={(newPics) => {
                  setgesturesEnabled(true);
                  setPics(newPics);
                }}
              />
            </FormControl>
          </View>
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
