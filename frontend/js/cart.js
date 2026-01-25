let cart = JSON.parse(localStorage.getItem('myCart')) || [];

document.addEventListener('click', function (e) {
    if (e.target && e.target.classList.contains('btn-buy')) {
        const button = e.target;
        const name = button.getAttribute('data-name');
        const price = parseInt(button.getAttribute('data-price'));

        // kt sp trung sau do cong don
        const existingItem = cart.find(item => item.name === name);
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            cart.push({
                id: Date.now(),
                name: name,
                price: price,
                quantity: 1
            });
        }

        localStorage.setItem('myCart', JSON.stringify(cart));
        alert(`Đã thêm "${name}" vào giỏ hàng!`);

        renderCart();
    }
});

// function du lieu cua file san pham
function renderCart() {
    const cartList = document.querySelector('.cart-list');
    const subtotalEl = document.querySelector('.subtotal');
    const totalPriceEl = document.querySelector('.total-price');

    if (!cartList) return; // phai la trang gio hang, neu ko thi ko thuc hien

    cartList.innerHTML = '';
    let total = 0;

    if (cart.length === 0) {
        cartList.innerHTML = '<p style="padding: 20px;">Giỏ hàng trống</p>';
    } else {
        cart.forEach((item, index) => {
            const itemTotal = item.price * item.quantity;
            total += itemTotal;

            // giao dien product
            cartList.innerHTML += `
                <div class="cart-item" style="display: flex; justify-content: space-between; align-items: center; padding: 15px; border-bottom: 1px solid #ddd;">
                    <div>
                        <h4 style="margin: 0;">${item.name}</h4>
                        <small>${item.price.toLocaleString()} VND x ${item.quantity}</small>
                    </div>
                    <div style="text-align: right;">
                        <div style="font-weight: bold;">${itemTotal.toLocaleString()} VND</div>
                        <button onclick="removeItem(${index})" style="color: red; border: none; background: none; cursor: pointer; font-size: 12px;">Xóa</button>
                    </div>
                </div>
            `;
        });
    }

    // sum
    if (subtotalEl) subtotalEl.innerText = total.toLocaleString() + " VND";
    if (totalPriceEl) totalPriceEl.innerText = total.toLocaleString() + " VND";
}

window.removeItem = function (index) {
    cart.splice(index, 1);
    localStorage.setItem('myCart', JSON.stringify(cart));
    renderCart();
};


document.addEventListener('DOMContentLoaded', renderCart);