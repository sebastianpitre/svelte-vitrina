// src/api/user.js
import { getToken } from './auth'; // Obtener el token desde el almacenamiento seguro

export async function fetchUserProfile() {
    const token = getToken();

    try {
        const response = await fetch('http://localhost:8086/api/auth/perfil', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`, // Validar el token
                'Content-Type': 'application/json'
            }
        });

        if (response.ok) {
            const userData = await response.json();
            return userData; // Retorna los datos del usuario
        } else {
            throw new Error('Error al obtener el perfil del usuario');
        }
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
}
