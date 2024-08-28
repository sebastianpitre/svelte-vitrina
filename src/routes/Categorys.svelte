<script>
    import { onMount } from 'svelte';
    import { getCategorias } from '../api/productos';
    import Nav from '../components/nav.svelte';

    let products = [];
    let errorMessage = '';

    onMount(async () => {
        try {
            products = await getCategorias();
        } catch (error) {
            errorMessage = 'No se pudieron cargar las categorias.';
        }
    });
</script>

<main>
    <Nav/>
    <h1>Categorias</h1>
    {#if errorMessage}
        <p>{errorMessage}</p>
    {/if}
    {#if products.length === 0}
        <p>No hay productos disponibles.</p>
    {/if}
    <ul>
        {#each products as product}
            <li>{product.nombre} - {product.id}</li>
        {/each}
    </ul>
</main>
