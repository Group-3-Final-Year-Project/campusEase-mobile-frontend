import { View, FlatList } from "react-native";
import React from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useCustomBottomInset } from "~hooks";
import { Container } from "./styles";
import AddressCard from "~components/AddressCard";
import { useAppSelector } from "~store/hooks/useTypedRedux";
import { VerifiedUser } from "~src/@types/types";
import { Button } from "~components";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { APP_PAGES } from "~src/shared/constants";
import { NavigationProp } from "@react-navigation/native";

const ManageAddresses = ({ navigation }: NativeStackScreenProps<any>) => {
  const insets = useSafeAreaInsets();
  const bottomInset = useCustomBottomInset();
  const user: VerifiedUser = useAppSelector((state) => state.user);

  return (
    <Container>
      <FlatList
        keyExtractor={(item) => item.id}
        data={user.locations ?? []}
        renderItem={({ item }) => (
          <AddressCard
            key={item.id}
            address={item}
            navigation={navigation as NavigationProp<any>}
          />
        )}
        ItemSeparatorComponent={() => <View style={{ marginVertical: 7 }} />}
        ListHeaderComponent={() => <View style={{ marginTop: 7 }} />}
      />
      <View>
        <Button
          onPress={() => navigation.navigate(APP_PAGES.ADD_OR_EDIT_LOCATION)}
        >
          Add address
        </Button>
      </View>
    </Container>
  );
};

export default ManageAddresses;
