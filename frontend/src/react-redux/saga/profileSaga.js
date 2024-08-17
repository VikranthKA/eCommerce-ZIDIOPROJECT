import { call, put, takeLatest } from 'redux-saga/effects';
import axios from "../../Utils/api_resources/axios"
import { config, fileConfig } from '../../Utils/api_resources/config';
import { ADD_NEW_PROFILE_ADDRESS_SAGA, GET_LOGINED_PROFILE_SAGA, UPDATE_ADDRESS_USER_PROFILE_SAGA, UPDATE_USER_PROFILE_SAGA } from '../constants/constantTypes';
import { setCreatedAddressForUserProfile, setErrorInUserProfile, setFoundUserProfile } from '../slices/actions/profileActions';



function* fetchUserProfileSaga() {
  try {
    const {data} = yield call(axios.get, '/api/profile',config);
    console.log(data)

    if (data) {
      yield put(setFoundUserProfile(data))
    } 
  } catch (error) {
    console.log(error,"saga")
    yield put(setErrorInUserProfile(error.response.data.error));
  }
}


export function* setUserProfile() {
  yield takeLatest(GET_LOGINED_PROFILE_SAGA, fetchUserProfileSaga);
}

function* updateUserProfile(action) {
  console.log(...action.payload)
  // return "Working"
  try {
    const {data} = yield call(axios.put, '/api/profile',action.payload,fileConfig);


    if (data) {
      yield put(setFoundUserProfile(data.data))
    } 
  } catch (error) {
      yield put(setErrorInUserProfile(error.response.data.error))
    console.log(error,"saga")
  }
}


export function* setUpdatedUserProfile() {
  yield takeLatest(UPDATE_USER_PROFILE_SAGA, updateUserProfile);
}

function* createNewUserProfileAddress(action) {
  console.log(action.payload)
  // return "Working"
  try {
    const {data} = yield call(axios.put,'/api/profile/address',action.payload,config);

    console.log(data)
    
    if (data) {
      yield put(setFoundUserProfile(data.data))
    } 
  } catch (error) {
      yield put(setErrorInUserProfile(error.response.data.error))
    console.log(error,"saga")
  }
}


export function* setNewUserProfileAddressSaga() {
  yield takeLatest(ADD_NEW_PROFILE_ADDRESS_SAGA, createNewUserProfileAddress);
}

function* updateUserProfileAddress(action) {
  console.log(action.payload)
  // return "Working"
  try {
    const {data} = yield call(axios.put,`/api/profile/address/${action.payload.addressId}`,action.payload.formData,config);

    console.log(data,"data")
    
    if (data) {
      yield put(setFoundUserProfile(data.data))
    } 
  } catch (error) {
      yield put(setErrorInUserProfile(error.response.data.error))
    console.log(error,"saga")
  }
}


export function* setUpdateProfileAddressSaga() {
  yield takeLatest(UPDATE_ADDRESS_USER_PROFILE_SAGA, updateUserProfileAddress);
}