import { GET_ALL_CARTITEMS_SAGA, REMOVE_PRODUCT_FROM_CART_SAGA, UPDATE_CART_ITEMS_SAGA } from "../constants/constantTypes";
import { call, put, takeLatest } from 'redux-saga/effects';
import axios from "../../Utils/api_resources/axios"
import { setAllCartItems, setRemovedProductFromCart } from "../slices/actions/cartItemsActions";
import { config, fileConfig } from '../../Utils/api_resources/config';



function* fetchCartSaga() {
    try {
      const {data} = yield call(axios.get, '/api/cart',config);
  
      if (data) {
        console.log(data,"cart")
        yield put(setAllCartItems(data.data))
      } 
    } catch (error) {
      console.log(error,"saga")
    //   yield put(fetchCategoriesFailure(error.message));
    }
  }
  
  
  export function* cartAllSaga() {
    yield takeLatest(GET_ALL_CARTITEMS_SAGA, fetchCartSaga);
  }


  function* UpdateNewCartProductSaga(action) {
    // console.log(action.payload)
    // return "Working"
    try {
      const {data} = yield call(axios.put, '/api/cart',action.payload,config);
  
      if (data) {
        console.log(data,"cart")
        yield put(setAllCartItems(data.cart))
      } 
    } catch (error) {
      console.log(error,"saga")
    }
  }
  
  
  export function* setCartItemsSaga() {
    yield takeLatest(UPDATE_CART_ITEMS_SAGA, UpdateNewCartProductSaga);
  }

  function* removeProductFromCartSaga(action) {
    console.log(action.payload,"productId")
    try {
      const {data} = yield call(axios.put, `/api/cart/${action.payload}`,config);
  
      if (data) {
        // console.log(data,"data")
        yield put(setRemovedProductFromCart(data))
      } 
    } catch (error) {
      console.log(error,"saga")
    }
  }
  
  
  export function* setRemovedProductFromCartSaga() {
    yield takeLatest(REMOVE_PRODUCT_FROM_CART_SAGA, removeProductFromCartSaga);
  }