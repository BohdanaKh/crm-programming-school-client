import { Button, TextField } from "@mui/material";
import type { SubmitHandler } from "react-hook-form";
import { Controller, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import { useAppDispatch } from "../../hooks";
import type { IAuth } from "../../interfaces";
import { authActions } from "../../redux";
import css from "./LoginForm.module.css";

const LoginForm = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const {
    handleSubmit,
    formState: { isValid },
    control,
  } = useForm<IAuth>({
    // mode: 'all',
    // resolver: joiResolver(authValidator)
  });

  const login: SubmitHandler<IAuth> = async (data) => {
    const {
      meta: { requestStatus },
    } = await dispatch(authActions.login(data));

    if (requestStatus === "fulfilled") {
      navigate("/orders");
    }
  };

  return (
    <div className={css.LoginForm}>
      <form onSubmit={handleSubmit(login)}>
        <Controller
          name="email"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email"
              name="email"
              autoComplete="email"
              autoFocus
              {...field}
            />
          )}
        />
        <Controller
          name="password"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <TextField
              margin="normal"
              required
              fullWidth
              label="Password"
              variant="outlined"
              type="password"
              {...field}
            />
          )}
        />

        <Button
          type="submit"
          variant="contained"
          color="success"
          sx={{ marginTop: "30px" }}
          disabled={!isValid}
        >
          LOGIN
        </Button>
      </form>
    </div>
  );
};

export { LoginForm };
