import { FlatList, RefreshControl, View } from "react-native";
import React, { useCallback, useContext } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { ThemeContext } from "styled-components/native";
import { EmptyState, LoadingView, SecondaryServiceCard } from "~components";
import { Iconify } from "react-native-iconify";
import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import { Container } from "./styles";
import { NavigationProp } from "@react-navigation/native";
import { useQuery } from "@tanstack/react-query";
import { QUERY_KEYS } from "~src/shared/constants";
import { getBookmarks } from "~services";

export const useCustomBottomInset = () => {
  const insets = useSafeAreaInsets();
  return Math.max(20, insets.bottom + 5);
};

const Bookmarks = ({ navigation }: BottomTabScreenProps<any>) => {
  const insets = useSafeAreaInsets();
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
        refreshControl={<RefreshControl refreshing={isRefetching} />}
      />
    </Container>
  );
};

export default Bookmarks;
