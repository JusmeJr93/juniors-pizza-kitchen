/* eslint-disable react-refresh/only-export-components */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
// this component will allow the user to update the "priority status" after ordering, but only if it was "false"
//we'll use "useFetcher" but this time not the "load" method
//that Form method will not navigate but just revalidate and update the chosen data

import { useFetcher } from "react-router-dom";
import Button from "../../ui/Button";
import { updateOrder } from "../../services/apiRestaurant";

const UpdateOrder = ({ order }) => {
  const fetcher = useFetcher();

  return (
    <fetcher.Form method="PATCH" className="text-right">
      <Button type="primary">Make priority</Button>
    </fetcher.Form>
  );
};

export default UpdateOrder;

//to update the order we need an action and connect it with the route in App
export async function action({ request, params }) {
  //as no form input will be updated, the "request" will not be used
  const data = { priority: true };

  await updateOrder(params.orderId, data);

  return null;
}
