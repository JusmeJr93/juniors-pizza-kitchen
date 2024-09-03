/* eslint-disable react/prop-types */

import { useSelector } from "react-redux";
import { formatCurrency } from "../../utils/helpers";
import DeleteItem from "./DeleteItem";
import UpdateItemQuantity from "./UpdateItemQuantity";
import { getCurrentQuantityById } from "./cartSlice";
import { motion } from "framer-motion";

/* eslint-disable no-unused-vars */
function CartItem({ item }) {
  const { pizzaId, name, quantity, totalPrice } = item;

  //to check if a pizza is in the cart to show the number between -/+ buttons
  const currentQuantity = useSelector(getCurrentQuantityById(pizzaId));

  return (
    <motion.li
      initial={{ opacity: 0, x: 150 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -100 }}
      transition={{ duration: 1 }}
      className="py-3 sm:flex sm:items-center sm:justify-between"
    >
      <p className="mb-1 sm:mb-0">
        {quantity}&times; {name}
      </p>
      <div className="flex items-center justify-between sm:gap-6">
        <p className="text-sm font-bold">{formatCurrency(totalPrice)}</p>
        <UpdateItemQuantity
          pizzaId={pizzaId}
          currentQuantity={currentQuantity}
        />
        <DeleteItem pizzaId={pizzaId} />
      </div>
    </motion.li>
  );
}

export default CartItem;
