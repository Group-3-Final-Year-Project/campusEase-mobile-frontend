import { Image, Text, View } from "react-native";
import React, { useContext } from "react";
import EmptyIcon from "~assets/images/empty.svg";
import { ThemeContext } from "styled-components/native";

type EmptyProps = {
  message?: string;
  title?: string;
};

const EmptyState = (props: EmptyProps) => {
  const themeContext = useContext(ThemeContext);
  return (
    <View
      style={{ flexGrow: 1, alignItems: "center", justifyContent: "center" }}
    >
      <EmptyIcon width={200} height={200} />
      <Text
        style={{
          fontSize: 10,
          fontFamily: themeContext?.typography.fontFamily.regular,
          marginTop: 10,
          color: themeContext?.colors.secondaryText2,
        }}
      >
        {props.message ?? "Oops! No data available. Try again."}
      </Text>
    </View>
  );
};

export default EmptyState;
