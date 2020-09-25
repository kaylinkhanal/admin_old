import React from "react";
import DefaultLayout from "./containers/DefaultLayout";

const Breadcrumbs = React.lazy(() => import("./views/Base/Breadcrumbs"));
const Cards = React.lazy(() => import("./views/Base/Cards"));
const Carousels = React.lazy(() => import("./views/Base/Carousels"));
const Collapses = React.lazy(() => import("./views/Base/Collapses"));
const Dropdowns = React.lazy(() => import("./views/Base/Dropdowns"));
const Forms = React.lazy(() => import("./views/Base/Forms"));
const Jumbotrons = React.lazy(() => import("./views/Base/Jumbotrons"));
const ListGroups = React.lazy(() => import("./views/Base/ListGroups"));
const Navbars = React.lazy(() => import("./views/Base/Navbars"));
const Navs = React.lazy(() => import("./views/Base/Navs"));
const Paginations = React.lazy(() => import("./views/Base/Paginations"));
const Popovers = React.lazy(() => import("./views/Base/Popovers"));
const ProgressBar = React.lazy(() => import("./views/Base/ProgressBar"));
const Switches = React.lazy(() => import("./views/Base/Switches"));
const Tables = React.lazy(() => import("./views/Base/Tables"));
const Tabs = React.lazy(() => import("./views/Base/Tabs"));
const Tooltips = React.lazy(() => import("./views/Base/Tooltips"));
const BrandButtons = React.lazy(() => import("./views/Buttons/BrandButtons"));
const ButtonDropdowns = React.lazy(() =>
  import("./views/Buttons/ButtonDropdowns")
);
const ButtonGroups = React.lazy(() => import("./views/Buttons/ButtonGroups"));
const Buttons = React.lazy(() => import("./views/Buttons/Buttons"));
const Charts = React.lazy(() => import("./views/Charts"));
const Dashboard = React.lazy(() => import("./views/Dashboard"));
const CoreUIIcons = React.lazy(() => import("./views/Icons/CoreUIIcons"));
const Flags = React.lazy(() => import("./views/Icons/Flags"));
const FontAwesome = React.lazy(() => import("./views/Icons/FontAwesome"));
const SimpleLineIcons = React.lazy(() =>
  import("./views/Icons/SimpleLineIcons")
);
const Alerts = React.lazy(() => import("./views/Notifications/Alerts"));
const Badges = React.lazy(() => import("./views/Notifications/Badges"));
const Modals = React.lazy(() => import("./views/Notifications/Modals"));
const Colors = React.lazy(() => import("./views/Theme/Colors"));
const Typography = React.lazy(() => import("./views/Theme/Typography"));
const Widgets = React.lazy(() => import("./views/Widgets/Widgets"));
const Users = React.lazy(() => import("./views/Users/Users"));
const User = React.lazy(() => import("./views/Users/User"));
const Userdetail = React.lazy(() => import("./views/Users/Userdetail"));
//const User = React.lazy(() => import("./views/Users/Users"));
//== Biz2App Menu ==
const Orders = React.lazy(() => import("./views/Restaurant/Orders/Orders"));
const OrderView = React.lazy(() =>
  import("./views/Restaurant/Orders/OrderView")
);
const ChoiceProduct = React.lazy(() =>
  import("./views/Restaurant/Orders/ChoiceProduct")
);
const OrderStatics = React.lazy(() =>
  import("./views/Restaurant/Orders/OrderStatics")
);

const allLocations = React.lazy(() => import("./views/Restaurant/Locations"));
const Location = React.lazy(() =>
  import("./views/Restaurant/Locations/Location")
);
const addLocation = React.lazy(() =>
  import("./views/Restaurant/Locations/addLocation")
);

const AllEmployees = React.lazy(() =>
  import("./views/Users/Employees/AllEmployees")
);
const EditEmployee = React.lazy(() =>
  import("./views/Users/Employees/EditEmployee")
);
const AddEmployee = React.lazy(() =>
  import("./views/Users/Employees/AddEmployee")
);

const Categories = React.lazy(() => import("./views/Restaurant/Categories"));
const Category = React.lazy(() =>
  import("./views/Restaurant/Categories/Category")
);
const addCategory = React.lazy(() =>
  import("./views/Restaurant/Categories/addCategory")
);
const addProduct = React.lazy(() =>
  import("./views/Restaurant/Products/addProduct")
);
const editProduct = React.lazy(() =>
  import("./views/Restaurant/Products/editProduct")
);
const Products = React.lazy(() => import("./views/Restaurant/Products"));
const viewProduct = React.lazy(() =>
  import("./views/Restaurant/Products/viewProduct")
);
const Choices = React.lazy(() =>
  import("./views/Restaurant/ProductVariant/Choices")
);
const AddOnOptions = React.lazy(() =>
  import("./views/Restaurant/ProductVariant/AddOnOptions")
);
const Tags = React.lazy(() => import("./views/Restaurant/Tags/Tags"));
const editTag = React.lazy(() => import("./views/Restaurant/Tags/Tag"));
const AppTheme = React.lazy(() =>
  import("./views/Restaurant/AppSetting/AppTheme")
);
const StoreTax = React.lazy(() =>
  import("./views/Restaurant/AppSetting/StoreTax")
);
const PaymentMethod = React.lazy(() =>
  import("./views/Restaurant/AppSetting/PaymentMethod")
);
const StoreHours = React.lazy(() =>
  import("./views/Restaurant/AppSetting/StoreHours")
);
const DeliveryArea = React.lazy(() =>
  import("./views/Restaurant/AppSetting/DeliveryArea")
);
const AppSetting = React.lazy(() => import("./views/Restaurant/AppSetting"));
const DiscountOffers = React.lazy(() => import("./views/Restaurant/Offers"));
const Coupons = React.lazy(() => import("./views/Restaurant/Offers/Coupons"));
const addCoupons = React.lazy(() =>
  import("./views/Restaurant/Offers/addCoupons")
);
const editCoupon = React.lazy(() =>
  import("./views/Restaurant/Offers/coupon")
);
const LoyaltyProgram = React.lazy(() =>
  import("./views/Restaurant/Offers/LoyaltyProgram")
);
const Notification = React.lazy(() =>
  import("./views/Restaurant/Offers/Notification")
);
const WeeklyOffers = React.lazy(() =>
  import("./views/Restaurant/Offers/WeeklyOffers")
);
const CustomerList = React.lazy(() =>
  import("./views/Users/Customers/CustomerList")
);
const CustomerInfo = React.lazy(() =>
  import("./views/Users/Customers/CustomerInfo")
);
const BookTable = React.lazy(() =>
  import("./views/Restaurant/BookTable/BookTable")
);
const Chat = React.lazy(() => import("./views/Restaurant/Chat/Chat"));

const AdminDashboard = React.lazy(() =>
  import("./views/Users/Administrator/AdminDashboard")
);
//==add AppPart2B Component==//
const AddStoreType = React.lazy(() =>
  import("./views/Users/Administrator/AddStoreType")
);
const AddStoreOwner = React.lazy(() =>
  import("./views/Users/Administrator/AddStoreOwner")
);
const StoreOwnerList = React.lazy(() =>
  import("./views/Users/Administrator/StoreOwnerList")
);
const StoreOwnerInfo = React.lazy(() =>
  import("./views/Users/Administrator/StoreOwnerInfo")
);
const EditStoreOwner = React.lazy(() =>
  import("./views/Users/Administrator/EditStoreOwner")
);
const AddOption = React.lazy(()=> 
  import("./views/Restaurant/AddOnOption/AddOption")
);
const ListOptions = React.lazy(() => 
  import("./views/Restaurant/AddOnOption/ListOptions")
);
// const RestaurantOwners = React.lazy(() =>
//   import("./views/Users/Administrator/Restaurants/RestaurantOwners")
// );
// const AddRestaurantOwner = React.lazy(() =>
//   import("./views/Users/Administrator/Restaurants/AddOwner")
// );
// const RestaurantInfo = React.lazy(() =>
//   import("./views/Users/Administrator/Restaurants/RestaurantInfo")
// );
// const RetailOwners = React.lazy(() =>
//   import("./views/Users/Administrator/Retail/RetailOwners")
// );
// const RetailInfo = React.lazy(() =>
//   import("./views/Users/Administrator/Retail/RetailInfo")
// );
// const AddRetailOwner = React.lazy(() =>
//   import("./views/Users/Administrator/Retail/AddOwner")
// );
// const AddStoreOwner = React.lazy(() =>
//   import("./views/Users/Administrator/Stores")
// );
// const EditStoreOwner = React.lazy(() =>
//   import("./views/Users/Administrator/EditStoreOwner")
// );

// https://github.com/ReactTraining/react-router/tree/master/packages/react-router-config
// https://www.youtube.com/watch?v=91F8reC8kvo
const routes = [
  { path: "/", exact: true, name: "Home", component: DefaultLayout },

  { path: "/theme", exact: true, name: "Theme", component: Colors },
  { path: "/theme/colors", name: "Colors", component: Colors },
  { path: "/theme/typography", name: "Typography", component: Typography },
  { path: "/base", exact: true, name: "Base", component: Cards },
  { path: "/base/cards", name: "Cards", component: Cards },
  { path: "/base/forms", name: "Forms", component: Forms },
  { path: "/base/switches", name: "Switches", component: Switches },
  { path: "/base/tables", name: "Tables", component: Tables },
  { path: "/dashboard", name: "Dashboard", component: Dashboard },
  { path: "/base/tabs", name: "Tabs", component: Tabs },
  { path: "/base/breadcrumbs", name: "Breadcrumbs", component: Breadcrumbs },
  { path: "/base/carousels", name: "Carousel", component: Carousels },
  { path: "/base/collapses", name: "Collapse", component: Collapses },
  { path: "/base/dropdowns", name: "Dropdowns", component: Dropdowns },
  { path: "/base/jumbotrons", name: "Jumbotrons", component: Jumbotrons },
  { path: "/base/list-groups", name: "List Groups", component: ListGroups },
  { path: "/base/navbars", name: "Navbars", component: Navbars },
  { path: "/base/navs", name: "Navs", component: Navs },
  { path: "/base/paginations", name: "Paginations", component: Paginations },
  { path: "/base/popovers", name: "Popovers", component: Popovers },
  { path: "/base/progress-bar", name: "Progress Bar", component: ProgressBar },
  { path: "/base/tooltips", name: "Tooltips", component: Tooltips },
  { path: "/buttons", exact: true, name: "Buttons", component: Buttons },
  { path: "/buttons/buttons", name: "Buttons", component: Buttons },
  {
    path: "/buttons/button-dropdowns",
    name: "Button Dropdowns",
    component: ButtonDropdowns
  },
  {
    path: "/buttons/button-groups",
    name: "Button Groups",
    component: ButtonGroups
  },
  {
    path: "/buttons/brand-buttons",
    name: "Brand Buttons",
    component: BrandButtons
  },
  { path: "/icons", exact: true, name: "Icons", component: CoreUIIcons },
  { path: "/icons/coreui-icons", name: "CoreUI Icons", component: CoreUIIcons },
  { path: "/icons/flags", name: "Flags", component: Flags },
  { path: "/icons/font-awesome", name: "Font Awesome", component: FontAwesome },
  {
    path: "/icons/simple-line-icons",
    name: "Simple Line Icons",
    component: SimpleLineIcons
  },
  {
    path: "/notifications",
    exact: true,
    name: "Notifications",
    component: Alerts
  },
  { path: "/notifications/alerts", name: "Alerts", component: Alerts },
  { path: "/notifications/badges", name: "Badges", component: Badges },
  { path: "/notifications/modals", name: "Modals", component: Modals },
  { path: "/widgets", name: "Widgets", component: Widgets },
  { path: "/charts", name: "Charts", component: Charts },
  { path: "/users", exact: true, name: "Users", component: Users },
  { path: "/users/details/:id", name: "User Details", component: User },
  { path: "/users/user", name: "Details", component: Userdetail },
  //==== Biz2App ====
  {
    path: "/Restaurant/Orders/Orders",
    exact: true,
    name: "My Orders",
    component: Orders
  },
  {
    path: "/Restaurant/Orders/Orders/view/:id",
    name: "Order View",
    component: OrderView
  },
  {
    path: "/Restaurant/Orders/Orders/product/:id/:price/:qt/:order",
    name: "Choice and options",
    component: ChoiceProduct
  },
  {
    path: "/Restaurant/Orders/Orders/statics/:id",
    name: "Statics",
    component: OrderStatics
  },
  {
    path: "/Restaurant/Locations/allLocations",
    exact: true,
    name: "All Locations",
    component: allLocations
  },
  {
    path: "/Restaurant/Locations/edit/:id",
    name: "Edit Location",
    component: Location
  },
  {
    path: "/Restaurant/Locations/addLocation",
    name: "Add Location",
    component: addLocation
  },
  {
    path: "/Users/Employees/AllEmployees",
    exact: true,
    name: "All Employees",
    component: AllEmployees
  },
  {
    path: "/Users/Employees/EditEmployee/:id",
    name: "Edit Employee",
    component: EditEmployee
  },
  {
    path: "/Users/Employees/AddEmployee",
    name: "Add Employee",
    component: AddEmployee
  },
  {
    path: "/Restaurant/Categories",
    exact: true,
    name: "Categories",
    component: Categories
  },
  {
    path: "/Restaurant/Categories/addCategory",
    name: "Add Category",
    component: addCategory
  },
  {
    path: "/Restaurant/Categories/:id",
    name: "Category",
    component: Category
  },
  {
    path: "/Restaurant/Products",
    exact: true,
    name: "Products",
    component: Products
  },
  {
    path: "/Restaurant/Products/viewProduct/:id",
    name: "View Product",
    component: viewProduct
  },
  {
    path: "/Restaurant/Products/editProduct/:id",
    name: "Edit Product",
    component: editProduct
  },
  {
    path: "/Restaurant/Products/addProduct",
    name: "Add Product",
    component: addProduct
  },
  {
    path: "/Restaurant/ProductVariant/Choices",
    name: "Add Choices",
    component: Choices
  },
  {
    path: "/Restaurant/ProductVariant/AddOnOptions",
    name: "Add Options",
    component: AddOnOptions
  },

  {
    path: "/Restaurant/Tags",
    name: "App Tag's",
    component: Tags
  },

  {
    path: "/Restaurant/Tag/edit/:id",
    name: "Edit Tag",
    component: editTag
  },

  {
    path: "/Restaurant/AppSetting",
    exact: true,
    name: "App Setting",
    component: AppSetting
  },
  
  {
    path: "/Restaurant/AppSetting/AppTheme",
    name: "App Theme",
    component: AppTheme
  },
  {
    path: "/Restaurant/AppSetting/StoreTax",
    name: "State & City Tax",
    component: StoreTax
  },
  {
    path: "/Restaurant/AppSetting/PaymentMethod",
    name: "Payment Method",
    component: PaymentMethod
  },
  {
    path: "/Restaurant/AppSetting/StoreHours",
    name: "Store Hours",
    component: StoreHours
  },
  {
    path: "/Restaurant/AppSetting/DeliveryArea",
    name: "Delivery Area",
    component: DeliveryArea
  },
  {
    path: "/Restaurant/Offers",
    exact: true,
    name: "Discount & Offers",
    component: DiscountOffers
  },
  {
    path: "/Restaurant/Offers/Coupons",
    name: "Coupons",
    component: Coupons
  },
  {
    path: "/Restaurant/Offers/addCoupons",
    name: "add Coupons",
    component: addCoupons
  },
  {
    path: "/Restaurant/Offers/coupon/:id",
    name: "edit Coupon",
    component: editCoupon
  },
  {
    path: "/Restaurant/Offers/LoyaltyProgram",
    name: "Loyalty Program",
    component: LoyaltyProgram
  },
  {
    path: "/Restaurant/Offers/Notification",
    name: "Notification",
    component: Notification
  },
  {
    path: "/Restaurant/Offers/WeeklyOffers",
    name: "Weekly Offers",
    component: WeeklyOffers
  },
  {
    path: "/Users/Customers/CustomerList",
    name: "Customer List",
    component: CustomerList
  },
  {
    path: "/Users/Customers/CustomerInfo",
    name: "Customer Details",
    component: CustomerInfo
  },
  {
    path: "/Restaurant/BookTable/BookTable",
    exact: true,
    name: "Book a Table",
    component: BookTable
  },
  {
    path: "/Restaurant/Chat/Chat",
    exact: true,
    name: "Chat",
    component: Chat
  },
  // {
  //   path: "/Users/Administrator",
  //   exact: true,
  //   name: "Store Owners",
  //   component: StoreOwnerList
  // },
  {
    path: "/Users/Administrator/AdminDashboard",
    name: "Admin Dashboard",
    component: AdminDashboard
  },
  //== Administrator routes==//
  {
    path: "/Users/Administrator/AddStoreType",
    name: "Store Owner Info",
    component: AddStoreType
  },
  {
    path: "/Users/Administrator/StoreOwners/:storeType",
    name: "Store Owner List",
    component: StoreOwnerList
  },
 
  {
    path: "/Users/Administrator/AddStoreOwner",
    name: "Add Store Owner",
    component: AddStoreOwner
  },
  {
    path: "/Users/Administrator/StoreOwnerInfo/:id",
    name: "Store Owner Info",
    component: StoreOwnerInfo
  },
  {
    path: "/Users/Administrator/EditStoreOwner/:storeTypeName/:storeOwnerIndex",
    name: "Store Owner Info",
    component: EditStoreOwner
  },
  {
    path: "/Users/Administrator/Restaurants/RestaurantsInfo",
    name: "Store Owner Dashboard",
    component: DefaultLayout
  },
  {
    path: "/Users/Administrator/AddOption",
    name: "Add Option",
    component: AddOption
  },
  {
    path: "/Users/Administrator/ListOptions",
    name: "List Options",
    component: ListOptions
  }

];

export default routes;
