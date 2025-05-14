# PetCare

Proyecto enfocado al cuidado de mascotas.

## Tecnologías

- **Frontend:** React + TypeScript
- **Backend:** Node.js + Express
- **Base de datos:** PostgreSQL
- **ORM:** Prisma

## Instalación

1. Clona el repositorio:

```bash
git clone https://github.com/tu-usuario/petcare.git
```

2. Instala dependencias en frontend y backend:

```bash
cd frontend
npm install
cd ../backend
npm install
```

3. Configura las variables de entorno según los archivos `.env.example`.

4. Ejecuta migraciones de la base de datos:

```bash
npx prisma migrate dev
```

## Uso

- Inicia el backend:
  ```bash
  cd backend
  npm run dev
  ```
- Inicia el frontend:
  ```bash
  cd ../frontend
  npm start
  ```

## Funcionalidades

- Registro y gestión de mascotas

## Licencia

MIT
