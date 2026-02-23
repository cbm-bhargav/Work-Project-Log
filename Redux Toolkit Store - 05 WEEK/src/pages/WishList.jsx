import { useDispatch, useSelector } from "react-redux";
import { toggleWishlist } from "../store/wishListSlice";
import { FaHeart } from "react-icons/fa";

const WishList = () => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.wishList);
  const handleRemove = (product) => {
    dispatch(toggleWishlist(product));
  };

  return (
    <div>
      <h3 className="text-3xl font-bold mb-6">Your Wishlist</h3>

      {products.length === 0 ? (
        <p className="text-gray-500">Your Wishlist is empty.</p>
      ) : (
        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <div
              key={product.id}
              className="bg-white shadow-md rounded-lg p-4 hover:shadow-xl transition duration-300"
            >
              <img
                src={product.thumbnail}
                alt={product.title}
                className="h-40 mx-auto object-contain"
              />

              <h4 className="mt-4 font-semibold text-gray-800 line-clamp-1">
                {product.title}
              </h4>

              <h5 className="text-lg font-bold text-green-600 mt-2">
                ${product.price}
              </h5>

              <div className="flex items-center justify-around">
                <button
                  onClick={() => handleRemove(product)}
                  className="w-full flex justify-center text-xl font-semibold py-1 my-1 rounded-full transition bg-black text-yellow-400 hover:bg-yellow-400 hover:text-black"
                > 
                Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default WishList;
