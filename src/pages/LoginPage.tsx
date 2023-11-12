import { useSearchParams } from "react-router-dom";

import { LoginForm } from "../components";

const LoginPage = () => {
  const [query] = useSearchParams();
  return (
    <div>
      {query.get("expSession") && (
        <h1>Session expired... please login again!!!</h1>
      )}
      <LoginForm />
    </div>
  );
};

export { LoginPage };
