function addToCart(id) {
    console.log(id)
    $.ajax({
        type: "POST",
        url: `/addToCart/${id}`,
        data: "data"
    }).done(data => console.log(data));
}