<template>

<!--   <div v-if="userLogged" class="mt-5">
     <h5 style="color:#08088A">BIENVENIDO A SU CARRO DE COMPRAS</h5>
    <Certificadocom/>       
  </div>

  <div v-else>
    <br/>
      <login/>
  </div>  -->

    <div  class="mt-5">
     <h5 style="color:#08088A">BIENVENIDO A SU CARRO DE COMPRAS</h5>
    <Tienda/>       
  </div>

 


</template>





<script>

import Tienda from "@/components/Tienda.vue";
import login from '@/views/Login.vue'
import auth from "@/auth";

export default {
    name: 'Producto',
    components:{
        Tienda,
        login
    },
   views:{
      login
    },
      computed: {
    userLogged() {
      return auth.getUserLogged();
    }
  },
    data(){
            return {
                    participante:[
                        { nombre:'JOHN WILSON MARTINEZ GUTIERREZ', nota:'5' , curso: '1', tipoid:'CC', nuroid:'79908341' },
                        { nombre:'Kenneth Martinez', nota:'4' , curso: '1', tipoid:'CC', nuroid:'79908342' },
                        { nombre:'Kiara Martinez', nota:'5' , curso: '2', tipoid:'CC', nuroid:'79908343' },
                        { nombre:'Jose Martinez', nota:'1' , curso: '1', tipoid:'CC', nuroid:'79908344' },
                        { nombre:'Carlos Martinez', nota:'2' , curso: '2', tipoid:'CC', nuroid:'79908345' }
                        ]
                    }

           },
    methods:{
        home(){
            this.$router.push('/home')
        }
    }
        
}
</script>