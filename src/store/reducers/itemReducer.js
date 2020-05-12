const initState = {
    category: [],
    dishlist: [],
    count: 1,
    price : 2.80,
    pricesum: 2.80,
    addedItems: [],
    total: 0
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
        case 'ADD_TO_CART' :
            let addedItem = state.dishlist.find(dish=> dish.id === action.id)
             //check if the action id exists in the addedItems
             console.log(action.id)
         let existed_item= state.addedItems.find(item=> item.id === action.id)
         console.log(existed_item)
         if(existed_item)
         {
            addedItem.quantity += 1 
             return{
                ...state,
                 total: state.total + addedItem.marketPrice
                  }
        }
         else{
            addedItem.quantity = 1;
            //calculating the total
            let newTotal = state.total + addedItem.marketPrice
            
            return{
                ...state,
                addedItems: [...state.addedItems, addedItem],
                total : newTotal
            }
        } 
        default:
            return state
    }
}


export default itemReducer;