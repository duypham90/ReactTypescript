handleUpdate(product) {
 
    const currentProduct = this.state.currentProduct;
    fetch( 'api/products/' + currentProduct.id, {
        method:'put',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(product)
    })
    .then(response => {
        return response.json();
    })
    .then( data => {
        /* Updating the state */
        var array = this.state.products.filter(function(item) {
          return item !== currentProduct
      })
        this.setState((prevState)=> ({
            products: array.concat(product),
            currentProduct : product
        }))
    }) 
  }
  https://dev.to/washingtonsteven/reacts-new-context-api-and-actions-446o
