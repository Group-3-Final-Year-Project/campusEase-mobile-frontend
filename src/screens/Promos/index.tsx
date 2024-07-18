import { FlatList, StyleSheet, View } from "react-native";
import React, { useCallback } from "react";
import { Container } from "../Home/styles";
import { extractServiceForServiceList, getServices } from "~services";
import { useAppSelector } from "~store/hooks/useTypedRedux";
import { VerifiedUser } from "~src/@types/types";
import { useQuery } from "@tanstack/react-query";
import {
  CustomRefreshControl,
  EmptyState,
  LoadingView,
  SecondaryServiceCard,
  Text,
} from "~components";
import { NavigationProp } from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

const Promos = ({ navigation }: NativeStackScreenProps<any>) => {
  const user: VerifiedUser = useAppSelector((state) => state.user);

  const fetchData = useCallback(async () => {
    const services = await getServices(user.id);
    return extractServiceForServiceList(services);
  }, []);

  const { data, isLoading, isError, error, isRefetching, refetch } = useQuery({
    queryKey: ["promos"],
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
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
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
        refreshControl={
          <CustomRefreshControl refreshing={isRefetching} onRefresh={refetch} />
        }
      />
    </Container>
  );
};

export default Promos;

const styles = StyleSheet.create({});
