import { View, FlatList } from "react-native";
import React, { useCallback } from "react";
import { Container } from "./styles";
import {
  SecondaryServiceCard,
  LoadingView,
  EmptyState,
  CustomRefreshControl,
} from "~components";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { useCustomBottomInset } from "~hooks";
import servicesData from "~src/data/servicesData";
import { useQuery } from "@tanstack/react-query";
import { QUERY_KEYS } from "~src/shared/constants";
import { ServiceCategory } from "~src/@types/types";

interface ICategory {
  category: ServiceCategory;
}

const Category = (props: ICategory) => {
  const navigation = useNavigation();
  const bottomInset = useCustomBottomInset();

  const fetchData = useCallback(() => {
    return servicesData.filter(
      (service) => service.category.id === props.category.id
    );
  }, [props.category]);

  const { data, isLoading, isError, isRefetching } = useQuery({
    queryKey: [QUERY_KEYS.CATEGORY_SERVICES],
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
        ListEmptyComponent={() => <EmptyState />}
        refreshControl={<CustomRefreshControl refreshing={isRefetching} />}
      />
    </Container>
  );
};

export default Category;
