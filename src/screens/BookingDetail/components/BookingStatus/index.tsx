import { Text, View } from "react-native";
import React, { useContext, useRef, useState } from "react";
import Timeline from "react-native-ui-lib/timeline";
import { ThemeContext } from "styled-components/native";
import {
  TimelineHeaderLabel,
  TimelineItemContainer,
  TimelineTopbar,
} from "./styles";
import { Description } from "../../styles";
import { BookingState } from "~src/@types/types";

const BookingStatus = ({
  bookingStates,
}: {
  bookingStates: BookingState[];
}) => {
  const themeContext = useContext(ThemeContext);
  const [anchorIndex, setAnchorIndex] = useState(0);
  const anchor = useRef();

  const TimelineContent = ({ item }: { item: BookingState }) => {
    return (
      <TimelineItemContainer ref={anchor}>
        <TimelineTopbar>
          <TimelineHeaderLabel>{item.name}</TimelineHeaderLabel>
        </TimelineTopbar>
        <Description style={{ lineHeight: 24 }}>{item.description}</Description>
      </TimelineItemContainer>
    );
  };

  return (
    <View>
      {bookingStates.map((item, index) => (
        <Timeline
          key={index}
          point={{
            type: Timeline.pointTypes.BULLET,
            color: themeContext?.colors.primary,
            // label: index + 1,
            anchorRef: index == 0 ? anchor : undefined,
            state:
              index === 0
                ? Timeline.states.ERROR
                : index === 2
                ? Timeline.states.SUCCESS
                : Timeline.states.CURRENT,
          }}
          topLine={
            // index === 3
            //       ?
            {
              type: Timeline.lineTypes.SOLID,
              color: themeContext?.colors.primary,
              state:
                index === 0
                  ? Timeline.states.ERROR
                  : index === 2
                  ? Timeline.states.SUCCESS
                  : Timeline.states.CURRENT,
              entry: index === 0,
            }
            //   : undefined
          }
          bottomLine={
            // index !== 3
            //   ?
            {
              type: Timeline.lineTypes.SOLID,
              //   color: themeContext?.colors.primary,
              entry: index === 2,
              state:
                index === 0
                  ? Timeline.states.ERROR
                  : index === 2
                  ? Timeline.states.SUCCESS
                  : Timeline.states.CURRENT,
            }
            //   : undefined
          }
        >
          <TimelineContent item={item} />
        </Timeline>
      ))}
    </View>
  );
};

export default BookingStatus;
