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
import { useQuery } from "@tanstack/react-query";
import { QUERY_KEYS } from "~src/shared/constants";
import { ServiceCategory } from "~src/@types/types";
import { extractServiceForServiceList, getServices } from "~services";
import { useAppSelector } from "~store/hooks/useTypedRedux";

interface ICategory {
  category: ServiceCategory;
}

const Category = (props: ICategory) => {
  const navigation = useNavigation();
  const bottomInset = useCustomBottomInset();
  const user = useAppSelector((state) => state.user);

  const fetchData = useCallback(async () => {
    const services = await getServices(user.id);
    return extractServiceForServiceList(
      services.filter((service) => service.category.id === props.category.id)
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
        keyExtractor={(item) => item.id}
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
