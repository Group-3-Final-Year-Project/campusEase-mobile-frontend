import { ImagePickerAsset } from "expo-image-picker";
import truncate from "lodash/truncate";
import {
  normalizeFilePath,
  showAlert,
  showToast,
  uploadFileToFirebaseStorage,
} from "~services";
import { GalleryFile, ImageForGallery } from "~src/@types/types";

export const pictures = [
  {
    key: "realid1",
    disabledDrag: false,
    disabledReSorted: false,
  },
  {
    key: "realid2",
    disabledDrag: false,
    disabledReSorted: false,
  },
  {
    key: "realid4",
    disabledDrag: false,
    disabledReSorted: false,
  },
  {
    key: "realid6",
    disabledDrag: false,
    disabledReSorted: false,
  },
  { key: "realid5", disabledDrag: true, disabledReSorted: true },
  { key: "realid8", disabledDrag: true, disabledReSorted: true },
  { key: "realid7", disabledDrag: true, disabledReSorted: true },
  { key: "realid522", disabledDrag: true, disabledReSorted: true },
  { key: "realid5222", disabledDrag: true, disabledReSorted: true },
];

export const sortByUrl = (firstItem: any, secondItem: any) =>
  firstItem.url && !secondItem.url ? -1 : 1;

export const deleteUrlFromItem = (picture: any) => (currentPic: any) => {
  const pictureWithoutURL = {
    ...currentPic,
    url: "",
    disabledDrag: true,
    disabledReSorted: true,
  };

  return currentPic.key === picture.key ? pictureWithoutURL : currentPic;
};

export const pickImages = (images: ImagePickerAsset[]) => {
  return images[0];
};

export const uploadServiceGallery = async (gallery: ImageForGallery[]) => {
  const successfulUploads: UploadedImage[] = [];

  for (const file of gallery) {
    try {
      if (!file.fileName || !file.base64URL) {
        throw new Error("Missing required properties: fileName and base64URL");
      }
      const path = normalizeFilePath(file.base64URL ?? "");
      const downloadURL = await uploadFileToFirebaseStorage({
        fileName: file.fileName,
        base64String: path,
        fileType: file.fileType ?? "",
        fileSize: file.fileSize,
      });
      console.log("durl: ", downloadURL);

      successfulUploads.push({
        fileName: file.fileName,
        fileSize: file.fileSize ?? 0,
        fileType: file.fileType ?? "",
        key: file.key,
        downloadURL,
      });
    } catch (error) {
      showToast(
        `${truncate(
          file.fileName
        )} could not be uploaded. You can add again later.`
      );
    }
  }

  return successfulUploads;
};

interface UploadedImage {
  fileName: string;
  fileSize: number;
  fileType: string;
  key?: string;
  downloadURL: string;
}
