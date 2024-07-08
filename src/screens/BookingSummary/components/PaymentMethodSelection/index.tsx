import { View } from "react-native";
import React, { useContext, useState } from "react";
import { ButtonProps } from "react-native-ui-lib";
import { BookingInfoCard, Description } from "../../styles";
import { PaymentMethodObject } from "~src/@types/types";
import { ThemeContext } from "styled-components/native";
import { IconBtn } from "~components";
import AdvancedActionSheet from "~components/AdvancedActionSheet";
import { Iconify } from "react-native-iconify";

type PaymentMethodSelectionProps = {
  paymentMethods: PaymentMethodObject[];
  selectedPaymentMethod: PaymentMethodObject | null;
  setSelectedPaymentMethod: React.Dispatch<
    React.SetStateAction<PaymentMethodObject | null>
  >;
};

const PaymentMethodSelection = ({
  paymentMethods,
  selectedPaymentMethod,
  setSelectedPaymentMethod,
}: PaymentMethodSelectionProps) => {
  const themeContext = useContext(ThemeContext);
  const addressesForActionSheet: ButtonProps[] = paymentMethods.map(
    (address) => {
      return {
        label: address.name,
        onPress: () => setSelectedPaymentMethod(address),
      };
    }
  );

  const [isVisible, setIsVisible] = useState(false);

  return (
    <>
      <BookingInfoCard>
        <View
          style={{
            width: "100%",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <View>
              <View style={{ flexDirection: "row" }}>
                <Iconify icon={"flat-color-icons:print"} />
                <Description>
                  {!selectedPaymentMethod
                    ? "Select payment method"
                    : selectedPaymentMethod.name}
                </Description>
              </View>
            </View>
          </View>
          <IconBtn onPress={() => setIsVisible(true)}>
            <Description
              style={{ color: themeContext?.colors.primary, fontSize: 12 }}
            >
              Change
            </Description>
          </IconBtn>
        </View>
      </BookingInfoCard>

      <AdvancedActionSheet
        visible={isVisible}
        message="Select payment method"
        options={addressesForActionSheet}
        title="Select payment method"
        useNativeIOS
        onDismiss={() => setIsVisible(false)}
      />
    </>
  );
};

export default PaymentMethodSelection;
