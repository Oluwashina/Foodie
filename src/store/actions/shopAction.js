import axios from 'axios'
import crypto from 'crypto'
import JSONbig from 'json-bigint'
axios.defaults.transformResponse =  [function (data) {
	// Do whatever you want to transform the data
	return JSONbig.parse(data);
}]
axios.defaults.headers.post['Content-Type'] = 'application/json';


export const shopDetails = () =>{
    return(dispatch, getState) =>{

        const appKey = "a1f951c65f8256e349573897517b71fa";
        // const appKey= "b23302d4a08f53d1bd5bcf333664997d";
        const storeId = "810179000";
        // const storeId = "810137674"
        const token = "67ab14bb6558603becbef9887bb8364a";
        // const token = "8a702142d013e6c93d64c604a3fb332e"
        const version = "1.0";
        const timestamp = Math.floor(Date.now() / 1000);

         function getSign(){
            const signtxt = "appKey" + appKey + "shopIdenty" + storeId + "timestamp" + timestamp + "version" + version + token
            let hash = crypto.createHash('sha256' , 'utf-8').update(signtxt).digest("hex");
            return hash;
            }
        // make call to server using fetch
        axios.post(`/shop/shopdetails?appKey=${appKey}&shopIdenty=${storeId}&version=1.0&timestamp=${timestamp}&sign=${getSign()}`)
        .then((res)=>{
                console.log(res)
                var result = res.data.result
                dispatch({type: 'SHOP_INFO', result})
            }).catch((err)=>{
                console.log(err)
            })
    }
}