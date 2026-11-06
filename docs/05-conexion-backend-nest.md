# 05 — Conexión del frontend Angular con el backend NestJS

## 1. Visión general

Hasta la clase 13 las pruebas se hicieron con una URL de pruebas (`jsonplaceholder.typicode.com`) y funcionó. El paso final es **conectarse con NestJS**.

```
Angular (frontDA)                          NestJS (BACK_NEST_ANGULAR)
http://localhost:4200                      http://127.0.0.1:3000
        │                                          ▲
        │  POST /auth/login                        │
        └──────── { email, password } ─────────────┘
                   ← devuelve token JWT
```

## 2. Configurar la URL del backend — environments

### 2.1 Generar los environments

```bash
ng g environments
```

Se crean **dos archivos**: uno para desarrollo y otro para producción.

### 2.2 `src/environments/environment.development.ts`

Se trabaja sobre el de desarrollo y se define la URL del servidor NestJS:

```ts
export const environment = {
    production: false,
    urlServidor: "http://127.0.0.1:3000"
};
```

### 2.3 Llamarlo desde el servicio de Auth

En `auth.service.ts`:

```ts
import { environment } from '../../../environments/environment.development';

private baseUrl = environment.urlServidor
```

Gracias a `fileReplacements` en `angular.json`, en desarrollo Angular reemplaza automáticamente `environment.ts` por `environment.development.ts`. Al compilar para producción se usa `environment.ts` (donde se pondría la URL real del servidor).

## 3. Petición de login al backend

En `auth.service.ts`:

```ts
loginConNest(credenciales: any){
  return this.http.post<any>(`${this.baseUrl}/auth/login`, credenciales);
}
```

El JSON del formulario reactivo (`{ email, password }`) es el que se envía a NestJS para que valide la información y se pueda autenticar.

## 4. Probar la conexión

1. Si se prueba **sin inicializar el backend**, la petición da error. Hay que levantar primero el servidor NestJS:

   ```bash
   # dentro del proyecto del backend (BACK_NEST_ANGULAR)
   npm run start:dev
   ```

2. Al volver a probar, aparece un **problema de CORS** (el navegador bloquea la petición entre dominios/puertos distintos).

## 5. Solucionar CORS en el backend

En el proyecto **BACK_NEST_ANGULAR**, en el archivo `main.ts`, se agrega la línea del CORS:

```ts
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();          // ← línea agregada para permitir peticiones del frontend
  await app.listen(3000);
}
bootstrap();
```

Con esto el navegador ya permite la petición desde `http://localhost:4200`.

## 6. Resultado: token generado

Para las pruebas se ingresa con:

- **email** con formato de correo válido.
- **password** entre **6 y 25 caracteres** (como está configurado en el Backend, con `class-validator`).

Si se cumple todo, el backend valida las credenciales y **genera el token**. En la consola del navegador se observa la respuesta.

✅ **Hemos conectado Angular con NestJS.**

## 7. Resumen del flujo completo de autenticación

1. El usuario llena el formulario reactivo en `/auth/login`.
2. El botón *Ingresar* solo se habilita si `loginForm.valid` es `true`.
3. `funIngresar()` llama a `AuthService.loginConNest(this.loginForm.value)`.
4. El servicio hace `POST http://127.0.0.1:3000/auth/login` con el JSON `{ email, password }`.
5. NestJS valida las credenciales (correo válido, password de 6 a 25 caracteres) y responde con el token.
6. El componente recibe la respuesta en el `subscribe` y la muestra por consola.

## 8. Problemas comunes y soluciones

| Error | Causa | Solución |
|---|---|---|
| Error de red al presionar Ingresar | El backend no está iniciado | Ejecutar `npm run start:dev` en el backend |
| Error de **CORS** en la consola | NestJS no permite el origen del frontend | Agregar `app.enableCors()` en `main.ts` del backend |
| `NullInjectorError: AuthService` | Falta registrar el proveedor | Agregar `AuthService` en `providers` de `auth.module.ts` |
| El formulario nunca se habilita | Validaciones incumplidas | Email con formato válido y password de 6 a 25 caracteres |
