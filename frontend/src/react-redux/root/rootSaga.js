import {all} from 'redux-saga/effects'
import { categoryAllSaga,createCategorySaga,deleteCategorySaga,updateCategorySaga} from "../saga/categorySaga"
import { productAllSaga, setNewCreatedProductSaga, setUpdatedProductSaga } from '../saga/productSaga'
import { setNewUserProfileAddressSaga, setUpdatedUserProfile, setUserProfile, setUpdateProfileAddressSaga } from '../saga/profileSaga'
import { cartAllSaga, setCartItemsSaga, setRemovedProductFromCartSaga } from '../saga/cartSaga'
import { createUserOrderSaga } from '../saga/orderSaga'
import { makePaymentSaga, updatePaymentOrderSaga } from '../saga/paymentSaga'
import { createNewReviewForProductSaga, deleteReviewForProductSaga, updateReviewForProductSaga } from '../saga/reviewSaga'
import { allUsersforAdminSaga, getallOrderforAdminSaga, updateDeliveryStatusforCustomerByAdminSaga } from '../saga/adminSaga'


export default function* rootSaga(){
    yield all([
                     categoryAllSaga(),         createCategorySaga(),           updateCategorySaga(),deleteCategorySaga(),
                      productAllSaga(),   setNewCreatedProductSaga(),        setUpdatedProductSaga(),
                      setUserProfile(),      setUpdatedUserProfile(),
        setNewUserProfileAddressSaga(),setUpdateProfileAddressSaga(),
                         cartAllSaga(),           setCartItemsSaga(),setRemovedProductFromCartSaga(),
                 createUserOrderSaga(),
                     makePaymentSaga(),     updatePaymentOrderSaga(),
       createNewReviewForProductSaga(), updateReviewForProductSaga(),   deleteReviewForProductSaga(),
                allUsersforAdminSaga(),
                                                                    updateDeliveryStatusforCustomerByAdminSaga(),
             getallOrderforAdminSaga()
    ]) 
}