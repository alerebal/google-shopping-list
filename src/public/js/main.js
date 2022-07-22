function addToCart(id) {
    $.ajax({
        type: "POST",
        url: `/addToCart/${id}`,
    }).done(data => alert('The item has been added to the cart'));
}

function removeFromCart(id) {
    confirm('Are you sure?') ? $.ajax({
        type: "POST",
        url: `/removeFromCart/${id}`
    }).done(data => {
        alert('The item has been removed from the cart')
        window.location.assign('/cartList')
    }):
    window.location.assign('/cartList')
}