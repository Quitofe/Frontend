# Documentación del Proyecto — frontDA (Angular 17 + NestJS)

Documentación completa del proyecto **frontDA**, un frontend desarrollado en **Angular 17** que se conecta a un backend **NestJS**. Basada en las clases 12 y 13 del curso (*Proyecto parte 6 y parte 7*).

## Índice de documentación

| Documento | Contenido |
|---|---|
| [01-instalacion-y-comandos.md](./01-instalacion-y-comandos.md) | Instalación de dependencias, creación del proyecto y **comandos principales** para generar módulos, componentes y rutas |
| [02-estructura-del-proyecto.md](./02-estructura-del-proyecto.md) | Estructura de carpetas y explicación de cada archivo del proyecto |
| [03-modulos-y-rutas.md](./03-modulos-y-rutas.md) | Configuración de módulos (Web, Auth, Admin) y sistema de rutas con `loadChildren` y rutas anidadas |
| [04-formularios-y-http.md](./04-formularios-y-http.md) | `ReactiveFormsModule` (login reactivo) y `HttpClientModule` (peticiones HTTP) |
| [05-conexion-backend-nest.md](./05-conexion-backend-nest.md) | Cómo se enlaza el frontend Angular con el backend NestJS (servicios, environments y CORS) |

## Comandos principales (resumen rápido)

```bash
# 1. Instalar el CLI de Angular (versión 17)
npm install -g @angular/cli@17

# 2. Crear el proyecto
ng new frontDA
cd frontDA

# 3. Instalar dependencias
npm install @angular/cli@17 @angular/core@17 --save --force

# 4. Iniciar el proyecto (servidor de desarrollo)
ng serve
# → http://localhost:4200
```

### Comandos de generación de archivos

```bash
# Generar un MÓDULO
ng g m web
ng g m auth
ng g m admin

# Generar un COMPONENTE (dentro de un módulo, no standalone)
ng g c web/inicio --no-standalone
ng g c auth/components/login --no-standalone --skip-tests

# Componente standalone con HTML y CSS inline (solo Angular 17)
ng g c web/nosotros --skip-tests --inline-style --inline-template

# Generar un SERVICIO
ng g s auth/services/auth

# Generar environments (desarrollo / producción)
ng g environments
```

### Comandos de Git (repositorio en GitHub)

```bash
git remote add origin https://github.com/usuario/front_angular_nest.git
git push -u origin main
```

## ¿Cómo se inicia el proyecto?

1. **Backend NestJS** debe estar corriendo primero (por defecto en `http://127.0.0.1:3000`):
   ```bash
   # dentro del proyecto del backend
   npm run start:dev
   ```
2. **Frontend Angular**:
   ```bash
   npm start        # o: ng serve
   ```
   La aplicación se abre en `http://localhost:4200` y se recarga automáticamente al cambiar archivos.

## Arquitectura general

```
Navegador
   │
   ▼
Angular 17 (frontDA)  ──HTTP (POST /auth/login)──▶  NestJS (BACK_NEST_ANGULAR)
   http://localhost:4200                              http://127.0.0.1:3000
```

- **App principal** (`app.routes.ts`): carga por rutas los módulos `admin` y `auth` con *lazy loading* (`loadChildren`).
- **Módulo Web**: páginas públicas (inicio, blog, nosotros).
- **Módulo Auth**: login y registro con formularios reactivos y comunicación con NestJS.
- **Módulo Admin**: panel privado con layout, perfil, clientes, inventario (producto/categoría) y pedidos.
