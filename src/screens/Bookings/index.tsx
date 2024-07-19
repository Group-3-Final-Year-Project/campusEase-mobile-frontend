import { FlatList, View } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useCustomBottomInset } from "~hooks";
import { ThemeContext } from "styled-components/native";
import { Iconify } from "react-native-iconify";
import { Container, HeaderCard, HeaderItemLabel } from "./styles";
import BookingCard from "./components/BookingCard";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import {
  CustomRefreshControl,
  EmptyState,
  IconBtn,
  LoadingView,
} from "~components";
import { getBookingsAsUserOrProvider, getIsServiceProvider } from "~services";
import { Booking, BookingStatus, VerifiedUser } from "~src/@types/types";
import { useQuery } from "@tanstack/react-query";
import { QUERY_KEYS } from "~src/shared/constants";
import { useAppSelector } from "~store/hooks/useTypedRedux";

type StatusType = "All" | "My booked services" | BookingStatus;

const Bookings = ({ navigation }: NativeStackScreenProps<any>) => {
  const insets = useSafeAreaInsets();
  const bottomInset = useCustomBottomInset();
  const themeContext = useContext(ThemeContext);
  const [activeStatusBtn, setActiveStatusBtn] = useState("all");
  const [isProvider, setIsProvider] = React.useState(false);
  const user: VerifiedUser = useAppSelector((state) => state.user);
  const [filteredBookings, setFilteredBookings] = useState<Booking[]>([]);

  React.useEffect(() => {
    const fetchIsProvider = async () => {
      setIsProvider(await getIsServiceProvider());
    };
    fetchIsProvider();
  }, []);

  const statuses = [
    { name: "All" },
    isProvider ? { name: "My booked services" } : null,
    { name: BookingStatus.PENDING },
    { name: BookingStatus.IN_PROGRESS },
    { name: BookingStatus.COMPLETED },
    { name: BookingStatus.CANCELLED },
  ];

  const renderStatusBtn = ({ item }: { item: { name: StatusType } }) => {
    const isActive = item.name === activeStatusBtn;
    return (
      <IconBtn
        onPress={() => {
          setActiveStatusBtn(item.name);
          getFilterBookings(item.name);
        }}
        style={{
          backgroundColor: isActive
            ? themeContext?.colors.secondary
            : themeContext?.colors.background,
          height: 35,
          minWidth: 60,
        }}
      >
        <HeaderItemLabel>{item.name}</HeaderItemLabel>
      </IconBtn>
    );
  };

  const fetchData = async (userId: string) => {
    return await getBookingsAsUserOrProvider(userId);
  };

  const { data, isLoading, isError, refetch, isRefetching } = useQuery({
    queryKey: [QUERY_KEYS.BOOKINGS],
    queryFn: () => fetchData(user.id),
  });

  useEffect(() => {
    if (data && data.length) {
      setFilteredBookings(data);
      setActiveStatusBtn("all");
    }
  }, [data]);

  if (isLoading) {
    return <LoadingView />;
  } else if (isError || !data || data === undefined) {
    return <EmptyState />;
  }

  const getFilterBookings = (activeStatus: StatusType) => {
    if (activeStatus === "All") {
      setFilteredBookings(data);
    } else if (activeStatus === "My booked services") {
      const filtered = data.filter((booking) => booking.providerId === user.id);
      setFilteredBookings(filtered);
    } else {
      const filtered = data.filter(
        (booking) => booking.bookingStatus === activeStatus
      );
      setFilteredBookings(filtered);
    }
  };

  return (
    <Container>
      <HeaderCard>
        <FlatList
          horizontal
          data={
            statuses.filter((status) => status !== null) as {
              name: StatusType;
            }[]
          }
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
          data={filteredBookings}
          renderItem={({ item }) => (
            <BookingCard booking={item} navigation={navigation} />
          )}
          ItemSeparatorComponent={() => <View style={{ marginVertical: 7 }} />}
          ListHeaderComponent={() => <View style={{ marginTop: 7 }} />}
          ListEmptyComponent={() => <EmptyState />}
          refreshControl={
            <CustomRefreshControl
              refreshing={isRefetching}
              onRefresh={refetch}
            />
          }
        />
      )}
    </Container>
  );
};

export default Bookings;
