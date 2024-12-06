# DatGeo Demo

Esta demo utiliza OpenLayers y MaterialUI en conjunto con React.

## Características

- OpenLayers: Visualización de mapa
- MaterialUI: Componentes

## Inicia el proyecto

```bash
npm install
npm run start
```

## Uso

### Autenticación

- Abrir http://localhost:5173/
- Introducir un correo y contraseña

### Visor de Mapa

- Cambiar niveles de Zoom para verificar funcionamiento
- Click sobre puntos de instituciones para ver más información sobre las instituciones
- Si hay más de dos intituciones, se mostrará una paginación para mejorar la UX

## Puntos Clave

- Para manejar el rendimiento, se están utilizando hooks para salvaguardar el uso eficiente de memoria
- Se están fragmentango partes de las páginas en componentes para mejorar la legibilidad y reutilización de componentes.
