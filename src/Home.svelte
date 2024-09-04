<script>
  import { onMount } from 'svelte';

  import Menufooter from './components/menufooter.svelte';
  import Nav from './components/nav.svelte';
  import Header from './components/header.svelte';
  import Category from './components/category.svelte';
  import Car from './components/car.svelte';
  import { selectedCategory } from './stores/stores';
  import { cart, addToCart, incrementQuantity, decrementQuantity } from './stores/cart';
  import Footer from './components/footer.svelte';
  import Card from './components/card.svelte';

  let categorias = [];

  // Accesos rápidos
  let clasesCard = "col-6 col-sm-4 col-md-4 col-lg-3 col-xl-2 col-xxl-2 mb-3 px-2";

  // Llamar a la API
  onMount(async () => {
    try {
      // Obtener productos
      const responseProductos = await fetch("http://localhost:8086/api/publico/productos");
      listProductos = await responseProductos.json();
      
      // Obtener categorías
      const responseCategorias = await fetch("http://localhost:8086/api/publico/categorias");
      categorias = await responseCategorias.json();
      
    } catch (error) {
      console.error('Error al obtener productos o categorías:', error);
    }
  });

  // Filtrar productos por categoría seleccionada
  $: filteredProducts = $selectedCategory === 'all'
    ? listProductos
    : listProductos.filter(producto => {
        const categoria = categorias.find(cat => cat.nombre === $selectedCategory);
        return categoria ? producto.idCategoria === categoria.id : false;
      });

  // Filtrar categorías que tienen productos filtrados
  $: categoriasConProductos = categorias.filter(categoria =>
    filteredProducts.some(producto => producto.idCategoria === categoria.id)
  );

  // Verificar si hay productos en promoción
  $: productosEnPromocion = filteredProducts.filter(producto => producto.activo && producto.promocion);

  // Verificar si hay productos después del filtrado
  $: noProducts = filteredProducts.length === 0;

  let listProductos = []; // Aquí obtienes tu lista de productos

  // Lógica para obtener productos desde API u otra fuente
  onMount(async () => {
    try {
      const responseProductos = await fetch("http://localhost:8086/api/publico/productos");
      listProductos = await responseProductos.json();
    } catch (error) {
      console.error('Error al obtener productos:', error);
    }
  });

  // Función para agregar al carrito desde Home.svelte
  function handleAddToCart(producto) {
    addToCart(producto);
  }

</script>

<main>
    
    <Nav/>
    <Header/>
    <Category/>
    <Car/>

    <div class="card-body mx-3 mx-md-5">
    
        {#if productosEnPromocion.length > 0 && $selectedCategory === 'all'}
          <div class="row mt-1">
            <div class="row">
              <h5 class="text-dark">Ofertas</h5>
            </div>
            {#each productosEnPromocion as producto (producto.id)}
              <div class="{clasesCard}">
                <Card {producto} addToCart={handleAddToCart}/>
              </div>
            {/each}
    
          </div>
        {/if}
    
        {#if noProducts}
          <div class="text-center my-5">
            <img class="opacity-4" src="./img/unavailable_icon.webp" alt="No products available" style="width: 50px; height: auto;">
            <p class="text-muted mt-3">No hay productos disponibles en esta categoría.</p>
          </div>
        {/if}
    
        {#each categoriasConProductos as categoria}
          <div class="row">
            <div class="col-md-12 col-lg-12">
              <div class="row">
                <h5 class="col text-dark">{categoria.nombre}</h5>
              </div>
              <div class="row">
                {#each filteredProducts as producto (producto.id)}
                  {#if producto.idCategoria === categoria.id}
                    <div class="{clasesCard}">
                      <Card {producto} addToCart={handleAddToCart}/>
                    </div>
                  {/if}
                {/each}
              </div>
            </div>
          </div>
        {/each}
      </div>

    <Menufooter/>

    <Footer/>
</main>
