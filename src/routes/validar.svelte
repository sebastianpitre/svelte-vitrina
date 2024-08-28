<script>
import { authToken } from '../stores/store.js';
    let isAuthenticated = false;

    authToken.subscribe(value => {
        isAuthenticated = !!value || !!localStorage.getItem('authToken');
    });
</script>

{#if isAuthenticated}
    <p>Usuario autenticado</p>
    <!-- Mostrar contenido para usuarios autenticados -->
{:else}
    <p>Por favor, inicia sesión</p>
    <!-- Mostrar contenido para usuarios no autenticados -->
{/if}
