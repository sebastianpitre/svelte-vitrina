<script>
  import { onMount } from 'svelte';

  let photos = [];
  let currentIndex = 0;
  let currentPhoto = '';
  let backgroundStyle = '';

  // Función para cambiar la foto actual cada 10 segundos
  function changePhoto() {
      currentIndex = (currentIndex + 1) % photos.length;
      const { urlImagen, posicionY } = photos[currentIndex];
      currentPhoto = urlImagen;
      backgroundStyle = `background-image: url("${currentPhoto}"); background-position-y: ${posicionY}%; background-size: cover; background-position-x: 1%;`;
  }

  // Fetch para obtener las categorías y sus URLs de las imágenes
  async function fetchPhotos() {
      try {
          const response = await fetch('http://localhost:8080/header/');
          const data = await response.json();

          // Suponiendo que el JSON tiene una estructura como: [{urlImagen: 'ruta1', posicionY: 80}, {urlImagen: 'ruta2', posicionY: 50}, ...]
          photos = data;
          if (photos.length > 0) {
              const { urlImagen, posicionY } = photos[0];
              currentPhoto = urlImagen;
              backgroundStyle = `background-image: url("${currentPhoto}"); background-position-y: ${posicionY}%; background-size: cover; background-position-x: 50%;`;
          }
      } catch (error) {
          console.error('Error al obtener las fotos:', error);
      }
  }

  // Establecer el intervalo al montar el componente
  onMount(() => {
      fetchPhotos();
      const interval = setInterval(changePhoto, 5000);

      // Limpiar el intervalo cuando se desmonte el componente
      return () => clearInterval(interval);
  });
</script>

<header class="bg-gradient-dark mx-2 mt-2 mx-md-2 mx-md-5 border-radius-2xl">
  <div class="page-header height-responsive border-radius-2xl" style={backgroundStyle}>
    <span class="mask bg-gradient-dark opacity-3"></span>
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-lg-8 text-center mx-auto my-auto">
          <div class="warning-horizontal justify-content-center">
            <img class="avatar-lg avatar-md-xxl opacity-9" src="/img/logo.png" alt="">
          </div>
          <p class="text-edo mb-4 text-white mt-3">
            <span class="bg-success opacity-9 font-weight-bold card col-lg-4 col-md-6 col-sm-7 col-10 mx-auto">SENA EMPRESA VITRINA WEB</span>
          </p>
        </div>
      </div>
    </div>
  </div>
</header>


<style>
  .height-responsive {
    min-height: 35vh !important;
  }

  @media (min-width: 768px) {
    .height-responsive {
    min-height: 55vh !important;
  }
  }
</style>