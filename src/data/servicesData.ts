import { Service } from "~src/@types/types";
import { categoriesData } from "./categories";

const servicesData: Service[] = [
  {
    id: 1,
    providerId: 123554522, // Replace with actual provider ID
    name: "Black and White Printing",
    description:
      "Get high-quality black and white prints for your documents, assignments, or posters.",
    category: categoriesData.PRINTING, // Replace with actual category ID
    rating: 4.5,
    numberOfReviews: 115,
    location: {
      name: "Main Library - Printing Lab",
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
    coverImage:
      "https://www.theprintcafe.com/wp-content/uploads/2014/11/25.jpg",
    email: "printing@campus.edu",
    startingPrice: 0.05, // Per page cost example
    createdAt: new Date("2024-06-15T10:00:00.000Z"),
    updatedAt: undefined,
    isAvailable: true,
  },
  {
    id: 2,
    providerId: 123554522, // Replace with actual provider ID
    name: "The Daily Grind Coffee Shop",
    description:
      "Grab a cup of freshly brewed coffee, tea, or smoothie, along with delicious pastries and snacks.",
    category: categoriesData.FOOD, // Replace with actual category ID
    rating: 4.5,
    numberOfReviews: 115,
    location: {
      name: "Student Union Building - Ground Floor",
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
    coverImage:
      "https://www.posist.com/restaurant-times/wp-content/uploads/2023/07/How-To-Start-A-Coffee-Shop-Business-A-Complete-Guide.jpg",
    website: "https://thedailygrind.com",
    subServices: [
      {
        name: "Latte",
        price: 3.5,
      },
      {
        name: "Cappuccino",
        price: 3.25,
      },
      {
        name: "Croissant",
        price: 2.0,
      },
    ],
    createdAt: new Date("2024-06-10T12:00:00.000Z"),
    updatedAt: undefined,
    isAvailable: true,
    email: null,
  },
  {
    id: 3,
    providerId: 123554522, // Replace with actual provider ID
    name: "Campus Tech Repair",
    description:
      "Get help diagnosing and repairing your laptop, phone, or other tech devices.",
    category: categoriesData.TECH_SUPPORT, // Replace with actual category ID
    rating: 4.5,
    numberOfReviews: 115,
    location: {
      name: "IT Building - Room 201",
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
    coverImage:
      "https://bristeeritech.com/wp-content/uploads/2021/01/fast-and-reliable-laptop-repair-services-at-bristeeri-tech.jpg",
    email: "techrepair@campus.edu",
    createdAt: new Date("2024-06-05T14:00:00.000Z"),
    updatedAt: undefined,
    isAvailable: true,
  },
  {
    id: 4,
    providerId: 123554522, // Replace with actual provider ID
    name: "The Bookworm Bookstore",
    description:
      "Browse a wide selection of textbooks, novels, study guides, and school supplies.",
    category: categoriesData.STATIONERY, // Replace with actual category ID
    rating: 4.5,
    numberOfReviews: 115,
    location: {
      name: "Main Street", // Replace with specific address if needed
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
    coverImage:
      "https://sprudge.com/wp-content/uploads/2022/10/Letterpressletters-coffeshop-interior2_Letterpressletters.jpg",
    website: "https://thebookworm.com",
    createdAt: new Date("2024-05-30T16:00:00.000Z"),
    updatedAt: undefined,
    isAvailable: true,
    email: null,
  },
  {
    id: 5,
    providerId: 123554522, // Replace with actual provider ID
    name: "Campus Laundry Express",
    description:
      "Get your laundry professionally cleaned and folded without leaving campus.",
    category: categoriesData.LAUNDRY, // Replace with actual category ID
    rating: 4.5,
    numberOfReviews: 115,
    location: {
      name: "Residence Hall Laundry Room (Building A)",
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
    coverImage:
      "https://higherlogicdownload.s3.amazonaws.com/COINLAUNDRY/UploadedImages/dc3bac2e-11fa-49a9-90fe-97eb7b3cd75e/Business%20Bio.JPG",
    website: "https://campuslaundryexpress.com",
    startingPrice: 10.0, // Per load example
    subServices: [
      {
        name: "Wash & Fold (Standard Load)",
        price: 10.0,
      },
      {
        name: "Dry Cleaning (Shirt)",
        price: 5.0,
      },
    ],
    createdAt: new Date("2024-05-25T08:00:00.000Z"),
    updatedAt: undefined,
    isAvailable: true,
    email: null,
  },
  {
    id: 6,
    providerId: 123554522, // Replace with actual provider ID
    name: "Peer Tutoring Network",
    description:
      "Connect with experienced student tutors for personalized help in various subjects.",
    category: categoriesData.EDUCATION, // Replace with actual category ID
    rating: 4.5,
    numberOfReviews: 115,
    location: {
      name: "Online Platform", // Could be a physical location or online
      location: {
        latitude: 45.29, // No coordinates needed for online location
        longitude: 23.34,
        altitude: null,
        accuracy: null,
        altitudeAccuracy: null,
        heading: null,
        speed: null,
      },
    },
    coverImage:
      "https://biomed.emory.edu/_includes/images/sections/academics/lgs-tutoring-500.jpg",
    email: "tutoring@campus.edu",
    createdAt: new Date("2024-05-20T10:00:00.000Z"),
    updatedAt: undefined,
    isAvailable: true,
  },
];

export default servicesData;
