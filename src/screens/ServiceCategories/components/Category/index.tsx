import { Text, View, FlatList, RefreshControl } from "react-native";
import React, { useCallback } from "react";
import { Container } from "./styles";
import { SecondaryServiceCard, LoadingView, EmptyState } from "~components";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import servicesData from "~src/data/servicesData";
import { useQuery } from "@tanstack/react-query";

interface ICategory {
  category: any;
}
export const useCustomBottomInset = () => {
  const insets = useSafeAreaInsets();
  return Math.max(20, insets.bottom + 5);
};

const Category = (props: ICategory) => {
  const navigation = useNavigation();
  const bottomInset = useCustomBottomInset();

  const fetchData = useCallback(async () => {
    setTimeout(() => null, 5000);
    return servicesData;
  }, []);

  const { data, isLoading, isError, isRefetching } = useQuery({
    queryKey: ["homeScreenData"],
    queryFn: () => fetchData(),
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
        refreshControl={<RefreshControl refreshing={isRefetching} />}
      />
    </Container>
  );
};

export default Category;
