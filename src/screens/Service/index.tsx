import { StyleSheet, View, Animated, FlatList, Image } from "react-native";
import React, { useContext, useRef, useEffect } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { ThemeContext } from "styled-components/native";
import {
  BottomCard,
  Container,
  Description,
  HighlightedDescription,
  ReviewCard,
  ServiceInfoContainer,
  ServiceInfoHeaderLabel,
  TagLabel,
  Title,
} from "./styles";
import { Button, IconBtn, ServiceCard, ServiceProviderCard } from "~components";
import { Iconify } from "react-native-iconify";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import ServiceBanner from "./components/ServiceBanner";
import { formatCurrency } from "../../services/uiService";
import Avatar from "react-native-ui-lib/avatar";
import GridView from "react-native-ui-lib/gridView";
import StackAggregator from "react-native-ui-lib/stackAggregator";

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
      headerTitle: "",
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

  const serviceSocialItems = [
    {
      name: "Call",
      icon: (
        <Iconify
          icon="solar:phone-calling-outline"
          size={18}
          strokeWidth={18}
          color={themeContext?.colors.text}
        />
      ),
      action: "",
    },
    {
      name: "Chat",
      icon: (
        <Iconify
          icon="solar:chat-round-line-outline"
          size={18}
          strokeWidth={18}
          color={themeContext?.colors.text}
        />
      ),
      action: "",
    },
    {
      name: "Website",
      icon: (
        <Iconify
          icon="solar:global-outline"
          size={18}
          strokeWidth={18}
          color={themeContext?.colors.text}
        />
      ),
      action: "",
    },
    {
      name: "Map",
      icon: (
        <Iconify
          icon="solar:map-outline"
          size={18}
          strokeWidth={18}
          color={themeContext?.colors.text}
        />
      ),
      action: "",
    },
  ];

  const renderReviewCard = (review) => {
    return (
      <ReviewCard>
        <View
          style={{
            width: "100%",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 10,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
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
            <View style={{ marginLeft: 15 }}>
              <ServiceInfoHeaderLabel style={{ paddingBottom: 5 }}>
                Sam Smith
              </ServiceInfoHeaderLabel>
              <Description
                style={{
                  fontSize: 12,
                  color: themeContext?.colors.secondaryText,
                }}
              >
                Service provider
              </Description>
            </View>
          </View>
          <TagLabel>04 April 2024</TagLabel>
        </View>
        <Description style={{ lineHeight: 24 }}>
          It is a long established fact that a read will be distracted by the
          long readable content of a page when looking at its content or layout
        </Description>
      </ReviewCard>
    );
  };

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
              width: "80%",
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
            <Description style={{ color: themeContext?.colors.secondaryText }}>
              1012 Ocean avenue, New York, USA
            </Description>
          </View>
        </ServiceInfoContainer>
        <ServiceInfoContainer>
          <ServiceInfoHeaderLabel>About Service</ServiceInfoHeaderLabel>
          <Description style={{ lineHeight: 24 }}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Est eveniet
            tempore quibusdam, numquam nobis iste? Dolor vel est sunt minus
            maiores voluptas assumenda harum ratione, cum, facere unde nobis?
            Quis!
          </Description>
        </ServiceInfoContainer>
        <ServiceInfoContainer
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          {serviceSocialItems.map((item, index) => (
            <IconBtn key={index} style={{ height: 80, width: 80 }}>
              <>{item.icon}</>
              <Description style={{ marginTop: 10, fontSize: 12 }}>
                {item.name}
              </Description>
            </IconBtn>
          ))}
        </ServiceInfoContainer>
        <ServiceInfoContainer>
          <ServiceInfoHeaderLabel>
            About Service Provider
          </ServiceInfoHeaderLabel>
          <ServiceProviderCard />
        </ServiceInfoContainer>
        {/* Galllery goes here... */}
        <ServiceInfoContainer>
          <ServiceInfoHeaderLabel>Gallery</ServiceInfoHeaderLabel>
          <GridView
            items={[
              {
                imageProps: {
                  source: {
                    uri: "https://www.apartments.com/rental-manager/sites/default/files/image/2023-02/home%20repair.jpg",
                  },
                },
              },
              {
                imageProps: {
                  source: {
                    uri: "https://www.apartments.com/rental-manager/sites/default/files/image/2023-02/home%20repair.jpg",
                  },
                },
              },
              {
                imageProps: {
                  source: {
                    uri: "https://www.apartments.com/rental-manager/sites/default/files/image/2023-02/home%20repair.jpg",
                  },
                },
              },
              {
                imageProps: {
                  source: {
                    uri: "https://www.apartments.com/rental-manager/sites/default/files/image/2023-02/home%20repair.jpg",
                  },
                },
              },
            ]}
            itemSpacing={2}
            numColumns={2}
          />
        </ServiceInfoContainer>
        {/* Reviews goes here... */}
        <GridView />
        <ServiceInfoContainer>
          <ServiceInfoHeaderLabel>Reviews</ServiceInfoHeaderLabel>
          <StackAggregator
            bg-transparent
            contentContainerStyle={{
              backgroundColor: "transparent",
            }}
            buttonProps={{
              "bg-transparent": true,
              bottom: true,
            }}
          >
            {[...new Array(8)].map((item) => renderReviewCard(item))}
          </StackAggregator>
        </ServiceInfoContainer>
        {/* More for you goes here... */}
        <ServiceInfoContainer>
          <ServiceInfoHeaderLabel>More for you</ServiceInfoHeaderLabel>
          <FlatList
            data={[...new Array(5)]}
            renderItem={({ item, index }) => (
              <ServiceCard service={item} navigation={navigation} />
            )}
            horizontal
            ItemSeparatorComponent={() => (
              <View style={{ marginHorizontal: 7 }} />
            )}
            showsHorizontalScrollIndicator={false}
          />
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
