document.addEventListener('DOMContentLoaded', () => {
    const splashScreen = document.querySelector('.splash-screen');
    const menuContent = document.getElementById('menu-content');
    let transitionStarted = false;


    function transitionToMenu() {
        if (transitionStarted) return;
        transitionStarted = true;


        const menuContent = document.getElementById('menu-content');
        const myOrderBtn = document.querySelector('.my-order-btn');
       
        // Show menu content first
        menuContent.style.display = 'block';
       
        // Force a reflow
        menuContent.offsetHeight;
       
        // Then start transitions
        requestAnimationFrame(() => {
            splashScreen.style.opacity = '0';
            splashScreen.style.transform = 'scale(1.02)';
            menuContent.style.opacity = '1';
           
            // Show My Order button after menu appears
            setTimeout(() => {
                myOrderBtn.style.opacity = '1';
                splashScreen.style.display = 'none';
            }, 1000);
        });
    }


    splashScreen.addEventListener('click', () => {
        let id = window.setTimeout(() => {}, 0);
        while (id--) {
            window.clearTimeout(id);
        }
        transitionToMenu();
    });


    fetch('menu.json')
        .then(response => response.json())
        .then(data => {
            displayMenu(data);


            setTimeout(() => {
                if (!transitionStarted) {
                    transitionToMenu();
                }
            }, 4000);
        });
});


let orderItems = [];


function displayMenu(data) {
    const menuContent = document.getElementById('menu-content');
   
    let html = `
        <div class="menu-header">
            <h1>DSP MENU</h1>
            <nav class="category-nav">
                ${data.menu.map(category => `
                    <a href="#${category.category.replace(/\s+/g, '-')}">${category.category}</a>
                `).join('')}
            </nav>
        </div>
        <div class="menu">`;
   
    data.menu.forEach(category => {
        html += `
            <div class="category" id="${category.category.replace(/\s+/g, '-')}">
                <h2>${category.category}</h2>
                <div class="items">`;
       
        category.items.forEach(item => {
            html += `
                <div class="item">
                    <img src="${item.image}" alt="${item.name}">
                    <div class="item-info">
                        <h3>${item.name}</h3>
                        <p class="description">${item.description || ''}</p>
                        <div class="price">Nu. ${item.price}</div>
                        <button class="order-now-btn" data-name="${item.name}" data-price="${item.price}">Order Now</button>
                    </div>
                </div>`;
        });
       
        html += `</div></div>`;
    });
   
    html += '</div>';
    menuContent.innerHTML = html;


    // Initialize order system after menu is loaded
    initializeOrderSystem();
}


function initializeOrderSystem() {
    // Setup order button clicks
    document.querySelectorAll('.order-now-btn').forEach(button => {
        button.addEventListener('click', function() {
            const name = this.getAttribute('data-name');
            const price = parseInt(this.getAttribute('data-price'));
            addToOrder(name, price);
        });
    });


    // Setup order panel
    const orderPanel = document.getElementById('order-panel');
    const myOrderBtn = document.getElementById('my-order-btn');
    const closePanel = document.getElementById('close-panel');
    const placeOrderBtn = document.getElementById('place-order-btn');


    if (myOrderBtn) {
        myOrderBtn.addEventListener('click', () => {
            orderPanel.classList.add('active');
        });
    }


    if (closePanel) {
        closePanel.addEventListener('click', () => {
            orderPanel.classList.remove('active');
        });
    }


    if (placeOrderBtn) {
        placeOrderBtn.addEventListener('click', handlePlaceOrder);
    }
}


function addToOrder(name, price) {
    orderItems.push({ name, price });
    updateOrderDisplay();
    showNotification(`${name} added to order`);
}


function updateOrderDisplay() {
    const orderCount = document.getElementById('order-count');
    const orderItemsContainer = document.getElementById('order-items');
    const subtotalElement = document.getElementById('subtotal');
    const packagingElement = document.getElementById('packaging-cost');
    const totalElement = document.getElementById('total');


    // Update order count
    if (orderCount) {
        orderCount.textContent = orderItems.length;
    }


    // Update order items list
    if (orderItemsContainer) {
        orderItemsContainer.innerHTML = orderItems.map(item => `
            <div class="order-item">
                <span>${item.name}</span>
                <span>Nu. ${item.price}</span>
            </div>
        `).join('');
    }


    // Calculate totals
    const subtotal = orderItems.reduce((sum, item) => sum + item.price, 0);
    const packagingCost = orderItems.length * 20;
    const total = subtotal + packagingCost;


    // Update totals display
    if (subtotalElement) subtotalElement.textContent = `Nu. ${subtotal}`;
    if (packagingElement) packagingElement.textContent = `Nu. ${packagingCost}`;
    if (totalElement) totalElement.textContent = `Nu. ${total}`;
}


function showNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    document.body.appendChild(notification);
   
    setTimeout(() => notification.remove(), 2000);
}


function handlePlaceOrder() {
    if (orderItems.length === 0) {
        alert('Please add items to your order first.');
        return;
    }
    alert('Order placed successfully!');
    orderItems = [];
    updateOrderDisplay();
    document.getElementById('order-panel').classList.remove('active');
}


function scrollToCategory(categoryId) {
    document.getElementById(categoryId).scrollIntoView({
        behavior: 'smooth',
        block: 'start'
    });
}


document.querySelector('.order-now-btn').addEventListener('click', () => {
    const menuContent = document.getElementById('menu-content');
    const splashScreen = document.querySelector('.splash-screen');


    splashScreen.style.opacity = '0';
    splashScreen.style.transform = 'scale(1.1)';
    menuContent.style.display = 'block';
    setTimeout(() => {
        menuContent.style.opacity = '1';
        menuContent.style.transform = 'scale(1)';
        setTimeout(() => {
            splashScreen.style.display = 'none';
        }, 1000);
    }, 50);
});
