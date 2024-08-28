// utils/pdfUtils.js
import jsPDF from 'jspdf';

export function generatePDF() {
  // Obtener los productos del localStorage
  const productos = JSON.parse(localStorage.getItem('cart')) || [];

  // Crear una nueva instancia de jsPDF
  const doc = new jsPDF();

  // Agregar un título
  doc.setFontSize(18);
  doc.text('Productos en el Carrito', 10, 10);

  // Agregar los datos de los productos
  let y = 20; // Posición inicial vertical

  productos.forEach((producto, index) => {
    doc.setFontSize(12);
    doc.text(`Producto ${index + 1}:`, 10, y);
    doc.text(`ID: ${producto.id}`, 20, y + 10);
    doc.text(`Nombre: ${producto.name}`, 20, y + 20);
    doc.text(`Precio: ${producto.price}`, 20, y + 30);
    doc.text(`Cantidad: ${producto.quantity}`, 20, y + 40);
    y += 50; // Espacio entre productos
  });

  // Guardar el PDF
  doc.save('productos-carrito.pdf');
}
