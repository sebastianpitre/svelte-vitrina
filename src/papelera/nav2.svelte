<script>
    import { Router, Route, link } from 'svelte-routing';
    import { onMount } from 'svelte';

    
</script>

<nav>
    
    <a use:link href="/">Home</a>
    <a use:link href="/login">Login</a>
    <a use:link href="/cuenta">Perfil</a>
    <a use:link href="/products">Products</a> 
    <a use:link href="/categorias">Categorias</a> <!-- Añade el enlace a Products -->
</nav>
