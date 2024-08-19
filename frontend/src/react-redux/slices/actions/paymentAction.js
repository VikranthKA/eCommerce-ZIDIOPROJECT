import { CREATE_PAYMENT_FOR_ORDER_SAGA, UPDATE_PAYMENT_AS_TRUE } from "../../constants/constantTypes"

export const startPayment = (orderId,card)=>{
    return {
        type:CREATE_PAYMENT_FOR_ORDER_SAGA,
        payload:{
            orderId,card
        }
    }
}

export const updatePayment = ()=>{
    return{
        type:UPDATE_PAYMENT_AS_TRUE
    }
}

