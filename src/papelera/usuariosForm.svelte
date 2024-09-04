<script>
    import { authToken } from './store';
    import { onMount } from 'svelte';
    import { navigate } from 'svelte-routing';

    export let id;
    let usuario = { nombre: '', email: '' };
    let errorMessage = '';

    async function fetchUsuario() {
        if (id) {
            let token;
            authToken.subscribe(value => {
                token = value || localStorage.getItem('authToken');
            });

            if (token) {
                try {
                    const response = await fetch(`http://localhost:8086/admin/usuarios/${id}`, {
                        method: 'GET',
                        headers: {
                            'Authorization': `Bearer ${token}`,
                        },
                    });

                    if (response.ok) {
                        usuario = await response.json();
                    } else {
                        errorMessage = 'Error al obtener el usuario';
                    }
                } catch (error) {
                    console.error('Error en la solicitud:', error);
                    errorMessage = 'Error al obtener el usuario';
                }
            }
        }
    }

    async function saveUsuario() {
        let token;
        authToken.subscribe(value => {
            token = value || localStorage.getItem('authToken');
        });

        try {
            const response = await fetch(`http://localhost:8086/admin/usuarios${id ? '/' + id : ''}`, {
                method: id ? 'PATCH' : 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify(usuario),
            });

            if (response.ok) {
                navigate('/usuarios'); // Redirigir a la lista de usuarios
            } else {
                errorMessage = 'Error al guardar el usuario';
            }
        } catch (error) {
            console.error('Error en la solicitud:', error);
            errorMessage = 'Error al guardar el usuario';
        }
    }

    onMount(fetchUsuario);
</script>

<form on:submit|preventDefault={saveUsuario}>
    <input type="text" bind:value={usuario.nombre} placeholder="Nombre" required />
    <input type="email" bind:value={usuario.email} placeholder="Correo electrónico" required />
    <button type="submit">{id ? 'Actualizar' : 'Agregar'}</button>
    {#if errorMessage}
        <p>{errorMessage}</p>
    {/if}
</form>
