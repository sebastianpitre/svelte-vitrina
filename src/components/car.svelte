<!-- src/components/Modal.svelte -->
<script>
  import { isModalOpen } from "../stores/modalStore.js";
  import Carrito from "./carrito.svelte";
  import { vaciarCarrito } from '../stores/cart';

  // Función para cerrar el modal al hacer clic fuera del contenido
  function handleClickOutside(event) {
    if (event.target.classList.contains("modal")) {
      isModalOpen.set(false);
    }
  }
</script>

<div class="modal" class:open={$isModalOpen} on:click={handleClickOutside} role="dialog" aria-modal="true">
  <div class="modal-content">
    <div class="col">
      <span class="close position-absolute text-center text-gray" on:click={() => isModalOpen.set(false)}>&times;</span>
    </div>
    <p class="text-dark text-bold text-2xl">Carrito</p>
    <Carrito />
    <div class="barra bg-white">
      <div class="row text-center mt-4 mb-n2">
        <div class="col-6">
          <button class="btn btn-sm btn-danger" on:click={vaciarCarrito}>vaciar carrito</button>
        </div>
        <div class="col-6">
          <button class="btn btn-sm btn-success">Confirmar pedido</button>
        </div>
      </div>
    </div>
  </div>
</div>

<style>
  .modal {
    display: none;
    position: fixed;
    z-index: 9999;
    padding-top: 50px;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    overflow: auto;
    background-color: rgba(0, 0, 0, 0.5);
  }

  .modal.open {
    display: block;
  }

  .modal-content {
    background-color: #fefefe;
    margin: auto;
    padding: 20px;
    border: 1px solid #888;
    width: 85%;
  }

  .close {
    color: #aaa;
    font-size: 40px;
    font-weight: bold;
    width: 50px;
    top: -7px;
    right: 0px;
  }

  .close:hover,
  .close:focus {
    color: black;
    text-decoration: none;
    cursor: pointer;
  }
</style>
