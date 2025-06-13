import { GET_ALL_ORDERS_FOR_ADMIN, GET_ALL_USERS_FOR_ADMIN, UPDATE_DELIVERY_ORDER_FOR_CUSTOMER_BY_ADMIN} from "../constants/constantTypes";
import { call, put, takeLatest } from 'redux-saga/effects';
import axios from "../../Utils/api_resources/axios"
import { setAllCartItems, setRemovedProductFromCart } from "../slices/actions/cartItemsActions";
import { config, fileConfig } from '../../Utils/api_resources/config';
import { getAllUserforAdminActions, setAllOrdersforAdmin, setAllUsersForAdmin, setUpdateDeliveryOrderForCustomerByAdmin } from "../slices/actions/adminActions";



function* fetchAllUsersforAdmin() {
    try {
      const {data} = yield call(axios.get, '/api/allusers',config);
  
      if (data) {
        yield put(setAllUsersForAdmin(data))
      } 
    } catch (error) {
      console.log(error,"saga")
    }
  }
  
  
  export function* allUsersforAdminSaga() {
    yield takeLatest(GET_ALL_USERS_FOR_ADMIN, fetchAllUsersforAdmin);
  }



  function* fetchAllOrdersforAdmin() {
    try {
      const {data} = yield call(axios.get, '/api/neworders',config);
  
      if (data) {
        yield put(setAllOrdersforAdmin(data))
      } 
    } catch (error) {
      console.log(error,"saga")
    }
  }
  
  
  export function* getallOrderforAdminSaga() {
    yield takeLatest(GET_ALL_ORDERS_FOR_ADMIN, fetchAllOrdersforAdmin);
  }


   function* fetchUpdateOrderofCustomerbyAdmin(payload) {
    console.log(payload,"payload")
    try {
      const {data} = yield call(axios.put, `/api/deliverystatus/${payload.payload.orderId.orderId}`,payload?.payload?.orderId,config);
        if (data) {
        yield put(setUpdateDeliveryOrderForCustomerByAdmin(data.orderId,data.deliveryStatus))
      } 
    } catch (error) {
      console.log(error,"saga")
    }
  }
  
  
  export function* updateDeliveryStatusforCustomerByAdminSaga() {
    yield takeLatest(UPDATE_DELIVERY_ORDER_FOR_CUSTOMER_BY_ADMIN, fetchUpdateOrderofCustomerbyAdmin);
  }