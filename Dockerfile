# 1. Используем официальный Node образ
FROM node:20-alpine

# 2. Устанавливаем рабочую директорию
WORKDIR /app

# 3. Копируем package.json и package-lock.json для кеширования слоев
COPY package*.json ./

# 4. Устанавливаем зависимости
RUN npm install

# 5. Копируем весь проект
COPY . .

# 6. Экспонируем порт Vite
EXPOSE 5173

# 7. Запускаем Vite в режиме разработки
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"]
