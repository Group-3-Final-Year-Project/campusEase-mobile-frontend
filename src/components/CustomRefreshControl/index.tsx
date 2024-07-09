import { RefreshControl } from "react-native";
import type { RefreshControlProps } from "react-native";
import React, { useContext, useRef } from "react";
import { ThemeContext } from "styled-components/native";

const CustomRefreshControl = (props: RefreshControlProps) => {
  const themeContext = useContext(ThemeContext);
  return (
    <RefreshControl
      style={{
        backgroundColor: "transparent",
      }}
      tintColor={themeContext?.colors.primary}
      // size={12}
      {...props}
    />
  );
};

export default CustomRefreshControl;
