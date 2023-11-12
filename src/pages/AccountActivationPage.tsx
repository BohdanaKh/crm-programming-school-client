import type { FC } from "react";
import { useParams } from "react-router-dom";

import { CreatePasswordForm } from "../components";

const AccountActivationPage: FC = () => {
  const params = useParams();
  return <div>{params.activationToken && <CreatePasswordForm />}</div>;
};

export { AccountActivationPage };
