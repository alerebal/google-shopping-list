function addToCart(id) {
    $.ajax({
        type: "POST",
        url: `/addToCart/${id}`,
    }).done(data => alert('The item has been added to the cart'));
}

function removeFromCart(id) {
    confirm('The item will be removed, are You sure?') ? $.ajax({
        type: "DELETE",
        url: `/removeFromCart/${id}`
    }).done(data => {
        alert('The item has been removed from the cart')
        window.location.assign('/cartList')
    }) :
    window.location.assign('/cartList')
}

function removeAllItems() {
    confirm('All the items will be removed!! Are You sure?') ? $.ajax({
        type: "DELETE",
        url: `/removeAllItems`
    }).done(data => {
        alert('The item has been removed from the cart')
        window.location.assign('/cartList')
    }) :
    window.location.assign('/cartList')
}