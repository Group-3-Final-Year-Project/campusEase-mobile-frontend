import { View, ScrollView, Dimensions } from "react-native";
import React, { useContext } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useCustomBottomInset } from "~hooks";
import { ThemeContext } from "styled-components/native";
import { Iconify } from "react-native-iconify";
import {
  AnalyticsInfoContainer,
  AnalyticsInfoHeaderLabel,
  Container,
} from "./styles";
import { BarChart, LineChart } from "react-native-chart-kit";
import { width } from "~src/shared/constants";

const Analytics = () => {
  const insets = useSafeAreaInsets();
  const bottomInset = useCustomBottomInset();
  const themeContext = useContext(ThemeContext);
  const height = 220;

  return (
    <Container>
      <ScrollView
        style={{ paddingTop: insets.top, paddingBottom: bottomInset }}
      >
        <View>
          <AnalyticsInfoHeaderLabel>Sales</AnalyticsInfoHeaderLabel>
          <LineChart
            data={{
              labels: [
                "Jan",
                "Feb",
                "Mar",
                "Apr",
                "May",
                "Jun",
                "Jul",
                "Aug",
                "Sep",
                "Oct",
                "Nov",
                "Dec",
              ],
              datasets: [
                {
                  data: [
                    Math.random() * 100,
                    Math.random() * 100,
                    Math.random() * 100,
                    Math.random() * 100,
                    Math.random() * 100,
                    Math.random() * 100,
                    Math.random() * 100,
                    Math.random() * 100,
                    Math.random() * 100,
                    Math.random() * 100,
                    Math.random() * 100,
                    Math.random() * 100,
                  ],
                },
              ],
            }}
            width={width - 30}
            height={220}
            // yAxisLabel="$"
            // yAxisSuffix="k"
            yAxisInterval={2}
            fromZero
            chartConfig={{
              backgroundColor: `${themeContext?.colors.primary}20`,
              backgroundGradientFrom: `${themeContext?.colors.primary}40`,
              backgroundGradientTo: `${themeContext?.colors.primary}20`,
              decimalPlaces: 2, // optional, defaults to 2dp
              color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
              labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
              style: {
                borderRadius: 16,
              },
              propsForDots: {
                r: "3",
                strokeWidth: "1",
                stroke: `${themeContext?.colors.primary}70`,
              },
            }}
            bezier
            style={{
              borderRadius: 10,
            }}
          />
        </View>
      </ScrollView>
    </Container>
  );
};

export default Analytics;
