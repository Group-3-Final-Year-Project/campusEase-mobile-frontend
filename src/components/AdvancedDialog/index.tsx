import React from "react";
import { Dialog, DialogProps } from "react-native-ui-lib";

const AdvancedDialog = ({ children, ...props }: DialogProps) => {
  return (
    <Dialog useSafeArea {...props}>
      {children}
    </Dialog>
  );
};

export default AdvancedDialog;
