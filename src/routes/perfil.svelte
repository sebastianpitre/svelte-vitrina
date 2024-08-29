<script>
  import Menufooter from "../components/menufooter.svelte";
  import { fetchUserProfile } from '../api/user';
  import { onMount } from 'svelte';
  import { user } from '../stores/user'; // Store para guardar los datos del usuario

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

  let isDisabled = true;

  function enableEditing() {
    isDisabled = false;
  }

  function cancelEditing() {
    isDisabled = true;
  }

  function saveChanges() {
    // Aquí puedes agregar la lógica para guardar los cambios
    alert("Cambios guardados!");
    isDisabled = true; // Deshabilita nuevamente los inputs después de guardar
  }

</script>

<main>
  <header class="bg-gradient-dark">
    <div class="page-header min-vh-35" style="background-image: url(&quot;/img/img-sena/sena2.jpeg&quot;); background-position-y: 60%; background-size: cover; background-position-x: 70%;">
      <span class="mask bg-gradient-dark opacity-8"></span>
      
    </div>
</header>


<div class="container">
  <div class="col-12 col-md-6 mx-auto">
    <div class="card p-4 mt-n5">
      
      <div class="row">
        <h5 class="col-8">Datos personales</h5>

        {#if isDisabled}
        <div class="text-end col cursor-pointer">
          <span class="material-symbols-outlined text-end text-success" on:click={enableEditing}>
            edit_square
            </span>
        </div>
          
        {/if}

        <div class="col-12 col-md-6">
          <div class="input-group input-group-static my-2">
            <label>Nombres</label>
            <input type="text" bind:value={userProfile.nombres} class="form-control" required disabled={isDisabled}/>
          </div>
        </div>

        <div class="col-12 col-md-6">
          <div class="input-group input-group-static my-2">
            <label>Apellidos</label>
            <input type="text" bind:value={userProfile.apellidos} class="form-control" required disabled={isDisabled}/>
          </div>
        </div>

        <div class="col-12 col-md-6">
          <div class="input-group input-group-static my-2">
            <label>Celular</label>
            <input type="number" bind:value={userProfile.telefono} class="form-control" required disabled={isDisabled}/>
          </div>
        </div>

        <div class="col-12 col-md-6">
          <div class="input-group input-group-static my-2">
            <label>Correo</label>
            <input type="text" bind:value={userProfile.email} class="form-control" required disabled={isDisabled}/>
          </div>
        </div>

        <div class="col-12 col-md-6">
          <div class="input-group input-group-static my-2">
            <label>Contraseña</label>
            <input type="password" bind:value={userProfile.password} class="form-control" required disabled={isDisabled}/>
          </div>
        </div>
        
      </div>
  </div>

  <div class="container text-center my-4">
    {#if isDisabled}
      <a href="/cuenta" class=" btn btn-sm btn-danger mb-0">
        Volver
      </a>
    {/if}

    {#if !isDisabled}
      <button type="button" class="btn btn-sm btn-danger mb-0" on:click={cancelEditing}>Cancelar</button>
      <button type="button" class="btn btn-sm btn-success mb-0" on:click={saveChanges}>Guardar Cambios</button>
    {/if}
  </div>
  </div>
    
</div>

<Menufooter/>
</main>

