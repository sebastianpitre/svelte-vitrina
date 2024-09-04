<!-- src/components/ProtectedRoute.svelte -->
<script>
    import { onMount } from 'svelte';
    import { navigate } from 'svelte-routing';
    import { isAuthenticated } from '../stores/authService';
  
    let authenticated = false;
  
    onMount(() => {
      authenticated = isAuthenticated();
      if (!authenticated) {
        navigate('/login');
      }
    });
  </script>
  
  {#if authenticated}
    <slot />
  {/if}
  