const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/auth.route');

const app = express();

// Cho phép các nguồn khác (như Live Server cổng 5500) truy cập API
app.use(cors());

// Cấu hình để server đọc được dữ liệu JSON gửi lên
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Gán các đường dẫn bắt đầu bằng /api/auth
app.use('/api/auth', authRoutes);

module.exports = app;