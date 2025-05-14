import { Navigate } from "react-router";

export const PrivateRoute = ({
  isAuth,
  children,
}: {
  isAuth: boolean;
  children: React.JSX.Element;
}) => {
  if (!isAuth) {
    return <Navigate to="/pitbull" />;
  }

  return children;
};
