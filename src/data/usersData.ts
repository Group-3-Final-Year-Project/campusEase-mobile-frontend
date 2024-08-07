import moment from "moment";
import { UserType, VerifiedUser } from "~src/@types/types";

export const usersData: VerifiedUser[] = [
  {
    id: "12346845843", // Replace with actual user ID
    token: null, // May not be provided for all users
    userType: UserType.USER, // Or UserType.SERVICE_PROVIDER
    username: "John Doe",
    email: "johndoe@example.com",
    phoneNumber: "+1234567890",
    locations: [
      {
        name: "Home",
        location: {
          latitude: 6.6771542731125875,
          longitude: -1.565951702533225,
          altitude: null,
          accuracy: null,
          altitudeAccuracy: null,
          heading: null,
          speed: null,
        },
      },
      {
        name: "Work",
        location: {
          latitude: 45.7749, // Replace with actual latitude
          longitude: -142.4194,
          altitude: null,
          accuracy: null,
          altitudeAccuracy: null,
          heading: null,
          speed: null,
        },
      },
      // Add more locations as needed
    ],
    profilePicture:
      "https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?cs=srgb&dl=pexels-olly-733872.jpg&fm=jpg", // Or null
    isEmailVerified: true,
    isPhoneVerified: false,
    isActive: true,
    isLoggedIn: true, // Modify based on login state
    createdAt: new Date("2024-06-17T00:00:00.000Z").toLocaleString(), // Replace with actual creation date
    updatedAt: undefined, // Or set an update date if applicable
  },
  {
    id: "123554522", // Replace with actual user ID
    token: null, // May not be provided for all users
    userType: UserType.SERVICE_PROVIDER, // Or UserType.SERVICE_PROVIDER
    username: "Sam Smith",
    email: "samsmith@example.com",
    phoneNumber: "+23334567890",
    locations: [
      {
        name: "Home",
        location: {
          latitude: 37.7749, // Replace with actual latitude
          longitude: -122.4194,
          altitude: null,
          accuracy: null,
          altitudeAccuracy: null,
          heading: null,
          speed: null,
        },
      },
      // Add more locations as needed
    ],
    profilePicture:
      "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?cs=srgb&dl=pexels-italo-melo-881954-2379004.jpg&fm=jpg", // Or null
    isEmailVerified: true,
    isPhoneVerified: false,
    isActive: true,
    isLoggedIn: false, // Modify based on login state
    createdAt: new Date("2024-06-17T00:00:00.000Z").toLocaleString(), // Replace with actual creation date
    updatedAt: undefined, // Or set an update date if applicable
  },
];
export default usersData;
