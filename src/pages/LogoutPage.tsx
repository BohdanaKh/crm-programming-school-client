import { Button } from "@mui/material";
import type { FC } from "react";
import { Link } from "react-router-dom";

const LogoutPage: FC = () => (
  <div>
    <Link to={"/"}>
      <Button variant="contained" color="success">
        Sign in
      </Button>
    </Link>
  </div>
);

export { LogoutPage };
