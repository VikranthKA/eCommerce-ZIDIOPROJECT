import { call, put, takeLatest } from 'redux-saga/effects';
import axios from "../../Utils/api_resources/axios"
import { config, fileConfig } from '../../Utils/api_resources/config';
import { errorInProduct, setAllProducts } from '../slices/actions/productActions';
import { GET_ALL_PRODUCTS } from '../constants/constantTypes';


function* fetchProductsSaga() {
  try {
    const {data} = yield call(axios.get, '/api/products',config);

    if (data) {
      yield put(setAllProducts(data.data))
    } 
  } catch (error) {
    console.log(error,"saga")
    // yield put(errorInProduct(error.response.data.error.msg));
  }
}


export function* productAllSaga() {
  yield takeLatest(GET_ALL_PRODUCTS, fetchProductsSaga);
}