<script>
  import { onMount } from "svelte";
  import Swal from "sweetalert2";
  import Nav from "../components/nav.svelte";

  export let id;

  let sku = "";
  let nombre = "";
  let descripcion = "";
  let urlImagen = "";
  let urlFichaTecnica = null; // Puede ser null
  let unidadProducto = "GR";
  let cantidad = 0;
  let precio = 0;
  let promocion = false;
  let descuento = 0;
  let stock = 0;
  let activo = true;
  let idCategoria = 0;
  let idUsuario = 0;

  onMount(async () => {
    if (id) {
      const response = await fetch(`http://localhost:8086/api/publico/productos/${id}`);
      const product = await response.json();
      
      sku = product.sku || "";
      nombre = product.nombre || "";
      descripcion = product.descripcion || "";
      urlImagen = product.urlImagen || "";
      urlFichaTecnica = product.urlFichaTecnica || null;
      unidadProducto = product.unidadProducto || "GR";
      cantidad = product.cantidad || 0;
      precio = product.precio || 0;
      promocion = product.promocion || false;
      descuento = product.descuento;
      stock = product.stock || 0;
      activo = product.activo;
      idCategoria = product.idCategoria || 0;
      idUsuario = product.idUsuario || 0;
    }
  });

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = {
      sku,
      nombre,
      descripcion,
      urlImagen,
      urlFichaTecnica,
      unidadProducto,
      cantidad,
      precio,
      promocion,
      descuento,
      stock,
      activo,
      idCategoria,
      idUsuario,
    };

    try {
      const method = id ? "PATCH" : "POST";
      const url = id ? `http://localhost:8086/api/publico/productos/${id}` : "http://localhost:8086/api/publico/productos";

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

      await response.json();

      Swal.fire({
        icon: 'success',
        title: 'Éxito',
        text: 'Producto guardado correctamente',
        showConfirmButton: false,
        timer: 1500
      }).then(() => {
        window.location.href = '/productos';
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
  <div class="col-12 col-md-8 mx-auto pt-3 mb-4 mb-md-0">
    <form on:submit={handleSubmit}>
      <div class="card p-3">
        <h3 class="text-center">{id ? "Editar Producto" : "Guardar Producto"}</h3>
        <div class="row mx-auto pt-3">

          <div class="col-12 col-md-6">
            <div class="input-group input-group-static my-2">
              <label for="SKU">SKU</label>
              <input type="text" class="form-control" bind:value={sku} required />
            </div>
          </div>

          <div class="col-12 col-md-6">
            <div class="input-group input-group-static my-2">
              <label for="Nombre">Nombre</label>
              <input type="text" class="form-control" bind:value={nombre} required />
            </div>
          </div>

          <div class="col-12 col-md-12">
            <div class="input-group input-group-static my-2">
              <label for="Descripción">Descripción</label>
              <textarea class="form-control" bind:value={descripcion} required></textarea>
            </div>
          </div>

          <div class="col-12 col-md-6">
            <div class="input-group input-group-static my-2">
              <label for="URL">URL Imagen</label>
              <input type="url" class="form-control" bind:value={urlImagen} required />
            </div>
          </div>

          <div class="col-12 col-md-6">
            <div class="input-group input-group-static my-2">
              <label for="URL">URL Ficha Técnica</label>
              <input type="url" class="form-control" bind:value={urlFichaTecnica} />
            </div>
          </div>

          <div class="col-12 col-md-6">
            <div class="input-group input-group-static my-2">
              <label for="Unidad">Unidad de Producto</label>
              <input type="text" class="form-control" bind:value={unidadProducto} required />
            </div>
          </div>

          <div class="col-12 col-md-6">
            <div class="input-group input-group-static my-2">
              <label for="Cantidad">Cantidad</label>
              <input type="number" class="form-control" bind:value={cantidad} required />
            </div>
          </div>

          <div class="col-12 col-md-6">
            <div class="input-group input-group-static my-2">
              <label for="Precio">Precio</label>
              <input type="number" class="form-control" bind:value={precio} required />
            </div>
          </div>

          <div class="col-12 col-md-6">
            <div class="input-group input-group-static my-2">
              <label for="Descuento">Descuento</label>
              <input type="number" class="form-control" bind:value={descuento} required />
            </div>
          </div>

          <div class="col-12 col-md-6">
            <div class="input-group input-group-static my-2">
              <label for="Stock">Stock</label>
              <input type="number" class="form-control" bind:value={stock} required />
            </div>
          </div>

          <div class="col-12 col-md-3">
            <div class="form-check form-switch my-2">
              <label for="activo" class="form-check-label">Promoción</label>
              <input type="checkbox" class="form-check-input" bind:checked={promocion} />
            </div>
          </div>

          <div class="col-12 col-md-3">
            <div class="form-check form-switch my-2">
              <label for="activo" class="form-check-label">Activo</label>
              <input type="checkbox" class="form-check-input" bind:checked={activo} />
            </div>
          </div>

          <div class="col-12 col-md-6">
            <div class="input-group input-group-static my-2">
              <label for="ID Categoría">ID Categoría</label>
              <input type="number" class="form-control" bind:value={idCategoria} required />
            </div>
          </div>

          <div class="col-12 col-md-6">
            <div class="input-group input-group-static my-2">
              <label for="ID Usuario">ID Usuario</label>
              <input type="number" class="form-control" bind:value={idUsuario} required />
            </div>
          </div>

          <div class="col-12 text-center">
            <a href="/productos" class="btn btn-danger">Cancelar</a>
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

  .form-switch .form-check-input:checked {
    border-color: #42424a;
    background-color: #4CAF50;
}
</style>