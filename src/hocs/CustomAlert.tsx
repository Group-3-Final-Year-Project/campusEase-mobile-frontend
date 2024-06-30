import React, { useState, useEffect, useRef } from "react";
import { Incubator } from "react-native-ui-lib";
import { Text } from "~components";
import { eventEmitter } from "~services";
import { SUBSCRIBABLE_EVENTS } from "~src/shared/constants";

const CustomAlert = (props: { children: any }) => {
  const [showAlert, setShowAlert] = useState(false);
  const [alertTitle, setAlertTitle] = useState("");
  const [alertMessage, setAlertMessage] = useState("");
  const [alertButtons, setAlertButtons] = useState([]);
  const emitterListenerRef = useRef<any>(null);

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
        <Incubator.Dialog
          center
          direction="up"
          ref={emitterListenerRef}
          visible={showAlert}
          onDismiss={hideAlert}
          // buttons={alertButtons}
          // onClose={hideAlert}
        >
          <Incubator.Dialog.Header title={alertTitle} />
          <Text>{alertMessage}</Text>
        </Incubator.Dialog>
      )}
    </>
  );
};

export default CustomAlert;
