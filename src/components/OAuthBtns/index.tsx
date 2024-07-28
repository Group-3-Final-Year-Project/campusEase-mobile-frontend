import { View } from "react-native";
import React from "react";
import { Iconify } from "react-native-iconify";
import IconBtn from "~components/IconBtn";

const OAuthBtns = () => {
  const oauth_btns = [
    {
      name: "Google",
      icon: <Iconify size={16} icon={"logos:google-icon"} />,
      onPress: () => null,
    },
    {
      name: "Instagram",
      icon: <Iconify size={16} icon={"logos:instagram-icon"} />,
      onPress: () => null,
    },
    {
      name: "Apple",
      icon: <Iconify size={16} icon={"logos:apple"} />,
      onPress: () => null,
    },
    {
      name: "Twitter",
      icon: <Iconify size={16} icon={"logos:twitter"} />,
      onPress: () => null,
    },
  ];

  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {oauth_btns.map((item) => (
        <IconBtn
          key={item.name}
          style={{
            height: 50,
            width: 50,
            paddingVertical: 12,
            paddingHorizontal: 5,
            marginHorizontal: 5,
          }}
        >
          {item.icon}
        </IconBtn>
      ))}
    </View>
  );
};

export default OAuthBtns;
