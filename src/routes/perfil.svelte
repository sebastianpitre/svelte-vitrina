<script>
  import Menufooter from "../components/menufooter.svelte";
import Slide from "../components/slide.svelte";

function logout() {
    localStorage.removeItem("user");
    window.location.href = "/login";
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
      Hola, Usuario
      <div class="row">
        <a class="col-12 mb-2" href="datos-personales">
          <div class="border-bottom p-3">
            <p class="my-auto">Mi perfil</p>
          </div>
        </a>
        <div class="col-12 mb-2">
          <div class="border-bottom p-3">
            <p class="my-auto">Mis pedidos</p>
          </div> 
        </div>
        <div class="col-12 mb-2">
          <div class="border-bottom p-3">
            <p class="my-auto">Dirección</p>
          </div> 
        </div>
      </div>
  </div>

  <div class="container my-4">
    <button class=" btn btn-sm btn-danger mb-0" on:click={logout}>
      <img class="icon opacity-9" src="/img/icon/logout.svg" alt="icon" width="20px">
      cerrar sesion
    </button>
  </div>
  </div>
    
</div>

<Menufooter/>
</main>

