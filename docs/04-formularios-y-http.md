# 04 — Formularios reactivos y peticiones HTTP

## 1. ReactiveFormsModule (formularios reactivos)

El login se diseña como un **formulario reactivo** (documentación oficial de Angular).

### 1.1 Activar el módulo en `auth.module.ts`

```ts
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    AuthRoutingModule,
    ReactiveFormsModule,   // ← habilita los formularios reactivos
    HttpClientModule
  ]
})
export class AuthModule { }
```

### 1.2 Definir el formulario en `login.component.ts`

```ts
import { FormControl, FormGroup, Validators } from '@angular/forms';

export class LoginComponent {

  loginForm = new FormGroup({
    email:    new FormControl("", [Validators.email, Validators.required]),
    password: new FormControl("", Validators.required)
  })

  funIngresar(){
    this.authService.loginConNest(this.loginForm.value).subscribe(
      (res)   => { console.log(res) },
      (error) => { console.log(error) }
    )
  }
}
```

- `email` y `password` se validan como **obligatorios** (`Validators.required`), y el correo con `Validators.email`.
- `funIngresar()` se ejecuta al presionar el botón *Ingresar*.

### 1.3 Usar el formulario en `login.component.html`

```html
<h1>Ingresar</h1>
{{loginForm.value | json}}
{{loginForm.valid}}
<form [formGroup]="loginForm">
    <label>Ingrese Correo: </label>
    <input type="email" formControlName="email">
    <br>
    <label>Ingrese Contraseña: </label>
    <input type="password" formControlName="password">
    <br>
    <button (click)="funIngresar()" [disabled]="!loginForm.valid">Ingresar</button>
</form>
```

Puntos importantes:

- Al usar `formControlName="xxxx"`, los nombres **deben ser idénticos** a los definidos en `login.component.ts`.
- Para visualizar el valor se usa `{{loginForm.value | json}}`: como `loginForm.value` es un objeto, se convierte a string JSON con el pipe `| json`.
- Al ser reactivo, si se cambian los valores de email y password, los cambios se observan en tiempo real.
- `{{loginForm.valid}}` muestra `true` cuando se cumplen todas las validaciones.

### 1.4 Deshabilitar el botón Ingresar

El botón debe estar **desactivado** si el email no tiene formato de correo o si el password está vacío:

```html
<button (click)="funIngresar()" [disabled]="!loginForm.valid">Ingresar</button>
```

Para probarlo se quitan los valores por defecto de los controles, de modo que el formulario inicie inválido.

## 2. HttpClientModule (peticiones HTTP)

### 2.1 Importar el módulo en `auth.module.ts`

```ts
import { HttpClientModule } from '@angular/common/http';
// ... imports: [ ..., HttpClientModule ]
```

### 2.2 Habilitar el proveedor global en `app.config.ts`

```ts
import { provideHttpClient, withFetch } from '@angular/common/http';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), provideHttpClient(withFetch())]
};
```

### 2.3 Primera prueba con una URL de prueba

Se inyecta `HttpClient` en el componente y se hace una petición GET a `jsonplaceholder.typicode.com`:

```ts
private http = inject(HttpClient)

// GET http://jsonplaceholder.typicode.com/todos/1  → devuelve 1 registro
// GET http://jsonplaceholder.typicode.com/todos    → devuelve todos los registros
```

Al presionar *Ingresar*, por consola se observa el resultado de la petición: primero con `/todos/1` (un solo dato) y luego sin el `1` (todos los datos). Esto confirma que HTTP está funcionando.

## 3. Mover la lógica a un servicio

Por **arquitectura del proyecto** la petición no debe vivir en el componente: se crea un servicio dentro de la carpeta `services` de auth que contendrá todos los servicios de autenticación.

```bash
ng g s auth/services/auth
```

### 3.1 `auth.service.ts`

```ts
import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from '../../../environments/environment.development';

@Injectable({ providedIn: 'root' })
export class AuthService {

  private baseUrl = environment.urlServidor
  private http = inject(HttpClient)

  // constructor(private http: HttpClient) { }  ← así se inyectaba en versiones anteriores

  loginConNest(credenciales: any){
    return this.http.post<any>(`${this.baseUrl}/auth/login`, credenciales);
  }

  registroConNest(datos: any){
    return this.http.post<any>(`${this.baseUrl}/register`, datos);
  }
}
```

### 3.2 Inyectar el servicio en el componente

En `login.component.ts` se **quita** la inyección de `HttpClient` y se reemplaza por `AuthService`:

```ts
private authService = inject(AuthService)
```

### 3.3 Registrar el proveedor en `auth.module.ts`

Si al probar en el navegador da error, falta indicar en `auth.module.ts` que el proveedor será `AuthService`:

```ts
@NgModule({
  providers: [ AuthService ],
  ...
})
export class AuthModule { }
```

Con esto la petición HTTP ya funciona desde el servicio.
