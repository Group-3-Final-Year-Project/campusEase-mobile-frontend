import { View, FlatList } from "react-native";
import React from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useCustomBottomInset } from "~hooks";
import { Container } from "./styles";
import AddressCard from "~components/AddressCard";

const ManageAddresses = () => {
  const insets = useSafeAreaInsets();
  const bottomInset = useCustomBottomInset();

  return (
    <Container>
      <FlatList
        data={[...new Array(10)]}
        renderItem={() => <AddressCard />}
        ItemSeparatorComponent={() => <View style={{ marginVertical: 7 }} />}
        ListHeaderComponent={() => <View style={{ marginTop: 7 }} />}
      />
    </Container>
  );
};

export default ManageAddresses;
