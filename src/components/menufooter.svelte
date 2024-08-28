<script>
    import { onMount } from "svelte";
    import { currentPath, updatePath } from '../stores/menu.js';
    import { isModalOpen } from '../stores/modalStore.js';
    import { totalProducts, productCount, addToCart } from '../stores/cart.js';
    
    import { Router, Route, link } from 'svelte-routing';
    import { fetchUserProfile } from '../api/user';
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

    // Obtener el ID del primer rol (si existe)
    $: roleId = userProfile.roles?.[0]?.id ?? 'No tiene roles asignados';
    $: roleName = userProfile.roles?.[0]?.nombre ?? 'Sin rol';

    function openModal() {
        isModalOpen.set(true);
    }

    function handleAddProduct() {
        addToCart({ id: 1, name: 'Producto Ejemplo', price: 100 });
    }

    function isActive(path) {
        return $currentPath === path ? 'bg-select border-sebas border col-10 mx-auto' : 'col-8 mx-auto';
    }
</script>


    <div class="position-sticky bottom-1 d-md-none mb-n2" style="z-index: 999;">
        <div class="container-fluid">
            <div class="row mx-sebas" style="border-radius: 0.60rem; background-color: black;">

                <a class="col p-1 text-center" href="/" on:click={() => updatePath('/')}>
                    <div class="{isActive('/')}">
                        <span class="material-symbols-outlined text-white" style="border-radius: 50%; font-size: 28px;">home</span>
                        <p class="m-0 mt-n3 pt-1 text-white" style="font-size: 12px;">Inicio</p>
                    </div>
                    
                </a>
                {#if userProfile && userProfile.nombres}

                    <!-- ADMIN -->
                    {#if roleId === 1}
                        <a class="col p-1 text-center" href="/perfil" on:click={() => updatePath('/perfil')}>
                            <div class="{isActive('/perfil')}">
                                <span class="material-symbols-outlined text-white " style="border-radius: 50%; font-size: 28px;">person</span>
                                <p class="m-0 mt-n3 pt-1 text-white" style="font-size: 12px;">Mi cuenta</p>
                            </div>
                        </a>

                        <a class="col p-1 text-center" href="/productos" on:click={() => updatePath('/productos')}>
                            <div class="{isActive('/productos')}">
                                <span class="material-symbols-outlined text-white " style="border-radius: 50%; font-size: 28px;">manufacturing</span>
                                <p class="m-0 mt-n3 pt-1 text-white" style="font-size: 12px;">Admin</p>
                            </div>
                            
                        </a>

                        <button class="col btn text-capitalize mb-0 position-relative p-1 text-center" on:click={openModal}>
                            <span class="material-symbols-outlined text-success" style="border-radius: 50%; font-size: 28px;">shopping_cart</span>
        
                            {#if $productCount > 0}
                                <span class="position-absolute text-success border border-2 border-success bg-white" style="border-radius: 50%; width: 16px; height: 16px; font-size: 9px; top: 2px; right: 25px;">{$productCount}</span>
                            {/if}
                            <p class="m-0 mt-n3 pt-1 text-white" style="font-size: 12px;">Carrito</p>
                        </button>

                        <!-- USUARIO -->
                        {:else if roleId === 2}
                        <a class="col p-1 text-center" href="/perfil" on:click={() => updatePath('/perfil')}>
                            <div class="{isActive('/perfil')}">
                                <span class="material-symbols-outlined text-white " style="border-radius: 50%; font-size: 28px;">person</span>
                                <p class="m-0 mt-n3 pt-1 text-white" style="font-size: 12px;">Mi cuenta</p>
                            </div>
                        </a>
                        <!-- carrito -->

                        <button class="col btn text-capitalize mb-0 position-relative p-1 text-center" on:click={openModal}>
                            <div class="position-relative">
                                <span class="material-symbols-outlined text-success" style="border-radius: 50%; font-size: 28px;">shopping_cart</span>

                                {#if $productCount > 0}
                                    <span class="position-absolute text-success border border-2 border-success bg-white" style="border-radius: 50%; width: 16px; height: 16px; font-size: 9px; top: -4px; right: 37%;">{$productCount}</span>
                                {/if}
                            </div>
                            
                            <p class="m-0 mt-n3 pt-1 text-white" style="font-size: 12px;">Carrito</p>
                        </button>
                    {/if}
                {:else}

                <a class="col p-1 text-center" href="/login" on:click={() => updatePath('/perfil')}>
                    <div class="{isActive('/perfil')}">
                        <span class="material-symbols-outlined text-white " style="border-radius: 50%; font-size: 28px;">person</span>
                        <p class="m-0 mt-n3 pt-1 text-white" style="font-size: 12px;">Mi cuenta</p>
                    </div>
                </a>

                <!-- carrito -->

                <button class="col btn text-capitalize mb-0 position-relative p-1 text-center" on:click={openModal}>
                    <div class="position-relative">
                        <span class="material-symbols-outlined text-success" style="border-radius: 50%; font-size: 28px;">shopping_cart</span>

                        {#if $productCount > 0}
                            <span class="position-absolute text-success border border-2 border-success bg-white" style="border-radius: 50%; width: 16px; height: 16px; font-size: 9px; top: -4px; right: 37%;">{$productCount}</span>
                        {/if}
                    </div>
                    
                    <p class="m-0 mt-n3 pt-1 text-white" style="font-size: 12px;">Carrito</p>
                </button>
                {/if}
            </div>
        </div>
    </div>

    

<style>
.mx-sebas {
  margin-right: -6px !important;
  margin-left: -6px !important;
}

.border-sebas{
    border-radius: 0.60rem;
}

.bg-select{
    background-color: #38a900a8 ;
}
</style>
