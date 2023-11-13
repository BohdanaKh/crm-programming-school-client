import type { FC } from "react";
import { useParams } from "react-router-dom";

import { CreatePasswordForm } from "../components";

const RecoveryPasswordPage: FC = () => {
  const params = useParams();
  return <div>{params.recoveryToken && <CreatePasswordForm />}</div>;
};

export { RecoveryPasswordPage };
