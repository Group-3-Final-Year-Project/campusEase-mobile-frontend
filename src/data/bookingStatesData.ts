import { BookingStatus } from "~src/@types/types";

export const bookingStates = {
  [BookingStatus.PENDING]: {
    name: BookingStatus.PENDING,
    description:
      "The booking has been submitted by the user but has not yet been confirmed by the provider. This could be due to various reasons, such as waiting for payment verification, availability confirmation, or manual approval by the provider.",
  },
  [BookingStatus.IN_PROGRESS]: {
    name: BookingStatus.IN_PROGRESS,
    description:
      "The booking has been confirmed by the provider and is currently ongoing. This state indicates that the service or resource is being utilized by the user according to the booking details.",
  },
  [BookingStatus.COMPLETED]: {
    name: BookingStatus.COMPLETED,
    description:
      "The booking has been successfully fulfilled. The service or resource utilization has ended, and the booking is considered closed. Depending on the system, this state might be further divided into sub-categories like 'Reviewed' or 'Paid' to track additional aspects of the completed booking.",
  },
  [BookingStatus.CANCELLED]: {
    name: BookingStatus.CANCELLED,
    description:
      "The booking has been terminated before completion. This could be initiated by either the user or the provider. Reasons for cancellation could vary, such as user rescheduling, provider unavailability, or policy violations.",
  },
};
