let admin_navigation = {
    items: [

      {
        title: true,
        name: "Administrator",
        wrapper: {
          // optional wrapper object
          element: "", // required valid HTML5 element tag
          attributes: {} // optional valid JS object with JS API naming ex: { className: "my-class", style: { fontFamily: "Verdana" }, id: "my-id"}
        },
        class: "" // optional class names space delimited list for title item ex: "text-center"
      },
      {
        name: "Dashboard",
        url: "/Users/Administrator/AdminDashboard",
        icon: "icon-speedometer",
        badge: {
          variant: "warning",
          text: "ADMIN"
        }
      },
      {
        name: "Store Owners",
        icon: "icon-layers",
        children: []
      },
    
      {
        name: "Stores Types",
        url: "/Users/Administrator/AddStoreType",
        icon: "icon-home"
      },

      {
        name: "Add-On Options",
        icon: "icon-layers",
        children: [{
          name: 'Add Options',
          url: "/Users/Administrator/AddOption",
          icon: "icon-puzzle"
        },
        
        {
          name: "List Options",
          url: "/Users/Administrator/ListOptions",
          icon: "icon-puzzle"
        }]
      },
      
      {
        name: "Users",
        icon: "cui-user",
        url: "/users",
      },
      
    ]
  }

  export default admin_navigation;