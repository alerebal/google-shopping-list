let localCart = JSON.parse(localStorage.getItem('cart'))
let noUserCart = []

function addToCart(id) {
    // console.log(typeof(noUserCart))
    $.ajax({
        method: "POST",
        url: `/addToCart/${id}`,
    }).done(data => {
        if (data == "not user") {
            // noUserCart.push(id)
            if (localCart) {
                let cartLocal = JSON.parse(localStorage.getItem('cart'))
                noUserCart.push(id)
                localStorage.setItem('cart', JSON.stringify(noUserCart))
                console.log(cartLocal, 'cart local')
                // console.log(typeof(cartLocal))
            } else {
                noUserCart.push(id)
                localStorage.setItem('cart', JSON.stringify(noUserCart))
            }
        }
        
        // alert('The item has been added to the cart')
    });
    localCart = JSON.parse(localStorage.getItem('cart'))
    console.log(localCart, 'saliden')
}

function removeFromCart(id) {
    confirm('The item will be removed, are You sure?') ? $.ajax({
        method: "DELETE",
        url: `/removeFromCart/${id}`
    }).done(data => {
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
    // console.log(typeof(noUserCart), 'main')
    $.ajax({
        url: "/cartListNoUser",
        method: "POST",
        data: {cart: noUserCart}
    }).done(data => {
        console.log(data)
        // $.ajax({
        //     url: '/cartList',
        //     method: 'GET'
        // }).done(data => console.log(data))
    })
    // window.location.assign('/cartList')
}
