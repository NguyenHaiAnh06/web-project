const API_URL = "http://localhost:5000/api/auth";

document.addEventListener('DOMContentLoaded', () => {
    const regForm = document.getElementById('registerForm');
    if (regForm) {
        regForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            const email = document.getElementById('regEmail').value;
            const username = document.getElementById('regUser').value;
            const password = document.getElementById('regPass').value;
            const confirmPass = document.getElementById('regConfirmPass').value;

            if (password !== confirmPass) {
                return alert("Mật khẩu nhập lại không khớp!");
            }

            try {
                const response = await fetch(`${API_URL}/register`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ email, username, password }) // Không gửi fullname
                });

                const data = await response.json();
                if (response.ok) {
                    alert("Đăng ký thành công!");
                    window.location.href = "dang_nhap.html";
                } else {
                    alert(data.error || "Lỗi đăng ký");
                }
            } catch (err) {
                alert("Lỗi kết nối: Hãy kiểm tra Console (F12) để xem chi tiết.");
                console.error("Lỗi chi tiết:", err);
            }
        });
    }
});

// login
const loginForm = document.getElementById('loginForm');
if (loginForm) {
    loginForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const username = document.getElementById('loginUsername').value;
        const password = document.getElementById('loginPassword').value;

        try {
            const response = await fetch(`${API_URL}/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password })
            });

            const data = await response.json();

            if (response.ok) {
                alert("Đăng nhập thành công!");

                localStorage.setItem('user', JSON.stringify(data.user));

                window.location.href = "giao_dien.html";
            } else {
                alert(data.error || "Tên đăng nhập hoặc mật khẩu không đúng");
            }
        } catch (err) {
            alert("Lỗi kết nối server khi đăng nhập!");
            console.error(err);
        }
    });
}