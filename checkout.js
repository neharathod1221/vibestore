// 1. Cart ka summary load karna (Items count aur Total Price)
function loadSummary() {
    let cart = JSON.parse(localStorage.getItem('myCart')) || [];
    let total = 0;

    // Agar cart khali hai toh wapas bhej do
    if(cart.length === 0) {
        alert("Your cart is empty! Going back to shopping.");
        window.location.href = "index.html";
        return;
    }

    cart.forEach(item => {
        total += item.price;
    });

    // HTML mein IDs check kar lena: 'summary-qty' aur 'summary-total'
    const qtyElement = document.getElementById('summary-qty');
    const totalElement = document.getElementById('summary-total');

    if(qtyElement) qtyElement.innerText = cart.length;
    if(totalElement) totalElement.innerText = total;
}

// 2. Order submit hone par kya hoga
document.getElementById('checkout-form').addEventListener('submit', function(e) {
    e.preventDefault(); // Page refresh roko

    const name = document.getElementById('cust-name').value;
    const phone = document.getElementById('cust-phone').value;
    const address = document.getElementById('cust-address').value;

    const cartData = JSON.parse(localStorage.getItem('myCart'));

    // Order details object
    const orderDetails = {
        customerName: name,
        customerPhone: phone,
        deliveryAddress: address,
        items: cartData,
        orderDate: new Date().toLocaleString()
    };

    console.log("Order Placed:", orderDetails);

    // Order history ke liye save karo
    localStorage.setItem('lastOrder', JSON.stringify(orderDetails));

    // --- CRITICAL STEP: Order hone ke baad Cart khali karo ---
    localStorage.removeItem('myCart'); 

    // Success page par bhejo
    alert("Order Successful! Redirecting...");
    window.location.href = "order-success.html"; 
});

// Page load hote hi summary dikhao
window.onload = loadSummary;