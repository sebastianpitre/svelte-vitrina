import { writable } from 'svelte/store';

// Crear el store para la categoría seleccionada
export const selectedCategory = writable('all');
