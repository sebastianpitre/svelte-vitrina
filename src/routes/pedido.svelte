<script>
    import { createPedido } from '../api/pedido';
    import { getProductos } from '../api/productos';
    import Footer from '../components/footer.svelte';
    import { cart } from '../stores/cart';
    import { onMount } from 'svelte';
    import { get } from 'svelte/store';

    // Variables para almacenar el carrito y los productos completos
    let carrito = [];
    let productosEnCarrito = [];

    // Variable para almacenar el total de productos y el total a pagar
    let totalProductos = 0;
    let totalAPagar = 0;

    // onMount se ejecuta cuando el componente se monta
    onMount(async () => {
        // Obtener el carrito desde la tienda de Svelte
        carrito = get(cart);
        
        // Extraer los IDs de los productos en el carrito
        const idsProductos = carrito.map(item => item.id);

        // Obtener todos los productos y filtrar solo los que están en el carrito
        const productosData = await getProductos();
        productosEnCarrito = productosData.filter(producto => idsProductos.includes(producto.id));

        // Calcular el total de productos y el total a pagar
        totalProductos = carrito.length; // Cantidad total de productos en el carrito

        // Calcular el total a pagar sumando los precios multiplicados por las cantidades
        totalAPagar = carrito.reduce((total, item) => {
            const producto = productosEnCarrito.find(p => p.id === item.id);
            return total + (producto.precio * item.quantity);
        }, 0);
    });

    // Función que se ejecutará al hacer clic en el botón para crear el pedido
    function handleCrearPedido() {
        createPedido()
            .then(() => {
                alert('Pedido creado con éxito');
            })
            .catch(error => {
                console.error('Error al crear el pedido:', error);
                alert('Hubo un error al crear el pedido');
            });
    }
</script>

<main>
    <header class="bg-gradient-success">
        <div class="page-header min-vh-25" >
            <span class="mask bg-gradient-dark opacity-5"></span>
        </div>
    </header>

    <div class="container">
        <div class="col-12 col-md-6 mx-auto">
            <div class="card px-0 px-md-4 mt-n5">
                <h5 class="ps-3 pt-2">Resumen del Pedido</h5>
                <div class=" border ">
                    <table class="table align-items-center mb-0">
                        <thead>
                            <tr>
                                <th class="text-uppercase text-secondary text-xxs font-weight-bolder ps-3 pe-0">CANT</th>
                                <th class="text-uppercase text-secondary text-xxs font-weight-bolder">DESCRIPCIÓN</th>
                                <th class="text-uppercase text-secondary text-xxs font-weight-bolder text-end">VR/U</th>
                                <th class="text-uppercase text-secondary text-xxs font-weight-bolder text-end">VR/T</th>
                            </tr>
                        </thead>
                        <tbody>
                            {#each productosEnCarrito as producto (producto.id)}
                                <tr>
                                    <td class="text-xs font-weight-bolder border-0 ps-4">{carrito.find(item => item.id === producto.id).quantity}</td>
                                    <td class="text-xs font-weight-bolder border-0">{producto.nombre}</td>
                                    <td class="text-xs font-weight-bolder border-0 text-end pe-4">$ {producto.precio.toFixed(2)}</td>
                                    <td class="text-xs font-weight-bolder border-0 text-end pe-4">$ {(producto.precio * carrito.find(item => item.id === producto.id).quantity).toFixed(2)}</td>
                                </tr>
                            {/each}
                            <tr class="border-top">
                                <td colspan="2" class="text-xxs font-weight-bolder ps-3">N° PRODUCTOS:</td>
                                <td colspan="2" class="text-xs font-weight-bolder text-end pe-4">{totalProductos}</td>
                            </tr>
                            <tr class="border-top">
                                <td colspan="2" class="text-xxs font-weight-bolder ps-3">TOTAL A PAGAR:</td>
                                <td colspan="2" class="text-xs font-weight-bolder text-end pe-4">${totalAPagar.toFixed(2)}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <div class="col text-center">
                    <a href="/" class="btn btn-sm btn-danger mb-0">Volver</a>

                    <button class="mt-3 btn btn-sm btn-success" on:click={handleCrearPedido}>
                        Finalizar y enviar Pedido
                    </button>
                </div>
            </div>
        </div>
    </div>
    
    <Footer/>
</main>