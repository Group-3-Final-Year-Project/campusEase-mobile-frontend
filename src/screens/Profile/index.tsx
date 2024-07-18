import { FlatList, ListRenderItem, View } from "react-native";
import React, { useCallback, useContext, useState } from "react";
import {
  Container,
  HeaderCard,
  ProfileImage,
  ProfileImageContainer,
  ProfileImageView,
  ProfileItemCard,
  ProfileItemLabel,
  Title,
} from "./styles";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useCustomBottomInset } from "~hooks";
import { ThemeContext } from "styled-components/native";
import { IconBtn, Text } from "~components";
import { Iconify } from "react-native-iconify";
import Switch from "react-native-ui-lib/switch";
import { NavigationProp, useFocusEffect } from "@react-navigation/native";
import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import { APP_PAGES } from "~src/shared/constants";
import { useAppSelector } from "~store/hooks/useTypedRedux";
import { VerifiedUser } from "~src/@types/types";
import {
  changePassword,
  navigateAndResetStack,
  pickImageAsync,
  pickRandomAvatarColor,
  showAlert,
  signoutUser,
} from "~services";

const Profile = ({ navigation }: BottomTabScreenProps<any>) => {
  const insets = useSafeAreaInsets();
  const bottomInset = useCustomBottomInset();
  const themeContext = useContext(ThemeContext);
  const user: VerifiedUser = useAppSelector((state) => state.user);
  const [userPic, setUserPic] = useState<string>(
    user?.profilePicture ? user?.profilePicture : ""
  );

  useFocusEffect(
    useCallback(() => {
      navigation.setOptions({
        headerRight: () => (
          <IconBtn onPress={showLogoutAlert}>
            <Iconify
              icon="solar:logout-3-outline"
              size={18}
              strokeWidth={18}
              color={themeContext?.colors.secondary}
            />
          </IconBtn>
        ),
        headerRightContainerStyle: {
          marginRight: 15,
        },
      });
    }, [])
  );

  const showLogoutAlert = () => {
    showAlert("Leaving already?", "Are you sure you want to log out?", [
      {
        label: "Log out",
        onPress: async () => {
          await signoutUser();
          navigateAndResetStack(
            navigation as NavigationProp<any>,
            APP_PAGES.LANDING
          );
        },
      },
    ]);
  };

  const profileItems = [
    {
      name: "Edit Profile",
      icon: (
        <Iconify
          icon="solar:pen-new-square-outline"
          size={18}
          strokeWidth={18}
          color={themeContext?.colors.text}
        />
      ),
      action: () => null,
      showRightIcon: true,
    },
    {
      name: "Analytics",
      icon: (
        <Iconify
          icon="solar:graph-up-outline"
          size={18}
          strokeWidth={18}
          color={themeContext?.colors.text}
        />
      ),
      action: () => navigation.navigate(APP_PAGES.ANALYTICS),
      showRightIcon: true,
    },
    {
      name: "Change Password",
      icon: (
        <Iconify
          icon="solar:lock-keyhole-outline"
          size={18}
          strokeWidth={18}
          color={themeContext?.colors.text}
        />
      ),
      action: () => changePassword(user.email),
      showRightIcon: false,
    },
    {
      name: "My Bookmarks",
      icon: (
        <Iconify
          icon="solar:documents-minimalistic-outline"
          size={18}
          strokeWidth={18}
          color={themeContext?.colors.text}
        />
      ),
      action: () => navigation.navigate(APP_PAGES.BOOKMARKS),
      showRightIcon: true,
    },
    {
      name: "My Addresses",
      icon: (
        <Iconify
          icon="solar:map-point-outline"
          size={18}
          strokeWidth={18}
          color={themeContext?.colors.text}
        />
      ),
      action: () => navigation.navigate(APP_PAGES.MANAGE_ADDRESSES),
      showRightIcon: true,
    },
    // {
    //   name: "Dark Mode",
    //   icon: (
    //     <Iconify
    //       icon="solar:eye-outline"
    //       size={18}
    //       strokeWidth={18}
    //       color={themeContext?.colors.text}
    //     />
    //   ),
    //   action: () => null,
    //   showRightIcon: true,
    //   rightIcon: <Switch />,
    // },
    {
      name: "Privacy Policy",
      icon: (
        <Iconify
          icon="solar:shield-check-outline"
          size={18}
          strokeWidth={18}
          color={themeContext?.colors.text}
        />
      ),
      action: () => navigation.navigate(APP_PAGES.PRIVACY_POLICY),
      showRightIcon: true,
    },
    {
      name: "Terms & Conditions",
      icon: (
        <Iconify
          icon="solar:calendar-mark-outline"
          size={18}
          strokeWidth={18}
          color={themeContext?.colors.text}
        />
      ),
      action: () => navigation.navigate(APP_PAGES.TERMS_AND_CONDITIONS),
      showRightIcon: true,
    },
    {
      name: "Log out",
      icon: (
        <Iconify
          icon="solar:logout-3-outline"
          size={18}
          strokeWidth={18}
          color={themeContext?.colors.secondary}
        />
      ),
      action: () => showLogoutAlert(),
      showRightIcon: false,
    },
  ];

  const ProfileHeader = () => {
    return (
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
                (images) => images && images.length && setUserPic(images[0].uri)
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
        <Title>{user.username}</Title>
      </HeaderCard>
    );
  };

  const renderProfileItem: ListRenderItem<{
    name: string;
    icon: Element;
    toPage: string;
    showRightIcon: boolean;
    rightIcon: Element | undefined;
    action: () => void;
  }> = ({ item }) => {
    return (
      <ProfileItemCard onPress={item.action}>
        <View style={{ flexDirection: "row" }}>
          <>{item.icon}</>
          <ProfileItemLabel
            style={{
              color:
                item.name == "Log out"
                  ? themeContext?.colors.secondary
                  : themeContext?.colors.text,
            }}
          >
            {item.name}
          </ProfileItemLabel>
        </View>
        {item.showRightIcon &&
          (item.rightIcon ? (
            <>{item.rightIcon}</>
          ) : (
            <Iconify
              icon="solar:alt-arrow-right-outline"
              size={18}
              strokeWidth={18}
              color={themeContext?.colors.text}
            />
          ))}
      </ProfileItemCard>
    );
  };

  const renderFooterComponent = () => <></>;

  return (
    <Container>
      <FlatList
        keyExtractor={(item, index) => index.toString()}
        ListHeaderComponent={<ProfileHeader />}
        // @ts-ignore
        data={profileItems}
        renderItem={renderProfileItem}
        ItemSeparatorComponent={() => (
          <View
            style={{
              height: 0.8,
              backgroundColor: themeContext?.colors.secondaryBackground,
            }}
          />
        )}
        style={{ paddingBottom: bottomInset }}
      />
    </Container>
  );
};

export default Profile;
