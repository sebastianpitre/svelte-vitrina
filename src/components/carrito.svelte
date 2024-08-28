<script>
    import { cart, incrementQuantity, decrementQuantity } from '../stores/cart';
    import { onMount } from 'svelte';
  
    let cartItems = [];
    cart.subscribe(value => {
      cartItems = value;
    });
  </script>
  
  <div class="cart">
    {#if cartItems.length === 0}
    <div class="text-center my-5">
      <img class="opacity-4" src="./img/carrito-vacio.png" alt="No products available" style="width: 200px; height: auto;">
      <h4 class="text-muted mt-3">El carrito está vacio</h4>
    </div>
    {/if}
    <div class="row justify-content-center">
      {#each cartItems as item (item.id)}
      <div class="col-12 col-sm-6 p-2">
        <div class="card border mx-0 px-3 py-2">
          <div class="row">

            <div class="col-12 col-md-auto text-center my-auto">
              <img src="{item.urlImagen}" alt="" width="150px" height="120px" class="border-radius-lg icon-md-xl">
            </div>

            <div class="col">

              <div class="row">

                <div class="col-12">
                  <div class="row my-auto">
                    <h6 class="text-dark text-center text-md-start col-12 my-0">{item.nombre} - ${item.precio}</h6>
                    <p class="m-0 d-none d-md-block col-12" style="font-size:12px;">Lorem ipsum dolor sit amet consectetur adipisicing elit. Sed cupiditate quas culpa maxime dolor.</p>
                    
                  </div>
                </div>
                
                <p class="text-dark text-bold col-12 col-md-6 text-center pt-3 text-md-end my-0">Subtotal: ${item.precio*item.quantity}</p>
  
                <div class="col-12 col-md-6 text-center text-md-end mt-2 mb-n2">
                  <button class="btn col btn-sm btn-blue" on:click={() => decrementQuantity(item.id)}>-</button>
                  <span class="col p-1 btn disabled text-dark">{item.quantity}</span>
                  <button class="btn col btn-sm btn-success" on:click={() => incrementQuantity(item.id)}>+</button>
          
                </div>
                  
              </div>

            </div>
            
          </div>
          
          
         
        </div>
      </div>
        
      {/each}
    </div>
    
  </div>
  