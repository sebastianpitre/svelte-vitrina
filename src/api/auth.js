// src/api/auth.js
import { user } from '../stores/user';

// Función para guardar el token en localStorage
export function saveToken(token) {
    localStorage.setItem('accessToken', token);
}

// Función para obtener el token desde localStorage
export function getToken() {
    return localStorage.getItem('accessToken');
}

// Función para realizar el login y guardar el token
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
            saveToken(data.accessToken);
            return data;
        } else {
            throw new Error('Login fallido');
        }
    } catch (error) {
        console.error('Error en el login:', error);
        throw error;
    }
}

// Función genérica para realizar solicitudes autenticadas
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
        const text = await response.text(); // Obtener el cuerpo de la respuesta como texto
        return text ? JSON.parse(text) : null; // Si la respuesta no está vacía, intenta analizarla como JSON
    } else {
        const errorMessage = await response.text();
        console.error(`Error en la solicitud: ${response.status} ${response.statusText}: ${errorMessage}`);
        throw new Error(errorMessage || 'Error en la solicitud');
    }
}

export async function logout() {
    try {
        // Realizar la solicitud de logout al backend
        const response = await fetchWithAuth('http://localhost:8086/api/auth/admin/logout', {
            method: 'POST',
        });

        if (response.ok) {
            // Limpiar el token y los datos del usuario
            localStorage.removeItem('accessToken');
            user.set(null); // Limpiar la tienda de usuario

            // Redirigir al usuario a la página de inicio de sesión
            window.location.href = '/login';
        } else {
            console.error('Error al intentar cerrar sesión:', response.statusText);
        }
    } catch (error) {
        console.error('Error en el logout:', error.message || error);
    }
}
