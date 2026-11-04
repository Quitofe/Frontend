# 03 — Módulos y rutas

## 1. Rutas raíz — `app.routes.ts`

En Angular 17 las rutas principales se definen en `app.routes.ts`. Cada ruta carga su módulo con **lazy loading** mediante `loadChildren`:

```ts
import { Routes } from '@angular/router';

export const routes: Routes = [
  {path: 'admin', loadChildren: () => import('./admin/admin.module').then(adm => adm.AdminModule)},
  {path: 'auth',  loadChildren: () => import('./auth/auth.module').then(aut => aut.AuthModule)}
];
```

- La ruta `admin` carga el `AdminModule`.
- La ruta `auth` carga el `AuthModule`.
- Cada módulo a su vez habilita su propio `RoutingModule` donde están las rutas de configuración del proyecto.

## 2. Módulo AUTH — `auth-routing.module.ts`

```ts
const routes: Routes = [
  { path: "",        redirectTo: 'login', pathMatch: 'full' },
  { path: "login",   component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: '**',      redirectTo: 'login' }
];
```

- Si el path de auth está **vacío**, redirecciona a `login`.
- Si se intenta acceder a una ruta que **no existe** (`**`), siempre va a `login`.

## 3. Módulo ADMIN — `admin-routing.module.ts` y el Layout

### 3.1 Problema inicial

Si se registra `perfil` como ruta directa, el componente aparece **fuera** del template del panel ADMIN. La solución es usar un **Layout** como ruta contenedora.

### 3.2 LayoutComponent

Se crea el componente `layout` dentro de `admin` y se configura como **ruta vacía** con `children`, para que cargue todos los componentes hijos:

```ts
const routes: Routes = [
  {
    path: "",
    component: LayoutComponent,
    children: [
      { path: "perfil",    component: PerfilComponent },
      { path: "categoria", component: CategoriaComponent }
    ]
  },
];
```

> ¿Por qué `categoria` aparece al final? El orden importa: las rutas más específicas deben ir antes que las genéricas; aquí se agregó al final del arreglo de children.

### 3.3 Template del layout — `layout.component.html`

```html
<p>Template ADMIN</p>
<a routerLink="/admin">Admin</a> |
<a routerLink="/admin/perfil">Perfil</a> |
<a routerLink="/admin/categoria">Categoria</a>
<router-outlet/>
```

- Los `routerLink` permiten **navegar por las diferentes rutas** sin recargar la página.
- El `<router-outlet/>` interior es donde se renderizan los `children` (perfil, categoría, etc.).

## 4. Módulo WEB — `web.module.ts`

Declara los componentes públicos del sitio:

```ts
@NgModule({
  declarations: [InicioComponent],
  imports: [CommonModule]
})
export class WebModule { }
```

> ⚠️ Recordar: cuando se crea un componente con `ng g c web/blog`, los 4 archivos se generan pero el componente **no se agrega automáticamente** a `declarations`; hay que registrarlo a mano.

## 5. Sub-módulos de Admin

### `inventario.module.ts`
```ts
@NgModule({
  declarations: [ProductoComponent, CategoriaComponent],
  imports: [CommonModule]
})
export class InventarioModule { }
```

### `pedido.module.ts`
```ts
@NgModule({
  declarations: [ListaPedidoComponent, NuevoPedidoComponent],
  imports: [CommonModule]
})
export class PedidoModule { }
```

## 6. Flujo de navegación completo

```
/                → app.component.html → <router-outlet/>
├── /admin       → AdminModule → admin-routing
│   └── (vacío)  → LayoutComponent (template ADMIN + menú)
│       ├── /admin/perfil     → PerfilComponent
│       └── /admin/categoria  → CategoriaComponent
└── /auth        → AuthModule → auth-routing
    ├── (vacío)  → redirige a /auth/login
    ├── /auth/login    → LoginComponent
    ├── /auth/register → RegisterComponent
    └── ** (cualquier otra) → redirige a /auth/login
```
