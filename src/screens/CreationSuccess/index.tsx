import { StyleSheet, Text, View } from "react-native";
import React, { useCallback, useEffect } from "react";
import { useAppSelector } from "~store/hooks/useTypedRedux";
import { Service, VerifiedUser } from "~src/@types/types";
import { createService } from "~services";

const CreationSuccess = () => {
  const serviceInCreation: Service = useAppSelector(
    (state) => state.serviceInCreation
  );
  const user: VerifiedUser = useAppSelector((state) => state.user);

  const startServiceCreation = useCallback(async () => {
    if (
      serviceInCreation.name &&
      serviceInCreation.location.name &&
      serviceInCreation.category.id
    ) {
      const service: Service = {
        ...serviceInCreation,
        createdAt: new Date().toLocaleString(),
        isAvailable: true,
        providerId: user.id,
        updatedAt: new Date().toLocaleString(),
      };
      const res = await createService(service);
    }
  }, []);

  useEffect(() => {}, []);

  return (
    <View>
      <Text>CreationSuccess</Text>
    </View>
  );
};

export default CreationSuccess;

const styles = StyleSheet.create({});
