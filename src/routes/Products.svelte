<script>
    import { onMount } from 'svelte';
    import { getProductos } from '../api/productos';
    import Nav from '../components/nav.svelte';

    let products = [];
    let errorMessage = '';

    onMount(async () => {
        try {
            products = await getProductos();
        } catch (error) {
            errorMessage = 'No se pudieron cargar los productos.';
        }
    });
</script>

<main>
    <Nav/>
    <h1>Productos</h1>
    {#if errorMessage}
        <p>{errorMessage}</p>
    {/if}
    {#if products.length === 0}
        <p>No hay productos disponibles.</p>
    {/if}
    <ul>
        {#each products as product}
            <li>{product.nombre} - {product.precio}</li>
        {/each}
    </ul>
</main>
