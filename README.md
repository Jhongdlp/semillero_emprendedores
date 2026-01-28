# 🌱 Semillero de Emprendedores - Generador de Perfiles de Proyecto

Una aplicación web moderna y profesional diseñada para ayudar a emprendedores a crear perfiles de proyecto completos y estructurados. La herramienta guía al usuario paso a paso, realiza cálculos financieros complejos automáticamente y genera un documento PDF listo para presentar en convocatorias y bancos.

![Estado del Proyecto](https://img.shields.io/badge/Estado-Finalizado-success)
![Next.js](https://img.shields.io/badge/Next.js-16.1-black)
![React](https://img.shields.io/badge/React-19-blue)
![Tailwind](https://img.shields.io/badge/Tailwind_CSS-v4-38bdf8)

---

## 🚀 Características Principales

### 📝 Formulario Guiado e Intuitivo

- **Proceso paso a paso:** Divide la complejidad de un plan de negocios en 8 secciones manejables.
- **Validación en tiempo real:** Asegura que no falte información crítica.
- **Persistencia de datos:** El progreso se guarda automáticamente en el navegador, permitiendo retomar el trabajo más tarde.

### 🧮 Motor de Cálculos Financieros Automático

Olvídate de las fórmulas complejas en Excel. La aplicación calcula automáticamente:

- **Proyecciones de Ingresos (6 años):** Basado en crecimiento de producción e inflación.
- **Costos y Gastos:** Proyecciones detalladas y ajustadas anualmente.
- **Estado de Resultados:** Generación automática del P&L a 5 años.
- **Indicadores Financieros:** Cálculo automático de **VAN (Valor Actual Neto)**, **TIR (Tasa Interna de Retorno)**, **Relación Beneficio/Costo** y **Periodo de Recuperación**.
- **Tabla de Amortización y Recuperación de Inversión.**

### 📄 Generación de PDF Profesional

- Exporta un documento PDF perfectamente formateado y paginado.
- Incluye todas las tablas financieras generadas.
- Sección de firmas y anexos fotográficos/documentales integrados.
- Diseño limpio y académico, ideal para presentación formal.

### 🎨 Experiencia de Usuario (UX) Premium

- Interfaz limpia y moderna.
- Feedback visual constante (indicadores de carga, progreso).
- Diseño totalmente responsivo (funciona en móviles y escritorio).

---

## 🛠️ Tecnologías Utilizadas

- **Framework:** [Next.js 16](https://nextjs.org/) (App Router)
- **UI Library:** [React 19](https://react.dev/)
- **Estilos:** [Tailwind CSS v4](https://tailwindcss.com/)
- **Iconos:** [Lucide React](https://lucide.dev/)
- **Generación PDF:** [@react-pdf/renderer](https://react-pdf.org/)
- **Manejo de Formularios:** React Hook Form + Zod
- **Lenguaje:** TypeScript

---

## 📋 Requisitos Previos

- [Node.js](https://nodejs.org/) (Versión 18 o superior recomendada)
- npm (normalmente viene instalado con Node.js)

---

## ⚙️ Instalación y Uso

Sigue estos pasos para ejecutar el proyecto en tu máquina local:

1. **Clonar el repositorio:**

   ```bash
   git clone https://github.com/tu-usuario/semillero-emprendedores.git
   cd semillero-emprendedores
   ```

2. **Instalar dependencias:**

   ```bash
   npm install
   ```

3. **Ejecutar el servidor de desarrollo:**

   ```bash
   npm run dev
   ```

4. **Abrir la aplicación:**
   Abre tu navegador y visita [http://localhost:3000](http://localhost:3000).

---

## 📂 Estructura del Proyecto

```
semillero-emprendedores/
├── app/                  # Rutas y páginas de la aplicación (Next.js App Router)
├── components/           # Componentes de React reutilizables
│   ├── form/             # Componentes específicos del formulario y sus secciones
│   └── ui/               # Componentes de interfaz base (botones, inputs, cards)
├── context/              # Contexto global (estado del proyecto y cálculos)
├── lib/                  # Utilidades y lógica de negocio
│   ├── pdf/              # Plantillas y componentes para generación de PDF
│   └── utils/            # Funciones de ayuda y cálculos financieros
├── types/                # Definiciones de tipos TypeScript
└── public/               # Archivos estáticos
```

---

## 📊 Detalle de Secciones del Formulario

1. **Datos Generales:** Información básica del emprendedor y el proyecto.
2. **Descripción del Negocio:** Propuesta de valor y descripción técnica.
3. **Equipo:** Estructura organizativa y roles.
4. **Tasas Financieras:** Definición de tasas de crecimiento, inflación y descuento para proyecciones.
5. **Demanda:** Estimación de ventas y mercado objetivo.
6. **Equipos y Financiamiento:** Inversión inicial y fuentes de financiamiento.
7. **Insumos:** Costos variables por producto.
8. **Anexos:** Carga de evidencia fotográfica y documentos legales.

---

## 🤝 Contribución

Las contribuciones son bienvenidas. Por favor, abre un issue primero para discutir lo que te gustaría cambiar o mejorar.

---

## 📄 Licencia

Este proyecto está bajo la Licencia MIT.
