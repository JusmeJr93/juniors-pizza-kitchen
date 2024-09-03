/* eslint-disable react/no-unescaped-entities */
import { Link } from "react-router-dom";
import SearchOrder from "../features/order/SearchOrder";
import Username from "../features/user/Username";

const Header = () => {
  return (
    <header className="flex justify-center border-b border-stone-300 bg-yellow-400 px-4 py-3 uppercase sm:px-6">
      <div className="flex w-full max-w-4xl items-center justify-between">
        <Link
          to="/"
          className="text-sm font-medium tracking-widest text-yellow-100 md:text-xl md:font-extrabold"
        >
          Junior's Pizza Kitchen
        </Link>

        <SearchOrder />
        <Username />
      </div>
    </header>
  );
};

export default Header;
