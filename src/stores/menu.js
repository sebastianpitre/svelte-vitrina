import { writable } from 'svelte/store';

export const currentPath = writable(window.location.pathname);

export function updatePath(path) {
    currentPath.set(path);
}
