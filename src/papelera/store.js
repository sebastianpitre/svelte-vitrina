import { writable } from 'svelte/store';

// Store para el token
export const authToken = writable('');

// Store para manejar el estado de autenticación
export const isAuthenticated = writable(false);

// Validar el token cada 10 minutos (600,000 ms)
function validateTokenPeriodically() {
    setInterval(async () => {
        authToken.subscribe(async (token) => {
            if (token) {
                try {
                    const response = await fetch('http://localhost:8086/auth/cuenta', {
                        method: 'GET',
                        headers: {
                            'Authorization': `Bearer ${token}`,
                        },
                    });

                    if (response.ok) {
                        isAuthenticated.set(true);
                    } else {
                        // Si el token no es válido, cerrar sesión
                        logout();
                    }
                } catch (error) {
                    console.error('Error al validar el token:', error);
                    logout();
                }
            }
        });
    }, 600000);
}

export function login(token) {
    authToken.set(token);
    localStorage.setItem('authToken', token);
    isAuthenticated.set(true);
    validateTokenPeriodically();
}

export function logout() {
    authToken.set('');
    localStorage.removeItem('authToken');
    isAuthenticated.set(false);
}

authToken.subscribe((token) => {
    if (!token) {
        const savedToken = localStorage.getItem('authToken');
        if (savedToken) {
            authToken.set(savedToken);
            validateTokenPeriodically();
        }
    }
});
