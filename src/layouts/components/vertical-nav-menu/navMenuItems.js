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

    icon: "ActivityIcon",
    slug: "Analytics"
  },
  {
    url: "/dashboard/settings",
    name: "Settings",

    icon: "SettingsIcon",
    slug: "Settings"
  },
  {
    url: "/dashboard/catalog",
    name: "Catalog",

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
      },
      {
        url: "/dashboard/catalog/knowledge-base",
        name: "Knowledge Base",
        icon: "ArchiveIcon",
        slug: "knowlegeBase"
      }
    ]
  }
];
