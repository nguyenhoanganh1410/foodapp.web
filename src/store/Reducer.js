import { SetOpenBar, SET_CART, SET_COUNT, SET_INCREASE, SET_ISSIGNEDIN, SET_OPENBAR, SET_SHOWDIALOG, SET_URL, SET_USER } from "./Actions";


//innite state
const initState = {
    //card
    totalProduct: 1,
    totalPrice: 0,
    cart: [],
    user:null,
    isSignedIn: false,
    showDialog: false,
    //url param call API
    url: 'best-foods',
    openBar: false
  
}

//depatch
const Reducer = (state, action) =>{
    switch(action.type){
        case SET_CART:
            return {
               ...state,
                totalProduct: action.payload.reduce( (sum,val) => {
                    return sum + val.amount
                }, 0),
                totalPrice: action.payload.reduce( (sum,val) => {
                    return +val.price*val.amount + sum
                }, 0),
                cart:action.payload
            }
        case SET_ISSIGNEDIN:
            return {
                ...state,
                isSignedIn: action.payload
            }
        case SET_SHOWDIALOG:
            return {
                ...state,
                showDialog: action.payload
            }
        case SET_URL:
            return {
                ...state,
                url: action.payload
            }
        case SET_USER:
             return {
                ...state,
                user: action.payload
            }
            case SET_OPENBAR:
             return {
                ...state,
                openBar: action.payload
            }
       

    }
        
    


}

export {initState}
export default Reducer