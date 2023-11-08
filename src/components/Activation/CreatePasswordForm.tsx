import {FC} from 'react';
import {useNavigate, useParams} from "react-router-dom";
import {Controller, SubmitHandler, useForm} from "react-hook-form";
import {Button, TextField} from "@mui/material";
import {joiResolver} from "@hookform/resolvers/joi";

import {useAppDispatch} from "../../hooks";
import { IPass} from "../../interfaces";
import { userActions} from "../../redux";
import css from "../Login/LoginForm.module.css";
import {passwordValidator} from "../../validators";


const CreatePasswordForm: FC = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const params = useParams<string>();
   const { activationToken } = params;
    const {handleSubmit, formState: {isValid}, control} = useForm<IPass>({
        mode: 'all',
        resolver: joiResolver(passwordValidator)
    });

    const setPassword: SubmitHandler<IPass> = async (data) => {
      const { meta: {requestStatus} } = await dispatch(userActions.activateAccount({activationToken, data}));

        if (requestStatus === 'fulfilled') {
            navigate('/login')
        }
    };

    return (
        <div className={css.LoginForm}>
            <form onSubmit={handleSubmit(setPassword)}>


                <Controller
                    name="password"
                    control={control}
                    defaultValue=""
                    render={({ field }) => (
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="password"
                            label="Password"
                            name="password"
                            autoComplete="password"
                            autoFocus
                            {...field}
                        />
                    )}
                />
                <Controller
                    name="confirm_password"
                    control={control}
                    defaultValue=""
                    render={({ field }) => (
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            label="Confirm Password"
                            variant="outlined"
                            type="password"
                            {...field}
                        />
                    )}
                />

                <Button type='submit'  variant="contained" color="success" sx={{marginTop: '30px'}} disabled={!isValid}>
                    ACTIVATE
                </Button>
            </form>
        </div>
    );
};

export {CreatePasswordForm};
