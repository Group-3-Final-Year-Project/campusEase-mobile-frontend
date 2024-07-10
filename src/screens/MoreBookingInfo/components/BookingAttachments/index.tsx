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
  const [numberOfAttachments, setNumberOfAttachments] = useState(0);

  const handlePickDocs = async () => {
    const res = await pickDocuments();
    setNumberOfAttachments(numberOfAttachments + res.length);
    setAttachments([...attachments, ...res]);
  };

  const handleRemoveFromAttachments = (uri: string) => {
    const updatedAttachments = attachments.filter(
      (attachments) => attachments.uri !== uri
    );
    setNumberOfAttachments(updatedAttachments.length);
    setAttachments(updatedAttachments);
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
        onPress={() => handleRemoveFromAttachments(item.uri)}
        style={{ borderRadius: 100 }}
      >
        <Iconify
          size={22}
          color={themeContext?.colors.secondary}
          icon="solar:close-circle-bold"
        />
      </TouchableOpacity>
    </AttachmentContainer>
  );

  return (
    <FlatList
      keyExtractor={(item, index) => index.toString()}
      data={attachments}
      ListFooterComponent={
        <>
          {numberOfAttachments < 3 && (
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
  function getUniversalMimeType(mimeType: string) {
    if (!mimeType) {
      return mimeType;
    }

    const category = mimeType.split("/")[0]; // Get the category (e.g., "image", "audio", "video")

    switch (category) {
      case "image":
        return mimeType.includes("png") ? "image/*" : mimeType;
      case "audio":
        return mimeType.includes("mpeg") ? "audio/*" : mimeType;
      case "video":
        return mimeType.includes("mp4") ? "video/*" : mimeType;
      case "text":
        return "text/*"; // Allow any text format
      default:
        return mimeType;
    }
  }

  const fType = getUniversalMimeType(fileType);

  switch (fType) {
    case "image/*":
      return (
        <View
          style={{
            borderRadius: 10,
            flex: 1,
            justifyContent: "center",
            backgroundColor: "#A020F020",
            alignItems: "center",
          }}
        >
          <Iconify
            icon={"solar:gallery-round-bold"}
            size={20}
            color={"#A020F0"}
          />
        </View>
      );
    case "text/*":
      return (
        <View
          style={{
            borderRadius: 10,
            flex: 1,
            justifyContent: "center",
            backgroundColor: "#0011ee20",
            alignItems: "center",
          }}
        >
          <Iconify
            icon={"solar:document-text-bold"}
            size={20}
            color={"#0011ee"}
          />
        </View>
      );
    case "audio/*":
      return (
        <View
          style={{
            borderRadius: 10,
            flex: 1,
            justifyContent: "center",
            backgroundColor: "#FFD70020",
            alignItems: "center",
          }}
        >
          <Iconify
            icon={"solar:turntable-music-note-bold"}
            size={20}
            color={"#FFD700"}
          />
        </View>
      );
    case "video/*":
      return (
        <View
          style={{
            borderRadius: 10,
            flex: 1,
            justifyContent: "center",
            backgroundColor: "#00808020",
            alignItems: "center",
          }}
        >
          <Iconify
            icon={"solar:videocamera-bold"}
            size={20}
            color={"#008080"}
          />
        </View>
      );
    default:
      return (
        <View
          style={{
            borderRadius: 10,
            flex: 1,
            justifyContent: "center",
            backgroundColor: "#11ff1120",
            alignItems: "center",
          }}
        >
          <Iconify icon={"solar:file-bold"} size={20} color={"#11ff11"} />
        </View>
      );
  }
};
20;
