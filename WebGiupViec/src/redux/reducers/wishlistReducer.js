import { ActionType } from "../actions/actionTypes";

const initialState = {
  wishlist: [],
};

const wishlistReducer = (state = initialState, action) => {
  switch (action.type) {
    // Thêm sản phẩm vào Wishlist
    case ActionType.ADD_TO_WISHLIST:
      return {
        ...state,
        wishlist: [...state.wishlist, action.payload],
      };

    // Đặt isInWishlist của sản phẩm trong Wishlist thành true
    case ActionType.MAKE_IS_IN_WISHLIST_TRUE_IN_WISHLIST:
      return {
        ...state,
        wishlist: state.wishlist.map((product) =>
          product._id === action.payload
            ? { ...product, isInWishlist: true }
            : product
        ),
      };

    // Đặt isInCart của sản phẩm trong Wishlist thành false
    case ActionType.MAKE_WISHLIST_PRODUCT_ISINCART_FALSE:
      return {
        ...state,
        wishlist: state.wishlist.map((product) =>
          product._id === action.payload
            ? { ...product, isInCart: false }
            : product
        ),
      };

    // Xóa sản phẩm khỏi Wishlist
    case ActionType.REMOVE_FROM_WISHLIST:
      return {
        ...state,
        wishlist: state.wishlist.filter(
          (product) => product._id !== action.payload
        ),
      };
    case ActionType.CLEAR_WISHLIST:
      return {
        ...state,
        wishlist: [], // Làm trống danh sách yêu thích
      };


    default:
      return state;
  }
};

export default wishlistReducer;
