/* eslint-disable react/no-unescaped-entities */
/* eslint-disable no-unused-vars */
import { useSelector } from "react-redux";
import CreateUser from "../features/user/CreateUser";
import pizzaPic from "../assets/pizza.jpg";
import Button from "./Button";

function Home() {
  //getting the user from redux to show CreateUser only if there's no username
  const username = useSelector((state) => state.user.username);

  return (
    <div className="my-10 px-4 text-center sm:my-16">
      {username === "" ? (
        <CreateUser />
      ) : (
        <Button to="/menu" type="primary">
          Continue ordering, {username}
        </Button>
      )}

      <h1 className="mt-16 flex flex-col items-center gap-y-6 text-xl font-semibold md:text-3xl">
        <span>Crafted with Love, Delivered with Care.</span>
        <span className="text-yellow-500">
          Order, Relax, Enjoy – It's That Simple!
        </span>
        <img src={pizzaPic} alt="pizza" className="w-2/3" />
      </h1>
    </div>
  );
}

export default Home;
