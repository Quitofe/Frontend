import { Component } from '@angular/core';

@Component({
  selector: 'app-producto',
  templateUrl: './producto.component.html',
  styleUrl: './producto.component.css'
})
export class ProductoComponent {
  products: any[] = [{ id: 1, nombre: 'Teclado', precio: 394.96, categoria_id: 'Category 1', stock: 12, estado: 'Disponible' },
  { id: 2, nombre: 'Mouse', precio: 24.55, categoria_id: 'Category 2', stock: 5, estado: 'Agotado' },
  { id: 3, nombre: 'Monitor', precio: 450.00, categoria_id: 'Category 1', stock: 8, estado: 'Disponible' },
  { id: 4, nombre: 'Auriculares', precio: 89.99, categoria_id: 'Category 3', stock: 15, estado: 'Disponible' },
  { id: 5, nombre: 'Impresora', precio: 199.99, categoria_id: 'Category 2', stock: 3, estado: 'Agotado' },
  { id: 6, nombre: 'Cámara', precio: 299.99, categoria_id: 'Category 3', stock: 10, estado: 'Disponible' },
  { id: 7, nombre: 'Altavoces', precio: 79.99, categoria_id: 'Category 1', stock: 7, estado: 'Disponible' },
  { id: 8, nombre: 'Disco Duro', precio: 129.99, categoria_id: 'Category 2', stock: 4, estado: 'Agotado' },
  { id: 9, nombre: 'Memoria USB', precio: 19.99, categoria_id: 'Category 3', stock: 20, estado: 'Disponible' },
  { id: 10, nombre: 'Router', precio: 149.99, categoria_id: 'Category 1', stock: 6, estado: 'Disponible' },
  { id: 11, nombre: 'Tablet', precio: 299.99, categoria_id: 'Category 2', stock: 9, estado: 'Disponible' },
  { id: 12, nombre: 'Smartphone', precio: 699.99, categoria_id: 'Category 3', stock: 2, estado: 'Agotado' },
  { id: 13, nombre: 'Smartwatch', precio: 199.99, categoria_id: 'Category 1', stock: 11, estado: 'Disponible' },
  { id: 14, nombre: 'Cargador', precio: 29.99, categoria_id: 'Category 2', stock: 14, estado: 'Disponible' },
  { id: 15, nombre: 'Auriculares Bluetooth', precio: 59.99, categoria_id: 'Category 3', stock: 5, estado: 'Agotado' }
  ];
  cols: any[] = [];

  openNew(){

  }

  editProduct(product: any){

  }

  deleteProduct(product: any){

  }

}
