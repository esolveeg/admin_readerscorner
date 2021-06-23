// [0 : sell , 1 : buy return  ] , (+)[2 : buy , 3 : sell return ], (=)[4 : inventory , 5 : define , 6 : first balance] , (+ , -)[7 : transactions]]
export default[
  {
    icon: 'mdi-apps',
    title: 'Dasboard',
    to: '/'
  },
  {
    icon: 'mdi-book-open-blank-variant',
    title: 'products',
    to: '/products/?type=5'
  },
  {
    icon: 'mdi-account-outline',
    title: 'users',
    to: '/users/'
  },
  {
    icon: 'mdi-warehouse',
    title: 'branches',
    to: '/branches/'
  },
  {
    icon: 'mdi-cart-arrow-down',
    title: 'Orders',
    to: '/documents/0'
  },
  {
    icon: 'mdi-cart-arrow-up',
    title: 'Outcoming Orders',
    to: '/documents/2'
  },
  {
    icon: 'mdi-cart-check',
    title: 'Inventory',
    to: '/documents/4'
  },
  {
    icon: 'mdi-bus-double-decker',
    title: 'transactions',
    to: '/documents/7'
  },
  {
    icon: 'mdi-file-document-edit-outline',
    title: 'first balance docuents',
    to: '/documents/6'
  },
  
  
]