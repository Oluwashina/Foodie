const initState = {
    category: [],
    dishlist: [],
    count: 1,
    price : 0,
    pricesum: 0,
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
        case 'PRICE' :
            let itemDetails = state.dishlist.find(dish=> dish.id.toString() === action.id.toString())
            return{
                ...state,
                count: 1,
                price : itemDetails.marketPrice,
                pricesum: itemDetails.marketPrice,
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
            let addedItem = state.dishlist.find(dish=> dish.id.toString() === action.id.toString())
             //check if the action id exists in the addedItems
            addedItem.quantity = state.count;
            addedItem.selectedToppings = action.selectedOption
            //calculating the total
            let newTotal = state.total + state.pricesum          
            return{
                ...state,
                addedItems: [...state.addedItems, addedItem],
                total : newTotal
            }
        case 'REMOVE_FROM_CART' :
            let removedItem = state.addedItems.filter(item=> item.id.toString() !== action.id.toString())
            let addedValue = state.addedItems.find(dish=> dish.id.toString() === action.id.toString())
            let totalcalc = addedValue.marketPrice * addedValue.quantity
            let removedTotal = state.total - totalcalc 
            return{
                ...state,
                addedItems : removedItem,
                total: removedTotal
            } 
        default:
            return state
    }
}


export default itemReducer;