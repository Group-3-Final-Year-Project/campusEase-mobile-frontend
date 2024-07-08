import { Text, View, FlatList } from "react-native";
import React from "react";
import { getIsServiceProvider } from "~services";
import { ListLabel } from "../../styles";
import { TertiaryServiceCard } from "~components";
import { NavigationProp } from "@react-navigation/native";
import { ServiceListService } from "~src/@types/types";

type ProviderServicesProps = {
  navigation: NavigationProp<any>;
  services: ServiceListService[];
};

const ProviderServices = ({ navigation, services }: ProviderServicesProps) => {
  const [isProvider, setIsProvider] = React.useState(false);
  React.useEffect(() => {
    const fetchIsProvider = async () => {
      setIsProvider(await getIsServiceProvider());
    };
    fetchIsProvider();
  }, []);
  return (
    <>
      {isProvider && !!services?.length ? (
        <View style={{ marginTop: 20 }}>
          <ListLabel style={{ marginBottom: 10 }}>My services</ListLabel>
          <FlatList
            data={services}
            renderItem={({ item }) => (
              <TertiaryServiceCard
                key={item.id}
                service={item}
                navigation={navigation}
              />
            )}
            horizontal
            ItemSeparatorComponent={() => (
              <View style={{ marginHorizontal: 7 }} />
            )}
            showsHorizontalScrollIndicator={false}
          />
        </View>
      ) : null}
    </>
  );
};

export default ProviderServices;
