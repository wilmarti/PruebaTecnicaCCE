import axios from "axios";
import Cookies from "js-cookie";

const ENDPOINT_PATH = "http://localhost:3000/api/productos/";

export default {
  setUserLogged(userLogged) {
    Cookies.set("userLogged", userLogged);
    },
  getUserLogged() {
    return Cookies.get("userLogged");
    },
  deleteUserLogged() {
    Cookies.remove('userLogged');
    },
  register(email, password) {
    const user = { email, password };
    return axios.post(ENDPOINT_PATH + "regiser", user);
  },


  login(identifier, password) {
    const user = {identifier, password};
    return axios.post(ENDPOINT_PATH + "Login" , user)
    .then(response => {
      // Handle success.
       
   /*    console.log(axios.post(ENDPOINT_PATH , user));
      console.log('User profile', response.data.user.CodigoHabilitacion);
      console.log('User token', response.data.jwt); 
      console.log('User res', response);  */
      
      return response;
    })
    .catch(error => {
      // Handle error.
      console.log('An error occurred:', error.response);
    });
  },


};