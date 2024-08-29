<script>
  import { Router, Route, link } from 'svelte-routing';
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

  // modal carrito
  import { isModalOpen } from '../stores/modalStore.js';

  function openModal() {
    isModalOpen.set(true);
  }

</script>

<div class="position-sticky mobile-menu z-index-sticky mb-6 top-0 d-none d-md-block">
  <div class="row">
    <div class="col-12">
      <nav class="navbar navbar-expand-lg top-0 z-index-fixed blur shadow position-absolute py-0 start-0 end-0">
        <div class="container-fluid px-0">
          <a class="col-9 col-sm-7 col-md-5 col-lg-4 col-xl-4 col-xxl-3 font-weight-bolder " use:link href="/" rel="tooltip" data-placement="bottom">
            <div class="row">
              <div class="col-3 text-end">
                <img class="avatar-sm my-2" src="/img/logo.png" alt="imglogo">
              </div>
              <p class="col-9 text-dark my-auto font-weight-bold">SENA Empresa vitrina web</p>
            </div>
            
          </a>
          <!-- <a use:link href="pages//" class="btn btn-sm  btn-white border border-dark  mb-0 ms-auto d-lg-none d-block">Ingresar</a> -->
          <button class="navbar-toggler shadow-none ms-2" type="button" data-bs-toggle="collapse" data-bs-target="#navigation" aria-controls="navigation" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon mt-2">
              <span class="navbar-toggler-bar bar1"></span>
              <span class="navbar-toggler-bar bar2"></span>
              <span class="navbar-toggler-bar bar3"></span>
            </span>
          </button>
          <div class="collapse navbar-collapse pt-3 pb-2 py-lg-0 w-100" id="navigation">
            <ul class="navbar-nav navbar-nav-hover ms-auto">

              {#if userProfile && userProfile.nombres}

                {#if roleId === 1}
                
                <li class="nav-item dropdown dropdown-hover ms-2">
                  <a role="button" class=" btn btn-sm btn-blue mb-0" id="dropdownMenuDocs" data-bs-toggle="dropdown" aria-expanded="false">
                    <img class="icon opacity-9 mt-n1" src="/img/icon/admin.svg" alt="icon" width="20px">
                    {userProfile.nombres}
                  </a>
                  <div class="dropdown-menu dropdown-menu-end dropdown-menu-animation dropdown-md mt-0 mt-lg-3 p-3 border-radius-lg" aria-labelledby="dropdownMenuDocs">
                    <div class="d-none d-lg-block">
                      <ul class="list-group">

                        <li class="nav-item list-group-item border-0 p-0">
                          <a class="dropdown-item py-2 ps-3 border-radius-md" use:link href="/cuenta">
                            <h6 class="dropdown-header text-dark font-weight-bolder d-flex justify-content-cente align-items-center p-0">Cuenta</h6>
                          </a>
                        </li>
                        
                        <li class="nav-item list-group-item border-0 p-0">
                          <a class="dropdown-item py-2 ps-3 border-radius-md" use:link href="/productos">
                            <h6 class="dropdown-header text-dark font-weight-bolder d-flex justify-content-cente align-items-center p-0">Administrar</h6>
                          </a>
                        </li>
                        <li class="nav-item list-group-item border-0 p-0">
                          <button class="dropdown-item py-2 ps-3 border-radius-md bg-danger">
                            <h6 class="dropdown-header text-white font-weight-bolder d-flex justify-content-cente align-items-center p-0">cerrar sesion</h6>
                          </button>
                        </li>
                      </ul>
                    </div>
                    <div class="row d-lg-none">
                      <div class="col-md-12 g-0">
                        <a class="dropdown-item py-2 ps-3 border-radius-md" use:link href="/cuenta">
                          <h6 class="dropdown-header text-dark font-weight-bolder d-flex justify-content-cente align-items-center p-0">Cuenta</h6>
                        </a>
                      </div>
                      
                      <div class="col-md-12 g-0">
                        <a class="dropdown-item py-2 ps-3 border-radius-md" use:link href="/productos">
                          <h6 class="dropdown-header text-dark font-weight-bolder d-flex justify-content-cente align-items-center p-0">Administrar</h6>
                        </a>
                      </div>
                      <div class="col-md-12 g-0">
                        <button class="dropdown-item py-2 ps-3 border-radius-md bg-danger">
                          <h6 class="dropdown-header text-white font-weight-bolder d-flex justify-content-cente align-items-center p-0">cerrar sesion</h6>
                        </button>
                      </div>
                    </div>
                  </div>
                </li>
                {:else if roleId === 2}
                  <li class="nav-item ">
                      
                    <button class="btn btn-sm btn-success mb-0" on:click={openModal}>
                      <img class="icon opacity-9 mt-n1" src="/img/icon/cart.svg" alt="icon" width="20px">
                      <span class=" me-xl-0">carrito</span>
                    </button>
                  </li>

                  <li class="nav-item dropdown dropdown-hover ms-2">
                    <a role="button" class=" btn btn-sm btn-blue mb-0" id="dropdownMenuDocs" data-bs-toggle="dropdown" aria-expanded="false">
                      <img class="icon opacity-9 mt-n1" src="/img/icon/user.svg" alt="icon" width="20px">
                      {roleName}
                    </a>
                    <div class="dropdown-menu dropdown-menu-end dropdown-menu-animation dropdown-md mt-0 mt-lg-3 p-3 border-radius-lg" aria-labelledby="dropdownMenuDocs">
                      <div class="d-none d-lg-block">
                        <ul class="list-group">
                          
                          <li class="nav-item list-group-item border-0 p-0">
                            <a class="dropdown-item py-2 ps-3 border-radius-md" use:link href="/cuenta">
                              <h6 class="dropdown-header text-dark font-weight-bolder d-flex justify-content-cente align-items-center p-0">Cuenta</h6>
                            </a>
                          </li>
                          <li class="nav-item list-group-item border-0 p-0">
                            <button class="dropdown-item py-2 ps-3 border-radius-md bg-danger">
                              <h6 class="dropdown-header text-white font-weight-bolder d-flex justify-content-cente align-items-center p-0">cerrar sesion</h6>
                            </button>
                          </li>
                        </ul>
                      </div>
                      <div class="row d-lg-none">
                        <div class="col-md-12 g-0">
                          <a class="dropdown-item py-2 ps-3 border-radius-md" use:link href="/cuenta">
                            <h6 class="dropdown-header text-dark font-weight-bolder d-flex justify-content-cente align-items-center p-0">Cuenta</h6>
                          </a>
                        </div>
                        <div class="col-md-12 g-0">
                          <button class="dropdown-item py-2 ps-3 border-radius-md bg-danger">
                            <h6 class="dropdown-header text-white font-weight-bolder d-flex justify-content-cente align-items-center p-0">cerrar sesion</h6>
                          </button>
                        </div>
                      </div>
                    </div>
                  </li>
                
                  {:else}
                  <li class="nav-item dropdown dropdown-hover">
                      
                    <button class="btn btn-sm btn-success mb-0" on:click={openModal}>
                      <img class="icon opacity-9 mt-n1" src="/img/icon/cart.svg" alt="icon" width="20px">
                      <span class=" me-xl-0">carrito</span>
                    </button>
                  </li>

                  <li class="nav-item dropdown dropdown-hover ms-2">
                    <a use:link href="/login" class="btn btn-sm btn-blue mb-0">Ingresar</a>
                  </li>
                  {/if}
                {:else}
                <li class="nav-item dropdown dropdown-hover">
                    
                  <button class="btn btn-sm btn-success mb-0" on:click={openModal}>
                    <img class="icon opacity-9 mt-n1" src="/img/icon/cart.svg" alt="icon" width="20px">
                    <span class=" me-xl-0">carrito</span>
                  </button>
                </li>

                <li class="nav-item dropdown dropdown-hover ms-2">
                  <a use:link href="/login" class="btn btn-sm btn-blue mb-0">Ingresar</a>
                </li>
              {/if}
            </ul>
          </div>
        </div>
      </nav>
    </div>
  </div>
</div>



<style>


</style>
