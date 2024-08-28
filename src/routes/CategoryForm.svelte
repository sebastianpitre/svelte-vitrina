<script>
    import { onMount } from "svelte";
    import Swal from "sweetalert2";
  import Nav from "../components/nav.svelte";
  
    export let id;
  
    let nombre = "";
    let imagen = "";
  
    let listCategorias = [];
  
    onMount(async () => {
      fetch("http://localhost:8086/api/publico/categorias")
        .then((response) => response.json())
        .then((results) => (listCategorias = results));
  
      if (id) {
        const response = await fetch(`http://localhost:8086/api/publico/categorias/${id}`);
        const product = await response.json();
        nombre = product.nombre;
        imagen = product.imagen;

      }
    });
  
    const handleSubmit = async (event) => {
      event.preventDefault();
  
      const formData = {
        nombre,
        imagen,

      };
  
      try {
        const method = id ? "PATCH" : "POST";
        const url = id ? `http://localhost:8086/api/publico/categorias/${id}` : "http://localhost:8086/api/publico/categorias";
  
        const response = await fetch(url, {
          method,
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });
  
        if (!response.ok) {
          throw new Error("Error en la solicitud");
        }
  
        const data = await response.json();
        Swal.fire({
          icon: 'success',
          title: 'Éxito',
          text: 'Producto guardado correctamente',
          showConfirmButton: false,
          timer: 1500
        }).then(() => {
        window.location.href = '/categorias'; // Redirigir a la lista de categorias
        });
  
      } catch (error) {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Hubo un problema al guardar el producto',
        });
      }
    };
  </script>
  
  <main class="row col-12">
    <Nav />
    <div class="col-12 col-md-6 mx-auto pt-3 mb-4 mb-md-0">
        <form on:submit={handleSubmit}>
          <div class="card p-3">
            <h3 class="text-center">{id ? "Editar categoria" : "Guardar categoria"}</h3>
            <div class="row mx-auto pt-3">
              
  
              <div class="col-12 col-md-6">
                <div class="input-group  input-group-static my-2">
                    <h6 class="">Nombre de la categoria</h6>
                    <input type="text" class="form-control mt-n3" bind:value={nombre} />
                </div>
            </div>

            <div class="col-12 col-md-6">
                <div class="input-group  input-group-static my-2">
                    <h6 class="">Link Icono</h6>
                    <input type="text" class="form-control mt-n3" bind:value={imagen} />
                </div>
            </div>

  
              <div class="col-12 text-center">
                <a href="/categorias" class="btn btn-danger">Cancelar</a>
                <button class="btn btn-success" type="submit">Guardar</button>
              </div>
            </div>
          </div>
        </form>
    </div>
  </main>
  
  <style>
    main {
      background-color: #eee;
    }
  
    .toggle-switch {
      position: relative;
      display: inline-block;
      width: 40px;
      height: 24px;
      margin: 10px;
    }
  
    .toggle-switch .toggle-input {
      display: none;
    }
  
    .toggle-switch .toggle-label {
      position: absolute;
      top: 0;
      left: 0;
      width: 40px;
      height: 24px;
      background-color: #000;
      border-radius: 34px;
      cursor: pointer;
      transition: background-color 0.3s;
    }
  
    .toggle-switch .toggle-label::before {
      content: "";
      position: absolute;
      width: 20px;
      height: 20px;
      border-radius: 50%;
      top: 2px;
      left: 2px;
      background-color: #fff;
      box-shadow: 0px 2px 5px 0px rgba(0, 0, 0, 0.3);
      transition: transform 0.3s;
    }
  
    .toggle-switch .toggle-input:checked + .toggle-label {
      background-color: #4CAF50;
    }
  
    .toggle-switch .toggle-input:checked + .toggle-label::before {
      transform: translateX(16px);
    }
  </style>
  