import { Iconify } from "react-native-iconify";

export const categoriesData = {
  PRINTING: {
    id: "0",
    name: "Printing", // Changed from "Printing & Copying"
    description:
      "Get your documents, assignments, and posters printed or copied quickly and conveniently.",
  },
  FOOD: {
    id: "1",
    name: "Food",
    description:
      "Order meals, snacks, and beverages from various campus restaurants and cafes.",
  },
  STATIONERY: {
    id: "2",
    name: "Stationery",
    description:
      "Stock up on notebooks, pens, textbooks, and other essential school supplies.",
  },
  COMPUTER: {
    id: "3",
    name: "Computer Accessories",
    description:
      "Find repairs, accessories, and rentals for your laptops, phones, and other tech devices.",
  },
  SHIPPING: {
    id: "4",
    name: "Shipping",
    description:
      "Send and receive packages through on-campus shipping and mailing services.",
  },
  LAUNDRY: {
    id: "5",
    name: "Laundry",
    description:
      "Get your clothes professionally cleaned and pressed without leaving campus.",
  },
  EDUCATION: {
    id: "6",
    name: "Education",
    description:
      "Find academic support and connect with tutors for various subjects.",
  },
  TECH_SUPPORT: {
    id: "7",
    name: "Tech Support", // Combined "Tech" and "Support"
    description:
      "Get help with software issues, hardware repairs, and other tech-related needs.",
  },
  SOFTWARE: {
    id: "8",
    name: "Software Development", // Shortened from "Software Development & Design"
    description:
      "Find coding partners, collaborate on projects, or hire freelance developers.",
  },
  FITNESS: {
    id: "9",
    name: "Fitness",
    description:
      "Reserve gym equipment, join fitness classes, or rent sporting equipment.",
  },
  BEAUTY: {
    id: "10",
    name: "Beauty",
    description:
      "Book appointments for haircuts, massages, facials, and other beauty services.",
  },
  ERRANDS: {
    id: "11",
    name: "Errands",
    description:
      "Get help with tasks like grocery shopping, picking up dry cleaning, or waiting in line.",
  },
  OTHERS: {
    id: "12",
    name: "Others",
    description: "",
  },
};

export const categoriesIcons = {
  "0": <Iconify icon={"flat-color-icons:print"} size={30} />,
  "1": <Iconify icon={"noto:pot-of-food"} size={30} />,
  "2": <Iconify icon={"unjs:jimp-compact"} size={30} />,
  "3": <Iconify icon={"fxemoji:oldpersonalcomputer"} size={30} />,
  "4": <Iconify icon={"flat-color-icons:shipped"} size={30} />,
  "5": <Iconify icon={"openmoji:washing-machine"} size={30} />,
  "6": <Iconify icon={"flat-color-icons:graduation-cap"} size={30} />,
  "7": <Iconify icon={"flat-color-icons:assistant"} size={30} />,
  "8": <Iconify icon={"devicon:vscode"} size={30} />,
  "9": <Iconify icon={"token-branded:fitfi"} size={30} />,
  "10": <Iconify icon={"fluent-emoji:barber-pole"} size={30} />,
  "11": <Iconify icon={"fluent-emoji:man-running"} size={30} />,
  "12": <Iconify icon={"flat-color-icons:services"} size={30} />,
};
