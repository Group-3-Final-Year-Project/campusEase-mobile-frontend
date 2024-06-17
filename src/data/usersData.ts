import { User, UserType } from "~src/@types/types";

export default <User[]>[
  {
    id: 23222,
    userType: UserType.USER,
    token: "493483vffjsj38rje",
    username: "Solomon",
    email: "owusuansahsolomon39@gmail.com",
    phoneNumber: "+233599171142",
    locations: [{ name: "Home", location: {} }],
    profilePicture:
      "https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?cs=srgb&dl=pexels-olly-733872.jpg&fm=jpg",
    isEmailVerified: true,
    isPhoneVerified: true,
    isActive: true,
    isLoggedIn: true,
    createdAt: new Date(),
  },
  {
    id: 1254222,
    userType: UserType.SERVICE_PROVIDER,
    token: "493483vf34RG2fjsj38rje",
    username: "Glenmore",
    email: "glenmore39@gmail.com",
    phoneNumber: "+233599174422",
    locations: [{ name: "Work Place", location: {} }],
    profilePicture:
      "https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?cs=srgb&dl=pexels-olly-733872.jpg&fm=jpg",
    isEmailVerified: true,
    isPhoneVerified: true,
    isActive: true,
    isLoggedIn: true,
    createdAt: new Date(),
  },
];
