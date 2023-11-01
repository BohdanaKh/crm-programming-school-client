import {Controller, SubmitHandler, useForm} from 'react-hook-form';
import {useNavigate} from 'react-router-dom';
import { Button, TextField } from "@mui/material";

import {authActions} from "../../redux";
import {IAuth} from "../../interfaces";
import {useAppDispatch} from "../../hooks";
import css from "./LoginForm.module.css"



const LoginForm = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const {handleSubmit, formState: {isValid}, control} = useForm<IAuth>({
        mode: "all",
        // shouldUseNativeValidation: true
    });

    const login: SubmitHandler<IAuth> = async (data) => {
        const {meta: {requestStatus}} = await dispatch(authActions.login(data));

        if (requestStatus === 'fulfilled') {
            navigate('/orders')
        }
    };

    return (
        <div className={css.LoginForm}>
        <form onSubmit={handleSubmit(login)} >


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

            <Button type='submit'  variant="contained" color="success" sx={{marginTop: '30px'}}>
               LOGIN
            </Button>
        </form>
        </div>
    );
};

export {LoginForm};