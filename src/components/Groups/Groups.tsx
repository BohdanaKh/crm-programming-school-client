import {FC, useEffect, useState} from 'react';
import {groupActions} from "../../redux";
import {useAppDispatch, useAppSelector} from "../../hooks";
import {SubmitHandler, useForm} from "react-hook-form";
import {IGroup} from "../../interfaces";
import {Button} from "@mui/material";
import css from "../Order/OrderModal.module.css";



const Groups:FC = () => {
    const {groups} = useAppSelector(state => state.groupReducer);
    const [isInputVisible, setInputVisible] = useState<boolean>(false);
    const dispatch = useAppDispatch();
    const { handleSubmit, register, setValue} = useForm();


    useEffect(() => {
        dispatch(groupActions.getAll())
    }, [dispatch])

    const createGroup:SubmitHandler<IGroup>  = async (group) => {
        await dispatch(groupActions.create({group}))
    }

    return (
        <div>
            <form onSubmit={handleSubmit(createGroup)}>
                <input type="text" placeholder={'enter new group name'} {...register("title")}/>
                <Button type={"submit"} variant="contained"
                        size="small"
                        sx={{width: '49%', maxHeight: '20px', backgroundColor: "green"}}> ADD GROUP</Button>
            { groups && (
                <select {...register("group")}>
                    <option value=""></option>
                    {groups.map((group) => (
                        <option key={group.id} value={group.title}>
                            {group.title}
                        </option>
                    ))}
                </select>
            )}
            <Button variant="contained" size="small" sx={{ width: '49%', maxHeight: '20px',  backgroundColor: "green"}} onClick={() => setInputVisible(!isInputVisible)}>
                {isInputVisible ? 'SELECT' : 'ADD GROUP'}
            </Button>

            </form>
        </div>
    );
};

export {Groups};
