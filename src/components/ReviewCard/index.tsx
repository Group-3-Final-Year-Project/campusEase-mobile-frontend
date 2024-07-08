import { StyleSheet, View } from "react-native";
import React, { useContext } from "react";
import { ReviewCardContainer } from "./styles";
import { Avatar } from "react-native-ui-lib";
import {
  Description,
  ServiceInfoHeaderLabel,
  TagLabel,
} from "~src/screens/Service/styles";
import { ThemeContext } from "styled-components/native";
import { NavigationProp } from "@react-navigation/native";
import { Review } from "~src/@types/types";
import StarRating from "~components/StarRating";

type ReviewCardProps = {
  review: Review;
  navigation?: NavigationProp<any>;
};

const ReviewCard = ({ navigation, review }: ReviewCardProps) => {
  const themeContext = useContext(ThemeContext);

  return (
    <ReviewCardContainer>
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
              {review.reviewerName}
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
        <StarRating value={review.rating} size={10} />
        {"\n"}
        {review.message}
      </Description>
    </ReviewCardContainer>
  );
};

export default ReviewCard;

const styles = StyleSheet.create({});
