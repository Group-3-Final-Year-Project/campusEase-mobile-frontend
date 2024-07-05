import React, { useState, useEffect, useRef, useContext } from "react";
import { Incubator } from "react-native-ui-lib";
import { ThemeContext } from "styled-components/native";
import { Text } from "~components";
import { eventEmitter } from "~services";
import { SUBSCRIBABLE_EVENTS } from "~src/shared/constants";

const CustomToast = (props: { children: any }) => {
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastButtons, setToastButtons] = useState([]);
  const emitterListenerRef = useRef<any>(null);
  const themeContext = useContext(ThemeContext);

  useEffect(() => {
    emitterListenerRef.current = eventEmitter.addListener(
      SUBSCRIBABLE_EVENTS.SHOW_TOAST,
      (data) => {
        setShowToast(true);
        setToastMessage(data.message);
        setToastButtons(data?.buttons || []);
      }
    );

    return () => {
      emitterListenerRef.current = eventEmitter.removeListener(
        SUBSCRIBABLE_EVENTS.SHOW_TOAST,
        () => {
          hideToast();
        }
      );
    };
  }, []);

  const hideToast = () => {
    setShowToast(false);
  };

  return (
    <>
      {props.children}
      {showToast && (
        <Incubator.Toast
          // ref={emitterListenerRef}
          visible={showToast}
          onDismiss={hideToast}
          // buttons={toastButtons}
          // onClose={hideToast}
          position={"bottom"}
          message={toastMessage}
          // showLoader={showLoader}
          // renderAttachment={this.renderAttachment}
          // action={action}
          preset={"general"}
          swipeable={true}
          autoDismiss={3500}
          backgroundColor={themeContext?.colors.secondary}
          centerMessage
          containerStyle={{
            borderRadius: 20,
          }}
          messageStyle={{
            color: themeContext?.colors.text,
            fontFamily: themeContext?.typography.fontFamily.regular,
          }}
          zIndex={1000}
        >
          <Text>{toastMessage}</Text>
        </Incubator.Toast>
      )}
    </>
  );
};

export default CustomToast;
