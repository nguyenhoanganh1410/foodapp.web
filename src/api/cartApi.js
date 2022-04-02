
import axiosClientNew from './axiosClientNew'
// api/productApi.js
const cartApi  = {
  getById : (url,params) => {
    const URL = `/${url}`;
    return axiosClientNew.get(URL, { params });
  },

  
  updateProductInCart : (url,params, product, totalProductInCart) => {
    const URL = `/${url}`;
    return axiosClientNew.put(`${URL}/${params}`, {
      items: [
        {
          "id": product.id,
          "img": product.img,
          "name": product.name,
          "dsc": product.dsc,
          "price": product.price,
          "rate": product.rate,
          "country": product.country,
          "quatity": totalProductInCart
        }
      ]
    })
  }
 
 
}

export default cartApi;