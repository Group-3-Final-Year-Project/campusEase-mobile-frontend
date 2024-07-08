import { View } from "react-native";
import React, { useContext, useState } from "react";
import { ButtonProps } from "react-native-ui-lib";
import { BookingInfoCard, Description } from "../../styles";
import { formatCurrency } from "~services";
import { SubService } from "~src/@types/types";
import { ThemeContext } from "styled-components/native";
import { Iconify } from "react-native-iconify";
import { IconBtn } from "~components";
import AdvancedActionSheet from "~components/AdvancedActionSheet";

type SubServiceSelectionProps = {
  subServices: SubService[];
  selectedSubService: SubService | null;
  setSelectedSubService: React.Dispatch<
    React.SetStateAction<SubService | null>
  >;
};

const SubServiceSelection = ({
  subServices,
  selectedSubService,
  setSelectedSubService,
}: SubServiceSelectionProps) => {
  const themeContext = useContext(ThemeContext);
  const subServicesForActionSheet: ButtonProps[] = subServices.map(
    (service) => {
      return {
        label: service.name,
        onPress: () => setSelectedSubService(service),
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
              <Description>
                {!selectedSubService
                  ? "Select sub service"
                  : selectedSubService.name}
              </Description>
            </View>
          </View>
          {selectedSubService && (
            <Description>
              {formatCurrency(selectedSubService.price ?? 0)}
            </Description>
          )}
          <IconBtn onPress={() => setIsVisible(true)}>
            {/* <Iconify
              icon="solar:chat-round-line-outline"
              size={16}
              strokeWidth={16}
              color={themeContext?.colors.primary}
            /> */}
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
        message="Select sub service"
        options={subServicesForActionSheet}
        title="Select sub service(s)"
        useNativeIOS
        onDismiss={() => setIsVisible(false)}
      />
    </>
  );
};

export default SubServiceSelection;
