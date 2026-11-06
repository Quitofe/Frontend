# 02 — Estructura del proyecto

```
frontDA/
├── angular.json                  # Configuración del proyecto Angular (builder, budgets, environments)
├── package.json                  # Dependencias y scripts
├── tsconfig.json                 # Configuración base de TypeScript
├── tsconfig.app.json             # TS para la aplicación
├── tsconfig.spec.json            # TS para pruebas
├── dist/                         # Salida de la compilación (ng build)
├── node_modules/                 # Dependencias instaladas
├── docs/                         # Esta documentación
└── src/
    ├── index.html                # Página HTML raíz
    ├── main.ts                   # Punto de entrada (bootstrapApplication)
    ├── styles.css                # Estilos globales
    ├── favicon.ico
    ├── assets/                   # Recursos estáticos
    ├── environments/
    │   ├── environment.ts                  # Producción (vacío por ahora)
    │   └── environment.development.ts      # Desarrollo: urlServidor = http://127.0.0.1:3000
    └── app/
        ├── app.component.ts/.html/.css     # Componente raíz (solo tiene <router-outlet/>)
        ├── app.config.ts                   # Proveedores globales (router + HttpClient)
        ├── app.routes.ts                   # Rutas raíz (carga admin y auth con loadChildren)
        │
        ├── web/                            # MÓDULO WEB (público)
        │   ├── web.module.ts
        │   ├── inicio/                     # ng g c web/inicio --no-standalone
        │   ├── blog/                       # ng g c web/blog
        │   └── nosotros/                   # ng g c web/nosotros (standalone, inline)
        │
        ├── auth/                           # MÓDULO AUTH (autenticación)
        │   ├── auth.module.ts              # Importa ReactiveFormsModule + HttpClientModule
        │   ├── auth-routing.module.ts      # Rutas: login, register, redirecciones
        │   ├── components/
        │   │   ├── login/                  # Formulario reactivo de inicio de sesión
        │   │   └── register/               # Formulario de registro
        │   └── services/
        │       └── auth.service.ts         # Peticiones HTTP al backend NestJS
        │
        └── admin/                          # MÓDULO ADMIN (panel privado)
            ├── admin.module.ts
            ├── admin-routing.module.ts     # Ruta vacía → LayoutComponent con children
            ├── layout/                     # Template del panel (menú + <router-outlet/>)
            ├── components/
            │   ├── perfil/
            │   └── cliente/
            ├── inventario/                 # Sub-módulo
            │   ├── inventario.module.ts
            │   └── components/
            │       ├── producto/
            │       └── categoria/
            └── pedido/                     # Sub-módulo
                ├── pedido.module.ts
                └── components/
                    ├── lista-pedido/
                    └── nuevo-pedido/
```

## Archivos clave explicados

### `src/main.ts`
Punto de entrada. Arranca la aplicación con `bootstrapApplication(AppComponent, appConfig)`.

### `src/app/app.component.html`
Se eliminó todo el código por defecto y quedó solo:

```html
<h1>Componente raiz</h1>
<router-outlet />
```

`<router-outlet/>` es la instrucción que se encarga de **cargar los componentes hijos** según la ruta activa.

### `src/app/app.config.ts`
Registra los proveedores globales de la aplicación:

```ts
export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), provideHttpClient(withFetch())]
};
```

- `provideRouter(routes)` → habilita el enrutamiento.
- `provideHttpClient(withFetch())` → habilita el cliente HTTP (proveedor requerido para `HttpClient`).

### `src/environments/environment.development.ts`
```ts
export const environment = {
    production: false,
    urlServidor: "http://127.0.0.1:3000"
};
```

Gracias a `fileReplacements` en `angular.json`, al compilar en desarrollo este archivo **reemplaza** a `environment.ts`. Aquí se define la URL del backend NestJS.

### Componente `nosotros` (estilo inline)

En este componente el HTML y el CSS viven **dentro del mismo `.ts`** (clase 12, diapositiva 9):

```ts
@Component({
  selector: 'app-nosotros',
  standalone: true,
  template: `<p>nosotros works!</p>`,
  styles: ``
})
export class NosotrosComponent {}
```
