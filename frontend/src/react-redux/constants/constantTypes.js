export const INCREMENT = "count/increment"
export const DECREMENT = "count/decrement"

//user auth
export const TOKEN = "user/token"
export const LOGOUT = "user/logout"
export const LOGIN = "user/login"

//user_profile
export const GET_LOGINED_PROFILE_SAGA = "user/profile/saga" 
export const SET_USER_PROFILE = "set/user/profile"

export const ERROR_IN_USER_PROFILE = "error/in/user/profile"

//categories
export const GET_ALL_CATEGORY = "get/all/category"
export const CREATE_CATEGORY = "create/category"

export const UPDATE_CATEGORY_SAGA = "update/category/saga"
export const DELETE_CATEGORY_SAGA = "delete/category/saga"


export const SET_CATEGORIES = "set/categories"
export const SET_CREATED_CATEGORIES = "set/created/categories"
export const FETCH_CATEGORIES_FAILURE = "error/categories"

//to keep track the edit Id of category
export const EDIT_CATEGORY_ID = "get/edit/id/category"
export const REMOVE_CATEGORY_EDIT_ID = "remove/edit/id/category"


export const SET_UPDATED_CATEGORIES = "set/updated/category"
export const SET_DELETED_CATEGORIES = "set/deleted/category"

//to call the all the products
export const GET_ALL_PRODUCTS = "get/all/products"
export const SET_ALL_PRODUCTS = "set/all/products"

//product

export const ERROR_IN_PRODUCTS = "error/in/products"

export const ADD_CREATE_PRODUCT_SAGA = "add/creating/product/saga"
export const SET_CREATED_PRODUCT = "set/created/product"

export const EDIT_CREATED_PRODUCT_ID = "edit/created/product_id"
export const REMOVE_EDIT_PRODUCT_ID = "remove/edit/product/id"
export const UPDATE_CREATED_PRODUCT_SAGA = "update/created/product/saga"
export const SET_UPDATED_PRODUCT = "set/updated/product"

export const DELETE_PRODUCT_SAGA = "delete/product/saga"
export const SET_DELETED_PRODUCT = "deleted/product"

//review

export const CREATE_REVIEW_FOR_PRODUCT_SAGA = "create/review/for/product/saga"
export const SET_CREATED_REVIEW_FOR_PRODUCT = "set/created/review/for/product"

export const UPDATE_REVIEW_FOR_PRODUCT_SAGA = "update/review/for/product/saga"
export const SET_UPDATED_REVIEW_FOR_PRODUCT = "set/updated/review/for/product"

export const DELETE_REVIEW_FOR_PRODUCT_SAGA = "delete/review/for/product/saga"
export const SET_DELETED_REVIEW_FOR_PRODUCT = "set/deleted/review/for/product"

//cart

export const GET_ALL_CARTITEMS_SAGA = "get/cartItems/saga"
export const SET_CARTITEMS = "set/cartItems"

export const UPDATE_CART_ITEMS_SAGA = "update/cart/items/saga"
export const SET_UPDATED_CART_ITEMS = "set/updated/cart/items"

export const REMOVE_PRODUCT_FROM_CART_SAGA = "remove/product/from/cart"
export const SET_REMOVED_PRODUCT_FROM_CART = "set/removed/product/from/cart"

export const EMPTY_USER_CART = "empty/user/cart"

//profile

export const UPDATE_USER_PROFILE_SAGA = "update/user/profile/saga"
export const SET_UPDATED_USER_PROFILE = "set/updated/user/profile"

//address

export const ADD_NEW_PROFILE_ADDRESS_SAGA = "add/new/user/profile/address/saga"
export const SET_CREATED_ADDRESS_USER_PROFILE = "set/created/address/user/profile"
export const UPDATE_ADDRESS_USER_PROFILE_SAGA = "update/address/user/profile/saga"

//order

export const CREATE_ORDER_SAGA = "create/order/saga"

//payment

export const CREATE_PAYMENT_FOR_ORDER_SAGA = "create/payment/for/order"
export const UPDATE_PAYMENT_AS_TRUE = "update/the/payment/order"







