import { View, Dimensions } from "react-native";
import React, { useContext } from "react";
import { GridView, AnimatedImage, Card } from "react-native-ui-lib";
import { ListLabel } from "../../styles";
import { ThemeContext } from "styled-components/native";
import { NavigationProp } from "@react-navigation/native";
import { APP_PAGES } from "~src/shared/constants";
import { Filters, ServiceCategory } from "~src/@types/types";
import { useFilter } from "~store/hooks/useFilter";

type CategoriesProps = {
  categories: ServiceCategory[];
  navigation: NavigationProp<any>;
};

const Categories = ({ categories, navigation }: CategoriesProps) => {
  const theme = useContext(ThemeContext);
  const { setFilterValue } = useFilter();

  const handleOnPress = (item: ServiceCategory) => {
    //will set the redux filter for category to the specified id here...
    setFilterValue({
      filter: Filters.SERVICE_CATEGORY,
      value: {
        id: item.id,
        name: item.name,
        image: item?.image,
        icon: item?.icon,
        description: item?.description,
      },
    });
    navigation.navigate(APP_PAGES.SERVICE_CATEGORIES);
  };

  return (
    <View style={{ marginTop: 20 }}>
      <ListLabel style={{ marginBottom: 10 }}>Categories</ListLabel>
      <GridView
        items={categories}
        numColumns={3}
        itemSpacing={10}
        viewWidth={Dimensions.get("screen").width - 30}
        // listPadding={Spacings.s5}
        renderCustomItem={(item) => (
          <Card
            key={item?.id}
            center
            animated
            enableShadow={false}
            onPress={() => handleOnPress(item as ServiceCategory)}
            containerStyle={{
              backgroundColor: theme?.colors.secondaryBackground,
              borderRadius: 15,
              width: (Dimensions.get("screen").width - 60) / 3,
              height: 120,
              marginBottom: 10,
              marginRight: 10,
            }}
          >
            <AnimatedImage
              source={
                item?.image
                  ? { uri: item.image }
                  : require("src/assets/images/HeartEyesEmoji.png")
              }
              width={30}
              height={30}
            />
          </Card>
        )}
      />
    </View>
  );
};

export default Categories;
