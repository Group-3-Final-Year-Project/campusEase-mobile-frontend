import { StyleSheet, Text, View, ViewStyle } from "react-native";
import React from "react";
import { Iconify } from "react-native-iconify";

interface IStarRating {
  value: number;
  size?: number;
  containerStyle?: ViewStyle;
}

const StarRating = (props: IStarRating) => {
  const renderStars = () => {
    return [...new Array(props.value)].map((item, index) => (
      <Iconify
        key={index}
        icon="fluent-emoji-flat:star"
        size={props?.size ?? 16}
        strokeWidth={props?.size ?? 16}
        style={{ marginRight: 5 }}
      />
    ));
  };

  return (
    <View style={{ flexDirection: "row" }} {...props?.containerStyle}>
      {renderStars()}
    </View>
  );
};

export default StarRating;

const styles = StyleSheet.create({});
