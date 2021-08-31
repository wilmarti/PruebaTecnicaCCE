<template>

    <div>        
    <br/>        

<!-- Busquedas y conteos de productos dentro del carro de compras -->
    <b-row>
        <b-col md="3">
          <input type="text" width="100" placeholder="Buscar por nombre de producto" class="form-control" v-model="buscarId">
          
        </b-col>
        <b-col md="6">
            <th scope="col">Cantidad de productos en el carro:<h5 style="color:red ;text-align:center; width:100px margin:1">{{listar.length}}</h5></th>
        </b-col>
    </b-row>

    <br/>
    <!-- Tabla utilizada para mostrar los productos del carro de compras -->
    <b-row class="bg-dark"> 
        <b-col ><p class="text-light">ID</p></b-col>
        <b-col ><p class="text-light">DESCRIPCION_PRODUCTO</p></b-col>
        <b-col ><p class="text-light">CANTIDADES A COMPRAR</p></b-col>
        <b-col ><p class="text-light">VALOR UNIDAD</p></b-col>
        <b-col ><p class="text-light">VALOR TOTAL</p></b-col>
        <b-col ><p class="text-light"></p></b-col>
    </b-row>
    <b-row class="border" v-for="(item,index) of listar" :key='index' >
        <b-col >{{item.id}}</b-col>
        <b-col>{{item.ProductName}}</b-col>
        <b-col>{{item.cantidad}}</b-col>  
        <b-col>${{item.ValorUnidad}}</b-col>
        <b-col>${{item.ValorTotal}}</b-col>
        <b-col>
            <div >
                <!-- botones de accion de la grilla del carro de compras -->
            <button type="button" class="btn bg-danger text-white mr-3"  @click="Desinscribir(item.id,item.cantidad)">Sacar del carro</button>
            <button type="button" class="btn bg-success text-white mr-3" @click="GuardarCompra(item.id,item.cantidad,item.ValorUnidad,item.ValorTotal)" v-b-modal.modalEdicion >Comprar</button>
            </div>
        </b-col>
    </b-row>
    <br/> 



<!-- ventana emergente para compra de productos -->
    <div id="modal">
    <b-modal
      id="modalEdicion"
      ref="modal"
      title="Información necesaria para compra de productos"
      valor= pro.id
      @show="resetModal"
      @hidden="resetModal"
      @ok="handleOk"
    >
<!--   Nombre del producto:<h4 class="color=red">{{this.ProductName}}</h4><br/>
   Cantidad de Productos disponibles: <h4>{{this.stock}}</h4> -->

      <form ref="form" @submit.stop.prevent="handleSubmit">

       <!--  Campo nombre del cliente -->
        <b-form-group
          :state="nameState"
          label="Nombre del Cliente"
          label-for="name-input"
          invalid-feedback="Nombre es requerido"
        >
          <b-form-input
            id="name-input"
            v-model="Nombre"
            :state="nameState"
            required
          ></b-form-input>
        </b-form-group>

     

         <!--  Campo nombre mail del cliente -->
        <b-form-group
          :state="nameState"
          label="Email"
          label-for="mail-input"
          invalid-feedback="Email es requerido"
        >
          <b-form-input
            id="name-input"
            v-model="Email"
            :state="nameState"
            required
          ></b-form-input>
        </b-form-group>

        <b-form-group
          :state="nameState"
          label="Password"   
          label-for="pws-input"
          invalid-feedback="Password requerida"
        >
          <b-form-input
            id="name-input"
            v-model="Password"
            :state="nameState"
            required
          ></b-form-input>
        </b-form-group>

      </form> 
    </b-modal>
    </div>



</div>


</template>


<script>
import {mapState,mapMutations} from 'vuex'  
import jsPDF from 'jspdf' 
import html2canvas from "html2canvas"
import axios from 'axios'


export default {
    name: 'Tienda',
    data: function () {
        /* variables de estado */
        return {
        buscar: '',
        buscarId: '',
        selected: null,
        ListaProductosCarro: [],
        inscritos:[],
        Nombre:'',
        Email:'',
        Password:'',
        nameState: null,
        IpProd:null,
        CantArticulos:null,
        ValorUnidad:null,
        ValorTotal:'',
        submittedNames: [],
        }
    },

    /***************Se ejecuta cuando el componnete se monte */
    mounted(){
        console.log("montaje")
        this.getListaCarro();
        this.getParticipantescombo()
    },  

    /***************propiedades computadas */
    computed:{
        ...mapState(['participante','curso']),
        
            //Se fitran participantes que tienen diploma o que pasaron el curso
        listar: function() {
            console.log("hola wilson",this.inscritos)
               return this.inscritos.filter((item) =>  item.ProductName.includes(this.buscarId));       
        },
    },
    methods: {

    checkFormValidity() {
        const valid = this.$refs.form.checkValidity()
        this.valid = valid

        return valid
      },    

    resetModal() {
        this.Nombre = null
        this.Email = null
        this.Password = null

     }, 

      handleOk(bvModalEvt) {
      // se realiza la edicion del curso
      const NombreCliente = this.Nombre
      const EmailCliente = this.Email
      const PasswordCliente = this.Password
      const idproduct = this.IdProd
      const Cantidad = this.CantArticulos
      const VUnidad = this.ValorUnidad
      const VTotal = this.ValorTotal

      const CompraCliente = {NombreCliente,EmailCliente, PasswordCliente,idproduct,Cantidad,VUnidad,VTotal};

      console.log("CompraCliente:",CompraCliente)

        // Prevent modal from closing
        bvModalEvt.preventDefault()
        // Trigger submit handler
        this.handleSubmit()

        if (this.valid){ 

            //Llamado al API para realizar la insercion compras por cliente
             axios.post('http://localhost:3000/api/productos/CompraCliente', CompraCliente)
            .then(response => {
                
                 alert("Compra registrada con exito")
                 console.log("Registro correcto")
                this.getParticipantescombo();
            })
            .catch(error => {
                alert("El producto no pudo ser registrado como comprado")
                console.log('entro por el error:');
            });  

        }
      },


      //Metodo que evalua el envio de datos desde el formulario modal
      handleSubmit() {
        // Exit when the form isn't valid
        if (!this.checkFormValidity()) {
          return
        }
        // Push the name to submitted names
        this.submittedNames.push(this.name)
        // Hide the modal manually
        this.$nextTick(() => {
          this.$bvModal.hide('modalEdicion')
        })
      },   
      
      


        ...mapMutations(['prueba','filtro']),
         

        //metodo para des inscribir participantes
        Desinscribir(Id,Cantidad){

            const Operacion = "Sumar"
            const UnitsInStock = {Cantidad,Operacion}
            const strMensaje = 'Está seguro de sacar el producto del carro?'
            //var Curso = this.selected;

            if (confirm(strMensaje))
            {
                     axios.put(`http://localhost:3000/api/productos/${Id}`,{UnitsInStock}).then (response =>{
                     if(response.data.ok)
                        {
                                this.ErrorCantidad = 0  
                                      
                                const IdProducto = this.Id
                                const IdUsuario = 1
                                const Cantidad = UnitsInStock 

                                 const CarroProducto = {IdProducto,IdUsuario, Cantidad};
                                
                                //Llamado al API para realizar la insercion al carrito de compras
                                axios.delete(`http://localhost:3000/api/productos/${Id}`).then (response =>{

                                console.log(response);
                                if(response.data.ok)
                                {
                                alert("Registro eliminado con éxito");
                                    this.getParticipantescombo(); 
                                }else{
                                alert("Error al tratar de eliminar el registro");
                                } 
                                })
                                .catch (e => console.log(e)) 


                            //alert("Producto enviado al carrito");
                            this.getParticipantescombo();

                        
                        }else{
                        console.log("error edicion",response)
                        alert("Error al tratar de descontar el producto al carro");
                        } 
                        })
                        .catch (e => console.log("esta errado:",e)) 

                        this.getParticipantescombo();
            }
                
            else{
                return false;
            }
        },

        //Metodo utilizado para almacenar las compras realizadas por un de terminado cliente
        GuardarCompra(Id,Cantidad,ValorUnidad,ValorTotal){

            // este metodo stea los estados con los valores de la grilla
            this.IdProd = Id
            this.CantArticulos = Cantidad
            this.ValorUnidad = ValorUnidad
            this.ValorTotal = ValorTotal


            //console.log("Id:",Id,"Cantidad:",Cantidad,"ValorUnidad:",ValorUnidad,"ValorTotal:",ValorTotal)

        },






        /*************Methodo que llama la API para llenar array de cursos virtuales del CNB */
        getListaCarro(){
        axios.get('http://localhost:3000/api/productos/ListaCarro').then (response =>{
            this.ListaProductosCarro = response.data
            console.log(response.data)
        })
        .catch (e => console.log(e))
        },


        /*************Methodo que llama la API para llenar array de participante virtuales por curso */
        getParticipantescombo(){
        axios.get('http://localhost:3000/api/productos/ListaCarro').then (response =>{
            this.inscritos = response.data
        })
        .catch (e => console.log(e))
        },        


    },

}
</script>

<style scoped>

 #canvas{
    background: yellow; 
} 




</style>