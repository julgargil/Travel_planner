# Guía de Contribución — Travel Planner

Este documento define las normas oficiales de control de versiones y flujo de trabajo para el proyecto **Travel Planner**.

---

## 1. Formato de los mensajes de commit

### Patrón

```text
tipo(ámbito): descripción (#num-issue)
```

- **`ámbito`**: Opcional en cambios generales (por ejemplo, `docs: ...` o `ci: ...`).
- **`(#num-issue)`**: Se añade al final del mensaje cuando exista un issue asociado.

### Reglas

- **Idioma**: Redactado en **español**.
- **Tiempo verbal**: En **presente** (o infinitivo/sustantivo descriptivo conciso).
- **Longitud**: Conciso (alrededor de **50 caracteres**).
- **Atomicidad**: Commits pequeños y atómicos (un único cambio lógico por commit).

### Tipos permitidos y ejemplos

| Tipo | Descripción | Ejemplo |
| :--- | :--- | :--- |
| `feat` | Funcionalidad nueva | `feat(trips): endpoints GET y POST /trips (#2)` |
| `fix` | Arreglo de un error | `fix(expenses): total negativo en gastos (#15)` |
| `test` | Tests | `test(trips): tests del CRUD de viajes (#3)` |
| `refactor` | Cambiar código sin cambiar lo que hace | `refactor(backend): ordenar imports de main.py` |
| `docs` | Documentación | `docs: convención de commits en CONTRIBUTING.md` |
| `chore` | Configuración y herramientas | `chore(front): proyecto React con Vite` |
| `ci` | Integración continua | `ci: workflow de tests con GitHub Actions` |

---

## 2. Modelo de ramas

El repositorio se estructura en tres niveles de ramas:

1. **`main`**: Contiene únicamente entregas finales etiquetadas (ej. `v1.0.0`). **Nunca se borra.**
2. **`trunk`**: Rama principal de integración del equipo. **Nunca se borra.**
3. **Ramas de tarea (`<num-issue>-descripcion`)**: Una rama por cada tarea con el número del issue delante (ej. `12-formulario-viajes`). Nace siempre de `trunk` y **se borra tras mezclarla**.

---

## 3. Reglas del repositorio

- **Sin Pull Requests internos**: Está prohibido usar Pull Requests dentro del equipo. Las integraciones se realizan en local sobre `trunk` mediante `git merge`.
- **Sin commits desde la web de GitHub**: Está prohibido realizar commits o ediciones directamente desde la interfaz web de GitHub. Todo cambio se hace en local y se sube con `git push`.
- **Identidad única**: Cada integrante debe utilizar un único usuario de Git configurado en su entorno local.
- **Archivos prohibidos en el repositorio**: Está prohibido subir archivos de configuración del IDE (`.vscode/`, `.idea/`), entornos virtuales (`venv/`, `.venv/`), dependencias (`node_modules/`), secretos (`.env`) o bases de datos (`*.db`).
