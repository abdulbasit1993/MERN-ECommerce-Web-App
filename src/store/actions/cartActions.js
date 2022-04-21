import axios from "axios";
import { returnErrors } from "./errorActions";
import { GET_CART, ADD_TO_CART, DELETE_FROM_CART, CART_LOADING } from "./types";
import { API_URL } from "../../config/apiURL";

export const getCart = (id) => (dispatch) => {
  dispatch(setCartLoading());
  axios
    .get(`${API_URL}/api/cart/${id}`)
    .then((res) =>
      dispatch({
        type: GET_CART,
        payload: res.data,
      })
    )
    .catch((err) =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};

export const addtoCart = (id, productId, quantity) => (dispatch) => {
  axios
    .post(`${API_URL}/api/cart/${id}`, { productId, quantity })
    .then((res) =>
      dispatch({
        type: ADD_TO_CART,
        payload: res.data,
      })
    )
    .catch((err) =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};

export const deleteFromCart = (userId, itemId) => (dispatch) => {
  axios
    .delete(`${API_URL}/api/cart/${userId}/${itemId}`)
    .then((res) =>
      dispatch({
        type: DELETE_FROM_CART,
        payload: res.data,
      })
    )
    .catch((err) =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};

export const setCartLoading = () => {
  return {
    type: CART_LOADING,
  };
};
