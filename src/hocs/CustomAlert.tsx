import React, { useState, useEffect, useRef, useContext } from "react";
import { Incubator } from "react-native-ui-lib";
import { Text } from "~components";
import { eventEmitter } from "~services";
import { SUBSCRIBABLE_EVENTS } from "~src/shared/constants";
import AwesomeAlert from "react-native-awesome-alerts";
import { ThemeContext } from "styled-components/native";
import { Dimensions } from "react-native";

const CustomAlert = (props: { children: any }) => {
  const [showAlert, setShowAlert] = useState(false);
  const [alertTitle, setAlertTitle] = useState("");
  const [alertMessage, setAlertMessage] = useState("");
  const [alertButtons, setAlertButtons] = useState([]);
  const emitterListenerRef = useRef<any>(null);
  const themeContext = useContext(ThemeContext);

  useEffect(() => {
    emitterListenerRef.current = eventEmitter.addListener(
      SUBSCRIBABLE_EVENTS.SHOW_ALERT,
      (data) => {
        setShowAlert(true);
        setAlertTitle(data.title);
        setAlertMessage(data.message);
        setAlertButtons(data?.buttons || []);
      }
    );

    return () => {
      emitterListenerRef.current = eventEmitter.removeListener(
        SUBSCRIBABLE_EVENTS.SHOW_ALERT,
        () => {
          hideAlert();
        }
      );
    };
  }, []);

  const hideAlert = () => {
    setShowAlert(false);
  };

  return (
    <>
      {props.children}
      {showAlert && (
        <AwesomeAlert
          ref={emitterListenerRef}
          show={showAlert}
          showProgress={false}
          title={alertTitle}
          message={alertMessage}
          closeOnTouchOutside={true}
          closeOnHardwareBackPress={false}
          showCancelButton={false}
          showConfirmButton={true}
          // cancelText="No, cancel"
          confirmText="Ok"
          confirmButtonColor={themeContext?.colors.primary}
          onCancelPressed={hideAlert}
          onConfirmPressed={hideAlert}
          onDismiss={hideAlert}
          cancelButtonColor={themeContext?.colors.secondary}
          contentContainerStyle={{
            backgroundColor: themeContext?.colors.background,
            width: Dimensions.get("screen").width - 40,
          }}
          messageStyle={{
            fontFamily: themeContext?.typography.fontFamily.regular,
          }}
          titleStyle={{
            fontFamily: themeContext?.typography.fontFamily.bold,
          }}
          confirmButtonStyle={{
            height: 50,
            width: 50,
            alignItems: "center",
            justifyContent: "center",
            paddingVertical: 12,
            paddingHorizontal: 5,
            fontFamily: themeContext?.typography.fontFamily.regular,
          }}
          alertContainerStyle={{
            backgroundColor: "transparent",
          }}
        />
      )}
    </>
  );
};

export default CustomAlert;
