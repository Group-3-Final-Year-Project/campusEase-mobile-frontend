import { StyleSheet, Text, View, FlatList } from "react-native";
import React from "react";
import { getIsServiceProvider } from "~services";
import { ListLabel } from "../../styles";
import { TertiaryServiceCard } from "~components";
import { NavigationProp } from "@react-navigation/native";

const ProviderServices = (props: { navigation: NavigationProp<any> }) => {
  const [isProvider, setIsProvider] = React.useState(false);
  React.useEffect(() => {
    const fetchIsProvider = async () => {
      setIsProvider(await getIsServiceProvider());
    };
    fetchIsProvider();
  }, []);
  return (
    <>
      {isProvider ? (
        <View style={{ marginTop: 20 }}>
          <ListLabel style={{ marginBottom: 10 }}>My services</ListLabel>
          <FlatList
            data={[...new Array(2)]}
            renderItem={({ item, index }) => (
              <TertiaryServiceCard
                service={item}
                navigation={props.navigation}
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

const styles = StyleSheet.create({});
