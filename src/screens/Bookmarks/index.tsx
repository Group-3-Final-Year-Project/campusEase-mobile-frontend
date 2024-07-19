import { FlatList, View } from "react-native";
import React, { useContext } from "react";
import { useCustomBottomInset } from "~hooks";
import { ThemeContext } from "styled-components/native";
import {
  CustomRefreshControl,
  EmptyState,
  LoadingView,
  SecondaryServiceCard,
} from "~components";
import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import { Container } from "./styles";
import { NavigationProp } from "@react-navigation/native";
import { useQuery } from "@tanstack/react-query";
import { QUERY_KEYS } from "~src/shared/constants";
import { getBookmarks } from "~services";

const Bookmarks = ({ navigation }: BottomTabScreenProps<any>) => {
  const bottomInset = useCustomBottomInset();
  const themeContext = useContext(ThemeContext);

  const { data, isLoading, isError, isRefetching } = useQuery({
    queryKey: [QUERY_KEYS.BOOKMARKS],
    queryFn: async () => await getBookmarks(),
  });

  if (isLoading) {
    return <LoadingView />;
  } else if (isError || !data || data === undefined) {
    return <EmptyState />;
  }

  return (
    <Container>
      <FlatList
        keyExtractor={(item) => item.id}
        data={data}
        renderItem={({ item, index }) => (
          <SecondaryServiceCard
            key={item.id}
            service={item}
            navigation={navigation as NavigationProp<any>}
            style={{
              width: "100%",
            }}
          />
        )}
        ItemSeparatorComponent={() => <View style={{ marginVertical: 7 }} />}
        showsHorizontalScrollIndicator={false}
        style={{ paddingBottom: bottomInset }}
        ListHeaderComponent={() => <View style={{ marginTop: 7 }} />}
        ListEmptyComponent={() => <EmptyState />}
        refreshControl={<CustomRefreshControl refreshing={isRefetching} />}
      />
    </Container>
  );
};

export default Bookmarks;
