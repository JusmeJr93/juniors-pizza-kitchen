/* eslint-disable react/no-unescaped-entities */
/* eslint-disable no-unused-vars */
import { Form, redirect, useActionData, useNavigation } from "react-router-dom";
import { createOrder } from "../../services/apiRestaurant";
import { isValidPhone } from "../../utils/phoneValidation";
import Button from "../../ui/Button";
import { useDispatch, useSelector } from "react-redux";
import { clearCart, getCart, getTotalCartPrice } from "../cart/cartSlice";
import EmptyCart from "../cart/EmptyCart";
import store from "../../store";
import { formatCurrency } from "../../utils/helpers";
import { useState } from "react";
import { fetchAddress } from "../user/userSlice";
import { motion, AnimatePresence } from "framer-motion";

/* const fakeCart = [
  {
    pizzaId: 12,
    name: "Mediterranean",
    quantity: 2,
    unitPrice: 16,
    totalPrice: 32,
  },
]; */

function CreateOrder() {
  const [withPriority, setWithPriority] = useState(false);
  //getting the user from redux
  const {
    username,
    status: adressStatus,
    position,
    address,
    error: errorAdress,
  } = useSelector((state) => state.user);
  const isLoadingAdress = adressStatus === "loading";

  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";

  //getting the errors to show in the uiusing this react-router hook
  const formErrors = useActionData();
  // console.log(formErrors);

  const cart = useSelector(getCart);
  const totalCartPrice = useSelector(getTotalCartPrice);
  const priorityPrice = withPriority ? totalCartPrice * 0.2 : 0;
  const totalPrice = totalCartPrice + priorityPrice;

  const dispatch = useDispatch();

  if (!cart.length) return <EmptyCart />;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, x: 100 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: 100 }}
        transition={{ duration: 0.5 }}
      >
        <div className="px-4 py-6">
          <h2 className="mb-8 text-xl font-semibold">
            Ready to order? Let's go!
          </h2>

          {/* <Form method="POST" action="/order/new"> */}
          <Form method="POST">
            <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center">
              <label className="sm:basis-40">First Name</label>
              <input
                className="input grow"
                type="text"
                name="customer"
                defaultValue={username} //value wouldn't allow modification
                required
              />
            </div>

            <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center">
              <label className="sm:basis-40">Phone number</label>
              <div className="grow">
                <input
                  className="input w-full"
                  type="tel"
                  name="phone"
                  required
                />
                {formErrors?.phone && (
                  <p className="mt-2 rounded-md bg-red-100 p-2 text-xs text-red-700">
                    {formErrors.phone}
                  </p>
                )}
              </div>
            </div>

            <div className="relative mb-5 flex flex-col gap-2 sm:flex-row sm:items-center">
              <label className="sm:basis-40">Address</label>
              <div className="grow">
                <input
                  className="input w-full"
                  type="text"
                  name="address"
                  disabled={isLoadingAdress}
                  defaultValue={address}
                  required
                />
                {adressStatus === "error" && (
                  <p className="mt-2 rounded-md bg-red-100 p-2 text-xs text-red-700">
                    {errorAdress}
                  </p>
                )}
              </div>

              {!position.longitude && !position.latitude && (
                <span className="absolute right-[0.2rem] top-[2.19rem] z-50 sm:top-[0.18rem] md:top-[0.28rem]">
                  <Button
                    type="small"
                    disabled={isLoadingAdress}
                    onClick={(e) => {
                      e.preventDefault();
                      dispatch(fetchAddress());
                    }}
                  >
                    Get Positon
                  </Button>
                </span>
              )}
            </div>

            <div className="mb-12 flex items-center gap-5">
              <input
                className="h-6 w-6 accent-yellow-400 focus:outline-none focus:ring focus:ring-yellow-400 focus:ring-offset-2"
                type="checkbox"
                name="priority"
                id="priority"
                value={withPriority}
                onChange={(e) => setWithPriority(e.target.checked)}
              />
              <label htmlFor="priority" className="font-medium">
                Want us to give your order priority? (20% charge)
              </label>
            </div>

            <div>
              {/* this "hidden input" trick is to have the data without showing it in the ui but available in the server when submitted */}
              <input type="hidden" name="cart" value={JSON.stringify(cart)} />
              <input
                type="hidden"
                name="position"
                value={
                  position.latitude && position.longitude
                    ? `${position.latitude}, ${position.longitude}`
                    : ""
                }
              />

              <Button disabled={isSubmitting || isLoadingAdress} type="primary">
                {isSubmitting
                  ? "Placing order...."
                  : `Order now for ${formatCurrency(totalPrice)}`}
              </Button>
            </div>
          </Form>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export async function action({ request }) {
  const formData = await request.formData();
  const data = Object.fromEntries(formData); //convert to object

  //to format correctly
  const order = {
    ...data,
    cart: JSON.parse(data.cart),
    priority: data.priority === "true",
  };

  //handling errors before creating order
  const errors = {};
  if (!isValidPhone(order.phone))
    errors.phone =
      "Please enter a correct phone number. We might need it to contact you.";

  if (Object.keys(errors).length > 0) return errors;

  //create order and redirect if all is ok
  const newOrder = await createOrder(order);

  //after placing an order, the cart must be emptied
  //we'll use a "not-to-overused" hack cause it reduces some redux optimization
  store.dispatch(clearCart());

  // we need to redirect to the orderID page
  //but useNavigate cannot be used in a function. in that case we use redirect
  return redirect(`/order/${newOrder.id}`);
}

export default CreateOrder;
