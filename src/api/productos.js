import { fetchWithAuth } from './auth'; // Verifica que la ruta sea correcta

// FETCH PRODUCTOS 🚩...

export async function getProductos() {
    try {
        const products = await fetchWithAuth('http://localhost:8086/api/admin/productos');
        return products;
    } catch (error) {
        console.error('Error fetching products:', error);
        throw error;
    }
}


// POST PRODUCTOS 🚩...

// DELETE PRODUCTOS 🚩...