import { StyleSheet, View } from "react-native";
import React, { useCallback, useContext } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { ThemeContext } from "styled-components/native";
import {
  BottomCard,
  Container,
  Description,
  HighlightedDescription,
} from "./styles";
import VirtualisedContainer from "~src/hocs/VirtualisedContainer";
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

  useFocusEffect(
    useCallback(() => {
      navigation.setOptions({
        // headerTitle: "",
        // headerTransparent: true,
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
      });
    }, [])
  );
  return (
    <Container>
      <VirtualisedContainer
        style={{ paddingBottom: bottomInset }}
        renderItem={undefined}
      >
        <ServiceBanner />
      </VirtualisedContainer>
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
