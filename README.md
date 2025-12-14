# Reverso Social – Frontend

Este repositorio contiene el **frontend del proyecto Reverso Social**, desarrollado con **React (JavaScript)** .
En esta primera entrega se construyó la estructura base del proyecto, los componentes principales de la interfaz y los estilos iniciales utilizando **SASS**.

---

## 🚀 Tecnologías utilizadas

- **React JS**
- **JavaScript (ES6+)**
- **Vite** como bundler
- **SASS / SCSS** para los estilos
- **React Router**
- **ESLint** para estándares de código

---

## 📁 Estructura del proyecto

La estructura principal del directorio `src/` quedó organizada de la siguiente manera:
```
src
│
├── api/             # Lógica de llamadas al backend
├── assets/          # Imágenes, íconos, recursos estáticos
├── components/      # Componentes reutilizables de la UI
│   ├── About/
│   ├── Background/
│   ├── BlogCard/
│   ├── ContactDetailModal/
│   ├── ContactModal/
│   ├── DownloadModal/
│   ├── Footer/
│   ├── GlobalModal/
│   ├── Header/
│   ├── Hero/
│   ├── LoginModal/
│   ├── NavBar/
│   ├── Pagination/
│   ├── ScrollToTop/
│   ├── SearchBar/
│   ├── SEO/
│   ├── ServicesSection/
│   ├── TeamSection/
│   └── UserMenu/
│
├── config/          # Configuraciones (ej. axios)
├── data/            # Datos estáticos o mock data
├── hooks/           # Custom hooks
├── pages/           # Páginas principales
│   ├── AdminDashboard/
│   ├── BlogDetail/
│   ├── BlogPage/
│   ├── HomePage/
│   ├── ResourcesPage/
│   └── ServiceDetails/
│
├── styles/          # Estilos globales y configuración SASS
│   ├── _layout.scss
│   ├── _mixins.scss
│   ├── _typography.scss
│   ├── _variables.scss
│   └── main.scss
│
├── tests/           # Tests unitarios y de integración
├── App.jsx
├── main.jsx
```

Cada componente y página cuenta con sus **dos archivos correspondientes**:
- `Nombre.jsx` → Componente funcional
- `Nombre.scss` → Estilos específicos del componente

## 🎯 Objetivos del Sprint 1

✔ Crear la estructura base del proyecto con Vite  
✔ Configurar SASS y crear arquitectura inicial de estilos (variables, mixins, layout, tipografía)  
✔ Implementar los primeros componentes básicos del landing page  
✔ Crear las páginas iniciales: **HomePage** y **ResourcesPage**  
✔ Añadir la navegación principal  
✔ Dejar preparado el proyecto para escalar en futuros sprints  

---

## 🖥️ Scripts disponibles

En el directorio raíz puedes ejecutar:

### `npm install`
Instala todas las dependencias necesarias del proyecto.

### `npm run dev`
Levanta el entorno de desarrollo con Vite.

### `npm run build`
Genera la versión optimizada para producción.

### `npm run preview`
Sirve la build generada para revisión.

---

## ⚙️ Stack Tecnológico

| Tecnología       | Versión   | Propósito                      |
|------------------|-----------|--------------------------------|
| **React**        | ^19.2.0   | Librería principal de UI       |
| **Vite**         | ^7.2.4    | Bundler y entorno de desarrollo|
| **SASS**         | ^1.96.0   | Preprocesador CSS              |
| **React Router** | ^7.10.1   | Enrutamiento                   |
| **Axios**        | ^1.13.2   | Cliente HTTP                   |
| **Vitest**       | ^4.0.15   | Framework de Tests             |

### Backend (Referencia)

El backend de este proyecto está construido con **Java y Spring Boot**.

| Tecnología       | Versión   | Propósito                      |
|------------------|-----------|--------------------------------|
| **Java**         | 21        | Lenguaje de programación       |
| **Spring Boot**  | 3.4.12    | Framework principal            |
| **PostgreSQL**   | -         | Base de datos relacional       |
| **Spring Security**| -       | Seguridad y Autenticación      |
| **JWT**          | 4.4.0     | Tokens (Auth0)                 |
| **MapStruct**    | 1.5.5     | Mapeo de objetos               |
| **Lombok**       | 1.18.34   | Reducción de boilerplate       |

---

## 🚀 Instrucciones de Despliegue

Para desplegar la aplicación en un entorno de producción, sigue estos pasos:

1. **Instalar dependencias:**
   Asegúrate de tener Node.js instalado y ejecuta:
   ```bash
   npm install
   ```

2. **Construir el proyecto:**
   Genera los archivos estáticos optimizados para producción:
   ```bash
   npm run build
   ```
   Esto creará una carpeta `dist/` en la raíz del proyecto.

3. **Desplegar:**
   La carpeta `dist/` contiene todos los archivos estáticos necesarios (HTML, CSS, JS, imágenes).
   
   - **Servidor Estático:** Puedes subir el contenido de `dist/` a cualquier servidor web (Apache, Nginx, Vercel, Netlify, etc.).
   - **Preview Local:** Para verificar que la build funciona correctamente antes de subirla:
     ```bash
     npm run preview
     ```

---

## 🖼️ Capturas de pantalla

A continuación se añaden algunas capturas del estado del proyecto en este sprint:

<img width="1522" height="903" alt="image" src="https://github.com/user-attachments/assets/b3c165bc-501a-4ee1-872e-d5f2614e5b4c" />
<img width="1876" height="821" alt="image" src="https://github.com/user-attachments/assets/bedb1f94-2927-4757-96be-66e3348ffd90" />
<img width="1166" height="624" alt="image" src="https://github.com/user-attachments/assets/502dfb16-93e9-4313-9c65-3aa0b5acc30f" />
<img width="1372" height="812" alt="image" src="https://github.com/user-attachments/assets/8629fd5c-d0a5-4e02-8a53-50e630df944f" />
<img width="1505" height="407" alt="image" src="https://github.com/user-attachments/assets/5613f75e-3e07-483d-a455-7f949af9bf01" />
<img width="823" height="826" alt="image" src="https://github.com/user-attachments/assets/0f1d334e-33d3-4ddc-8283-fed40cacd9f9" />


---

## 🛠️ Equipo

Frontend colaborativo del proyecto **Reverso Social** — Sprint 1.

| Nombre | GitHub | LinkedIn |
|--------|--------|----------|
| **Angela Bello** | [@AngelaBello-creator](https://github.com/AngelaBello-creator) | [Angela Bello](https://www.linkedin.com/in/angela-bello-developer/) |
| **Andrea Olivera** | [@andreaonweb](https://github.com/andreaonweb) | [Andrea Olivera Romero](https://www.linkedin.com/in/AndreaOliveraRomero) |
| **Gabi Gallegos** | [@hgall3](https://github.com/hgall3) | [Gabriela Gallegos Anda](https://www.linkedin.com/in/gabrielagallegosanda/) |
| **Erika Montoya** | [@DevErika](https://github.com/DevErika) | [Erika Montoya](https://www.linkedin.com/in/erikamontoya/) |
| **Luisa Moreno** | [@LuMorenoM](https://github.com/LuMorenoM) | [Luisa Moreno](https://www.linkedin.com/in/luisa-moreno-474334338/) |

---

## 📄 Licencia

Este proyecto es de uso interno para desarrollo académico/profesional del equipo y no posee licencia pública.

---
