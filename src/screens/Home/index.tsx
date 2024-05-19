import { ScrollView, StyleSheet, View } from "react-native";
import React, { useCallback, useContext } from "react";
import { Container, Description, Title } from "./styles";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { ThemeContext } from "styled-components/native";
import { CustomNavigationProp } from "~src/@types/types";
import { useFocusEffect } from "@react-navigation/native";
import Avatar from "react-native-ui-lib/avatar";
import { Iconify } from "react-native-iconify";
import Button from "react-native-ui-lib/button";
import { Searchbar, IconBtn } from "~components";
import HomeBanner from "./components/HomeBanner";
import Categories from "./components/Categories";

export const useCustomBottomInset = () => {
  const insets = useSafeAreaInsets();
  return Math.max(20, insets.bottom + 5);
};

const Home = ({ navigation }: CustomNavigationProp) => {
  const insets = useSafeAreaInsets();
  const bottomInset = useCustomBottomInset();
  const themeContext = useContext(ThemeContext);

  useFocusEffect(
    useCallback(() => {
      navigation.setOptions({
        headerTitle(props) {
          return (
            <View
              style={{
                flexDirection: "row",
              }}
            >
              <Avatar
                animate
                useAutoColors
                label="SO"
                size={45}
                backgroundColor="green"
                labelColor="white"
                source={{
                  uri: "https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?cs=srgb&dl=pexels-olly-733872.jpg&fm=jpg",
                }}
              />
              <View style={{ marginLeft: 10 }}>
                <Description>Location</Description>
                <Title>New York, USA</Title>
              </View>
            </View>
          );
        },
        headerRight: () => (
          <IconBtn>
            <Iconify
              icon="solar:bell-bold"
              size={18}
              strokeWidth={18}
              color={themeContext?.colors.text}
            />
          </IconBtn>
        ),
        headerRightContainerStyle: {
          marginRight: 15,
        },
      });
    }, [])
  );

  return (
    <Container>
      <ScrollView
        style={{ paddingTop: insets.top - 20, paddingBottom: bottomInset }}
      >
        <View
          style={{
            flexDirection: "row",
            width: "100%",
          }}
        >
          <Searchbar
            placeholder="Search..."
            icon={
              <Iconify
                icon="solar:minimalistic-magnifer-outline"
                size={18}
                strokeWidth={18}
                color={themeContext?.colors.text}
              />
            }
          />
          <IconBtn
            style={{
              marginLeft: 7,
              backgroundColor: themeContext?.colors.primary,
              width: 50,
            }}
          >
            <Iconify
              icon="solar:tuning-2-outline"
              size={18}
              strokeWidth={18}
              color={themeContext?.colors.text}
            />
          </IconBtn>
        </View>
        <HomeBanner />
        <Categories />
      </ScrollView>
    </Container>
  );
};
export default Home;

const styles = StyleSheet.create({});
