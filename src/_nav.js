import Auth from "./cookie/Auth";

var role = Auth.getToken("role");
let navConfig = {};
// if (role == "Admin") {
//   navConfig = {
//     items: [

//       {
//         title: true,
//         name: "Administrator",
//         wrapper: {
//           // optional wrapper object
//           element: "", // required valid HTML5 element tag
//           attributes: {} // optional valid JS object with JS API naming ex: { className: "my-class", style: { fontFamily: "Verdana" }, id: "my-id"}
//         },
//         class: "" // optional class names space delimited list for title item ex: "text-center"
//       },
//       {
//         name: "Dashboard",
//         url: "/Users/Administrator/AdminDashboard",
//         icon: "icon-speedometer",
//         badge: {
//           variant: "warning",
//           text: "ADMIN"
//         }
//       },
//       {
//         name: "Store Owners",
//         icon: "icon-layers",
//         children: []
//       },
    
//       {
//         name: "Stores Types",
//         url: "/Users/Administrator/AddStoreType",
//         icon: "icon-home"
//       },
      
//       {
//         name: "Users",
//         icon: "cui-user",
//         url: "/users",
//       },
      
//     ]
//   }
// } 
if(role == "Owner") {
    navConfig = {
    items:[
      {
        name: "Dashboard",
        url: "/dashboard",
        icon: "icon-speedometer",
        badge: {
          variant: "info",
          text: "STORE"
        }
      },
      
      {
        title: true,
        name: "Restaurant",
        wrapper: {
          // optional wrapper object
          element: "", // required valid HTML5 element tag
          attributes: {} // optional valid JS object with JS API naming ex: { className: "my-class", style: { fontFamily: "Verdana" }, id: "my-id"}
        },
        class: "" // optional class names space delimited list for title item ex: "text-center"
      },
      {
        name: "Orders",
        url: "/Restaurant/orders/orders",
        icon: "icon-basket-loaded"
      },
      {
        name: "Locations",
        url: "/Restaurant/locations/alllocations",
        icon: "icon-location-pin"
      },
      {
        name: "Staff Management",
        url: "/Users/Employees/AllEmployees",
        icon: "icon-people"
      },
      {
        name: "Menu",
        //url: "/Restaurant/categories",
        icon: "icon-layers",
        children: [
          {
            name: "Categories",
            url: "/Restaurant/categories",
            icon: "icon-puzzle"
          },
          {
            name: "Products",
            url: "/Restaurant/products",
            icon: "icon-puzzle"
          },
          {
            name: "Choices",
            url: "/Restaurant/ProductVariant/Choices",
            icon: "icon-puzzle"
          },
          {
            name: "AddOn Options",
            url: "/Restaurant/ProductVariant/AddOnOptions",
            icon: "icon-puzzle"
          },

          {
            name: "Tags",
            url: "/Restaurant/Tags",
            icon: "icon-puzzle"
          }
        ]
      },
      {
        name: "App Setting",
        icon: "icon-screen-smartphone",
        children: [
          {
            name: "Summary",
            url: "/Restaurant/AppSetting",
            icon: "icon-list"
          },
          {
            name: "App Theme",
            url: "/Restaurant/AppSetting/AppTheme",
            icon: "icon-drop"
          },
          {
            name: "State Tax",
            url: "/Restaurant/AppSetting/StoreTax",
            icon: "icon-calculator"
          },
          {
            name: "Payments Method",
            url: "/Restaurant/AppSetting/PaymentMethod",
            icon: "icon-credit-card"
          },
          {
            name: "Store Hours",
            url: "/Restaurant/AppSetting/StoreHours",
            icon: "icon-clock"
          },
          {
            name: "Delivery Area",
            url: "/Restaurant/AppSetting/DeliveryArea",
            icon: "icon-map"
          }
        ]
      },
      {
        name: "Discount & Offers",
        //url: "/Restaurant",
        icon: "icon-wallet",
        children: [
          {
            name: "Summary",
            url: "/Restaurant/Offers",
            icon: "icon-list"
          },
          {
            name: "Coupons",
            url: "/Restaurant/Offers/Coupons",
            icon: "icon-tag"
          },
          {
            name: "Loyalty Program",
            url: "/Restaurant/Offers/LoyaltyProgram",
            icon: "icon-loop"
          },
          {
            name: "Notification",
            url: "/Restaurant/Offers/Notification",
            icon: "icon-speech"
          },
          {
            name: "Weekly Offers",
            url: "/Restaurant/Offers/WeeklyOffers",
            icon: "icon-list"
          }
        ]
      },
      {
        name: "Customers",
        url: "/users/customers/customerlist",
        icon: "icon-user"
      },
      {
        name: "Chat",
        url: "/Restaurant/chat/chat",
        icon: "icon-bubbles"
      },
      {
        name: "Book a Table",
        url: "/Restaurant/booktable/booktable",
        icon: "icon-book-open"
      },
      {
        name: "Disabled",
        url: "/dashboard",
        icon: "icon-ban",
        attributes: { disabled: true }
      },
      {
        name: "Disabled",
        url: "/dashboard",
        icon: "icon-ban",
        attributes: { disabled: true }
      },
      {
        name: "Colors",
        url: "/theme/colors",
        icon: "icon-drop"
      },
      {
        name: "Typography",
        url: "/theme/typography",
        icon: "icon-pencil"
      },
      // {
      //   title: true,
      //   name: "Components",
      //   wrapper: {
      //     element: "",
      //     attributes: {}
      //   }
      // },
      // {
      //   name: "Base",
      //   url: "/base",
      //   icon: "icon-puzzle",
      //   children: [
      //     {
      //       name: "Breadcrumbs",
      //       url: "/base/breadcrumbs",
      //       icon: "icon-puzzle"
      //     },
      //     {
      //       name: "Cards",
      //       url: "/base/cards",
      //       icon: "icon-puzzle"
      //     },
      //     {
      //       name: "Carousels",
      //       url: "/base/carousels",
      //       icon: "icon-puzzle"
      //     },
      //     {
      //       name: "Collapses",
      //       url: "/base/collapses",
      //       icon: "icon-puzzle"
      //     },
      //     {
      //       name: "Dropdowns",
      //       url: "/base/dropdowns",
      //       icon: "icon-puzzle"
      //     },
      //     {
      //       name: "Forms",
      //       url: "/base/forms",
      //       icon: "icon-puzzle"
      //     },
      //     {
      //       name: "Jumbotrons",
      //       url: "/base/jumbotrons",
      //       icon: "icon-puzzle"
      //     },
      //     {
      //       name: "List groups",
      //       url: "/base/list-groups",
      //       icon: "icon-puzzle"
      //     },
      //     {
      //       name: "Navs",
      //       url: "/base/navs",
      //       icon: "icon-puzzle"
      //     },
      //     {
      //       name: "Paginations",
      //       url: "/base/paginations",
      //       icon: "icon-puzzle"
      //     },
      //     {
      //       name: "Popovers",
      //       url: "/base/popovers",
      //       icon: "icon-puzzle"
      //     },
      //     {
      //       name: "Progress Bar",
      //       url: "/base/progress-bar",
      //       icon: "icon-puzzle"
      //     },
      //     {
      //       name: "Switches",
      //       url: "/base/switches",
      //       icon: "icon-puzzle"
      //     },
      //     {
      //       name: "Tables",
      //       url: "/base/tables",
      //       icon: "icon-puzzle"
      //     },
      //     {
      //       name: "Tabs",
      //       url: "/base/tabs",
      //       icon: "icon-puzzle"
      //     },
      //     {
      //       name: "Tooltips",
      //       url: "/base/tooltips",
      //       icon: "icon-puzzle"
      //     }
      //   ]
      // },
      // {
      //   name: "Buttons",
      //   url: "/buttons",
      //   icon: "icon-cursor",
      //   children: [
      //     {
      //       name: "Buttons",
      //       url: "/buttons/buttons",
      //       icon: "icon-cursor"
      //     },
      //     {
      //       name: "Button dropdowns",
      //       url: "/buttons/button-dropdowns",
      //       icon: "icon-cursor"
      //     },
      //     {
      //       name: "Button groups",
      //       url: "/buttons/button-groups",
      //       icon: "icon-cursor"
      //     },
      //     {
      //       name: "Brand Buttons",
      //       url: "/buttons/brand-buttons",
      //       icon: "icon-cursor"
      //     }
      //   ]
      // },
      // {
      //   name: "Charts",
      //   url: "/charts",
      //   icon: "icon-pie-chart"
      // },
      // {
      //   name: "Icons",
      //   url: "/icons",
      //   icon: "icon-star",
      //   children: [
      //     {
      //       name: "CoreUI Icons",
      //       url: "/icons/coreui-icons",
      //       icon: "icon-star",
      //       badge: {
      //         variant: "info",
      //         text: "NEW"
      //       }
      //     },
      //     {
      //       name: "Flags",
      //       url: "/icons/flags",
      //       icon: "icon-star"
      //     },
      //     {
      //       name: "Font Awesome",
      //       url: "/icons/font-awesome",
      //       icon: "icon-star",
      //       badge: {
      //         variant: "secondary",
      //         text: "4.7"
      //       }
      //     },
      //     {
      //       name: "Simple Line Icons",
      //       url: "/icons/simple-line-icons",
      //       icon: "icon-star"
      //     }
      //   ]
      // },
      // {
      //   name: "Notifications",
      //   url: "/notifications",
      //   icon: "icon-bell",
      //   children: [
      //     {
      //       name: "Alerts",
      //       url: "/notifications/alerts",
      //       icon: "icon-bell"
      //     },
      //     {
      //       name: "Badges",
      //       url: "/notifications/badges",
      //       icon: "icon-bell"
      //     },
      //     {
      //       name: "Modals",
      //       url: "/notifications/modals",
      //       icon: "icon-bell"
      //     }
      //   ]
      // },
      // {
      //   name: "Widgets",
      //   url: "/widgets",
      //   icon: "icon-calculator",
      //   badge: {
      //     variant: "info",
      //     text: "NEW"
      //   }
      // },
      // {
      //   divider: true
      // },
      // {
      //   title: true,
      //   name: "Extras"
      // },
      // {
      //   name: "Pages",
      //   url: "/pages",
      //   icon: "icon-star",
      //   children: [
      //     {
      //       name: "Login",
      //       url: "/login",
      //       icon: "icon-star"
      //     },
      //     {
      //       name: "Register",
      //       url: "/register",
      //       icon: "icon-star"
      //     },
      //     {
      //       name: "Error 404",
      //       url: "/404",
      //       icon: "icon-star"
      //     },
      //     {
      //       name: "Error 500",
      //       url: "/500",
      //       icon: "icon-star"
      //     }
      //   ]
      // },
      // {
      //   name: "Disabled",
      //   url: "/dashboard",
      //   icon: "icon-ban",
      //   attributes: { disabled: true }
      // }
    ]
    };
  } else {
      navConfig = {
        items:[
       
        {
          name: "Dashboard",
          url: "/dashboard",
          icon: "icon-speedometer",
          badge: {
            variant: "info",
            text: "STORE"
          }
        },
        
        {
          title: true,
          name: "Restaurant",
          wrapper: {
            // optional wrapper object
            element: "", // required valid HTML5 element tag
            attributes: {} // optional valid JS object with JS API naming ex: { className: "my-class", style: { fontFamily: "Verdana" }, id: "my-id"}
          },
          class: "" // optional class names space delimited list for title item ex: "text-center"
        },
        {
          name: "Orders",
          url: "/Restaurant/orders/orders",
          icon: "icon-basket-loaded"
        },
        {
          name: "Locations",
          url: "/Restaurant/locations/alllocations",
          icon: "icon-location-pin"
        },
        {
          name: "Staff Management",
          url: "/Users/Employees/AllEmployees",
          icon: "icon-people"
        },
        {
          name: "Menu",
          //url: "/Restaurant/categories",
          icon: "icon-layers",
          children: [
            {
              name: "Categories",
              url: "/Restaurant/categories",
              icon: "icon-puzzle"
            },
            {
              name: "Products",
              url: "/Restaurant/products",
              icon: "icon-puzzle"
            },
            {
              name: "Choices",
              url: "/Restaurant/ProductVariant/Choices",
              icon: "icon-puzzle"
            },
            {
              name: "AddOn Options",
              url: "/Restaurant/ProductVariant/AddOnOptions",
              icon: "icon-puzzle"
            },
  
            {
              name: "Tags",
              url: "/Restaurant/Tags",
              icon: "icon-puzzle"
            }
          ]
        },
        {
          name: "App Setting",
          icon: "icon-screen-smartphone",
          children: [
            {
              name: "Summary",
              url: "/Restaurant/AppSetting",
              icon: "icon-list"
            },
            {
              name: "App Theme",
              url: "/Restaurant/AppSetting/AppTheme",
              icon: "icon-drop"
            },
            {
              name: "State Tax",
              url: "/Restaurant/AppSetting/StoreTax",
              icon: "icon-calculator"
            },
            {
              name: "Payments Method",
              url: "/Restaurant/AppSetting/PaymentMethod",
              icon: "icon-credit-card"
            },
            {
              name: "Store Hours",
              url: "/Restaurant/AppSetting/StoreHours",
              icon: "icon-clock"
            },
            {
              name: "Delivery Area",
              url: "/Restaurant/AppSetting/DeliveryArea",
              icon: "icon-map"
            }
          ]
        },
        {
          name: "Discount & Offers",
          //url: "/Restaurant",
          icon: "icon-wallet",
          children: [
            {
              name: "Summary",
              url: "/Restaurant/Offers",
              icon: "icon-list"
            },
            {
              name: "Coupons",
              url: "/Restaurant/Offers/Coupons",
              icon: "icon-tag"
            },
            {
              name: "Loyalty Program",
              url: "/Restaurant/Offers/LoyaltyProgram",
              icon: "icon-loop"
            },
            {
              name: "Notification",
              url: "/Restaurant/Offers/Notification",
              icon: "icon-speech"
            },
            {
              name: "Weekly Offers",
              url: "/Restaurant/Offers/WeeklyOffers",
              icon: "icon-list"
            }
          ]
        },
        {
          name: "Customers",
          url: "/users/customers/customerlist",
          icon: "icon-user"
        },
        {
          name: "Chat",
          url: "/Restaurant/chat/chat",
          icon: "icon-bubbles"
        },
        {
          name: "Book a Table",
          url: "/Restaurant/booktable/booktable",
          icon: "icon-book-open"
        },
        {
          name: "Disabled",
          url: "/dashboard",
          icon: "icon-ban",
          attributes: { disabled: true }
        },
        {
          name: "Disabled",
          url: "/dashboard",
          icon: "icon-ban",
          attributes: { disabled: true }
        },
        {
          name: "Colors",
          url: "/theme/colors",
          icon: "icon-drop"
        },
        {
          name: "Typography",
          url: "/theme/typography",
          icon: "icon-pencil"
        },
        {
          title: true,
          name: "Components",
          wrapper: {
            element: "",
            attributes: {}
          }
        },
        {
          name: "Base",
          url: "/base",
          icon: "icon-puzzle",
          children: [
            {
              name: "Breadcrumbs",
              url: "/base/breadcrumbs",
              icon: "icon-puzzle"
            },
            {
              name: "Cards",
              url: "/base/cards",
              icon: "icon-puzzle"
            },
            {
              name: "Carousels",
              url: "/base/carousels",
              icon: "icon-puzzle"
            },
            {
              name: "Collapses",
              url: "/base/collapses",
              icon: "icon-puzzle"
            },
            {
              name: "Dropdowns",
              url: "/base/dropdowns",
              icon: "icon-puzzle"
            },
            {
              name: "Forms",
              url: "/base/forms",
              icon: "icon-puzzle"
            },
            {
              name: "Jumbotrons",
              url: "/base/jumbotrons",
              icon: "icon-puzzle"
            },
            {
              name: "List groups",
              url: "/base/list-groups",
              icon: "icon-puzzle"
            },
            {
              name: "Navs",
              url: "/base/navs",
              icon: "icon-puzzle"
            },
            {
              name: "Paginations",
              url: "/base/paginations",
              icon: "icon-puzzle"
            },
            {
              name: "Popovers",
              url: "/base/popovers",
              icon: "icon-puzzle"
            },
            {
              name: "Progress Bar",
              url: "/base/progress-bar",
              icon: "icon-puzzle"
            },
            {
              name: "Switches",
              url: "/base/switches",
              icon: "icon-puzzle"
            },
            {
              name: "Tables",
              url: "/base/tables",
              icon: "icon-puzzle"
            },
            {
              name: "Tabs",
              url: "/base/tabs",
              icon: "icon-puzzle"
            },
            {
              name: "Tooltips",
              url: "/base/tooltips",
              icon: "icon-puzzle"
            }
          ]
        },
        {
          name: "Buttons",
          url: "/buttons",
          icon: "icon-cursor",
          children: [
            {
              name: "Buttons",
              url: "/buttons/buttons",
              icon: "icon-cursor"
            },
            {
              name: "Button dropdowns",
              url: "/buttons/button-dropdowns",
              icon: "icon-cursor"
            },
            {
              name: "Button groups",
              url: "/buttons/button-groups",
              icon: "icon-cursor"
            },
            {
              name: "Brand Buttons",
              url: "/buttons/brand-buttons",
              icon: "icon-cursor"
            }
          ]
        },
        {
          name: "Charts",
          url: "/charts",
          icon: "icon-pie-chart"
        },
        {
          name: "Icons",
          url: "/icons",
          icon: "icon-star",
          children: [
            {
              name: "CoreUI Icons",
              url: "/icons/coreui-icons",
              icon: "icon-star",
              badge: {
                variant: "info",
                text: "NEW"
              }
            },
            {
              name: "Flags",
              url: "/icons/flags",
              icon: "icon-star"
            },
            {
              name: "Font Awesome",
              url: "/icons/font-awesome",
              icon: "icon-star",
              badge: {
                variant: "secondary",
                text: "4.7"
              }
            },
            {
              name: "Simple Line Icons",
              url: "/icons/simple-line-icons",
              icon: "icon-star"
            }
          ]
        },
        {
          name: "Notifications",
          url: "/notifications",
          icon: "icon-bell",
          children: [
            {
              name: "Alerts",
              url: "/notifications/alerts",
              icon: "icon-bell"
            },
            {
              name: "Badges",
              url: "/notifications/badges",
              icon: "icon-bell"
            },
            {
              name: "Modals",
              url: "/notifications/modals",
              icon: "icon-bell"
            }
          ]
        },
        {
          name: "Widgets",
          url: "/widgets",
          icon: "icon-calculator",
          badge: {
            variant: "info",
            text: "NEW"
          }
        },
        {
          divider: true
        },
        {
          title: true,
          name: "Extras"
        },
        {
          name: "Pages",
          url: "/pages",
          icon: "icon-star",
          children: [
            {
              name: "Login",
              url: "/login",
              icon: "icon-star"
            },
            {
              name: "Register",
              url: "/register",
              icon: "icon-star"
            },
            {
              name: "Error 404",
              url: "/404",
              icon: "icon-star"
            },
            {
              name: "Error 500",
              url: "/500",
              icon: "icon-star"
            }
          ]
        },
        {
          name: "Disabled",
          url: "/dashboard",
          icon: "icon-ban",
          attributes: { disabled: true }
        }
      ]
    }
  }
export default navConfig;
