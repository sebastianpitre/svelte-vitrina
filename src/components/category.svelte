<script>
  import { onMount } from 'svelte';
  import { selectedCategory } from '../stores/stores';
  import { writable } from 'svelte/store';

  let listCategorias = writable([]);

  // Obtener categorías cuando el componente se monta
  onMount(async () => {
    try {
      const response = await fetch('http://localhost:8086/api/publico/categorias');
      if (!response.ok) {
        throw new Error('Error al obtener las categorías');
      }
      const results = await response.json();
      listCategorias.set(results);
    } catch (error) {
      console.error('Error:', error);
    }
  });

  // Función para seleccionar una categoría
  function selectCategory(categoria) {
    selectedCategory.set(categoria);
  }
</script>


  <div class="div ">
    <ul class="ul mb-0 py-2 mt-1 border-radius-lg">
      <li class="li ms-n4">
        <a class="carta text-dark { $selectedCategory === 'all' ? 'selected' : '' }" href="/" on:click|preventDefault={() => selectCategory('all')}>Todos</a>
      </li>
      {#each $listCategorias as values}
        <li class="li ">
          <a class="carta { $selectedCategory === values.nombre ? 'selected' : '' }" href="/estilos/{values.nombre}/" on:click|preventDefault={() => selectCategory(values.nombre)}>
            <img class="icon opacity-9 bg-white" src="{values.imagen}" alt="icon" width="30px" height="100%">
            <span class="ms-2 text-dark me-3 me-xl-0">{values.nombre}</span>
          </a>
        </li>
      {/each}
    </ul>
  </div>

<style>
    
.div {
    -ms-overflow-style: none;
    box-sizing: border-box;
    display: block;
    overflow: scroll;
    scrollbar-width: none;
    text-align: center;
}
.div::-webkit-scrollbar {
    display: none
}
.ul {
    display: inline-flex;
    white-space: nowrap
}
.li {
    scrollbar-face-color:transparent;scrollbar-track-color:transparent;margin-right: 10px;
    scrollbar-width: none
}
._2X7zW::-webkit-scrollbar {
    display: none
}
.carta {
    align-items: center;
    background: #fff;
    border-radius: 0.60rem;
    box-shadow: 0 4px 6px -1px rgba(0,0,0,.1),0 2px 4px -1px rgba(0,0,0,.06);
    box-sizing: border-box;
    display: flex;
    font-family: Roboto,Helvetica,Arial,sans-serif;
    font-size: 14px;
    font-weight: 500;
    padding: 8px 16px;
    min-height: 45px;
    max-height: 45px;
}
.carta:active {
    background: #f5f5f5
}

.carta:hover {
    box-shadow: 4px 4px 2px 1px rgba(0, 0, 0, 0.2);
    color:#151515;
}

li, ul {
    list-style: none;
}

.selected {
    border: 1px groove #151515;
    
}



</style>