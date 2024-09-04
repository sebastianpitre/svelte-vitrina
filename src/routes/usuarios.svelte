<script>
    import { onMount } from 'svelte';
	import Menufooter from '../components/menufooter.svelte';
	import Footer from '../components/footer.svelte';
	import Nav from '../components/nav.svelte';
    import MenuAcciones from '../components/MenuAcciones.svelte';

    import { user } from '../stores/user'; // Store para guardar los datos del usuario
    import { fetchUserProfile } from '../api/user';

    import { eliminarUsuario } from '../api/usuarios';
    import { getUsuarios } from '../api/usuarios';

    let usuarios = [];
    let errorMessage = '';

    onMount(async () => {
        try {
            usuarios = await getUsuarios();
        } catch (error) {
            errorMessage = 'No se pudieron cargar los usuarios.';
        }
    });

    // Llamar a la función al montar el componente
    onMount(async () => {
        try {
            userProfile = await fetchUserProfile();
            user.set(userProfile); // Guardar los datos en el store
        } catch (error) {
            console.error('No se pudo obtener el perfil del usuario:', error);
        }
    });

    let userProfile = {};
    
//   // Obtener el ID del primer rol (si existe)
  $: roleId = userProfile.roles?.[0]?.id ?? 'No tiene roles asignados';
  $: roleName = userProfile.roles?.[0]?.nombre ?? 'Sin rol';

</script>


<main>

    <Nav/>

    <MenuAcciones/>
    <div class="container-fluid">
        <div class="row">

            <div class="col-12 col-md-10 mx-auto mb-4 mb-md-0">
                
                <div class="col-12 text-end">
                    <a href="/usuario/nuevo" class="btn btn-sm btn-success">Agregar usuario</a>
                </div>
                <div class="card p-2">
                    <div class="table-responsive">
                        <table class="table align-items-center mb-0">
                            <thead>
                                <tr>
                                    <th class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2">Nombres y Apellidos</th>
                                    <th class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2">Rol</th>
                                    <th class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2">Correo</th>
                                    <th class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2">Identifiación</th>
                                    <th class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2">Teléfono</th>
                                    <th class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2">Acciones</th>


                                </tr>
                            </thead>
                            <tbody>
                                {#if usuarios.length === 0}
                                <tr><td><p>No hay usuarios disponibles.</p></td></tr>
                                {/if}
                                {#each usuarios as values}
                                <tr>
                                    <td>
                                        <p class="text-sm mb-0">{values.nombres}</p>
                                        <p class="text-sm mb-0">{values.apellidos}</p>
                                    </td>
        
                                    <td>
                                        <p class="text-sm mb-0">{roleId} - {roleName}</p>
                                    </td>

                                    <td>
                                        <p class="text-sm mb-0">{values.email}</p>
                                    </td>

                                    <td>
                                        <p class="text-sm mb-0">{values.tipoIdentificacion} - {values.identificacion}</p>
                                    </td>

                                    <td>
                                        <p class="text-sm mb-0">{values.telefono}</p>
                                    </td>

                                    <td class="align-middle">
                                        <button class="btn btn-sm btn-outline-danger" on:click={() => eliminarUsuario(values.id)}>Eliminar</button>
                                        <a class="btn btn-sm btn-outline-success" href={`/usuario/editar/${values.id}`}>Editar</a>
                                    </td>

                                </tr>
                                {/each}
                                
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <Menufooter/>
<Footer></Footer>
</main>

<style>
    main{
        background-color: #f5f5f5;
    }
</style>