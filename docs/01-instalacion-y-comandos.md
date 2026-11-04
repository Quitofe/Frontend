# 01 — Instalación y comandos principales

## 1. Requisitos previos

- **Node.js** instalado (recomendado v18+ para Angular 17).
- **npm** (viene con Node).
- **Angular CLI** versión 17.

Verificar versiones:

```bash
node -v
npm -v
```

## 2. Instalación del CLI de Angular

Según la clase 12, se instala el CLI de Angular de dos formas:

```bash
# Instalación global (recomendada)
npm install -g @angular/cli@17

# Instalación local dentro del proyecto (forzada por compatibilidad)
npm install @angular/cli@17 @angular/core@17 --save --force
```

## 3. Creación del proyecto

```bash
ng new frontDA
cd frontDA
```

Esto genera la estructura base de Angular 17 con **componentes standalone por defecto** (importante: por eso los componentes de módulos se crean con `--no-standalone`).

## 4. Comandos principales del proyecto

Definidos en `package.json`:

| Comando | Script | Descripción |
|---|---|---|
| `ng serve` / `npm start` | `start` | Inicia el servidor de desarrollo en `http://localhost:4200` |
| `ng build` / `npm run build` | `build` | Compila el proyecto a producción (carpeta `dist/`) |
| `ng build --watch --configuration development` | `watch` | Compila en modo observación para desarrollo |
| `ng test` / `npm test` | `test` | Ejecuta las pruebas unitarias con Karma/Jasmine |

## 5. Comandos para generar archivos (scaffolding)

### 5.1 Ver la ayuda del comando

Para conocer todas las opciones disponibles al crear un componente (clase 12, diapositiva 5):

```bash
ng g c --help
```

### 5.2 Generar módulos

Se generan los tres módulos principales del proyecto:

```bash
ng g m web
ng g m auth
ng g m admin
```

### 5.3 Generar componentes — opciones importantes

| Opción | Efecto |
|---|---|
| `--no-standalone` | Crea el componente **dentro de un módulo** (NgModule) en lugar de standalone |
| `--skip-tests` | No genera el archivo `.spec.ts` de pruebas |
| `--inline-style` | El CSS va dentro del `.ts` (propiedad `styles`) |
| `--inline-template` | El HTML va dentro del `.ts` (propiedad `template`) |

> ⚠️ `--inline-style --inline-template` con la nueva sintaxis de control de flujo **solo funciona en Angular 17**.

### 5.4 Comandos usados en el proyecto (módulo WEB)

```bash
# Componente standalone con template y estilos inline (solo Angular 17)
ng g c web/nosotros --skip-tests --inline-style --inline-template

# Componente de módulo (crea los 4 archivos: .ts, .html, .css, .spec)
ng g c web/inicio --no-standalone

# ng g c web/blog
# OJO: crea los 4 archivos pero NO se registra solo en web.module.ts,
# hay que declararlo manualmente en el arreglo `declarations`
```

### 5.5 Comandos usados en el proyecto (módulo AUTH)

```bash
ng g c auth/components/login --no-standalone --skip-tests
ng g c auth/components/register --no-standalone --skip-tests
```

### 5.6 Comandos usados en el proyecto (módulo ADMIN)

```bash
# Componente base
ng g c admin/components/perfil --no-standalone --skip-tests
ng g c admin/components/cliente --no-standalone --skip-tests

# Sub-módulo de inventario con sus componentes
ng g m admin/inventario
ng g c admin/inventario/components/producto  --no-standalone --skip-tests
ng g c admin/inventario/components/categoria --no-standalone --skip-tests

# Sub-módulo de pedidos con sus componentes
ng g m admin/pedido
ng g c admin/pedido/components/lista-pedido --no-standalone --skip-tests
ng g c admin/pedido/components/nuevo-pedido --no-standalone --skip-tests

# Layout del panel de administración
ng g c admin/layout
```

### 5.7 Generar servicios y environments

```bash
# Servicio de autenticación (clase 13)
ng g s auth/services/auth

# Environments de desarrollo y producción (clase 13, diapositiva 47)
ng g environments
```

`ng g environments` crea dos archivos:

- `src/environments/environment.ts` → **producción**
- `src/environments/environment.development.ts` → **desarrollo** (este es el que se usa con `ng serve`)

## 6. Extensión recomendada del editor

Para facilitar el desarrollo se recomienda instalar la extensión de **Angular** (Language Service) en VS Code, que autocompleta y valida las plantillas.

## 7. Subir el proyecto a GitHub

```bash
git remote add origin https://github.com/usuario/front_angular_nest.git
git push -u origin main
```
