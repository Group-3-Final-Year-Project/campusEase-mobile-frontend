import { FlatList, View } from "react-native";
import React, { useContext, useState } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useCustomBottomInset } from "~hooks";
import { ThemeContext } from "styled-components/native";
import { Iconify } from "react-native-iconify";
import { Container, HeaderCard, HeaderItemLabel } from "./styles";
import BookingCard from "./components/BookingCard";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { EmptyState, IconBtn, LoadingView } from "~components";
import { getIsServiceProvider } from "~services";
import { BookingStatus } from "~src/@types/types";
import { useQuery } from "@tanstack/react-query";
import { QUERY_KEYS } from "~src/shared/constants";
import bookingsData from "~src/data/bookingsData";
import { RefreshControl } from "react-native";

const Bookings = ({ navigation }: NativeStackScreenProps<any>) => {
  const insets = useSafeAreaInsets();
  const bottomInset = useCustomBottomInset();
  const themeContext = useContext(ThemeContext);
  const [activeStatusBtn, setActiveStatusBtn] = useState(BookingStatus.ALL);
  const [isProvider, setIsProvider] = React.useState(false);

  React.useEffect(() => {
    const fetchIsProvider = async () => {
      setIsProvider(await getIsServiceProvider());
    };
    fetchIsProvider();
  }, []);

  const statuses = [
    { name: BookingStatus.ALL },
    ...(isProvider ? [{ name: BookingStatus.MY_SERVICE }] : []),
    { name: BookingStatus.IN_PROGRESS },
    { name: BookingStatus.COMPLETED },
    { name: BookingStatus.CANCELLED },
  ];

  const renderStatusBtn = ({ item }: { item: { name: BookingStatus } }) => {
    const isActive = item.name === activeStatusBtn;
    return (
      <IconBtn
        onPress={() => setActiveStatusBtn(item.name)}
        style={{
          backgroundColor: isActive
            ? themeContext?.colors.primary
            : themeContext?.colors.background,
        }}
      >
        <HeaderItemLabel>{item.name}</HeaderItemLabel>
      </IconBtn>
    );
  };

  const fetchData = React.useCallback(
    async (bookingStatus: BookingStatus) => {
      setTimeout(() => null, 5000);
      return bookingsData;
    },
    [activeStatusBtn]
  );

  const { data, isLoading, isError, isRefetching } = useQuery({
    queryKey: [QUERY_KEYS.BOOKINGS],
    queryFn: () => fetchData(activeStatusBtn),
  });

  return (
    <Container>
      <HeaderCard>
        <FlatList
          horizontal
          data={statuses}
          renderItem={renderStatusBtn}
          ItemSeparatorComponent={() => (
            <View style={{ marginHorizontal: 3.5 }} />
          )}
        />
      </HeaderCard>
      {isLoading ? (
        <LoadingView />
      ) : isError || !data || data === undefined ? (
        <EmptyState />
      ) : (
        <FlatList
          data={data}
          renderItem={({ item }) => (
            <BookingCard booking={item} navigation={navigation} />
          )}
          ItemSeparatorComponent={() => <View style={{ marginVertical: 7 }} />}
          ListHeaderComponent={() => <View style={{ marginTop: 7 }} />}
          ListEmptyComponent={() => <EmptyState />}
          refreshControl={<RefreshControl refreshing={isRefetching} />}
        />
      )}
    </Container>
  );
};

export default Bookings;
