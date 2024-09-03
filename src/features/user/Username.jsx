import { useSelector } from "react-redux";

const Username = () => {
  //getting the user from redux
  const username = useSelector((state) => state.user.username);

  if (!username) return null;

  return (
    <div className="hidden text-base font-bold md:block">Hi, {username}</div>
  );
};

export default Username;
