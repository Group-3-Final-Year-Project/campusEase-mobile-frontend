import { Service } from "~src/@types/types";
import categories from "./categories";

export default <Service[]>[
  {
    id: 3,
    name: "Jeron Plumbing",
    rating: 4.3,
    startingPrice: 124,
    coverImage: "",
    createdAt: new Date(),
    category: categories[0],
    email: "jeronplumbing@services.com",
    isAvailable: true,
    providerId: 23242,
    locations: [
      {
        name: "Home",
        location: {},
      },
    ],
  },
  {
    id: 3121,
    name: "Jeron Plumbing",
    rating: 4.3,
    startingPrice: 124,
    coverImage: "",
    createdAt: new Date(),
    category: categories[0],
    email: "jeronplumbing@services.com",
    isAvailable: true,
    providerId: 23242,
    locations: [
      {
        name: "Home",
        location: {},
      },
    ],
  },
  {
    id: 3443,
    name: "P. Kay Electricals",
    rating: 4.3,
    startingPrice: 124,
    coverImage: "",
    createdAt: new Date(),
    category: categories[0],
    email: "jeronplumbing@services.com",
    isAvailable: true,
    providerId: 23242,
    locations: [
      {
        name: "Home",
        location: {},
      },
    ],
  },
];
