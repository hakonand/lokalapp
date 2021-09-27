// routes
import { PATH_DASHBOARD, PATH_PAGE, PATH_AUTH } from '../../routes/paths';
// components
import SvgIconStyle from '../../components/SvgIconStyle';

// ----------------------------------------------------------------------

const getIcon = (name) => (
  <SvgIconStyle
    src={`/static/icons/navbar/${name}.svg`}
    sx={{ width: 22, height: 22 }}
  />
);

const ICONS = {
  map: getIcon('ic_map'),
  blog: getIcon('ic_blog'),
  cart: getIcon('ic_cart'),
  chat: getIcon('ic_chat'),
  mail: getIcon('ic_mail'),
  page: getIcon('ic_page'),
  user: getIcon('ic_user'),
  copy: getIcon('ic_copy'),
  error: getIcon('ic_error'),
  charts: getIcon('ic_charts'),
  editor: getIcon('ic_editor'),
  upload: getIcon('ic_upload'),
  animate: getIcon('ic_animate'),
  calendar: getIcon('ic_calendar'),
  elements: getIcon('ic_elements'),
  carousel: getIcon('ic_carousel'),
  language: getIcon('ic_language'),
  ecommerce: getIcon('ic_ecommerce'),
  analytics: getIcon('ic_analytics'),
  dashboard: getIcon('ic_dashboard'),
  components: getIcon('ic_components'),
  authenticator: getIcon('ic_authenticator')
};

//
// {
//   title: 'Categories',
//   href: PATH_DASHBOARD.general.createcategory
// },

const sidebarConfig = [
  // GENERAL

  // ----------------------------------------------------------------------
  {
    subheader: 'Menu',
    items: [
      {
        title: 'Dashboard',
        href: PATH_DASHBOARD.general.maindashboard,
        icon: ICONS.dashboard
      },

      {
        title: 'Orders',
        href: PATH_DASHBOARD.general.orderlistwrapper,
        icon: ICONS.ecommerce
      },
      {
        title: 'Products',
        href: PATH_DASHBOARD.general.viewproducts,
        icon: ICONS.cart
      },

      {
        title: 'Storefront',
        href: PATH_DASHBOARD.user.profile,
        icon: ICONS.page
      }
    ]
  }

  // MANAGEMENT
  // ----------------------------------------------------------------------
  // {
  //   subheader: 'Store Management',
  //   items: [
  //     {
  //       title: 'Products',
  //       href: PATH_DASHBOARD.general.viewproducts,
  //       icon: ICONS.cart
  //     },

  //     {
  //       title: 'View Storefront',
  //       href: PATH_DASHBOARD.user.profile,
  //       icon: ICONS.page
  //     }
  //   ]
  // }
];

export default sidebarConfig;
