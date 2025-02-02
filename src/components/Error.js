import { useRouteError } from "react-router-dom";
// useRouteError ek hook hai jo react-router-dom se aata hai. Yeh tab use hota hai jab tum error handling ke liye ek Error Boundary component bana rahe ho.

const Error = () => {
  const err = useRouteError();
  return (
    <div>
      <h1>Ooops....</h1>
      <h2>somthing went wrong</h2>
      <h3>
        {err.status}: {err.statusText}
      </h3>
    </div>
  );
};
export default Error;
