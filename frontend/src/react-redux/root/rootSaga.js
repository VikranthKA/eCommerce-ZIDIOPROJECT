import {all} from 'redux-saga/effects'
import {
    categoryAllSaga,
    createCategorySaga,
    deleteCategorySaga,
    updateCategorySaga
  } from "../saga/categorySaga"
import { productAllSaga, setNewCreatedProductSaga, setUpdatedProductSaga } from '../saga/productSaga'
import { setNewUserProfileAddressSaga, setUpdatedUserProfile, setUserProfile } from '../saga/profileSaga'
import { cartAllSaga, setCartItemsSaga, setRemovedProductFromCartSaga } from '../saga/cartSaga'



export default function* rootSaga(){
    yield all([
        categoryAllSaga(),createCategorySaga(),updateCategorySaga(),deleteCategorySaga(),
        productAllSaga(),setNewCreatedProductSaga(),setUpdatedProductSaga(),
        setUserProfile(),setUpdatedUserProfile(),
        setNewUserProfileAddressSaga(),
        cartAllSaga(),setCartItemsSaga(),setRemovedProductFromCartSaga()
    ]) 
}