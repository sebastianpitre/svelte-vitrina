<script>

</script>
  <!-- modal -->
  <div id="cartModal2" class="modal">
    <div class="modal-content">
      <span class="close" id="closeBtn">&times;</span>
      
      
    </div>
  </div>

  <div id="modal2" class="modal">
    <div class="modal-content">
      <span class="close" id="closeModal2">&times;</span>
      <h4 class="text-success text-center text-edo">modal 2</h4>


      <div class="row text-center mb-n3 mt-3">
        <div class="col-6">
        </div>
        <div class="col-6">
          <button id="openModal2" class="btn btn-sm btn-success">Confirmar pedido</button>
        </div>
      </div>
    </div>
    <script>
      // Función para abrir el Modal 1
      document.getElementById('openModal2').onclick = function() {
          document.getElementById('modal2').style.display = 'block';
      };
  
      // Función para cerrar el Modal 1
      document.getElementById('closeModal2').onclick = function() {
          document.getElementById('modal2').style.display = 'none';
      };
  
      // Cerrar los modales si el usuario hace clic fuera de ellos
      window.onclick = function(event) {
          if (event.target == document.getElementById('modal2')) {
              document.getElementById('modal2').style.display = 'none';
          }
      };
  
  
    </script>
  </div>

  <style>
    /* Estilo para el modal */
    .modal {
      display: none;
      position: fixed;
      z-index: 9999;
      padding-top: 100px;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      overflow: auto;
      background-color: rgba(0, 0, 0, 0.5);
    }

    /* Estilo para el contenido del modal */
    .modal-content {
      background-color: #fefefe;
      margin: auto;
      padding: 20px;
      border: 1px solid #888;
      width: 80%;
      max-width: 600px;
    }

    /* Botón para cerrar el modal */
    .close {
      color: #aaa;
      float: right;
      font-size: 28px;
      font-weight: bold;
    }

    .close:hover,
    .close:focus {
      color: black;
      text-decoration: none;
      cursor: pointer;
    }
  </style>

  