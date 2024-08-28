<!-- src/components/Logout.svelte -->
<script>
    import { logout } from '../stores/authService';
    import { navigate } from 'svelte-routing';
  
    function handleLogout() {
      logout();
      navigate('/login');
    }
  </script>
  
  <button on:click={handleLogout}>Logout</button>
  