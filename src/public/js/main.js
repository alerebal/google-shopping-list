let localCart = JSON.parse(localStorage.getItem('cart'))
let noUserCart = []

function addToCart(id) {
    // If user is authenticated
    $.ajax({
        method: "POST",
        url: `/addToCart/${id}`,
    }).done(data => {
        // if user is not authenticated, add the item id to the local cart in localstorage
        if (data == "not user") {
            if (localCart) {
                cartLocal = JSON.parse(localStorage.getItem('cart'))
                noUserCart.push(id)
                localStorage.setItem('cart', JSON.stringify(noUserCart))
            } else {
                noUserCart.push(id)
                localStorage.setItem('cart', JSON.stringify(noUserCart))
            }
        }
        // alert('The item has been added to the cart')
    });
    localCart = JSON.parse(localStorage.getItem('cart'))
}

function removeFromCart(id) {
    confirm('The item will be removed, are You sure?') ? $.ajax({
        method: "DELETE",
        url: `/removeFromCart/${id}`
    }).done(data => {
        // remover el item from localstorage if user is not authorized
        if (data.user == 'not user') {
            localStorage.setItem('cart', JSON.stringify(data.noUserCart))
        }
        window.location.assign('/cartList')
        alert('The item has been removed from the cart')
    }) :
    window.location.assign('/cartList')
}

function removeAllItems() {
    confirm('All the items will be removed!! Are You sure?') ? $.ajax({
        method: "DELETE",
        url: `/removeAllItems`
    }).done(data => {
        window.location.assign('/cartList')
        alert('The item has been removed from the cart')
    }) :
    window.location.assign('/cartList')
}

function goToCart() {
    let localCart = localStorage.getItem('cart')
    $.ajax({
        url: "/cartListNoUser",
        method: "POST",
        data: {cart: localCart}
    }).done(data => {
        console.log(data)
    })
    window.location.assign('/cartList')
}
