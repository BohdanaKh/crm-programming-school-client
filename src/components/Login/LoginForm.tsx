import { Button, Popover, TextField, Typography } from "@mui/material";
import React from "react";
import type { SubmitHandler } from "react-hook-form";
import { Controller, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import { useAppDispatch, useAppSelector } from "../../hooks";
import type { IAuth } from "../../interfaces";
import { authActions } from "../../redux";
import css from "./LoginForm.module.css";

const LoginForm = () => {
  const { error } = useAppSelector((state) => state.authReducer);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [anchor, setAnchor] = React.useState<null | HTMLElement>(null);

  const {
    handleSubmit,
    formState: { isValid },
    control,
  } = useForm<IAuth>({
    // mode: 'all',
    // resolver: joiResolver(authValidator)
  });

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchor(anchor ? null : event.currentTarget);
  };

  const open = Boolean(anchor);
  const id = open ? "simple-popper" : undefined;
  const login: SubmitHandler<IAuth> = async (data) => {
    try {
      const {
        meta: { requestStatus },
      } = await dispatch(authActions.login(data));

      if (requestStatus === "fulfilled") {
        navigate("/orders");
      }
    } catch (error) {
      setAnchor(anchor ? null : document.getElementById("login-button"));
    }
  };

  const handleClose = () => {
    setAnchor(null);
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
          id={"login-button"}
          aria-describedby={id}
          type="submit"
          variant="contained"
          color="success"
          sx={{ marginTop: "30px" }}
          disabled={!isValid}
          onClick={handleClick}
        >
          LOGIN
        </Button>
        <Popover
          id={id}
          open={open}
          anchorEl={anchor}
          onClose={handleClose}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left",
          }}
        >
          <Typography sx={{ p: 2 }}>{error?.message}</Typography>
        </Popover>
      </form>
    </div>
  );
};

export { LoginForm };
