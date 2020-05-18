const initState = {
    shopDetails: [],
}

const shopReducer = (state = initState, action) =>{
   switch(action.type){
    case 'SHOP_INFO':
        return{
            ...state,
            shopDetails: action.result,
        }
    default:
        return state
   }
}

export default shopReducer;