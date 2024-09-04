import { fetchWithAuth } from './auth'; // Verifica que la ruta sea correcta
import Swal from "sweetalert2";

// FETCH usuarios 🚩...

let listUsuarios = [];
export async function getUsuarios() {
    try {
        const usuarios = await fetchWithAuth('http://localhost:8086/api/admin/usuarios');
        return usuarios;
    } catch (error) {
        console.error('Error fetching usuarios:', error);
        throw error;
    }
}


// DELETE usuarios 🚩...

export async function eliminarUsuario(id) {
    try {
        const result = await Swal.fire({
            title: '¿Estás seguro?',
            text: 'Esta acción no se puede deshacer',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Sí, eliminar'
        });
        
        if (result.isConfirmed) {
            const response = await fetchWithAuth(`http://localhost:8086/api/admin/usuarios/${id}`, {
                method: 'DELETE',
            });

            // Si la respuesta es nula o vacía, aún considerar la eliminación como exitosa
            if (response || response === null) {
                listUsuarios = listUsuarios.filter(usuario => usuario.id !== id);
                Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: '¡Eliminado!',
                    text: 'El usuario ha sido eliminado.',
                    showConfirmButton: false,
                    timer: 1500
                });
                // Recargar la página después de eliminar el usuario
                location.reload();
            }
        }
    } catch (error) {
        Swal.fire(
            'Error',
            `Hubo un problema al eliminar el usuario: ${error.message || error}`,
            'error'
        );
    }
}




// POST usuarios 🚩...

