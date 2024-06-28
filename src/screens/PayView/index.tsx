import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { Paystack } from "react-native-paystack-webview";

const PayView = () => {
  const ref = useRef(null);
  const [start, setStart] = useState(false);

  useEffect(() => {
    setStart(true);

    const unsubScribe = () => {
      setStart(false);
      ref.current = null;
    };

    () => unsubScribe();
  }, []);
  return (
    <View>
      <Paystack
        paystackKey="pk_test_52385f97ac4b106e562d98bef224c7286d2c3246"
        amount={0}
        billingEmail={""}
        // billingMobile={""}
        activityIndicatorColor="green"
        onCancel={(e) => {}}
        onSuccess={(response) => {}}
        autoStart={start}
        ref={ref}
      />
    </View>
  );
};

export default PayView;

const styles = StyleSheet.create({});
