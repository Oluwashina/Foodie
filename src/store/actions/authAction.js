import axios from 'axios'
import crypto from 'crypto'
import JSONbig from 'json-bigint'
axios.defaults.transformResponse =  [function (data) {
	// Do whatever you want to transform the data
	return JSONbig.parse(data);
}]
axios.defaults.headers.post['Content-Type'] = 'application/json';


export const signIn = (credentials, appVerifier) =>{
    return (dispatch, getState, {getFirebase}) =>{
        dispatch({type: 'SIGNIN_LOADER'})
        //make async call to firebase
        const firebase = getFirebase();

        firebase.auth().signInWithPhoneNumber(
                    credentials.phone,
                    appVerifier
                ).then((confirmationResult) =>{
                    console.log(confirmationResult)
                 dispatch({ type: 'OTP_SUCCESS', confirmationResult})
                }).catch((err) =>{
                    console.log(err)
                    dispatch({type: 'OTP_ERROR', err})
                });
       
    }
}

export const validateOtp = (otp) => {
    return (dispatch, getState, {getFirebase}) =>{
        dispatch({type: 'SIGNIN_LOADER'})
        
        var confirmationResult = getState().auth.otpid
        console.log(confirmationResult)
        const phone = otp.phone

        confirmationResult.confirm(phone).then(function (result) {
            console.log(result)
            // User signed in successfully.
            var user = result.user;
            dispatch({type: 'VALID_OTP'}, user)   
            // ...
          }).catch(function (error) {
              dispatch({type: 'INVALID_OTP'}, error)
            // User couldn't sign in (bad verification code?)
            // ...
          });
    }
}

export const signOut = () =>{
    return (dispatch, getState, {getFirebase}) =>{
        const firebase = getFirebase();
        firebase.auth().signOut().then(() =>{
            dispatch({type: 'SIGNOUT_SUCCESS'})
        });
    }
}

export const errorRemove = () =>{
    return (dispatch, getState) =>{
        dispatch({type: 'ERROR_REMOVE'})
    }
}

// using Keruyun Login Api
export const login = (phone) =>{
    return(dispatch, getState)=>{
        dispatch({type: 'SIGNIN_LOADER'})

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
        let body = {
            "loginId": phone,
            "loginType":0
        }

        axios.post(`/crm/login?appKey=${appKey}&shopIdenty=${storeId}&version=1.0&timestamp=${timestamp}&sign=${getSign()}`, body)
        .then((res)=>{
            console.log(res.data)
        }).catch((err)=>{
            console.log(err)
        })

    }
}