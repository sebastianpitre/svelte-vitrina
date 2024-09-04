<script>
    import { authToken } from './store';
    import { onMount } from 'svelte';

    let usuarios = [];
    let errorMessage = '';

    async function fetchUsuarios() {
        let token;
        authToken.subscribe(value => {
            token = value || localStorage.getItem('authToken');
        });

        if (token) {
            try {
                const response = await fetch('http://localhost:8086/admin/usuarios', {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    },
                });

                if (response.ok) {
                    usuarios = await response.json();
                } else {
                    errorMessage = 'Error al obtener los usuarios';
                }
            } catch (error) {
                console.error('Error en la solicitud:', error);
                errorMessage = 'Error al obtener los usuarios';
            }
        }
    }

    onMount(fetchUsuarios);
</script>

{#if usuarios.length > 0}
    <table>
        <thead>
            <tr>
                <th>ID</th>
                <th>Nombre</th>
                <th>Email</th>
                <th>Acciones</th>
            </tr>
        </thead>
        <tbody>
            {#each usuarios as usuario}
                <tr>
                    <td>{usuario.id}</td>
                    <td>{usuario.nombre}</td>
                    <td>{usuario.email}</td>
                    <td>
                        <a href={`/usuarios/${usuario.id}`}>Editar</a>
                    </td>
                </tr>
            {/each}
        </tbody>
    </table>
{:else}
    <p>{errorMessage || 'No se encontraron usuarios'}</p>
{/if}
