const initState = {
    dishattr: [],
    loading: false,
    category: [],
    dishlist: [],
    dishMenuById: [],
    ingredients: [],
    packFee: 0,
    count: 1,
    price : 0,
    ingredientPrice: 0,
    pricesum: 0,
    addedItems: [],
    total: 0,
    categoryId: ''
}

const itemReducer = (state = initState, action) =>{
    switch(action.type){
        case 'Loading' :
            return{
                ...state,
                loading: true
            }
        case 'MENUS' :
            return {
                ...state,
                category: action.result
            }
        case 'DISH_LIST' :
            return{
                ...state,
                dishlist: action.dishes,
                loading: false
            }
        case 'dishMenuById' :
            return{
                ...state,
                dishMenuById: action.result,
                count: 1,
                ingredientPrice: 0,
                price: action.result[0].price/100,
                pricesum: action.result[0].price/100,
                dishattr: action.result[0].attrs,
                ingredients: action.result[0].supplyCondiments,
                loading: false
            }
        case 'MENU' :
            return{
                ...state,
                categoryId: ""
            }
        case 'BACK_TO_MENU' :
            return{
                ...state,
                categoryId : action.id
            }
        case 'INCREMENT' :
            return{
                ...state,
                count: state.count + 1
            }
        case 'MULTIPLYPRICE' :
            return{
                ...state,
                pricesum: state.price * state.count + state.ingredientPrice
            }
        case 'DECREMENT' :
            return{
                ...state,
                count: state.count - 1
                }
        case 'DIVIDEPRICE' :
          return{
                ...state,
                pricesum: state.price * state.count + state.ingredientPrice
            }
        case 'INGREDIENT_SUM':
            let ingredient = state.ingredients.find(ing => ing.id.toString() === action.id.toString())
            let ingredientPrice = ingredient.marketPrice / 100
            return{
                ...state,
                ingredientPrice: state.ingredientPrice + ingredientPrice,
                pricesum: state.pricesum + ingredientPrice
            }
        case 'INGREDIENT_DEDUCT':
            let ingredientDeduct = state.ingredients.find(ing => ing.id.toString() === action.id.toString())
            console.log(ingredientDeduct)
            let ingredientDeductPrice = ingredientDeduct.marketPrice / 100
            return{
                ...state,
                ingredientPrice: state.ingredientPrice - ingredientDeductPrice,
                pricesum: state.pricesum - ingredientDeductPrice
            }
        case 'ADD_TO_CART' :
            let addedItem = state.dishlist.find(dish=> dish.id.toString() === action.id.toString())
             //check if the action id exists in the addedItems
            addedItem.quantity = state.count;
            addedItem.ingredientPrice = state.ingredientPrice
            addedItem.selectedToppings = action.selectedOption
            addedItem.selectedChecked = action.selectedChecked
            // get packaging fees
            const fees = addedItem.boxQty * 10 * 0.01
            //calculating the total
            let newTotal = state.total + state.pricesum + fees   
            // need to write a logic for the same item being added again so for easy filtering when removing from cart    
            return{
                ...state,
                addedItems: [...state.addedItems, addedItem],
                total : parseFloat(newTotal.toFixed(2)),
                packFee : state.packFee + fees
            }
        case 'REMOVE_FROM_CART' :
            let removedItem = state.addedItems.filter(item=> item.id.toString() !== action.id.toString())
            let addedValue = state.addedItems.find(dish=> dish.id.toString() === action.id.toString())
            let removedFees = addedValue.boxQty * 10 * 0.01
            let totalcalc = addedValue.marketPrice * addedValue.quantity + addedValue.ingredientPrice + removedFees
            let removedTotal = state.total - totalcalc 
            return{
                ...state,
                addedItems : removedItem,
                total: parseFloat(removedTotal.toFixed(2)),
                packFee: state.packFee - removedFees
            } 
        default:
            return state
    }
}


export default itemReducer;