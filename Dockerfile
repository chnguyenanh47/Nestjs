# Sử dụng hình ảnh Node.js chính thức từ Docker Hub
FROM node:16-alpine

# Đặt thư mục làm việc trong container
WORKDIR /app

# Sao chép file package.json và package-lock.json vào container
COPY package*.json ./

# Cài đặt các dependencies
RUN npm install

# Sao chép toàn bộ mã nguồn vào thư mục làm việc
COPY . .

# Mở cổng 3000 để container lắng nghe
EXPOSE 3000

# Chạy ứng dụng NestJS
CMD ["npm", "run", "start:dev"]
