import { BASE_URL } from '../../Constant/Url'
import Axios from 'axios'
import AsyncStorage from '@react-native-community/async-storage';
import Store from '../Store'
import * as ActionType from "../Constants/ActionType";
import { Platform, BackHandler, Linking } from 'react-native';
import { handleApi } from '../../Services/utils';
import {

} from '../../Services/api';



// tăng lên 1 vé
export const _setNotiTicketIncr = () => {
  return Store.dispatch({
    type: ActionType.SET_BADGE_TICKET_INC,
    payload: null
  })
}

export const _login = (input) => {
  let { phoneNumber, password, setShowModal } = input
  console.log(`Login....`);
  
  return dispatch => {
    Axios.post(`${BASE_URL}/customers/login`, {
      phoneNumber, password
    })
      .then(res => {
        console.log({...res});
        console.log(`Login....`);
        if (res.data.error) {
          return alert('Sai thông tin đăng nhập')
        }
        const { infoUser, token, listProductOfOrderNotPay } = res.data.data
        AsyncStorage.setItem('token', token)
        Axios.defaults.headers.token = token;

        dispatch({
          type: ActionType.SAVE_INFO_USER,
          payload: { infoUser, listProductOfOrderNotPay }
        })
        setShowModal(true)
        // navigate("App")
        // console.log("da Luu redux");
      })

      .catch(err => {
        console.log(err.message);
      })
  }
}


export const _checkRefeshToken = async (navigate) => {
  console.log({ _checkRefeshToken_: `------` })
  let tokenSTR = await AsyncStorage.getItem('token')
  if (!tokenSTR) {
    return Axios.defaults.headers.token = null;
  }

  console.log({ tokenSTR })
  Axios.defaults.headers.token = tokenSTR;

  Axios({
    method: "GET",
    url: `${BASE_URL}/customers/refresh-token`
  })
    .then(res => {
      console.log(`dawawdawdwad`);

      console.log({ ...res });
      const { infoUser, listProductOfOrderNotPay } = res.data.data
      Store.dispatch({
        type: ActionType.SAVE_INFO_USER,
        payload: { infoUser, listProductOfOrderNotPay }
      })
    })
    .catch(err => {
      console.log(err.response.data);
    })


}

export const confirmPayOrder = (input) => {
  let { orderID } = input;
  console.log(orderID);

  return dispatch => {
    // Axios({
    //   method: "POST",
    //   url: `${BASE_URL}/orders/pay`,
    //   orderID
    // })
    Axios.post(`${BASE_URL}/orders/pay`, {
      orderID
    })
      .then(res => {
        console.log({ ...res });
        if (res.data.message == "pay_success") {
          dispatch({
            type: ActionType.PAY_ORDER_SUCCESS,
            payload: null
          })
        }
        // const { infoUser, listProductOfOrderNotPay } = res.data.data
        // Store.dispatch({
        //   type: ActionType.SAVE_INFO_USER,
        //   payload: { infoUser, listProductOfOrderNotPay }
        // })
      })
      .catch(err => {
        console.log(err.response.data);
      })
  }


}
