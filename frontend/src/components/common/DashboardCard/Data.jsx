// Sidebar imports
import {
    UilEstate,
    UilClipboardAlt,
    UilUsersAlt,
    UilPackage,
    UilChart,
    UilSignOutAlt,
  } from "@iconscout/react-unicons";
  
  // Analytics Cards imports
  import { UilUsdSquare, UilMoneyWithdrawal } from "@iconscout/react-unicons";
  // import { keyboard } from "@testing-library/user-event/dist/keyboard";
  
  // Recent Card Imports
  import img1 from "../../../assets/img/img1.png";
  import img2 from "../../../assets/img/img2.png";
  import img3 from "../../../assets/img/img3.png";
  
  
  // Sidebar Data
  export const SidebarData = [
    {
      icon: UilEstate,
      heading: "Dashboard",
    },
    {
      icon: UilClipboardAlt,
      heading: "Orders",
    },
    {
      icon: UilUsersAlt,
      heading: "Customers",
    },
    {
      icon: UilPackage,
      heading: 'Products'
    },
    {
      icon: UilChart,
      heading: 'Analytics'
    },
  ];
  
  // Analytics Cards Data
  export const cardsData = [
    {
      title: "Eladás",
      color: {
        backGround: "linear-gradient(90deg, rgba(194,121,205,1) 0%, rgba(71,4,77,1) 100%)",
        // linear-gradient(90deg, rgba(209,158,202,1) 0%, rgba(128,68,119,1) 100%)
        boxShadow: "0px 10px 20px 0px #e0c6f5",
      },
      barValue: 70,
      value: "25,970",
      png: UilUsdSquare,
      series: [
        {
          name: "Eladva",
          data: [31, 40, 28, 51, 42, 109, 100],
        },
      ],
    },
    {
      title: "Bevétel",
      color: {
        backGround: "linear-gradient(90deg, rgba(219,178,209,1) 0%, rgba(149,36,122,1) 100%)",
        boxShadow: "0px 10px 20px 0px #e0c6f5",
      },
      barValue: 80,
      value: "14,270",
      png: UilMoneyWithdrawal,
      series: [
        {
          name: "Bevétel",
          data: [10, 100, 50, 70, 80, 30, 40],
        },
      ],
    },
    {
      title: "Kiadások",
      color: {
        backGround:
          "linear-gradient(90deg, rgba(209,158,202,1) 0%, rgba(128,68,119,1) 100%)",
        boxShadow: "0px 10px 20px 0px #e0c6f5",
      },
      barValue: 60,
      value: "4,270",
      png: UilClipboardAlt,
      series: [
        {
          name: "Kiadások",
          data: [10, 25, 15, 30, 12, 15, 20],
        },
      ],
    },
  ];
  
  // Recent Update Card Data
  export const UpdatesData = [
    {
      img: img1,
      name: "Andrew Thomas",
      noti: "has ordered Apple smart watch 2500mh battery.",
      time: "25 seconds ago",
    },
    {
      img: img2,
      name: "James Bond",
      noti: "has received Samsung gadget for charging battery.",
      time: "30 minutes ago",
    },
    {
      img: img3,
      name: "Iron Man",
      noti: "has ordered Apple smart watch, samsung Gear 2500mh battery.",
      time: "2 hours ago",
    },
  ];