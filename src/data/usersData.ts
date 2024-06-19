import { UserType, VerifiedUser } from "~src/@types/types";

export const usersData: VerifiedUser[] = [
  {
    token: "your_access_token",
    authorized_account: {
      id: 12346845843, // Replace with actual user ID
      token: null, // May not be provided for all users
      userType: UserType.USER, // Or UserType.SERVICE_PROVIDER
      username: "John Doe",
      email: "johndoe@example.com",
      phoneNumber: "+1234567890",
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
        "https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?cs=srgb&dl=pexels-olly-733872.jpg&fm=jpg", // Or null
      isEmailVerified: true,
      isPhoneVerified: false,
      isActive: true,
      isLoggedIn: true, // Modify based on login state
      createdAt: JSON.stringify(new Date("2024-06-17T00:00:00.000Z")), // Replace with actual creation date
      updatedAt: undefined, // Or set an update date if applicable
    },
  },
  {
    token: "your_access_token",
    authorized_account: {
      id: 123554522, // Replace with actual user ID
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
      createdAt: JSON.stringify(new Date("2024-06-17T00:00:00.000Z")), // Replace with actual creation date
      updatedAt: undefined, // Or set an update date if applicable
    },
  },
];
export default usersData;
