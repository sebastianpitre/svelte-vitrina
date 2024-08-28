<script>
  import Swal from "sweetalert2";
  export let producto;
    let noDisponible = producto.activo === false;
    let fotoNoDisponible = producto.urlImagen === "";

    import { onMount } from "svelte";

    // carrito

    import { getContext } from 'svelte';
    import { cart, incrementQuantity, decrementQuantity } from '../stores/cart';

    export let addToCart; // Propiedad para recibir la función addToCart desde Home.svelte

    let isInCart = false;
    let itemQuantity = 0;

    // Suscripción a la tienda del carrito para reactividad
    $: {
      const cartItems = $cart;
      const item = cartItems.find(item => item.id === producto.id);
      isInCart = !!item;
      itemQuantity = item ? item.quantity : 0;
    }

    // Verificar si el producto está en el carrito al montar el componente
    onMount(() => {
      const cartItems = $cart;
      const item = cartItems.find(item => item.id === producto.id);
      isInCart = !!item;
      itemQuantity = item ? item.quantity : 0;
    });

    // Función para agregar al carrito usando la función addToCart de Home.svelte
    function handleAddToCart() {
      addToCart(producto);
    }

    // alerta de ver producto

    const mostrarAlertaVisibilidad = () => {
        // Mostrar alerta de SweetAlert
        Swal.fire({
            html: `
              <div class="row mt-4">

                <div class="col-12 col-lg-12 col-xl-5 col-xxl-5 ">
                  <img src="${producto.urlImagen}" width="100%" height="180vh" alt="imagen" class="shadow border-radius-2xl img" >
                </div>

                <div class="col-12 text-start col-lg-12 col-xl-7 col-xxl-7">
                  <h5>${producto.nombre}</h5> 
                  <p>${producto.descripcion}</p>
                  <p>Este producto es vendido, facturado y entregado por SENA - CBC</p>
                  <p class="text-success">$ ${producto.precio}</p>
                  <div class="row text-center mt-2">
                  
                  </div>
                </div>
            `,
            confirmButtonText: 'Cerrar',
            showCloseButton: true,
            showConfirmButton: false,
        });
    }
  </script>
  
  <div class="card bg-gray {noDisponible ? 'bg-gray-200 ' : ''} position-relative">
    
    {#if producto.promocion === true && producto.activo === true}
        <span class="bg-warning col-8 col-sm-6 text-white text-center position-absolute" style="z-index: 3; border-radius: 10px 0px 20px 0px;">
           {producto.descuento}% desct.º
        </span>
    {/if}

    {#if producto.activo === false}
        <span class="bg-gray-600 col-7 col-sm-6 text-white text-center position-absolute" style="z-index: 3; border-radius: 10px 0px 20px 0px;">
        Agotado
        </span>
    {/if}

    
    <div class="card-header p-0 position-relative z-index-2" style="border-radius: 0.75rem 0.75rem 0px 0px">
      <div class="d-block blur-shadow-image cursor-pointer img-marco" >
        <img src="{fotoNoDisponible ? '/img/logo.png' : producto.urlImagen}" width="100%" height="160vh" alt="producto" class="shadow img-size {producto.promocion ? 'img-oferta' : 'img'} {producto.activo ? '' : 'img-no-activo'}" style="border-radius: 0.75rem 0.75rem 0px 0px" on:click={mostrarAlertaVisibilidad}>
      </div>
      {#if producto.promocion === true && producto.activo === true}
        <div class="blur opacity-9 col-8 col-sm-6 text-dark text-center position-absolute" style="z-index: 3; border-radius: 7px 0px 0px 0px; bottom: 1px; right: 1px; height: 20px; font-size: 15px;">
          <span class="material-symbols-outlined" style="font-size: 15px;">schedule</span> 2 dias 13h
        </div>
      {/if}
      
      <div class="colored-shadow" style="background-image: url(&quot;{producto.urlImagen}&quot;);"></div>
    </div>
    <div class="px-2 py-0">
      <p class="text-dark text-center text-capitalize mt-1 mb-0">{producto.nombre}</p>

      {#if producto.promocion === true && producto.activo === true} 
        <div class="text-warning text-center border-bottom border-gray mt-1 mb-0">
          <del class="text-underline text-start text-dark opacity-9 " style="font-size: 12px;left: 14px;" >$ {producto.precio}</del>
          ${producto.precio-producto.precio*producto.descuento/100} 
          <span class="text-dark text-sm">{producto.unidadProducto}</span>
        </div>
        {:else}
        <p class="text-success text-center border-bottom border-gray mt-1 mb-0">$ {producto.precio} <span class="text-dark text-sm">{producto.unidadProducto}</span></p>
      {/if}
  
      <div class="row text-center mt-2">
  
        <div class="col-md-10 col-12 mx-auto">

          {#if producto.activo === true}

            {#if isInCart}
              <div>
                <button class="btn col btn-sm border border-dark" on:click={() => decrementQuantity(producto.id)}>-</button>
                <span class="col p-1 btn disabled text-dark">{itemQuantity} {producto.unidadProducto}</span>
                <button class="btn col btn-sm border border-success text-success" on:click={() => incrementQuantity(producto.id)}>+</button>
              </div>
            {/if}
            {#if !isInCart}
              <button class="btn col-12 btn-sm btn-success" on:click={handleAddToCart}>Agregar </button>
            {/if}

            {:else} <button class="btn col-12 btn-sm bg-info text-white disabled">No disponible</button>
          {/if}

          
        </div>
      </div>
    </div>
  </div>
  
  <style>
    @media (max-width: 768px) {
      .img-size {
        height: 140px;
      }
      .img-marco{
        height: 140px;
      }
    }

    .img, .img-oferta {
      transition: transform 0.3s ease, background-color 0.3s ease;
      cursor: pointer;
    }

    /* Efecto hover */
    .img:hover {
      border: 2px solid white;
      border-bottom: 1px solid white;
      
    }
    .img-oferta:hover {
      border: 2px solid #fff;
      border-bottom: 1px solid #ffff;
    }

    .img-no-activo:hover{
      border: 2px solid #ffff;
      border-bottom: 1px solid #ffff;

    }
  
  </style>
  