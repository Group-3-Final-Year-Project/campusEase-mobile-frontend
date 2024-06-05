import React, { useState, useContext } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Button, Input, SelectPicker } from "~components";
import { KeyboardAvoidingView, Platform, View, ScrollView } from "react-native";
import { ThemeContext } from "styled-components/native";

import { Iconify } from "react-native-iconify";
import { APP_PAGES } from "~src/shared/constants";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useFormik } from "formik";
import * as yup from "yup";
import {
  Container,
  ContentCard,
  Description,
  FormControl,
  ErrorLabel,
} from "../SignInOrUp/styles";
import HeroText from "../SignInOrUp/components/HeroText";
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
// import Placeholder from "~images/placeholder.svg";
// import AddRemove from "~images/AddRemove.svg";
import { pictures, sortByUrl, deleteUrlFromItem, addUrlToItem } from "./utils";
import { PickerSingleValue } from "react-native-ui-lib/src/components/picker/types";
import { DraggableGrid } from "react-native-draggable-grid";

export const useCustomBottomInset = () => {
  const insets = useSafeAreaInsets();
  return Math.max(20, insets.bottom + 5);
};

export const schema = yup.object().shape({
  name: yup.string().min(3, "Name not valid!").required("Name required!"),
  email: yup.string().email("Email not valid!").required("Email required!"),
  location: yup.string().required("Email required!"),
  category: yup.string().required("Category required!"),
  website: yup.string().notRequired(),
  gallery: yup
    .array()
    .of(yup.string())
    .min(1, "Should have at least one image")
    .required(),
  bio: yup.string().notRequired(),
});

const AddUserPhoto = ({ picture, onDelete, onAdd }) => {
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
      >
        {/* {!hasPicture && (
          <Svg>
            <Placeholder />
          </Svg>
        )} */}
      </UserPictureContent>
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

const RegisterService = ({
  navigation,
  route,
}: NativeStackScreenProps<any>) => {
  const insets = useSafeAreaInsets();
  const bottomInset = useCustomBottomInset();
  const themeContext = useContext(ThemeContext);
  const [pics, setPics] = useState(pictures);

  // Swipe gestures need to be disabled when Draggable is active,
  // othewise the user will perform multiple gestures and the behavior
  // will be undesirable
  const [gesturesEnabled, setgesturesEnabled] = useState(true);
  const [pickerValue, setPickerValue] = useState<PickerSingleValue>("food");

  const initialValues = {
    name: "",
    email: "",
    bio: "",
    location: "",
    website: "",
    category: "",
    gallery: [],
  };

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: schema,
    onSubmit: async (values, { setSubmitting, resetForm }) => {},
  });

  return (
    <Container>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        style={{ flexGrow: 1 }}
      >
        <ScrollView showsVerticalScrollIndicator={false}>
          <ContentCard
            style={{ paddingTop: insets.top, paddingBottom: bottomInset }}
          >
            <HeroText isServiceRegistration={true} />

            <Description
              style={{
                marginTop: 20,
                color: themeContext?.colors.secondaryText,
              }}
            >
              Almost done! Enter your service details to continue.
            </Description>
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
                <ErrorLabel
                  style={{
                    color: themeContext?.colors.secondaryText2,
                    fontSize: 10,
                  }}
                >
                  *First image will be used as the cover image of service
                </ErrorLabel>
              </FormControl>
              <FormControl>
                <Input
                  // onChangeText={formik.handleChange("name")}
                  // onBlur={formik.handleBlur("name")}
                  // value={formik.values?.name}
                  textContentType="name"
                  placeholder="Service name"
                  icon={
                    <Iconify
                      color={themeContext?.colors.secondaryText2}
                      icon="solar:buildings-outline"
                    />
                  }
                />
                {/* {formik.touched?.name && formik.errors?.name ? (
                  <ErrorLabel>{formik.errors?.name}</ErrorLabel>
                ) : null} */}
              </FormControl>
              <FormControl>
                <Input
                  // onChangeText={formik.handleChange("name")}
                  // onBlur={formik.handleBlur("name")}
                  // value={formik.values?.name}
                  textContentType="name"
                  placeholder="Service Bio"
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
                {/* {formik.touched?.name && formik.errors?.name ? (
                  <ErrorLabel>{formik.errors?.name}</ErrorLabel>
                ) : null} */}
              </FormControl>
              <FormControl>
                {/* <Input
                  // onChangeText={formik.handleChange("name")}
                  // onBlur={formik.handleBlur("name")}
                  // value={formik.values?.name}
                  textContentType="name"
                  placeholder="Category"
                  icon={
                    <Iconify
                      color={themeContext?.colors.secondaryText2}
                      icon="solar:widget-2-outline"
                    />
                  }
                  rightIcon={
                    <Iconify
                      color={themeContext?.colors.secondaryText2}
                      icon="solar:alt-arrow-down-outline"
                    />
                  }
                /> */}
                <SelectPicker
                  items={[
                    {
                      label: "Food",
                      value: "food",
                    },
                    {
                      label: "Recreation",
                      value: "recreation",
                    },
                  ]}
                  value={pickerValue}
                />
                {/* {formik.touched?.name && formik.errors?.name ? (
                  <ErrorLabel>{formik.errors?.name}</ErrorLabel>
                ) : null} */}
              </FormControl>
              <FormControl>
                <Input
                  // onChangeText={formik.handleChange("name")}
                  // onBlur={formik.handleBlur("name")}
                  // value={formik.values?.name}
                  textContentType="name"
                  placeholder="Location"
                  icon={
                    <Iconify
                      color={themeContext?.colors.secondaryText2}
                      icon="solar:map-point-wave-outline"
                    />
                  }
                />
                {/* {formik.touched?.name && formik.errors?.name ? (
                  <ErrorLabel>{formik.errors?.name}</ErrorLabel>
                ) : null} */}
              </FormControl>
              <FormControl>
                <Input
                  // onChangeText={formik.handleChange("name")}
                  // onBlur={formik.handleBlur("name")}
                  // value={formik.values?.name}
                  textContentType="name"
                  placeholder="Service website"
                  icon={
                    <Iconify
                      color={themeContext?.colors.secondaryText2}
                      icon="solar:global-outline"
                    />
                  }
                />
                {/* {formik.touched?.name && formik.errors?.name ? (
                  <ErrorLabel>{formik.errors?.name}</ErrorLabel>
                ) : null} */}
              </FormControl>
              <FormControl>
                <Input
                  // onChangeText={formik.handleChange("name")}
                  // onBlur={formik.handleBlur("name")}
                  // value={formik.values?.name}
                  textContentType="name"
                  placeholder="Service email"
                  icon={
                    <Iconify
                      color={themeContext?.colors.secondaryText2}
                      icon="solar:letter-outline"
                    />
                  }
                />
                {/* {formik.touched?.name && formik.errors?.name ? (
                  <ErrorLabel>{formik.errors?.name}</ErrorLabel>
                ) : null} */}
              </FormControl>
              <FormControl>
                <Button
                  // loading={formik.isSubmitting}
                  // @ts-ignore
                  onPress={() => navigation.navigate(APP_PAGES.VERIFY_EMAIL)}
                >
                  Continue
                </Button>
              </FormControl>
              <FormControl>
                <Button
                  // loading={formik.isSubmitting}
                  // @ts-ignore
                  // onPress={formik.handleSubmit}
                  variant="outline"
                >
                  Add another service
                </Button>
              </FormControl>
            </View>
          </ContentCard>
        </ScrollView>
      </KeyboardAvoidingView>
    </Container>
  );
};

export default RegisterService;
