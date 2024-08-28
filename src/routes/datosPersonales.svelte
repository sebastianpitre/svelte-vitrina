<script>
  import Menufooter from "../components/menufooter.svelte";
  import Slide from "../components/slide.svelte";

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

<Slide/>

<div class="container">
  <div class="col-12 col-md-6 mx-auto">
    <div class="card p-4 mt-n5">
      
      <div class="row">
        <h5 class="col-8">Datos personales</h5>

        {#if isDisabled}
        <div class="text-end col">
          <span class="material-symbols-outlined text-end text-success" on:click={enableEditing}>
            edit_square
            </span>
        </div>
          
        {/if}

        <div class="col-12 col-md-6">
          <div class="input-group input-group-static my-2">
            <label>Nombres</label>
            <input type="text" class="form-control" required disabled={isDisabled}/>
          </div>
        </div>

        <div class="col-12 col-md-6">
          <div class="input-group input-group-static my-2">
            <label>Apellidos</label>
            <input type="text" class="form-control" required disabled={isDisabled}/>
          </div>
        </div>

        <div class="col-12 col-md-6">
          <div class="input-group input-group-static my-2">
            <label>Celular</label>
            <input type="text" class="form-control" required disabled={isDisabled}/>
          </div>
        </div>

        <div class="col-12 col-md-6">
          <div class="input-group input-group-static my-2">
            <label>Correo</label>
            <input type="text" class="form-control" required disabled={isDisabled}/>
          </div>
        </div>

        <div class="col-12 col-md-6">
          <div class="input-group input-group-static my-2">
            <label>Contraseña</label>
            <input type="password" class="form-control" required disabled={isDisabled}/>
          </div>
        </div>
        
      </div>
  </div>

  <div class="container text-center my-4">
    {#if isDisabled}
      <a href="/perfil" class=" btn btn-sm btn-danger mb-0">
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

