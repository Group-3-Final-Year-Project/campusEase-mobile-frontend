import {
  FlatList,
  ListRenderItem,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useContext, useState } from "react";
import {
  AttachmentContainer,
  AttachmentName,
  AttachmentTypeContainer,
  Description,
  InfoContainer,
} from "./styles";
import { GalleryFile } from "~src/@types/types";
import { AddAttachmentBtn } from "../../styles";
import { pickDocuments } from "~services";
import { Iconify } from "react-native-iconify";
import { ThemeContext } from "styled-components/native";
import { DocumentPickerAsset } from "expo-document-picker";
import truncate from "lodash/truncate";
import Color from "color";

type BookingAttachmentsProps = {
  attachments: DocumentPickerAsset[];
  setAttachments: React.Dispatch<React.SetStateAction<DocumentPickerAsset[]>>;
};

const BookingAttachments = ({
  attachments,
  setAttachments,
}: BookingAttachmentsProps) => {
  const themeContext = useContext(ThemeContext);
  const [limitReached, setLimitReached] = useState<boolean>(
    attachments.length === 3
  );

  const handlePickDocs = async () => {
    const res = await pickDocuments();
    setAttachments(res);
  };

  const renderAttachment = ({ item }: { item: DocumentPickerAsset }) => (
    <AttachmentContainer
    // style={{ width: Dimensions.get("screen").width - 30 }}
    >
      <AttachmentTypeContainer>
        {pickAttachmentTypeIcon(item.mimeType ?? "application/*")}
      </AttachmentTypeContainer>
      <InfoContainer>
        <AttachmentName>{truncate(item.name, { length: 20 })}</AttachmentName>
        <Description>{item.size}B</Description>
      </InfoContainer>
      <TouchableOpacity
        // onPress={() => handleDeleteFromSubServiceForms(form.id)}
        style={{ borderRadius: 100 }}
      >
        <Iconify
          size={18}
          color={themeContext?.colors.secondary}
          icon="solar:close-circle-bold"
        />
      </TouchableOpacity>
    </AttachmentContainer>
  );

  return (
    <FlatList
      data={attachments}
      ListHeaderComponent={
        <>
          {!limitReached && (
            <AddAttachmentBtn onPress={() => handlePickDocs()}>
              <Iconify
                color={themeContext?.colors.secondaryText2}
                icon="solar:add-square-outline"
                style={{ marginRight: 7 }}
              />
              <Description
                style={{ color: themeContext?.colors.secondaryText2 }}
              >
                Add attachments
              </Description>
            </AddAttachmentBtn>
          )}
        </>
      }
      renderItem={renderAttachment}
    />
  );
};

export default BookingAttachments;

export const pickAttachmentTypeIcon = (fileType: string) => {
  switch (fileType) {
    case "image/*":
      return (
        <View style={{ flex: 1, backgroundColor: "purple" }}>
          <Iconify
            icon={"solar:gallery-round-bold"}
            size={20}
            color={"purple"}
          />
        </View>
      );
    case "text/*":
      return (
        <View style={{ flex: 1, backgroundColor: "purple" }}>
          <Iconify
            icon={"solar:document-text-bold"}
            size={20}
            color={"purple"}
          />
        </View>
      );
    case "audio/*":
      return (
        <View style={{ flex: 1, backgroundColor: "purple" }}>
          <Iconify
            icon={"solar:turntable-music-note-bold"}
            size={20}
            color={"purple"}
          />
        </View>
      );
    case "video/*":
      return (
        <View style={{ flex: 1, backgroundColor: "purple" }}>
          <Iconify icon={"solar:videocamera-bold"} size={20} color={"purple"} />
        </View>
      );
    default:
      return (
        <View style={{ flex: 1, backgroundColor: "purple" }}>
          <Iconify icon={"solar:file-bold"} size={20} color={"purple"} />
        </View>
      );
  }
};
