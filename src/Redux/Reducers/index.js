import * as ActionType from "../Constants/ActionType";
import { number } from "prop-types";

let initialState = {
  infoUser: {},
  listProductOfOrderNotPay: []
};

const demoReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.SET_IS_HAVE_NEW_NOTI:
      return { ...state, isHaveNoti: true }
    case ActionType.SET_CLEAR_NOTI:
      return { ...state, isHaveNoti: false }

    case ActionType.SAVE_INFO_USER:
      return {
        ...state,
        infoUser: action.payload.infoUser,
        listProductOfOrderNotPay: action.payload.listProductOfOrderNotPay
      }
    case ActionType.LOGOUT:
      return initialState;

    case ActionType.PAY_ORDER_SUCCESS:
      return {
        ...state,
        listProductOfOrderNotPay: []
      }

    case ActionType.UPDATE_CART:
      return {
        ...state,
        listProductOfOrderNotPay: action.payload
      }

    default:
      return state;
  }
};

export default demoReducer;
