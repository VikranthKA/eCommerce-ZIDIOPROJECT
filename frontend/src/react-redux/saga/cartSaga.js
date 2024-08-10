import { GET_ALL_CARTITEMS_SAGA } from "../constants/constantTypes";
import { call, put, takeLatest } from 'redux-saga/effects';
import axios from "../../Utils/api_resources/axios"
import { setAllCartItems } from "../slices/actions/cartItemsActions";
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