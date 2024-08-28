<script>
    import { fetchUserProfile } from '../api/user';
    import { user } from '../stores/user'; // Store para guardar los datos del usuario
    import { onMount } from 'svelte';

    let userProfile = {};

    // Llamar a la función al montar el componente
    onMount(async () => {
        try {
            userProfile = await fetchUserProfile();
            user.set(userProfile); // Guardar los datos en el store
        } catch (error) {
            console.error('No se pudo obtener el perfil del usuario:', error);
        }
    });

    // Obtener el ID del primer rol (si existe)
    $: roleId = userProfile.roles?.[0]?.id ?? 'No tiene roles asignados';
    $: roleName = userProfile.roles?.[0]?.nombre ?? 'Sin rol';
</script>

<!-- Aquí puedes usar los datos del usuario en el template -->
<h1>Bienvenido, {userProfile.nombres} {userProfile.apellidos}</h1>

<p>Tu rol es: {roleName} (ID: {roleId})</p>
