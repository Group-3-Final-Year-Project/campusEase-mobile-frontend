import { Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { BookingInfoCard, Description } from "../../styles";
import { formatCurrency } from "~services";

const PaymentSummary = ({ amount }: { amount: number }) => {
  const data = [
    {
      id: 1,
      name: "Service fee",
      value: amount,
    },
    {
      id: 2,
      name: "Surcharge",
      value: 0.5,
    },
    {
      id: 3,
      name: "Total",
      value: Number(amount) + 0.5,
    },
  ];

  return (
    <View>
      {data.map((item) => (
        <View
          style={{ display: "flex", borderRadius: 15, paddingVertical: 15 }}
          key={item.id}
        >
          <View
            style={{
              width: "100%",
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: 10,
            }}
          >
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <View>
                <Description>{item.name}</Description>
              </View>
            </View>
            <Description>{formatCurrency(item.value ?? 0)}</Description>
          </View>
        </View>
      ))}
    </View>
  );
};

export default PaymentSummary;
