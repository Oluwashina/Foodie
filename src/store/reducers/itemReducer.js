const initState = {
    category: [],
    dishlist: [],
    count: 1,
    price : 2.80,
    pricesum: 2.80
}

const itemReducer = (state = initState, action) =>{
    switch(action.type){
        case 'MENUS' :
            return {
                ...state,
                category: action.result
            }
        case 'DISH_LIST' :
            return{
                ...state,
                dishlist: action.dishes
            }
        case 'INCREMENT' :
            return{
                ...state,
                count: state.count + 1
            }
        case 'MULTIPLYPRICE' :
            return{
                ...state,
                pricesum: state.price * state.count
            }
        case 'DECREMENT' :
            return{
                ...state,
                count: state.count - 1
                }
        case 'DIVIDEPRICE' :
          return{
                ...state,
                pricesum: state.price * state.count
            }
        default:
            return state
    }
}


export default itemReducer;