import { CREATE_ORDER_SAGA } from "../../constants/constantTypes";

export const createUserOrder=(addressIndex)=>({
    type:CREATE_ORDER_SAGA,
    payload:addressIndex
})