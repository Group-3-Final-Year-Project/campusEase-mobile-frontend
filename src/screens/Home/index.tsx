import { FlatList, StyleSheet, View } from "react-native";
import React, { useCallback, useContext } from "react";
import { Container, Description, ListLabel, Title } from "./styles";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { ThemeContext } from "styled-components/native";

import { useFocusEffect } from "@react-navigation/native";
import Avatar from "react-native-ui-lib/avatar";
import { Iconify } from "react-native-iconify";
import { Searchbar, IconBtn, ServiceCard } from "~components";
import HomeBanner from "./components/HomeBanner";
import Categories from "./components/Categories";
import VirtualisedContainer from "~src/hocs/VirtualisedContainer";
import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";

export const useCustomBottomInset = () => {
  const insets = useSafeAreaInsets();
  return Math.max(20, insets.bottom + 5);
};

const Home = ({ navigation }: BottomTabScreenProps<any>) => {
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
      <VirtualisedContainer
        style={{ paddingTop: insets.top - 20, paddingBottom: bottomInset }}
        renderItem={undefined}
      >
        <>
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
          <View style={{ marginTop: 20 }}>
            <ListLabel style={{ marginBottom: 10 }}>Most popular</ListLabel>
            <FlatList
              data={[...new Array(5)]}
              renderItem={({ item, index }) => <ServiceCard service={item} />}
              horizontal
              ItemSeparatorComponent={() => (
                <View style={{ marginHorizontal: 7 }} />
              )}
              showsHorizontalScrollIndicator={false}
            />
          </View>
          <View style={{ marginTop: 20 }}>
            <ListLabel style={{ marginBottom: 10 }}>For you</ListLabel>
            <FlatList
              data={[...new Array(5)]}
              renderItem={({ item, index }) => (
                <ServiceCard
                  service={item}
                  style={{
                    width: "100%",
                  }}
                />
              )}
              ItemSeparatorComponent={() => (
                <View style={{ marginVertical: 7 }} />
              )}
              showsHorizontalScrollIndicator={false}
            />
          </View>
        </>
      </VirtualisedContainer>
    </Container>
  );
};
export default Home;

const styles = StyleSheet.create({});
