import { View } from "react-native";
import React, { useContext } from "react";
import { Iconify } from "react-native-iconify";
import { ThemeContext } from "styled-components/native";
import { IconBtn, Searchbar } from "~components";
import { APP_PAGES } from "~src/shared/constants";
import { NavigationProp } from "@react-navigation/native";

const SearchFilterBtn = (props: { navigation: NavigationProp<any> }) => {
  const themeContext = useContext(ThemeContext);

  return (
    <View
      style={{
        flexDirection: "row",
        width: "100%",
      }}
    >
      <Searchbar
        placeholder="Search..."
        onPress={() =>
          props.navigation.navigate(APP_PAGES.SEARCH_AND_FILTER, {
            btnClicked: "search",
          })
        }
        icon={
          <Iconify
            icon="solar:minimalistic-magnifer-outline"
            size={18}
            strokeWidth={18}
            color={themeContext?.colors.text}
          />
        }
      />
      <IconBtn
        style={{
          marginLeft: 7,
          backgroundColor: themeContext?.colors.primary,
          width: 50,
        }}
        onPress={() =>
          props.navigation.navigate(APP_PAGES.SEARCH_AND_FILTER, {
            btnClicked: "filter",
          })
        }
      >
        <Iconify
          icon="solar:tuning-2-outline"
          size={18}
          strokeWidth={18}
          color={themeContext?.colors.text}
        />
      </IconBtn>
    </View>
  );
};

export default SearchFilterBtn;
