import { ActionType } from "./actionTypes";

export const AddToWishlist = (product) => {
  return {
    type: ActionType.ADD_TO_WISHLIST,
    payload: product,
  };
};

export const MakeIsInWishlistTrueInWishlist = (id) => {
  return {
    type: ActionType.MAKE_IS_IN_WISHLIST_TRUE_IN_WISHLIST,
    payload: id,
  };
};

export const WishlistProductIsInCartFalse = (id) => {
  return {
    type: ActionType.MAKE_WISHLIST_PRODUCT_ISINCART_FALSE,
    payload: id,
  };
};

export const RemoveFromWishlist = (id) => {
  return {
    type: ActionType.REMOVE_FROM_WISHLIST,
    payload: id,
  };
};
export const clearWishlist = (id) => {
  return {
    type: ActionType.CLEAR_WISHLIST,
    payload: id,
  };
};
