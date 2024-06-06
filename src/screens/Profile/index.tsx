import { FlatList, ListRenderItem, StyleSheet, View } from "react-native";
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
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { ThemeContext } from "styled-components/native";
import { IconBtn } from "~components";
import { Iconify } from "react-native-iconify";
import Switch from "react-native-ui-lib/switch";
import { useFocusEffect } from "@react-navigation/native";
import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import { APP_PAGES } from "~src/shared/constants";

export const useCustomBottomInset = () => {
  const insets = useSafeAreaInsets();
  return Math.max(20, insets.bottom + 5);
};

const Profile = ({ navigation }: BottomTabScreenProps<any>) => {
  const insets = useSafeAreaInsets();
  const bottomInset = useCustomBottomInset();
  const themeContext = useContext(ThemeContext);

  useFocusEffect(
    useCallback(() => {
      navigation.setOptions({
        headerRight: () => (
          <IconBtn>
            <Iconify
              icon="solar:logout-3-outline"
              size={18}
              strokeWidth={18}
              color={"red"}
            />
          </IconBtn>
        ),
        headerRightContainerStyle: {
          marginRight: 15,
        },
      });
    }, [])
  );

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
      toPage: "",
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
      toPage: "",
      showRightIcon: true,
    },
    {
      name: "My Bookings",
      icon: (
        <Iconify
          icon="solar:clipboard-list-outline"
          size={18}
          strokeWidth={18}
          color={themeContext?.colors.text}
        />
      ),
      toPage: APP_PAGES.BOOKINGS,
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
      toPage: "",
      showRightIcon: true,
    },
    {
      name: "Dark Mode",
      icon: (
        <Iconify
          icon="solar:eye-outline"
          size={18}
          strokeWidth={18}
          color={themeContext?.colors.text}
        />
      ),
      toPage: "",
      showRightIcon: true,
      rightIcon: <Switch />,
    },
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
      toPage: "",
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
      toPage: "",
      showRightIcon: true,
    },
    {
      name: "Log out",
      icon: (
        <Iconify
          icon="solar:logout-3-outline"
          size={18}
          strokeWidth={18}
          color={"red"}
        />
      ),
      toPage: "",
      showRightIcon: false,
    },
  ];

  const ProfileHeader = () => {
    return (
      <HeaderCard>
        <ProfileImageView>
          <ProfileImage
            source={{
              uri: "https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?cs=srgb&dl=pexels-olly-733872.jpg&fm=jpg",
            }}
          />
          <IconBtn
            style={{
              position: "absolute",
              bottom: 0,
              right: 0,
              backgroundColor: themeContext?.colors.primary,
            }}
          >
            <Iconify
              icon="solar:camera-outline"
              size={18}
              strokeWidth={18}
              color={themeContext?.colors.text}
            />
          </IconBtn>
        </ProfileImageView>
        <Title>Owusu-Ansah Solomon</Title>
      </HeaderCard>
    );
  };

  const renderProfileItem: ListRenderItem<{
    name: string;
    icon: Element;
    toPage: string;
    showRightIcon: boolean;
    rightIcon: Element | undefined;
  }> = ({ item }) => {
    return (
      <ProfileItemCard
        onPress={() => item.toPage && navigation.navigate(item.toPage)}
      >
        <View style={{ flexDirection: "row" }}>
          <>{item.icon}</>
          <ProfileItemLabel
            style={{
              color: item.name == "Log out" ? "red" : themeContext?.colors.text,
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

  return (
    <Container>
      <FlatList
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

const styles = StyleSheet.create({});
