import React, {FC, useEffect, useState} from 'react';
import {groupActions} from "../../redux";
import {useAppDispatch, useAppSelector} from "../../hooks";
import {SubmitHandler, useForm} from "react-hook-form";
import {IGroup} from "../../interfaces";
import {Box, Button, Input, TextField} from "@mui/material";
import css from "../Order/OrderModal.module.css";



const Groups:FC = () => {
    const dispatch = useAppDispatch();
    const [groupName, setGroupName] = useState<string>();


    // useEffect(() => {
    //     dispatch(groupActions.getAll())
    // }, [dispatch])

    const createGroup  = async (groupName: string) => {
        await dispatch(groupActions.create({group:{title:groupName}}))
    }


    return (
        <Box
            component="form"
            sx={{
                '& > :not(style)': { m: 1 },
            }}
            noValidate
            autoComplete="off"
        >
            <TextField
                placeholder={"enter new group name"}
                value={groupName}
                onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setGroupName(e.target.value)}
            />
            <Button onClick={() => createGroup(groupName)}>ADD Group</Button>
        </Box>
                //     <input type="text" placeholder={'enter new group name'} {...register("title")} />
                // <Button
                //         type={"submit"} variant="contained"
                //         size="small"
                //         sx={{width: '49%', maxHeight: '20px', backgroundColor: "green"}}>
                //     ADD GROUP
                // </Button>

    );
};

export {Groups};
