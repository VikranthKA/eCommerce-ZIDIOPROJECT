import { CREATE_ORDER_SAGA } from "../constants/constantTypes";
import { call, put, takeLatest } from 'redux-saga/effects';
import axios from "../../Utils/api_resources/axios"
import { config, fileConfig } from '../../Utils/api_resources/config';
import { setFoundUserProfile } from "../slices/actions/profileActions";



function* fetchCreateOrder(action) {
    try {
      const {data} = yield call(axios.post,'/api/order',action.payload,config);
  
      if (data) {
        console.log(data,"order")
        yield put(setFoundUserProfile(data.data))
      } 
    } catch (error) {
      console.log(error,"saga")
    //   yield put(fetchCategoriesFailure(error.message));
    }
  }
  
  
  export function* createUserOrderSaga() {
    yield takeLatest(CREATE_ORDER_SAGA, fetchCreateOrder);
  }