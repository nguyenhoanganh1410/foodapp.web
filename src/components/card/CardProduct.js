import { AiOutlineShoppingCart, AiTwotoneStar } from "react-icons/ai";

import { BsHeart } from "react-icons/bs";
import { IoLocationSharp } from "react-icons/io5";

import "./CardProductStyle.scss";
import { useParams, useNavigate } from "react-router-dom";
import { useContext } from "react";
import Contex from "../../store/Context";
import cartApi from "../../api/cartApi";
import { SetCart, SetDialogShow, SetFirstAdd } from "../../store/Actions";

const CardProduct = ({ dislayItems, item, notify, notifyFavotites }) => {
  const params = useParams();
  const navigate = useNavigate();

  //get url global value
  const { state, depatch } = useContext(Contex);
  //detructering...
  const { url, firstAdd, isSignedIn, user, cart } = state;

  //chuyen huong khi click vao tung san pham
  const hanldClickItem = (id) => {
    navigate(`/${url}/${id}`);
  };

  const handleAddCart = () => {
    //kiem tra dang nhap chua
    if(isSignedIn){
    //lan dau them sanpham vao gio hang
      if (firstAdd && isSignedIn) {
        //add product in cart
        const addIntoCart = async () => {
          try {
            const response = await cartApi.addProductIntoCart(
              "cart",
              user.email,
              item
            );
            notify();

            //khong con la lan dau nua
            depatch(SetFirstAdd(false));
          } catch (error) {
            console.log("Failed to fetch product list: ", error);
          }
        };
        addIntoCart();
      } else {
        const newCart = checkCart(cart, item);
        depatch(SetCart(newCart));

        const addIntoCart = async () => {
          try {
            const response = await cartApi.updateProductInCart(
              "cart",
              user.email,
              newCart
            );
            notify();
          } catch (error) {
            console.log("Failed to fetch product list: ", error);
          }
        };
        addIntoCart();
      }
    }
    else{
       //thông báo phải login mới thực hiện được chức năng( dialogshow)
       depatch(SetDialogShow(true));
    }
  };

  //kiem tra sp da co trong cart chua
  const checkCart = (cartFood, food) => {
    console.log("add cart");
    let check = false;
    //kiem tra san pham muon them da co trong cart chua?
    const newCart = cartFood.map((val) => {
      if (val.id === food.id) {
        val.quatity = val.quatity + 1;
        check = true;
      }
      return val;
    });
    const CartNew = [...cartFood, { ...food, quatity: 1 }];
    console.log("a" == "b");
    if (check) {
      return newCart;
    }
    return CartNew;
  };

  return (
    <div
      key={item.id}
      className={`shop-product ${dislayItems} col-md-4 col-xs-6`}
    >
      <div
        className="shop-product__img"
        onClick={() => hanldClickItem(item.id)}
      >
        <img src={item.img} alt="image erro" />
        <div className="shop-product__rate">
          <span>
            <AiTwotoneStar />
          </span>
          <span className="rate-number">{item.rate}</span>
        </div>
      </div>
      <div className="shop-product__content">
        <div
          className="shop-product__name"
          onClick={() => hanldClickItem(item.id)}
        >
          {item.name}
        </div>
        <p className="shop-product__decription">{item.dsc}</p>
        <div className="shop-product__row">
          <div className="row_location">
            <span className="location-icon">
              <IoLocationSharp />
            </span>
            <span className="location-name">{item.country}</span>
          </div>
          <div className="row_price">
            <span>{`$${item.price}`}</span>
          </div>
        </div>
      </div>
      <div className="shop-product__btns">
        <div className="shop-product__btn" onClick={notifyFavotites}>
          <BsHeart />
        </div>
        <div className="shop-product__btn" onClick={() => handleAddCart()}>
          <AiOutlineShoppingCart />
        </div>
      </div>
      <div className="shop-product__label"></div>
    </div>
  );
};

export default CardProduct;
