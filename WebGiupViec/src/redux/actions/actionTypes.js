export const ActionType = {
  // primary action types
  SHOW_SIDEBAR_CATEGORIES: "SHOW_SIDEBAR_CATEGORIES",
  SHOW_SIDEBAR_MENU: "SHOW_SIDEBAR_MENU",
  GET_TITLE: "GET_TITLE",
  IS_LOADING: "IS_LOADING",
  SHOW_SEARCH_AREA: "SHOW_SEARCH_AREA",
  SHOW_OR_HIDE_DROPDOWNCART: "SHOW_OR_HIDE_DROPDOWNCART",
  SHOW_SIDEBAR_FILTER: "SHOW_SIDEBAR_FILTER",

  // cart action types
  ADD_TO_CART: "ADD_TO_CART",
  DELETE_FROM_CART: "DELETE_FROM_CART",
  INCREASE_PRODUCT_COUNT: "INCREASE_PRODUCT_COUNT",
  DECREASE_PRODUCT_COUNT: "DECREASE_PRODUCT_COUNT",
  MAKE_ISINCART_TRUE: "MAKE_ISINCART_TRUE",
  CLEAR_CART: "CLEAR_CART",

  // voucher action types
  APPLY_VOUCHER: "APPLY_VOUCHER",
  CLEAR_VOUCHER: "CLEAR_VOUCHER",

  // product action types
  SORT_BY_LATEST_AND_PRICE: "SORT_PRODUCTS_BY_LATEST_AND_PRICE",
  SORT_BY_CATEGORY: "SORT_BY_CATEGORY",
  SORT_BY_BRAND: "SORT_BY_BRAND",
  SEARCH_PRODUCT: "SEARCH_PRODUCT",
  MAKE_ISINCART_FALSE: "MAKE_ISINCART_FALSE",
  MAKE_IS_IN_WISHLIST_FALSE: "MAKE_IS_IN_WISHLIST_FALSE",
  MAKE_IS_IN_COMPARE_FALSE: "MAKE_IS_IN_COMPARE_FALSE",

  // wishlist action types
  ADD_TO_WISHLIST: "ADD_TO_WISHLIST",
  MAKE_IS_IN_WISHLIST_TRUE_IN_WISHLIST: "MAKE_IS_IN_WISHLIST_TRUE_IN_WISHLIST",
  MAKE_WISHLIST_PRODUCT_ISINCART_FALSE: "MAKE_WISHLIST_PRODUCT_ISINCART_FALSE",
  REMOVE_FROM_WISHLIST: "REMOVE_FROM_WISHLIST",
  CLEAR_WISHLIST: "CLEAR_WISHLIST", // Thêm mới
  ADD_ALL_TO_CART_FROM_WISHLIST: "ADD_ALL_TO_CART_FROM_WISHLIST",

  // compare action types
  ADD_TO_COMPARE: "ADD_TO_COMPARE",
  REMOVE_FROM_COMPARE: "REMOVE_FROM_COMPARE",
  MAKE_IS_IN_COMPARE_TRUE_IN_COMPARE: "MAKE_IS_IN_COMPARE_TRUE_IN_COMPARE",
  MAKE_COMPARE_PRODUCT_ISINCART_FALSE: "MAKE_COMPARE_PRODUCT_ISINCART_FALSE",
};

// primary actions
export const showSidebarCategoriesAction = (payload) => ({
  type: ActionType.SHOW_SIDEBAR_CATEGORIES,
  payload,
});

export const showSidebarMenuAction = (payload) => ({
  type: ActionType.SHOW_SIDEBAR_MENU,
  payload,
});

export const getTitleAction = (payload) => ({
  type: ActionType.GET_TITLE,
  payload,
});

export const isLoadingAction = (payload) => ({
  type: ActionType.IS_LOADING,
  payload,
});

export const showSearchAreaAction = (payload) => ({
  type: ActionType.SHOW_SEARCH_AREA,
  payload,
});

export const showOrHideDropdownCartAction = () => ({
  type: ActionType.SHOW_OR_HIDE_DROPDOWNCART,
});

export const showSidebarFilterAction = (payload) => ({
  type: ActionType.SHOW_SIDEBAR_FILTER,
  payload,
});

// cart actions
export const addToCartAction = (payload) => ({
  type: ActionType.ADD_TO_CART,
  payload,
});

export const deleteFromCartAction = (payload) => ({
  type: ActionType.DELETE_FROM_CART,
  payload,
});

export const clearCartAction = () => ({
  type: ActionType.CLEAR_CART,
});

export const increaseProductCountAction = (payload) => ({
  type: ActionType.INCREASE_PRODUCT_COUNT,
  payload,
});

export const decreaseProductCountAction = (payload) => ({
  type: ActionType.DECREASE_PRODUCT_COUNT,
  payload,
});

export const makeIsInCartTrueAction = (payload) => ({
  type: ActionType.MAKE_ISINCART_TRUE,
  payload,
});

// product actions
export const sortByLatestAndPriceAction = (payload) => ({
  type: ActionType.SORT_BY_LATEST_AND_PRICE,
  payload,
});

export const sortByCategoryAction = (payload) => ({
  type: ActionType.SORT_BY_CATEGORY,
  payload,
});

export const sortByBrandAction = (payload) => ({
  type: ActionType.SORT_BY_BRAND,
  payload,
});

export const searchProductAction = (payload) => ({
  type: ActionType.SEARCH_PRODUCT,
  payload,
});

export const makeIsInCartFalseAction = (payload) => ({
  type: ActionType.MAKE_ISINCART_FALSE,
  payload,
});

export const makeIsInWishlistFalseAction = (payload) => ({
  type: ActionType.MAKE_IS_IN_WISHLIST_FALSE,
  payload,
});

export const makeIsInCompareFalseAction = (payload) => ({
  type: ActionType.MAKE_IS_IN_COMPARE_FALSE,
  payload,
});

// wishlist actions
export const addToWishlistAction = (payload) => ({
  type: ActionType.ADD_TO_WISHLIST,
  payload,
});

export const removeFromWishlistAction = (payload) => ({
  type: ActionType.REMOVE_FROM_WISHLIST,
  payload,
});

export const makeWishlistProductTrueInWishlistAction = (payload) => ({
  type: ActionType.MAKE_IS_IN_WISHLIST_TRUE_IN_WISHLIST,
  payload,
});

export const makeWishlistProductIsInCartFalseAction = (payload) => ({
  type: ActionType.MAKE_WISHLIST_PRODUCT_ISINCART_FALSE,
  payload,
});

// compare actions
export const addToCompareAction = (payload) => ({
  type: ActionType.ADD_TO_COMPARE,
  payload,
});

export const removeFromCompareAction = (payload) => ({
  type: ActionType.REMOVE_FROM_COMPARE,
  payload,
});

export const makeCompareProductTrueInCompareAction = (payload) => ({
  type: ActionType.MAKE_IS_IN_COMPARE_TRUE_IN_COMPARE,
  payload,
});

export const makeCompareProductIsInCartFalseAction = (payload) => ({
  type: ActionType.MAKE_COMPARE_PRODUCT_ISINCART_FALSE,
  payload,
});

export const applyVoucherAction = (payload) => ({
  type: ActionType.APPLY_VOUCHER,
  payload,
});

export const ClearVoucher = (payload) => ({
  type: ActionType.CLEAR_VOUCHER,
  payload,
});
