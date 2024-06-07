import {
  FlatList,
  ListRenderItem,
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
} from "react-native";
import React, { useContext } from "react";
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

const ServiceCategories = () => {
  const layout = useWindowDimensions();
  const themeContext = useContext(ThemeContext);
  const categories = [
    { id: "0", name: "Home" },
    { id: "1", name: "Entertainment" },
    { id: "2", name: "Plumbing" },
    { id: "3", name: "Plumbings" },
    { id: "4", name: "Food" },
  ];
  const renderCategoryScene = reduce(
    categories,
    (acc, category) => ({
      ...acc,
      [category["id"]]: () => <Category category={category} />,
    }),
    {}
  );
  const getCategoryRoutes = categories.map((category) => {
    return {
      key: category.id,
      title: capitalize(category.name),
    };
  });

  const renderScene = SceneMap(renderCategoryScene);

  const [index, setIndex] = React.useState(0);
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
      onIndexChange={setIndex}
      initialLayout={{ width: layout.width }}
      overScrollMode="auto"
      renderTabBar={_renderTabBar}
    />
  );
};

export default ServiceCategories;

const styles = StyleSheet.create({});
