/*=========================================================================================
  File Name: sidebarItems.js
  Description: Sidebar Items list. Add / Remove menu items from here.
  Strucutre:
          url     => router path
          name    => name to display in sidebar
          slug    => router path name
          icon    => Feather Icon component/icon name
          tag     => text to display on badge
          tagColor  => class to apply on badge element
          i18n    => Internationalization
          submenu   => submenu of current item (current item will become dropdown )
                NOTE: Submenu don't have any icon(you can add icon if u want to display)
          isDisabled  => disable sidebar item/group
==========================================================================================*/

export default [
  {
    url: "/dashboard/orders",
    name: "Orders",
    icon: "PackageIcon",
    slug: "Orders"
  },
  {
    url: "/dashboard/analytics",
    name: "Analytics",
    i18n: "Analytics",
    icon: "ActivityIcon",
    slug: "Analytics"
  },
  {
    url: "/dashboard/settings",
    name: "Settings",
    i18n: "Settings",
    icon: "SettingsIcon",
    slug: "Settings"
  },
  {
    url: "/dashboard/catalog",
    name: "Catalog",
    i18n: "Catalog",
    icon: "ShoppingCartIcon",
    slug: "Catalog",
    submenu: [
      {
        url: "/dashboard/catalog/categories",
        name: "Categories",
        icon: "ListIcon",
        slug: "Categories"
      },
      {
        url: "/dashboard/catalog/items",
        name: "Items",
        icon: "BoxIcon",
        slug: "Items"
      }
    ]
  }
];
