/* eslint-disable no-unused-vars */
import { Link } from "react-router-dom";
import LinkButton from "../../ui/LinkButton";
import CartItem from "./CartItem";
import Button from "../../ui/Button";
import { useDispatch, useSelector } from "react-redux";
import { clearCart, getCart } from "./cartSlice";
import EmptyCart from "./EmptyCart";
import { motion, AnimatePresence } from "framer-motion";

/* const fakeCart = [
  {
    pizzaId: 12,
    name: "Mediterranean",
    quantity: 2,
    unitPrice: 16,
    totalPrice: 32,
  }] */

function Cart() {
  //getting the user from redux
  const username = useSelector((state) => state.user.username);
  const cart = useSelector(getCart);
  const dispatch = useDispatch();

  if (!cart.length) return <EmptyCart />;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, x: -150 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: 100 }}
        transition={{ duration: 0.5 }}
      >
        <div className="px-4 py-3">
          <LinkButton to="/menu">&larr; Back to menu</LinkButton>

          <h2 className="mt-7 text-xl font-semibold">
            Your selected pizzas, {username}
          </h2>

          <ul className="mt-3 divide-y divide-stone-200 border-b">
            {cart.map((item) => (
              <CartItem item={item} key={item.pizzaId} />
            ))}
          </ul>

          <div className="mt-6 space-x-2">
            <Button to="/order/new" type="primary">
              Order pizzas
            </Button>

            <Button type="secondary" onClick={() => dispatch(clearCart())}>
              Clear cart
            </Button>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}

export default Cart;
