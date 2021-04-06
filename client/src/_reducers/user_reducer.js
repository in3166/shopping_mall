import {
    LOGIN_USER,
    REGISTER_USER,
    AUTH_USER,
    LOGOUT_USER,
    ADD_TO_CART,
    GET_CART_ITEMS,
    REMOVE_CART_ITEM
} from '../_actions/types';


export default function (state = {}, action) {
    switch (action.type) {
        case REGISTER_USER:
            return { ...state, register: action.payload }
        case LOGIN_USER:
            return { ...state, loginSucces: action.payload }
        case AUTH_USER:
            return { ...state, userData: action.payload }
        case LOGOUT_USER:
            return { ...state }
        case ADD_TO_CART:
            return {
                ...state, userData: {
                    ...state.userData,
                    cart: action.payload // 서버에서 res 보낸 userInfo.cart 정보 
                }
            } // 저장소에 이전의 모든 state을 넣어주고 원래 userData도 넣고 cart 넣음
        case GET_CART_ITEMS:
            return { ...state, cartDetail: action.payload } // cartDetail state를 만들어서 넣어줌, 
        case REMOVE_CART_ITEM:
            return {
                ...state, cartDetail: action.payload.productInfo,
                userData: {
                    ...state.userData, cart: action.payload.cart
                }
            } // cartDetail state를 만들어서 넣어줌, 
        default:
            return state;
    }
}