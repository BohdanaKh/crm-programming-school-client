import {FC, useEffect, useState} from 'react';
import {Button, Modal} from "@mui/material";
import {SubmitHandler, useForm} from "react-hook-form";

import {IGroup, IOrder} from "../../interfaces";
import { EStatus, ECourse, ECourseFormat, ECourseType} from "../../interfaces";
import {useAppDispatch, useAppSelector} from "../../hooks";
import {groupActions, orderActions, orderModalActions} from "../../redux";
import css from './OrderModal.module.css';
import {number} from "joi";



const OrderEditModal: FC = () => {

    const { handleSubmit, register, setValue} = useForm();
    const dispatch = useAppDispatch();
    const {orderForUpdate} = useAppSelector(state => state.orderReducer);
    console.log(orderForUpdate);
    const {groups} = useAppSelector(state => state.groupReducer);
    const {isOrderEditModalOpen} = useAppSelector(state => state.orderModalReducer);
    const [isInputVisible, setInputVisible] = useState(false);
    const [newGroupName, setNewGroupName] = useState('');

    useEffect(() => {
        if (orderForUpdate) {
            setValue('group', orderForUpdate.group)
            setValue('name', orderForUpdate.name)
            setValue('surname', orderForUpdate.surname)
            setValue('email', orderForUpdate.email)
            setValue('phone', orderForUpdate.phone)
            setValue('age', orderForUpdate.age)
            setValue('status', orderForUpdate.status)
            setValue('sum', orderForUpdate.sum)
            setValue('alreadyPaid', orderForUpdate.alreadyPaid)
            setValue('course', orderForUpdate.course)
            setValue('course_format', orderForUpdate.course_format)
            setValue('course_type', orderForUpdate.course_type)
        }
    }, [orderForUpdate, setValue])

    const update: SubmitHandler<IOrder> = async (order) => {
       await dispatch(orderActions.update({id: orderForUpdate.id, order}));
        dispatch(orderModalActions.closeOrderEditModal());
        console.log(order);
    };

    const createGroup:SubmitHandler<IGroup>  = async (group) => {
        await dispatch(groupActions.create({group}))
    }

    return (
        <Modal
            open={isOrderEditModalOpen}
            onClose={() => dispatch(orderModalActions.closeOrderEditModal())}
            className={css.modalBackground}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <div className={css.modalContent}>
                {/*<form onSubmit={handleSubmit(createGroup)}>*/}
                {/*    <input type="text" placeholder={'enter new group name'} {...register("title")}/>*/}
                {/*    <Button type={"submit"} variant="contained"*/}
                {/*            size="small"*/}
                {/*            sx={{width: '49%', maxHeight: '20px', backgroundColor: "green"}}> ADD GROUP</Button>*/}
                {/*</form>*/}
        <form onSubmit={handleSubmit(update)}>
            <div className={css.formContainer}>
                <div className={css.formColumn}>

                    <label>Group</label>
            {/*            {isInputVisible ? (*/}
            {/*                <><input className={css.formInput} type="text" placeholder={'enter new group name'}{...register('title')} />*/}
            {/*                /!*    <Button*!/*/}
            {/*                /!*    variant="contained"*!/*/}
            {/*                /!*    size="small"*!/*/}
            {/*                /!*    sx={{width: '49%', maxHeight: '20px', backgroundColor: "green"}}*!/*/}
            {/*                /!*    onClick={() => handleSubmit(createGroup)}>*!/*/}
            {/*                /!*    CREATE GROUP*!/*/}
            {/*                /!*</Button>*!/*/}
            {/*                </>*/}
            {/*            ) : (*/}
            <select className={css.formInput} {...register("group")}>
                {/*<option value=""></option>*/}
                {groups.map((group) => (
                    <option key={group.id} value={group.title}>
                        {group.title}
                    </option>
                ))}
            </select>
                        {/*)}*/}

                    <Button variant="contained" size="small" sx={{ width: '49%', maxHeight: '20px',  backgroundColor: "green"}} onClick={() => setInputVisible(!isInputVisible)}>
                        {isInputVisible ? 'SELECT' : 'ADD GROUP'}
                    </Button>

                    <label>Name</label>
            <input  className={css.formInput} type="text"  {...register('name')}/>

                    <label>Surname</label>
            <input  className={css.formInput} type="text"  {...register('surname')}/>
                    <label>Email</label>
            <input  className={css.formInput} type="text" {...register('email')}/>
                    <label>Phone</label>
            <input  className={css.formInput} type="text" {...register('phone')}/>
                    <label>Age</label>
            <input  className={css.formInput} {...register('age', {
                valueAsNumber: true
            })}/>
                </div>
                <div className={css.formColumn}>
                    <label>Status</label>
            <select className={css.formInput}  name={'status'}>
                <option value={EStatus.In_work}>{EStatus.In_work}</option>
                <option value={EStatus.New}>{EStatus.New}</option>
                <option value={EStatus.Aggre}>{EStatus.Aggre}</option>
                <option value={EStatus.Disaggre}>{EStatus.Disaggre}</option>
                <option value={EStatus.Dubbing}>{EStatus.Dubbing}</option>
                <option value={EStatus.empty}>{EStatus.empty}</option>
            </select>
                    <label>Sum</label>
            <input  className={css.formInput} type="text"  {...register('sum',{
                valueAsNumber: true
            } )}/>
                    <label>Already paid</label>
            <input  className={css.formInput} type="text"  {...register('alreadyPaid',{
                valueAsNumber: true
            } )}/>
                    <label>Course</label>
            <select  className={css.formInput} name={'course'}>
                {/*<option value=''></option>*/}
                <option value={ECourse.FS}>{ECourse.FS}</option>
                <option value={ECourse.QACX}>{ECourse.QACX}</option>
                <option value={ECourse.JCX}>{ECourse.JCX}</option>
                <option value={ECourse.JSCX}>{ECourse.JSCX}</option>
                <option value={ECourse.FE}>{ECourse.FE}</option>
                <option value={ECourse.PCX}>{ECourse.PCX}</option>
            </select>
                    <label>Course format</label>
            <select  className={css.formInput} name={'course_format'}>
                {/*<option value=''></option>*/}
                <option value={ECourseFormat.static}>{ECourseFormat.static}</option>
                <option value={ECourseFormat.online}>{ECourseFormat.online}</option>

            </select>
                    <label>Course type</label>
            <select  className={css.formInput} name={'course_type'}>
                {/*<option value=''></option>*/}
                <option value={ECourseType.pro}>{ECourseType.pro}</option>
                <option value={ECourseType.minimal}>{ECourseType.minimal}</option>
                <option value={ECourseType.premium}>{ECourseType.premium}</option>
                <option value={ECourseType.incubator}>{ECourseType.incubator}</option>
                <option value={ECourseType.vip}>{ECourseType.vip}</option>
            </select>

            <Button
                type={"submit"}
                className={css.formButton}
                variant="contained"
                color="primary"
            >
                SUBMIT
            </Button>
                </div>
            </div>
        </form>
                <Button
                    className={css.formButton}
                    variant="contained"
                    color="secondary"
                    onClick={() => dispatch(orderModalActions.closeOrderEditModal())}
                >
                    CLOSE
                </Button>
            </div>
        </Modal>
    );
};

export {OrderEditModal};
