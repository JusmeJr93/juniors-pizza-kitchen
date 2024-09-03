import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { formatCurrency } from "../../utils/helpers";
import { getTotalCartPrice, getTotalCartQuantity } from "./cartSlice";
import { motion, AnimatePresence } from "framer-motion";

function CartOverview() {
  const totalCartQuantity = useSelector(getTotalCartQuantity);
  const totalCartPrice = useSelector(getTotalCartPrice);

  if (!totalCartQuantity) return null;
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: -200 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 100 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex justify-center bg-stone-800 px-4 py-4 text-sm uppercase text-stone-200 sm:px-6 md:text-base">
          <div className="flex w-full max-w-3xl items-center justify-around">
            <p className="space-x-4 font-semibold text-stone-300 sm:space-x-6">
              <span className="hidden sm:inline-block">
                {totalCartQuantity}{" "}
                {totalCartQuantity === 1 ? "Pizza" : "Pizzas"}
              </span>
              <span>Subtotal: {formatCurrency(totalCartPrice)}</span>
            </p>
            <Link
              to="/cart"
              className="hover hover:font-semibold hover:text-yellow-400"
            >
              Open cart to order &rarr;
            </Link>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}

export default CartOverview;
