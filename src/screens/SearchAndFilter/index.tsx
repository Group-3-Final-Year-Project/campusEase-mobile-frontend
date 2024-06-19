import { FlatList, Text, View, RefreshControl } from "react-native";
import React, { useCallback, useContext, useEffect, useState } from "react";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { ThemeContext } from "styled-components/native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import {
  EmptyState,
  IconBtn,
  LoadingView,
  Searchbar,
  SecondaryServiceCard,
} from "~components";
import { Iconify } from "react-native-iconify";
import { Container } from "./styles";
import {
  SearchFilters,
  ServiceListService,
  VerifiedUser,
} from "~src/@types/types";
import { useAppSelector } from "~store/hooks/useTypedRedux";
import servicesData from "~src/data/servicesData";
import { QUERY_KEYS } from "~src/shared/constants";
import { useQuery } from "@tanstack/react-query";
import { NavigationProp } from "@react-navigation/native";

type SearchFilterProps = NativeStackScreenProps<any> & {
  showFilterBtn?: boolean;
};

export const useCustomBottomInset = () => {
  const insets = useSafeAreaInsets();
  return Math.max(20, insets.bottom + 5);
};

const SearchAndFilter = ({ navigation, showFilterBtn }: SearchFilterProps) => {
  const insets = useSafeAreaInsets();
  const bottomInset = useCustomBottomInset();
  const themeContext = useContext(ThemeContext);
  const { authorized_account }: VerifiedUser = useAppSelector(
    (state) => state.user
  );
  const [originalList, setOriginalList] = useState<ServiceListService[]>([]);
  const [visibleList, setVisibleList] = useState<ServiceListService[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");

  const getServiceListServices = (
    providerId?: number
  ): ServiceListService[] => {
    const data = servicesData
      .filter((service) =>
        providerId ? service.providerId !== providerId : service
      )
      .map((service) => {
        return {
          id: service.id,
          name: service.name,
          description: service?.description,
          coverImage: service.coverImage,
          rating: service?.rating,
          startingPrice: service?.startingPrice,
          isAvailable: service.isAvailable,
        };
      });
    return data;
  };

  const fetchData = useCallback(() => {
    return getServiceListServices(authorized_account.id);
  }, []);

  const { data, isLoading, isError, isRefetching } = useQuery({
    queryKey: [QUERY_KEYS.SERVICES],
    queryFn: () => fetchData(),
  });

  useEffect(() => {
    data && setVisibleList(data);
  }, [data]);

  const searchServices = (
    services: ServiceListService[],
    searchString: string
  ) => {
    setSearchTerm(searchString);
    const lowercaseSearchTerm = searchString.toLowerCase();

    setVisibleList(
      services.filter((service) => {
        const lowercaseName = service.name.toLowerCase();
        const lowercaseDescription = service.description?.toLowerCase();
        return (
          lowercaseName.includes(lowercaseSearchTerm) ||
          (lowercaseDescription &&
            lowercaseDescription.includes(lowercaseSearchTerm))
        );
      })
    );
  };

  const searchAndFilterServices = (
    services: ServiceListService[],
    searchTerm: string,
    ...args: SearchFilters[]
  ) => {
    const filteredByName = services.filter((service) => {
      const lowercaseSearchTerm = searchTerm.toLowerCase();
      const lowercaseName = service.name.toLowerCase();
      const lowercaseDescription = service.description?.toLowerCase();

      return (
        lowercaseName.includes(lowercaseSearchTerm) ||
        (lowercaseDescription &&
          lowercaseDescription.includes(lowercaseSearchTerm))
      );
    });

    let filteredServices = filteredByName;
    for (const filter of args) {
      filteredServices = filteredServices.filter((service) => {
        let isValid = true;

        // Check for starting price range
        if (filter.startingPriceRange) {
          const { min, max } = filter.startingPriceRange;
          isValid =
            isValid &&
            (service?.startingPrice ?? 0) >= min &&
            (service?.startingPrice ?? 0) <= max;
        }

        // Check for rating range
        if (filter.ratingRange) {
          const { min, max } = filter.ratingRange;
          isValid =
            isValid &&
            (service?.rating ?? 0) >= min &&
            (service?.rating ?? 0) <= max;
        }

        // Check for availability
        if (filter.isAvailable !== undefined) {
          isValid = isValid && service.isAvailable === filter.isAvailable;
        }

        // Check for location (if provided)
        if (filter.location) {
          const { latitude, longitude, radius } = filter.location;
          // Implement location filtering logic based on user's location and service location (e.g., calculate distance and compare to radius)
          // This part requires additional logic to access user's location and calculate distance
          isValid = isValid && true; // Replace with actual location filtering logic
        }

        return isValid;
      });
    }

    setVisibleList(filteredServices);
  };

  if (isLoading) {
    return <LoadingView />;
  } else if (isError || !data || data === undefined) {
    return <EmptyState />;
  }

  return (
    <Container>
      <View
        style={{
          flexDirection: "row",
          width: "100%",
        }}
      >
        <Searchbar
          value={searchTerm}
          onChangeText={(e) => searchAndFilterServices(data, e)}
          placeholder="Search..."
          icon={
            <Iconify
              icon="solar:minimalistic-magnifer-outline"
              size={18}
              strokeWidth={18}
              color={themeContext?.colors.text}
            />
          }
        />
        {showFilterBtn && (
          <IconBtn
            style={{
              marginLeft: 7,
              backgroundColor: themeContext?.colors.primary,
              width: 50,
            }}
          >
            <Iconify
              icon="solar:tuning-2-outline"
              size={18}
              strokeWidth={18}
              color={themeContext?.colors.text}
            />
          </IconBtn>
        )}
      </View>
      <FlatList
        data={visibleList}
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
        refreshControl={<RefreshControl refreshing={isRefetching} />}
      />
    </Container>
  );
};

export default SearchAndFilter;
