// Importamos las funciones necesarias para interactuar con la API y la tienda de Svelte
import { getProductos } from './productos';
import { get } from 'svelte/store';
import { cart } from '../stores/cart';
import { fetchWithAuth } from './auth';

// Esta función se encargará de crear el pedido
export async function createPedido() {
    try {
        // Obtenemos el carrito desde el store de Svelte
        const carrito = get(cart);

        // Extraemos los IDs de los productos que están en el carrito
        const idsProductos = carrito.map(item => item.id);

        // Llamamos a la API para obtener todos los productos, luego filtramos solo los que están en el carrito
        const productosData = await getProductos();

        // Filtramos los productos que están en el carrito
        const productosEnCarrito = productosData.filter(producto => idsProductos.includes(producto.id));

        // Mapeamos el carrito para construir el array pedidoProductosDto que enviará los detalles de cada producto
        const pedidoProductosDto = carrito.map(item => {
            // Buscamos el producto en la lista de productos obtenidos de la API
            const producto = productosEnCarrito.find(p => p.id === item.id);

            // Construimos el objeto para cada producto en el pedido
            return {
                id: 0,  // El ID se deja en 0 porque normalmente lo genera la base de datos
                cantidad: item.quantity,  // Cantidad del producto en el carrito
                precio: producto.precio,  // Precio del producto
                productos: producto,  // Incluimos todos los detalles del producto
                totalProducto: producto.precio * item.quantity  // Calculamos el total por producto
            };
        });

        // Calculamos el monto total del pedido sumando el total de cada producto
        const montoTotal = pedidoProductosDto.reduce((total, item) => total + item.totalProducto, 0);

        // Creamos el objeto del pedido, que contiene todos los datos necesarios para la API
        const pedido = {
            id: 0,  // El ID del pedido, que también suele ser generado por la base de datos
            montoTotal: montoTotal,  // Monto total del pedido
            estadoPedido: "APROBADO",  // Estado del pedido, en este caso "APROBADO"
            fechaCreacion: new Date().toISOString(),  // Fecha de creación del pedido
            pedidoProductosDto: pedidoProductosDto,  // Lista de productos en el pedido
            idUsuario: 1,  // Aquí deberías poner el ID del usuario que realiza el pedido
            idPago: 1,  // Aquí deberías poner el ID del pago si aplica
            totalOrderPrice: montoTotal  // Monto total del pedido, el mismo que montoTotal en este caso
        };

        // Enviamos el pedido a la API usando fetchWithAuth, que maneja la autenticación
        const response = await fetch('http://localhost:8080/pedidos', {
            method: 'POST',  // Usamos el método POST para enviar el pedido
            headers: {
                'Content-Type': 'application/json'  // Indicamos que estamos enviando datos en formato JSON
            },
            body: JSON.stringify(pedido)  // Convertimos el objeto pedido a JSON para enviarlo en el body
        });

        // Verificamos si la respuesta no es OK, lo que indicaría un error
        if (!response.ok) {
            throw new Error('Error al crear el pedido');  // Lanzamos un error si algo sale mal
        }

        // Si todo salió bien, obtenemos la respuesta en formato JSON
        const data = await response.json();
        console.log('Pedido creado con éxito:', data);  // Imprimimos el resultado en la consola
    } catch (error) {
        console.error('Error al crear el pedido:', error);  // Capturamos e imprimimos cualquier error que ocurra
    }
}
