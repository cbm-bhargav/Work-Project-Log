import { useDispatch, useSelector } from "react-redux";
import { remove } from "../store/cartSlice";

const Cart = () => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.cart);
  const handleRemove = (productId) => {
    dispatch(remove(productId));
  };

  return (
    <div>
      <h3 className="text-3xl font-bold mb-6">Your Cart</h3>

      {products.length === 0 ? (
        <p className="text-gray-500">Your cart is empty.</p>
      ) : (
        <div className="space-y-4">
          {products.map((product) => (
            <div
              key={product.id}
              className="bg-white p-4 shadow rounded flex items-center gap-6"
            >
              <img
                src={product.thumbnail}
                alt={product.title}
                className="h-24 w-24 object-contain"
              />

              <div className="flex-1">
                <h5 className="font-semibold">{product.title}</h5>
                <h5 className="text-green-600 font-bold">${product.price}</h5>
              </div>

              <button
                onClick={() => handleRemove(product.id)}
                className="font-semibold bg-black text-yellow-400 hover:bg-yellow-400 hover:text-black px-4 py-2 rounded transition"
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Cart;
