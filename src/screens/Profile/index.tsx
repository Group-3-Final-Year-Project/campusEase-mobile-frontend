import { FlatList, ListRenderItem, View } from "react-native";
import React, { useCallback, useContext } from "react";
import {
  Container,
  HeaderCard,
  ProfileImage,
  ProfileImageView,
  ProfileItemCard,
  ProfileItemLabel,
  Title,
} from "./styles";
import { useCustomBottomInset } from "~hooks";
import { ThemeContext } from "styled-components/native";
import { IconBtn } from "~components";
import { Iconify } from "react-native-iconify";
import { NavigationProp, useFocusEffect } from "@react-navigation/native";
import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import { APP_PAGES } from "~src/shared/constants";
import { useAppSelector } from "~store/hooks/useTypedRedux";
import { UserType, VerifiedUser } from "~src/@types/types";
import {
  changePassword,
  handleCreateServiceNavigation,
  navigateAndResetStack,
  showAlert,
  signoutUser,
} from "~services";

const Profile = ({ navigation }: BottomTabScreenProps<any>) => {
  const bottomInset = useCustomBottomInset();
  const themeContext = useContext(ThemeContext);
  const user: VerifiedUser = useAppSelector((state) => state.user);

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
      action: () => navigation.navigate(APP_PAGES.EDIT_PROFILE),
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
    {
      name:
        user.userType === UserType.SERVICE_PROVIDER
          ? "Create service"
          : "Become a service provider",
      icon: (
        <Iconify
          icon="solar:shop-2-outline"
          size={18}
          strokeWidth={18}
          color={themeContext?.colors.text}
        />
      ),
      action: () =>
        handleCreateServiceNavigation(navigation as NavigationProp<any>),
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
              uri: user?.profilePicture
                ? user?.profilePicture
                : "https://cdn-icons-png.flaticon.com/512/149/149071.png",
            }}
          />
        </ProfileImageView>
        <Title>{user.username}</Title>
        <Title style={{ marginTop: -25 }}>{user.email}</Title>
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
