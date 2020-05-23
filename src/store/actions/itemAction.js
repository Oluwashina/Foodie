import axios from 'axios'
import crypto from 'crypto'
import JSONbig from 'json-bigint'
axios.defaults.transformResponse =  [function (data) {
	// Do whatever you want to transform the data
	return JSONbig.parse(data);
}]
axios.defaults.headers.post['Content-Type'] = 'application/json';



export const Menus = () =>{
    return (dispatch, getState) =>{

        const appKey = "b23302d4a08f53d1bd5bcf333664997d";
        const storeId = "810137674";
        const token = "8a702142d013e6c93d64c604a3fb332e";
        const version = "1.0";
        const timestamp = Math.floor(Date.now() / 1000);

         function getSign(){
            const signtxt = "appKey" + appKey + "shopIdenty" + storeId + "timestamp" + timestamp + "version" + version + token
            let hash = crypto.createHash('sha256' , 'utf-8').update(signtxt).digest("hex");
            return hash;
            }
        // make call to server using fetch
        axios.post(`/api/cater/dish/categoryAll?appKey=${appKey}&shopIdenty=${storeId}&version=1.0&timestamp=${timestamp}&sign=${getSign()}`,{
        transformResponse: data => JSONbig.parse(data),
        }).then((res)=>{
            console.log(res)
            var result = res.data.result
            dispatch({type: 'MENUS', result})
            
        }).catch((err)=>{
            console.log(err)
        })
    }
}


export const DishList = (id) =>{
    return(dispatch, getState) =>{

        dispatch({type: 'Loading'})

        const appKey = "b23302d4a08f53d1bd5bcf333664997d";
        const storeId = "810137674";
        const token = "8a702142d013e6c93d64c604a3fb332e";
        const version = "1.0";
        const timestamp = Math.floor(Date.now() / 1000);

         function getSign(){
            const signtxt = "appKey" + appKey + "shopIdenty" + storeId + "timestamp" + timestamp + "version" + version + token
            let hash = crypto.createHash('sha256' , 'utf-8').update(signtxt).digest("hex");
            return hash;
            }
        // make call to server using fetch
         let body  = {
               "dishTypeId": id
            };
        axios.post(`/api/cater/dish/dishNew?appKey=${appKey}&shopIdenty=${storeId}&version=1.0&timestamp=${timestamp}&sign=${getSign()}`, body)
        .then((res)=>{
            console.log(res.data)
            var dishes = res.data.result.dishList
            dispatch({type: 'DISH_LIST', dishes})
        }).catch((err)=>{
            console.log(err)
        })
    }
} 

export const dishMenuById = (dishId, id) =>{
    return(dispatch) =>{

        dispatch({type: 'Loading'})

        const appKey = "b23302d4a08f53d1bd5bcf333664997d";
        const storeId = "810137674";
        const token = "8a702142d013e6c93d64c604a3fb332e";
        const version = "1.0";
        const timestamp = Math.floor(Date.now() / 1000);

         function getSign(){
            const signtxt = "appKey" + appKey + "shopIdenty" + storeId + "timestamp" + timestamp + "version" + version + token
            let hash = crypto.createHash('sha256' , 'utf-8').update(signtxt).digest("hex");
            return hash;
            }
        // make call to server using fetch
         let body  = {
            "shopIdenty": 810137674,
            "ids":[dishId, id]
            };
        axios.post(`/api/cater/dish/dishMenuByIds?appKey=${appKey}&shopIdenty=${storeId}&version=1.0&timestamp=${timestamp}&sign=${getSign()}`, body)
        .then((res)=>{
            console.log(res.data)
            var result = res.data.result
            dispatch({type: 'dishMenuById', result})
        }).catch((err)=>{
            console.log(err)
        })
    }
}

export const Increment = () =>{
    return(dispatch, getState) =>{
        dispatch({type: 'INCREMENT'})
        dispatch({type: 'MULTIPLYPRICE'})
    }
}


export const Decrement = () =>{
    return(dispatch, getState) =>{
        dispatch({type: 'DECREMENT'})
        dispatch({type: 'DIVIDEPRICE'})
    }
}

export const ingredientSum = (id) =>{
    return(dispatch) =>{
        dispatch({type: 'INGREDIENT_SUM', id})
    }
}

export const ingredientDeduct = (id) =>{
    return(dispatch) =>{
        dispatch({type: 'INGREDIENT_DEDUCT', id})
    }
}

export const Menu = () =>{
    return(dispatch) =>{
        dispatch({type: 'MENU'})
    }
}

export const backToMenu = (id) =>{
    return(dispatch) =>{
        dispatch({type: 'BACK_TO_MENU', id})
    }
}

export const addToCart = (id,selectedOption,selectedChecked) =>{
    return (dispatch, getState) =>{
        dispatch({type: 'ADD_TO_CART',id,selectedOption,selectedChecked})
    }
}

export const removeCart = (id) =>{
    return (dispatch, getState) =>{
        dispatch({type: 'REMOVE_FROM_CART', id})
    }
}