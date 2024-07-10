import { View, FlatList } from "react-native";
import React from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useCustomBottomInset } from "~hooks";
import { Container } from "./styles";
import AddressCard from "~components/AddressCard";
import { useAppSelector } from "~store/hooks/useTypedRedux";
import { VerifiedUser } from "~src/@types/types";

const ManageAddresses = () => {
  const insets = useSafeAreaInsets();
  const bottomInset = useCustomBottomInset();
  const user: VerifiedUser = useAppSelector((state) => state.user);

  return (
    <Container>
      <FlatList
        keyExtractor={(item, index) => index.toString()}
        data={user.locations ?? []}
        renderItem={({ item }) => <AddressCard address={item} />}
        ItemSeparatorComponent={() => <View style={{ marginVertical: 7 }} />}
        ListHeaderComponent={() => <View style={{ marginTop: 7 }} />}
      />
    </Container>
  );
};

export default ManageAddresses;
