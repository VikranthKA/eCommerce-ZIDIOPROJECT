import { CREATE_REVIEW_FOR_PRODUCT_SAGA, DELETE_REVIEW_FOR_PRODUCT_SAGA, UPDATE_REVIEW_FOR_PRODUCT_SAGA } from "../constants/constantTypes";
import { call, put, takeLatest } from 'redux-saga/effects';
import axios from "../../Utils/api_resources/axios"
import {config,fileConfig } from '../../Utils/api_resources/config';
import { setCreatedReviewForProduct } from "../slices/actions/reviewsActions";



function* fetchCreateNewReviewForProduct(action) {
    try {
      const {data} = yield call(axios.post,`/api/product/${action.payload.productId}/review`,action.payload.formData,fileConfig);
  
      if (data) {
        console.log(data,"review")
        yield put(setCreatedReviewForProduct(data.reviews,data.productId))
      } 
    } catch (error) {
      console.log(error,"saga")
    //   yield put(fetchCategoriesFailure(error.message));
    }
  }
  
  
  export function* createNewReviewForProductSaga() {
    yield takeLatest(CREATE_REVIEW_FOR_PRODUCT_SAGA, fetchCreateNewReviewForProduct);
  }


  function* fetchUpdateReviewForProduct(action) {
   console.log(action.payload,"action.payload")
    try {
      const {data} = yield call(axios.put,`/api/product/${action.payload.productId}/review/${action.payload.reviewId}`,action.payload.formData,config);
  
      if (data) {
        console.log(data,"review")
        yield put(setCreatedReviewForProduct(data.reviews,data.productId))
      } 
    } catch (error) {
      console.log(error,"saga")
    //   yield put(fetchCategoriesFailure(error.message));
    }
  }
  
  
  export function* updateReviewForProductSaga() {
    yield takeLatest(UPDATE_REVIEW_FOR_PRODUCT_SAGA, fetchUpdateReviewForProduct);
  }


  function* fetchDeleteReviewForProduct(action) {
    console.log(action.payload,"action.payload")
     try {
       const {data} = yield call(axios.delete,`/api/product/${action.payload.productId}/review/${action.payload.reviewId}`,config);
   
       if (data) {
         console.log(data,"review")
         yield put(setCreatedReviewForProduct(data.reviews,data.productId))
       } 
     } catch (error) {
       console.log(error,"saga")
     //   yield put(fetchCategoriesFailure(error.message));
     }
   }
   
   
   export function* deleteReviewForProductSaga() {
     yield takeLatest(DELETE_REVIEW_FOR_PRODUCT_SAGA, fetchDeleteReviewForProduct);
   }