<template>
  <div class="home">
    <!-- <img alt="Vue logo" src="../assets/logo.png"> -->
  
  <div  class="mt-5">
        <h3>Sesión Cerrada </h3>
       {{confirmation()}}
        <!-- <b-button size="sm" variant="success" class="bg-success text-white" @click="userLogged" >Cerrar Sesion</b-button> -->
       <!--  <login msg="SESSION CERRADA"/> -->
        <!-- <login v-if="userLogged" msg="SESSION CERRADA"/> -->
  </div>

<!--   <div v-else>
      cerrada
  </div> -->


    
  </div>
</template>

<script>
// @ is an alias to /src
import login from '@/views/Login.vue'
import auth from "@/auth";

export default {
  name: 'Cerrar',
   views: {
    login
  }, 
  data(){
      return {
          mensaje:''
      }
  },

  methods:{
         fnConfirmarEliminar(strMensaje) {
            if (confirm(strMensaje)){
                this.userLogged();
                return true;
            }
            else{
                return false;
            }
        },
  //computed: {
    userLogged() {
      console.log("Llego a cerrar")
      return auth.deleteUserLogged();
    },
    confirmation(){
        return this.fnConfirmarEliminar ('¿ Está seguro de cerrar la sesion ?');
    },
  //},
  }
}
</script>
