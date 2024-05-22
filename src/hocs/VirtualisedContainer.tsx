import { VirtualizedList, VirtualizedListProps } from "react-native";
import React from "react";

const VirtualisedContainer = (props: VirtualizedListProps<{}>) => {
  return (
    <VirtualizedList
      ListHeaderComponent={() => props.children}
      getItemCount={() => 0}
      showsVerticalScrollIndicator={false}
      showsHorizontalScrollIndicator={false}
      {...props}
      renderItem={() => null}
    />
  );
};

export default VirtualisedContainer;
