
import axiosClientNew from './axiosClientNew'
// api/productApi.js
const cartApi  = {
  getById : (url,params) => {
    const URL = `/${url}`;
    return axiosClientNew.get(URL, { params });
  },

  
  addProductIntoCart : (url, params, item) => {
    const URL = `/${url}`;
    return axiosClientNew.post(URL, {
      id:params,
      items: [
        {
          ...item,
          "quatity": 1
        }
      ]
    });
  },
  
  updateProductInCart : (url,params, items) => {
    const URL = `/${url}`;
    console.log(items);
    return axiosClientNew.put(`${URL}/${params}`, {
      items
    })
  }
 
 
}

export default cartApi;