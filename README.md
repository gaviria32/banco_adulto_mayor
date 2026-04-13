# Banco Adulto Mayor: Inclusión y Accesibilidad

![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)
![React Version](https://img.shields.io/badge/react-19.0-blue)
![Vite Version](https://img.shields.io/badge/vite-6.2-purple)

**Banco Adulto Mayor** es una plataforma de banca digital diseñada específicamente para adultos mayores, priorizando la facilidad de uso, la claridad visual y la asistencia interactiva. El objetivo principal es eliminar las barreras tecnológicas que impiden a las personas mayores gestionar sus finanzas de forma autónoma y segura.

---

## Características Principales

### Accesibilidad de Primer Nivel
- **Tipografía Adaptativa:** Fuentes de gran tamaño y escalas fluidas para facilitar la lectura.
- **Alto Contraste:** Paletas de colores optimizadas para personas con visión reducida.
- **Asistencia de Voz:** Un asistente virtual siempre presente que guía al usuario en cada paso.
- **Modos de Daltonismo:** Configuración específica para Protanopía, Deuteranopía y Tritanopía.

### Experiencia de Usuario Simplificada
- **Flujos Intuitivos:** Procesos de pago, envío de dinero y retiro simplificados al mínimo de pasos.
- **Feedback Visual:** Animaciones claras y sutiles para confirmar acciones (ej: Nuevo escáner QR con láser animado).
- **Diseño Responsivo:** Totalmente optimizado para dispositivos móviles, evitando zooms accidentales y solapamientos.

### Seguridad Amigable
- **Biometría Simplificada:** Acceso fácil mediante huella o rostro con instrucciones claras.
- **Aprobación Familiar:** Opción para que familiares autoricen movimientos grandes para mayor tranquilidad.

---

## Tecnologías Utilizadas

- **Core:** [React 19](https://react.dev/)
- **Bundler:** [Vite](https://vitejs.dev/)
- **Styling:** [Tailwind CSS v4](https://tailwindcss.com/)
- **Iconografía:** [Lucide React](https://lucide.dev/)
- **Animaciones:** [Framer Motion](https://www.framer.com/motion/)

---

## Instalación y Uso

Siga estos pasos para ejecutar el proyecto en su entorno local:

### 1. Requisitos Previos
Asegúrese de tener instalado [Node.js](https://nodejs.org/) (versión 18 o superior).

### 2. Clonar el Repositorio
```bash
git clone https://github.com/gaviria32/banco_adulto_mayor.git
cd banco_adulto_mayor
```

### 3. Instalar Dependencias
```bash
npm install
```

### 4. Ejecutar el Proyecto
```bash
npm run dev
```
La aplicación se abrirá en su navegador en la dirección `http://localhost:3000`.

---

## Estructura del Proyecto

- `src/components`: Componentes reutilizables de la interfaz.
- `src/components/screens`: Pantallas principales de los flujos bancarios.
- `src/lib`: Utilidades y configuraciones globales (Tailwind, Hooks).
- `src/index.css`: Sistema de diseño base y variables de color.

---

## Contribución

¡Las contribuciones son bienvenidas! Si tienes ideas para mejorar la accesibilidad o nuevas funciones, por favor abre un *Issue* o envía un *Pull Request*.

---

## Licencia

Este proyecto está bajo la Licencia MIT.
