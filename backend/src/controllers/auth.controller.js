const User = require('../models/user.model');
const bcrypt = require('bcryptjs');

exports.register = async (req, res) => {
    try {
        const { username, password } = req.body;
        // MH MK
        const hashedPassword = await bcrypt.hash(password, 10);
        await User.create(username, hashedPassword);
        res.status(201).json({ message: "Đăng ký thành công!" });
    } catch (error) {
        res.status(500).json({ error: "Tên đăng nhập đã tồn tại hoặc lỗi hệ thống." });
    }
};

exports.login = async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await User.findByUsername(username);

        if (!user) return res.status(404).json({ error: "Người dùng không tồn tại!" });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(401).json({ error: "Sai mật khẩu!" });

        res.json({ message: "Đăng nhập thành công!", user: { id: user.id, username: user.username } });
    } catch (error) {
        res.status(500).json({ error: "Lỗi đăng nhập!" });
    }
};