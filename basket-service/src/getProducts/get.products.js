const getProduct = async(productId) => {
    const response = await fetch(`http://localhost:5003/api/v1/products/${productId}`, {
        method : 'GET',
        headers: { 'Content-Type': 'application/json'}
    })
    return await response.json()
    
}

module.exports = {getProduct}