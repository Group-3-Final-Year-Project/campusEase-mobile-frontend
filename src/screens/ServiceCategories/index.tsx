import {
  Alert,
  FlatList,
  ListRenderItem,
  Text,
  View,
  useWindowDimensions,
} from "react-native";
import React, { useContext, useEffect } from "react";
import reduce from "lodash/reduce";
import capitalize from "lodash/capitalize";
import Category from "./components/Category";
import {
  NavigationState,
  SceneMap,
  SceneRendererProps,
  TabView,
} from "react-native-tab-view";
import { ThemeContext } from "styled-components/native";
import { IconBtn } from "~components";
import { CategoryLabel } from "./styles";
import Cats from "~src/data/categories";
import { useAppSelector } from "~store/hooks/useTypedRedux";
import { useFilter } from "~store/hooks/useFilter";
import { Filters } from "~src/@types/types";

const ServiceCategories = () => {
  const layout = useWindowDimensions();
  const themeContext = useContext(ThemeContext);
  const { filters, setFilterValue } = useFilter();
  const renderCategoryScene = reduce(
    Cats,
    (acc, category) => ({
      ...acc,
      [category["id"]]: () => <Category category={category} />,
    }),
    {}
  );
  const getCategoryRoutes = Cats.map((category) => {
    return {
      key: category.id.toString(),
      title: capitalize(category.name),
    };
  });

  // useEffect(() =>
  //   Alert.alert("hello", JSON.stringify(filters[Filters.SERVICE_CATEGORY]))
  // );
  const renderScene = SceneMap(renderCategoryScene);

  //use service category filter to set the index
  const [index, setIndex] = React.useState(
    filters[Filters.SERVICE_CATEGORY]?.id
  );
  const [routes] = React.useState(getCategoryRoutes);

  const renderItem = (
    item: {
      key: string;
      title: string;
    },
    jumpTo: (key: string) => void
  ) => {
    const isActive = index === parseInt(item.key);

    return (
      <IconBtn
        onPress={() => jumpTo(item.key)}
        style={{
          backgroundColor: isActive
            ? themeContext?.colors.primary
            : themeContext?.colors.background,
        }}
      >
        <CategoryLabel>{item.title}</CategoryLabel>
      </IconBtn>
    );
  };

  const _renderTabBar = (
    _props: SceneRendererProps & {
      navigationState: NavigationState<{ key: string; title: string }>;
    }
  ) => {
    return (
      <View
        style={{
          backgroundColor: themeContext?.colors.secondaryBackground,
          flexDirection: "row",
          paddingVertical: 5,
          paddingHorizontal: 3.5,
          marginHorizontal: 15,
          marginTop: 15,
          borderRadius: 10,
        }}
      >
        <FlatList
          horizontal
          data={_props.navigationState.routes}
          renderItem={({ item }) => renderItem(item, _props.jumpTo)}
          ItemSeparatorComponent={() => (
            <View style={{ marginHorizontal: 3.5 }} />
          )}
        />
      </View>
    );
  };

  return (
    <TabView
      navigationState={{ index, routes }}
      renderScene={renderScene}
      onIndexChange={(index) => {
        setIndex(index);
        setFilterValue({
          filter: Filters.SERVICE_CATEGORY,
          value: Cats.filter((cat) => cat.id === index),
        });
      }}
      initialLayout={{ width: layout.width }}
      overScrollMode="auto"
      renderTabBar={_renderTabBar}
    />
  );
};

export default ServiceCategories;
