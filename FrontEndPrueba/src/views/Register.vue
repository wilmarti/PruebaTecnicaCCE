<template>
  <div class="register">
    <h1 class="title">Registrese</h1>
    <form action class="form" @submit.prevent="register">

    <p v-if="EstaelCodigo == 0">
    <b-alert show variant="danger">El código de entidad suministrado no es valido en REPS.</b-alert>
    <ul>
    <li v-for="error in errors" :key="error">{{ error }}</li>
    </ul>
    </p>
      
      <label class="form-label" for="#username">Nombre de Usuario:</label>
      <input
        v-model="username"
        class="form-input"
        type="text"
        id="username"
        required
        placeholder="UserName"
      >
      <label class="form-label" for="#email">Email:</label>
      <input
        v-model="email"
        class="form-input"
        type="email"
        id="email"
        required
        placeholder="Email"
      >
      <label class="form-label" for="#password">Password:</label>
      <input
        v-model="password"
        class="form-input"
        type="password"
        id="password"
        required
        placeholder="Password"
      >
      <!--  <label class="form-label" for="#codigo-habilitacion">Codigo Entidad:</label>
     <input
        v-model="CodigoHabilitacion"
        class="form-input"
        type="text"
        id="codigo-habilitacion"
        required
        placeholder="CodigoHabilitacion"
      > -->
      <input class="form-submit" type="submit" value="Sign Up">
    </form>
  </div>
</template>



<script>
import auth from "@/auth";
//import Habilitacion from "../Data/CodigoEntidad.js";
import axios from "axios";

export default {
  data: () => ({
    email: "",
    password: "",
    CodigoHabilitacion: "",
    username:"",
    error: false,
    //CodHabilitacion:Habilitacion,
    CodHabilitacion:null,
    errors: [],
    EstaelCodigo: null,
    ExisteCodigo: null
  }),
  methods: {
    async register() {

       
             const username = this.username
             const email = this.email
             const password = this.password
        
                const user = {username,email, password};
                axios.post('http://localhost:3000/api/productos', user)
                .then(response => {
                  console.log('entro por el ok');
                  console.log("Registro correcto")
                  alert("Usuario registrado con exito, por favor digite sus credenciales para poder ingresar.")
                  this.$router.push("/")
                })
                .catch(error => {
                  // Handle error.  
                  alert("El usuario NO pudo ser registrado, El Email ó Usuario ingresado ya existe en la base de datos.")
                  console.log('entro por el error:');
                }); 



    },
  },

  

};
</script>


<style  scoped>

.register {
  padding: 2rem;
}
.title {
  text-align: center;
}
.form {
  margin: 3rem auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 20%;
  min-width: 350px;
  max-width: 100%;
  background: rgba(19, 35, 47, 0.9);
  border-radius: 5px;
  padding: 40px;
  box-shadow: 0 4px 10px 4px rgba(0, 0, 0, 0.3);
}
.form-label {
  margin-top: 2rem;
  color: white;
  margin-bottom: 0.5rem;
/*   &:first-of-type {
    margin-top: 0rem;
  } */
}
.form-input {
  padding: 10px 15px;
  background: none;
  background-image: none;
  border: 1px solid white;
  color: white;
/*   &:focus {
    outline: 0;
    border-color: #1ab188;
  } */
}
.form-submit {
  background: #1ab188;
  border: none;
  color: white;
  margin-top: 3rem;
  padding: 1rem 0;
  cursor: pointer;
  transition: background 0.2s;
/*   &:hover {
    background: #0b9185;
  } */
}
.error {
  margin: 1rem 0 0;
  color: #ff4a96;
}
</style>