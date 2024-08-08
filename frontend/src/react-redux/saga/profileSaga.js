import { call, put, takeLatest } from 'redux-saga/effects';
import axios from "../../Utils/api_resources/axios"
import { config, fileConfig } from '../../Utils/api_resources/config';
import { GET_LOGINED_PROFILE_SAGA } from '../constants/constantTypes';
import { setErrorInUserProfile, setFoundUserProfile } from '../slices/actions/profileActions';



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