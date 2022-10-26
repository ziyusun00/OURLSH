import axios from 'axios';
import {baseEndpoint} from '../urls/API';

export const checkAccount = (email,password) =>new Promise((resolve, reject) =>{
    axios.post(baseEndpoint+'/session',{email:email, password:password})
            .then(function(response){
                if(response.status===201){
                    window.alert("Successfully log in!!");
                    localStorage.setItem('token',response.data);
                    // window.location.href="./studentHome";
                }
                else{
                    window.alert("Logged with error");
                }
            })
            .catch(function(error){
                if(error.response.status===401){
                    window.alert("Unmatched username & password");
                }
                else{
                    window.alert(error);
                }
        });
});