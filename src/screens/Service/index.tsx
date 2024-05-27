import { StyleSheet, View, Animated } from "react-native";
import React, { useContext, useRef, useEffect } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { ThemeContext } from "styled-components/native";
import {
  BottomCard,
  Container,
  Description,
  HighlightedDescription,
  ServiceInfoContainer,
  TagLabel,
  Title,
} from "./styles";
import { Button, IconBtn } from "~components";
import { Iconify } from "react-native-iconify";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useFocusEffect } from "@react-navigation/native";
import ServiceBanner from "./components/ServiceBanner";
import { formatCurrency } from "../../services/uiService";

export const useCustomBottomInset = () => {
  const insets = useSafeAreaInsets();
  return Math.max(20, insets.bottom + 5);
};

const Service = ({ navigation }: NativeStackScreenProps<any>) => {
  const insets = useSafeAreaInsets();
  const bottomInset = useCustomBottomInset();
  const themeContext = useContext(ThemeContext);

  const yOffset = useRef(new Animated.Value(0)).current;
  const headerOpacity = yOffset.interpolate({
    inputRange: [0, 200],
    outputRange: [0, 1],
    extrapolate: "clamp",
  });

  useEffect(() => {
    navigation.setOptions({
      // headerTitle: "",
      // headerTransparent: true,
      headerStyle: {
        // @ts-ignore
        opacity: headerOpacity,
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
      // @ts-ignore
      headerRightContainerStyle: {
        marginRight: 15,
      },
      headerBackground: () => (
        <Animated.View
          style={{
            backgroundColor: themeContext?.colors.background,
            ...StyleSheet.absoluteFillObject,
            opacity: headerOpacity,
          }}
        />
      ),
    });
  }, [headerOpacity, navigation]);

  return (
    <Container>
      <Animated.ScrollView
        overScrollMode="never"
        showsVerticalScrollIndicator={false}
        onScroll={Animated.event(
          [
            {
              nativeEvent: {
                contentOffset: {
                  y: yOffset,
                },
              },
            },
          ],
          { useNativeDriver: true }
        )}
        scrollEventThrottle={16}
        style={{ paddingBottom: bottomInset }}
      >
        <ServiceBanner />
        <ServiceInfoContainer>
          <View
            style={{
              width: "100%",
              flexDirection: "row",
              justifyContent: "flex-start",
              alignItems: "center",
            }}
          >
            <IconBtn style={{ marginRight: 5 }}>
              <TagLabel>Home</TagLabel>
            </IconBtn>
            <IconBtn
              style={{
                flexDirection: "row",
              }}
            >
              <Iconify
                icon="fluent-emoji-flat:star"
                size={10}
                strokeWidth={10}
              />
              <TagLabel> 4.8 (354 reviews)</TagLabel>
            </IconBtn>
          </View>
          <View style={{ marginTop: 10 }}>
            <Title style={{ marginBottom: 4 }}>Jeron Plumbing Works</Title>
            <Description>1012 Ocean avenue, New York, USA</Description>
          </View>
        </ServiceInfoContainer>
      </Animated.ScrollView>
      <BottomCard>
        <View>
          <Description style={{ marginBottom: 10 }}>Starting Price</Description>
          <HighlightedDescription>{formatCurrency(180)}</HighlightedDescription>
        </View>
        <Button style={{ width: 240, height: 60, padding: 12 }}>
          Book now
        </Button>
      </BottomCard>
    </Container>
  );
};

export default Service;

const styles = StyleSheet.create({});
