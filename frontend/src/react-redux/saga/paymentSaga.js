import { CREATE_PAYMENT_FOR_ORDER_SAGA, UPDATE_PAYMENT_AS_TRUE, } from "../constants/constantTypes";
import { call, put, takeLatest } from 'redux-saga/effects';
import axios from "../../Utils/api_resources/axios"
import { config, fileConfig, paymentConfig } from '../../Utils/api_resources/config';
import { setFoundUserProfile } from "../slices/actions/profileActions";



function* createPaymentForOrderSaga(action) {

    try {
      const {data} = yield call(axios.post, `/api/order/${action.payload.orderId}/payment`,action.payload.card,paymentConfig)
      console.log(data,"data")
      if (data?.id && data?.url) {
      localStorage.setItem("stripeId",data.id)
      window.location = data.url
      yield put()
      return null
      } 
    } catch (error) {
      console.log(error,"saga")
    //   yield put(fetchCategoriesFailure(error.message));
    }
  }
  
  
  export function* makePaymentSaga() {
    yield takeLatest(CREATE_PAYMENT_FOR_ORDER_SAGA, createPaymentForOrderSaga);
  }


  function* updatePaymentForOrderSaga() {

    try {
        const stripeId = localStorage.getItem("stripeId")

      const {data} = yield call(axios.put,`/api/order/update-payment`,{stripeId},paymentConfig)
      localStorage.removeItem("stripeId")
     yield put(setFoundUserProfile(data.profile))
    } catch (error) {
      console.log(error,"saga")
    //   yield put(fetchCategoriesFailure(error.message));
    }
  }
  
  
  export function* updatePaymentOrderSaga() {
    yield takeLatest(UPDATE_PAYMENT_AS_TRUE, updatePaymentForOrderSaga);
  }

