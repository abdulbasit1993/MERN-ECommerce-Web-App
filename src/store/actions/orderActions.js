import axios from "axios";
import { returnErrors } from "./errorActions";
import { GET_ORDERS, CHECKOUT, ORDERS_LOADING } from "./types";
import { API_URL } from "../../config/apiURL";

export const getOrders = (id) => (dispatch) => {
  dispatch(setOrdersLoading());
  axios
    .get(`${API_URL}/api/order/${id}`)
    .then((res) =>
      dispatch({
        type: GET_ORDERS,
        payload: res.data,
      })
    )
    .catch((err) =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};

export const checkout = (id, source) => (dispatch) => {
  axios
    .post(`${API_URL}/api/order/${id}`, { source })
    .then((res) =>
      dispatch({
        type: CHECKOUT,
        payload: res.data,
      })
    )
    .catch((err) =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};

export const setOrdersLoading = () => {
  return {
    type: ORDERS_LOADING,
  };
};
