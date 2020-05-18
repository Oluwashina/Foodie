const initState = {
    shopDetails: [],
    loading: false
}

const shopReducer = (state = initState, action) =>{
   switch(action.type){
    case 'Loading' : {
        return{
            ...state,
            loading: true
        }
    }
    case 'SHOP_INFO':
        return{
            ...state,
            shopDetails: action.result,
            loading: false
        }
    default:
        return state
   }
}

export default shopReducer;