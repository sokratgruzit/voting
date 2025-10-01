# Voting

Приложение для голосования за идеи с учетом лимита по IP.

---

## 🖥 Стек

- **Фронтенд:** React + TypeScript + CSS Modules
- **Бэкенд:** Node.js + Express + PostgreSQL
- **База данных:** PostgreSQL
- **Запросы:** REST API

---

## ⚡ Особенности

- Список идей отображается с количеством голосов (`votes`).
- Голосовать можно только один раз с одного IP за каждую идею.
- Голоса сохраняются в таблице `votes` + увеличивается счетчик в `ideas.votes`.
- Попап ошибок при неудачных запросах (исчезает через 3 сек).
- Адаптивные карточки идей с flex-версткой, приятный UI.

---

## 📦 Установка

1. Клонируем репозиторий:

```bash

git clone https://github.com/sokratgruzit/voting.git

cd voting

```

## 2. Настройка переменных окружения

### В корне проекта (`.env`)

Создайте файл `.env` в корне проекта для бэкенда:

```env
# Настройки базы данных
DATABASE_URL=postgres://postgres:postgres@localhost:5432/votedb

# Порт бэкенда
PORT=3000

# Если приложение за прокси
TRUST_PROXY=true
```

### В фронтенде (frontend/.env)

Создайте файл `.env` в папке frontend:

```env
# URL API бэкенда
VITE_API_URL=http://localhost:3000/api
```

> В React-проектах переменные окружения, которые должны быть доступны в коде, должны начинаться с `VITE_`.

## 3. Запуск проекта

# Убедитесь, что на вашей системе установлен [Docker](https://www.docker.com/get-started) и [Docker Compose](https://docs.docker.com/compose/install/).

```bash
docker-compose -f docker-compose.yml -f docker-compose.override.yml up --build
```

Что произойдет после запуска:

- Docker создаст контейнеры для PostgreSQL, backend и frontend.

- Все зависимости будут установлены автоматически.

- Backend будет доступен по адресу http://localhost:3000/api.

- Frontend будет доступен по адресу http://localhost:5173 (или порту, указанному в Vite).

- PostgreSQL автоматически инициализируется с базой votedb и таблицами для идей и голосов.
