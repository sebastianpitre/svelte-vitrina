// src/api/auth.js
import { user } from '../stores/user';

// Función para guardar el token en un store
export function saveToken(token) {
    localStorage.setItem('accessToken', token);
}

// Función para obtener el token desde el store o localStorage
export function getToken() {
    return localStorage.getItem('accessToken');
}

// Función para realizar el login, guardar el token y la información del usuario
export async function login(credentials) {
    try {
        const response = await fetch('http://localhost:8086/api/auth/admin/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(credentials)
        });

        if (response.ok) {
            const data = await response.json();
            localStorage.setItem('data', JSON.stringify(data));
            saveToken(data.accessToken);

            // Ahora obtenemos el perfil del usuario utilizando el token
            const userResponse = await fetchWithAuth('http://localhost:8086/api/auth/perfil');
            
            if (userResponse) {
                console.log(data)
                user.set(userResponse); // Guardar la información del usuario en un Svelte store
            } else {
                console.error('Error al obtener información del perfil');
            }

            return data;
            

        } else {
            throw new Error('Login fallido');
        }
    } catch (error) {
        console.error('Error en el login:', error);
        throw error;
    }
}

// Función para realizar solicitudes autenticadas
export async function fetchWithAuth(url, options = {}) {
    const token = getToken();

    if (!token) {
        throw new Error('No hay token disponible');
    }

    const response = await fetch(url, {
        ...options,
        headers: {
            ...options.headers,
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        }
    });

    if (response.ok) {
        return await response.json();
    } else {
        console.error('Error en la solicitud:', response.statusText);
        return null; // O manejar el error de otra manera
    }
}
