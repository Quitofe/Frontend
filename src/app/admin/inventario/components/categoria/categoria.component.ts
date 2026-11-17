import { Component, inject, OnInit } from '@angular/core';
import { CategoriaService } from '../../services/categoria.service';
import { FormGroup, FormControl } from '@angular/forms';
import Swal from 'sweetalert2';


interface Categoria {
  id: number,
  nombre: string;
  detalle: string
}

@Component({
  selector: 'app-categoria',
  templateUrl: './categoria.component.html',
  styleUrl: './categoria.component.css',
})
export class CategoriaComponent implements OnInit {

  private categoriaService = inject(CategoriaService)

  categorias: Categoria[] = []
  dialog_visible: boolean = false;
  categoria_id:number=-1;
  categoriaForm = new FormGroup ({
    nombre: new FormControl (''),
    detalle: new FormControl ('')
  });

  ngOnInit(): void {
    this.getCategorias()
  }

  getCategorias(){
    this.categoriaService.funListar().subscribe(
      (res:any) => {
        this.categorias = res;
      },
      (error:any) =>{
        console.log(error)
      }
    )
    
  }

  mostrarDialog(){
    this.dialog_visible = true
  }

  guardarCategoria(){
    if(this.categoria_id>0){
    this.categoriaService.funModificar(this.categoria_id,this.categoriaForm.value).subscribe(
      (res:any) =>{
        this.dialog_visible = false;
        this.getCategorias();
        this.categoria_id = -1
        this.alerta("ACTUALIZADO", "¡La Categoría se actualizó con éxito!", "success")
      },
      (error:any) =>{
        this.alerta("ERROR!",  "Error al intentar actualizar.", "error");
      }
    
    );
    this.categoriaForm.reset();
  }
  else{
  this.categoriaService.funGuardar(this.categoriaForm.value).subscribe(
    (res:any) => {
      this.dialog_visible = false;
      this.getCategorias();

      this.alerta("REGISTRADO", "¡La Categoría se creo con éxito!", "success")
    },
    (error:any) =>{
      this.alerta("ERROR!",  "Error al intentar guardar.", "error");
    }
  )
  }
  this.categoriaForm.reset();


  }
  editarCategoria(cat:Categoria){
    this.dialog_visible=true
    this.categoria_id = cat.id
    this.categoriaForm.setValue({nombre: cat.nombre, detalle: cat.detalle})
  }
  eliminarCategoria(cat:Categoria){
    Swal.fire({
      title: "¿Esta seguro de eliminar la Categoría?",
      text: "Una vez eliminado no se podra recuperar",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#eb1919c8",
      confirmButtonText: "¡Si, eliminar!",
      cancelButtonText: "Cancel"
    }).then((result) => {
      if (result.isConfirmed) {
        this.categoriaService.funEliminar(cat.id).subscribe(
          (res:any) =>{
            this.alerta("ELIMINADO", "Categoría Eliminada", "success")

            this.getCategorias();
            this.categoria_id = -1
          },
          (error:any) => {
            this.alerta("ERROR!",  "Error al intentar eliminar.", "error")

          }
        )

      }
    });
  }
  alerta(title:string, text:string, icon:'success'|'error'|'info'|'question'){
    Swal.fire({ title, text, icon});

  }

}
