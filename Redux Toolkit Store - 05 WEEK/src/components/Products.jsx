import { useEffect } from "react";
import { FaHeart } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { add } from "../store/cartSlice";
import { fetchProducts, STATUSES } from "../store/productSlice";
import { toggleWishlist } from "../store/wishListSlice";

const Products = () => {
  const dispatch = useDispatch();
  const { data: products, status } = useSelector((state) => state.product);
  const wishlist = useSelector((state) => state.wishList);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const handleAdd = (product) => {
    dispatch(add(product));
  };

  const handleLike = (product) => {
    dispatch(toggleWishlist(product));
  };

  if (status === STATUSES.LOADING) {
    return <h2>Loading....</h2>;
  }

  if (status === STATUSES.ERROR) {
    return <h2>Something went wrong!</h2>;
  }
  return (
    <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {products.map((product) => {
        const isLiked = wishlist.some((item) => item.id === product.id);

        return (
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
                onClick={() => handleAdd(product)}
                className="w-4/5 py-2 font-semibold rounded bg-black text-yellow-400 hover:bg-yellow-400 hover:text-black transition"
              >
                Add to Cart
              </button>

              <button
                onClick={() => handleLike(product)}
                className="m-2 w-1/5 flex font-semibold justify-center py-3 rounded transition bg-black text-yellow-400 hover:bg-yellow-400 hover:text-black"
              >
                <FaHeart
                  className={`transition ${
                    isLiked
                      ? "text-red-500"
                      : "text-white "
                  }`}
                />
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Products;
