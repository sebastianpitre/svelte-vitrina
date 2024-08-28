<script>
	import Nav from './../components/nav.svelte';
    import { onMount } from 'svelte';
    import { isAuthenticated, checkAuth } from '../stores/auth';
    let isAuth = false;

    onMount(async () => {
        isAuth = await checkAuth();
        if (!isAuth) {
            window.location.href = '/login'; // Redirige al login si no está autenticado
        }
    });
</script>

<main>

    <Nav/>
    <h1>Home</h1>
    <!-- Contenido de la página de inicio -->
</main>
