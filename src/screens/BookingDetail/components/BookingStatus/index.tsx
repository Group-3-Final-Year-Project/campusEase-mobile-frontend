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

const BookingStatus = () => {
  const themeContext = useContext(ThemeContext);
  const [anchorIndex, setAnchorIndex] = useState(0);
  const anchor = useRef();

  const renderContent = () => {
    return (
      <TimelineItemContainer ref={anchor}>
        <TimelineTopbar>
          <TimelineHeaderLabel>Booking Confirmed</TimelineHeaderLabel>
        </TimelineTopbar>
        <Description style={{ lineHeight: 24 }}>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Corrupti
          itaque rem accusamus, quidem quae modi ea nobis assumenda, officiis
          magni nostrum vitae expedita non fuga quod. Vel sit ipsa error!
        </Description>
      </TimelineItemContainer>
    );
  };

  return (
    <View>
      {[...new Array(3)].map((item, index) => (
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
          {renderContent()}
        </Timeline>
      ))}
    </View>
  );
};

export default BookingStatus;
