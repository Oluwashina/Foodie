import axios from 'axios'
import crypto from 'crypto'
import JSONbig from 'json-bigint';
axios.defaults.transformResponse =  [function (data) {
	// Do whatever you want to transform the data
	return JSONbig.parse(data);
}]
axios.defaults.headers.post['Content-Type'] = 'application/json';





export const Menus = () =>{
    return (dispatch, getState) =>{

        const appKey = "02e6d1efd0421de9d49447106cbc90ec";
        // const appKey= "b23302d4a08f53d1bd5bcf333664997d";
        const storeId = "810137705";
        // const storeId = "810137674"
        const token = "80199e23e7cf5a346cf9d8ff67b61039";
        // const token = "8a702142d013e6c93d64c604a3fb332e"
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
            var result = res.data.result.filter(item=> item.level !== 1).sort((a, b) => (a.name > b.name) ? 1 : -1)
            dispatch({type: 'MENUS', result})    
        }).catch((err)=>{
            console.log(err)
        })
    }
}


export const DishList = (id) =>{
    return(dispatch, getState) =>{

        const appKey = "02e6d1efd0421de9d49447106cbc90ec";
        // const appKey= "b23302d4a08f53d1bd5bcf333664997d";
        const storeId = "810137705";
        // const storeId = "810137674"
        const token = "80199e23e7cf5a346cf9d8ff67b61039";
        // const token = "8a702142d013e6c93d64c604a3fb332e"
        const version = "1.0";
        const timestamp = Math.floor(Date.now() / 1000);
        dispatch({type: 'Loading'})

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
       
        const appKey = "02e6d1efd0421de9d49447106cbc90ec";
        // const appKey= "b23302d4a08f53d1bd5bcf333664997d";
        const storeId = "810137705";
        // const storeId = "810137674"
        const token = "80199e23e7cf5a346cf9d8ff67b61039";
        // const token = "8a702142d013e6c93d64c604a3fb332e"
        const version = "1.0";
        const timestamp = Math.floor(Date.now() / 1000);

        dispatch({type: 'Loading'})

         function getSign(){
            const signtxt = "appKey" + appKey + "shopIdenty" + storeId + "timestamp" + timestamp + "version" + version + token
            let hash = crypto.createHash('sha256' , 'utf-8').update(signtxt).digest("hex");
            return hash;
            }
        // make call to server using fetch
         let body  = {
            "shopIdenty": 810137705,
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

export const takeOrder = () =>{
    return(dispatch, getState) =>{

        dispatch({type: 'Loading'})

        const appKey = "02e6d1efd0421de9d49447106cbc90ec";
        // const appKey= "b23302d4a08f53d1bd5bcf333664997d";
        const storeId = "810137705";
        // const storeId = "810137674"
        const token = "80199e23e7cf5a346cf9d8ff67b61039";
        // const token = "8a702142d013e6c93d64c604a3fb332e"
        const version = "1.0";
        const timestamp = Math.floor(Date.now() / 1000);

        function getSign(){
            const signtxt = "appKey" + appKey + "shopIdenty" + storeId + "timestamp" + timestamp + "version" + version + token
            let hash = crypto.createHash('sha256' , 'utf-8').update(signtxt).digest("hex");
            return hash;
        }

        const products = getState().item.addedItems;
        var newProducts = products.map(product => ({ name: product.name, id: product.id, 
            tpId: product.tpId, type: product.type, quantity: product.quantity, price: product.price, packagePrice: product.packagePrice,
            packageQuantity: product.packageQuantity, totalFee: product.totalFee, remark: product.remark
         }));

        const total = getState().item.total * 100
        const createTime = Date.now()
        const tpOrderID = Math.floor(Math.random() * 100000000000);
        // make call to server
        let body = {
            "tpOrderId" : tpOrderID,
            "createTime": createTime,
            "remark" : "No cutlery",
            "peopleCount" : 1,
            "shop": {
                "shopIdenty": 810137705,
                "tpShopId": 810137705,
                "shopName": 810137705
            },
            "products": newProducts,
            "delivery": {
                "expectTime": 0,
                "deliveryParty": 2,
                "receiverName": "7974293473-2218",
                "receiverPhone": "2218",
                "coordinateType": 2,
                "longitude": 103.840955,
                "latitude": 1.370782
            },
            "payment": {
                "deliveryFee":0,
                "packageFee":0,
                "discountFee":0,
                "platformDiscountFee":0,
                "shopFee":total,
                "userFee":total,
                "shopDiscountFee": 0,
                "serviceFee":0,
                "subsidies":0,
                "totalFee": total,
                "payType":2
            }
        }

        axios.post(`/api/takeout/order/create?appKey=${appKey}&shopIdenty=${storeId}&version=1.0&timestamp=${timestamp}&sign=${getSign()}`, body)
        .then((res)=>{
            console.log(res.data)
            var result = res.data
            dispatch({type: 'OrderDetails', result})
        }).catch((err)=>{
            console.log(err)
            dispatch({type: 'OrderError'})
        })

    }
}


export const Rapyd = () =>{
    return(dispatch, getState)=>{
        const total = getState().item.total
        const body = {
            "country": "SG",
            "currency": "SGD",
            "amount": total,
            "payment_method_type_categories": [
              "cash",
              "bank_redirect",
              "bank_transfer",
              "card",
              "ewallet"
            ],
            "complete_checkout_url": "https://whispering-island-94241.herokuapp.com/success",
            "cancel_checkout_url": "https://whispering-island-94241.herokuapp.com/summary"
          }

        axios.post('https://vast-brook-06837.herokuapp.com/rapyd', body)
        .then((res)=>{
            console.log(res)
            var result = res.data
            dispatch({type: 'Rapyd', result})
        }).catch((err)=>{
            console.log(err)
        })

    }
}

export const PayNow = (id) =>{
    return(dispatch, getState) =>{
        const amount = getState().item.total

        const body = {
            "id" : id,
            "amount": amount * 100
        }

        axios.post('https://vast-brook-06837.herokuapp.com/paynow', body)
        .then((res)=>{
            console.log(res)
            var result = res.data
            dispatch({type: 'PAYNOW', result})
        }).catch((err)=>{
            console.log(err)
        })

    }
}

export const payUpdate = (data) =>{
    return(dispatch, getState)=>{
        dispatch({type: 'PAYNOW_UPDATE', data})
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

export const addToCart = (id,selectedOption,selectedChecked, specs) =>{
    return (dispatch, getState) =>{
        dispatch({type: 'ADD_TO_CART',id,selectedOption,selectedChecked,specs})
    }
}

export const removeCart = (id) =>{
    return (dispatch, getState) =>{
        dispatch({type: 'REMOVE_FROM_CART', id})
    }
}

// Check order details
export const orderList = () =>{
    return(dispatch, getState) =>{

        dispatch({type: 'Loading'})

        const appKey = "02e6d1efd0421de9d49447106cbc90ec";
        // const appKey= "b23302d4a08f53d1bd5bcf333664997d";
        const storeId = "810137705";
        // const storeId = "810137674"
        const token = "80199e23e7cf5a346cf9d8ff67b61039";
        // const token = "8a702142d013e6c93d64c604a3fb332e"
        const version = "1.0";
        const timestamp = Math.floor(Date.now() / 1000);

        function getSign(){
            const signtxt = "appKey" + appKey + "shopIdenty" + storeId + "timestamp" + timestamp + "version" + version + token
            let hash = crypto.createHash('sha256' , 'utf-8').update(signtxt).digest("hex");
            return hash;
        }

         // make call to server using axios
         let body  = {
            "shopIdenty": 810137705,
            "startTime" : Date.now() - 15 * 24 * 60 * 60 * 1000,
            "endTime" : Date.now(),
            "timeType" : 2
         };
        axios.post(`/api/data/order/export2?appKey=${appKey}&shopIdenty=${storeId}&version=1.0&timestamp=${timestamp}&sign=${getSign()}`, body)
        .then((res)=>{
            console.log(res.data)
            var orderId = res.data.result.items.map(item => (item.orderId))
            console.log(orderId)

            let body = {
                "shopIdenty": 810137705,
                "ids" : orderId 
            }

            axios.post(`/api/data/order/exportDetail?appKey=${appKey}&shopIdenty=${storeId}&version=1.0&timestamp=${timestamp}&sign=${getSign()}`, body)
            .then((res)=>{
                console.log(res.data)
                var result = res.data.result
                dispatch({type: 'orderHistory', result})
            }).catch((err)=>{
                console.log(err)
                dispatch({type: 'OrderError'})
            })
        }).catch((err)=>{
            console.log(err)
            dispatch({type: 'OrderError'})
        })

    }
}

// check order details by id
export const orderDetails = (orderId, itemId) =>{
    return(dispatch, getState)=>{
        dispatch({type: 'OrderById', orderId, itemId})
    }
}

// check order status
export const orderStatus = (orderId) =>{
    return(dispatch, getState)=>{

        dispatch({type: 'StatusLoader'})

        const appKey = "02e6d1efd0421de9d49447106cbc90ec";
        // const appKey= "b23302d4a08f53d1bd5bcf333664997d";
        const storeId = "810137705";
        // const storeId = "810137674"
        const token = "80199e23e7cf5a346cf9d8ff67b61039";
        // const token = "8a702142d013e6c93d64c604a3fb332e"
        const version = "1.0";
        const timestamp = Math.floor(Date.now() / 1000);

        function getSign(){
            const signtxt = "appKey" + appKey + "shopIdenty" + storeId + "timestamp" + timestamp + "version" + version + token
            let hash = crypto.createHash('sha256' , 'utf-8').update(signtxt).digest("hex");
            return hash;
        }

        // make request using axios to get status of order placed
        let body = {
            "shopIdenty": 810137705,
            "ids" : [orderId] 
        }

        axios.post(`/api/data/order/exportDetail?appKey=${appKey}&shopIdenty=${storeId}&version=1.0&timestamp=${timestamp}&sign=${getSign()}`, body)
        .then((res)=>{
            console.log(res.data)
            var result = res.data.result
            dispatch({type: 'orderStatus', result})
        }).catch((err)=>{
            console.log(err)
        })
    }
}