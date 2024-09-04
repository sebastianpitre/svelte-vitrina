<script>
  import { onMount } from "svelte";
  import Swal from "sweetalert2";
  import Nav from "../components/nav.svelte";
  import { fetchWithAuth } from '../api/auth'; // Verifica que la ruta sea correcta

  export let id;

  let nombres = "";
  let apellidos = "";
  let email = "";
  let password = "";
  let tipoIdentificacion = "";
  let identificacion = "";
  let telefono = "";
  let direccion = "";
  let barrio = "";
  let ciudad = "";

  onMount(async () => {
    if (id) {
      try {
        const response = await fetchWithAuth(`http://localhost:8086/api/auth/perfil/${id}`);
        
        if (!response.ok) {
          throw new Error('No se pudo cargar el usuario');
        }

        const user = await response.json();

        nombres = user.nombres || "";
        apellidos = user.apellidos || "";
        email = user.email || "";
        password = user.password || "";
        tipoIdentificacion = user.tipoIdentificacion || "";
        identificacion = user.identificacion || "";
        telefono = user.telefono || "";
        direccion = user.direccion || "";
        barrio = user.barrio || "";
        ciudad = user.ciudad || "";
      } catch (error) {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: error.message,
        });
      }
    }
  });

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = {
      nombres,
      apellidos,
      email,
      password,
      tipoIdentificacion,
      identificacion,
      telefono,
      direccion,
      barrio,
      ciudad
    };

    try {
      const method = id ? "PATCH" : "POST";
      const url = id ? `http://localhost:8086/api/auth/perfil/${id}` : "http://localhost:8086/api/auth/registro";

      const response = await fetchWithAuth(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Error en la solicitud");
      }

      await response.json();

      Swal.fire({
        icon: 'success',
        title: 'Éxito',
        text: 'Usuario guardado correctamente',
        showConfirmButton: false,
        timer: 1500
      }).then(() => {
        window.location.href = '/usuarios';
      });

    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Hubo un problema al guardar el usuario',
      });
    }
  };
</script>

<main class="row col-12">
  <Nav />
  <div class="col-12 col-md-8 mx-auto pt-3 mb-4 mb-md-0">
    <form on:submit={handleSubmit}>
      <div class="card p-3">
        <h3 class="text-center">{id ? "Editar usuario" : "Guardar usuario"}</h3>
        <div class="row mx-auto pt-3">
          <div class="col-12 col-md-6">
            <div class="input-group input-group-static my-2">
              <label for="Nombres">Nombres</label>
              <input type="text" class="form-control" bind:value={nombres} required />
            </div>
          </div>
          <div class="col-12 col-md-6">
            <div class="input-group input-group-static my-2">
              <label for="Apellidos">Apellidos</label>
              <input type="text" class="form-control" bind:value={apellidos} required />
            </div>
          </div>
          <div class="col-12 col-md-6">
            <div class="input-group input-group-static my-2">
              <label for="Email">Email</label>
              <input type="email" class="form-control" bind:value={email} required />
            </div>
          </div>
          <div class="col-12 col-md-6">
            <div class="input-group input-group-static my-2">
              <label for="Contraseña">Contraseña</label>
              <input type="password" class="form-control" bind:value={password} required />
            </div>
          </div>
          <div class="col-12 col-md-6">
            <div class="input-group input-group-static my-2">
              <label for="TipoIdentificacion">Tipo identificación</label>
              <input type="text" class="form-control" bind:value={tipoIdentificacion} />
            </div>
          </div>
          <div class="col-12 col-md-6">
            <div class="input-group input-group-static my-2">
              <label for="Identificacion">Identificación</label>
              <input type="text" class="form-control" bind:value={identificacion} required />
            </div>
          </div>
          <div class="col-12 col-md-6">
            <div class="input-group input-group-static my-2">
              <label for="Telefono">Teléfono</label>
              <input type="text" class="form-control" bind:value={telefono} required />
            </div>
          </div>
          <div class="col-12 col-md-6">
            <div class="input-group input-group-static my-2">
              <label for="Direccion">Dirección</label>
              <input type="text" class="form-control" bind:value={direccion} required />
            </div>
          </div>
          <div class="col-12 col-md-6">
            <div class="input-group input-group-static my-2">
              <label for="Barrio">Barrio</label>
              <input type="text" class="form-control" bind:value={barrio} required />
            </div>
          </div>
          <div class="col-12 col-md-6">
            <div class="input-group input-group-static my-2">
              <label for="Ciudad">Ciudad</label>
              <input type="text" class="form-control" bind:value={ciudad} required />
            </div>
          </div>
          <div class="col-12 text-center">
            <a href="/usuarios" class="btn btn-danger">Cancelar</a>
            <button class="btn btn-success" type="submit">Guardar</button>
          </div>
        </div>
      </div>
    </form>
  </div>
</main>

<style>
  /* Estilo personalizado si es necesario */
</style>
