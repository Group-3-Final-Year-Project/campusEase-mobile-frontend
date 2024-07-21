import { BookingStatus } from "~src/@types/types";

export const bookingStates = {
  [BookingStatus.PENDING]: {
    name: BookingStatus.PENDING,
    description: "",
  },
  [BookingStatus.IN_PROGRESS]: {
    name: BookingStatus.IN_PROGRESS,
    description: "",
  },
  [BookingStatus.COMPLETED]: {
    name: BookingStatus.COMPLETED,
    description: "",
  },
  [BookingStatus.CANCELLED]: {
    name: BookingStatus.CANCELLED,
    description: "",
  },
};
