import {FC, useEffect, useState} from 'react';
import {Button, Modal} from "@mui/material";
import {SubmitHandler, useForm} from "react-hook-form";

import {IGroup, IOrder} from "../../interfaces";
import { EStatus, ECourse, ECourseFormat, ECourseType} from "../../interfaces";
import {useAppDispatch, useAppSelector} from "../../hooks";
import {groupActions, orderActions, orderModalActions} from "../../redux";
import css from './OrderModal.module.css';



const OrderEditModal: FC = () => {

    const { handleSubmit, register, setValue} = useForm<IOrder>();
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
        dispatch(orderActions.update({id: orderForUpdate.id, order}))
        dispatch(groupActions.setTrigger())
        dispatch(orderModalActions.closeOrderEditModal())
    };

    const createGroup:SubmitHandler<IGroup>  = async (group) => {
        dispatch(groupActions.create(group))
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
        <form onSubmit={handleSubmit(update)}>
            <div className={css.formContainer}>
                <div className={css.formColumn}>

                    <label>Group</label>
                        {isInputVisible ? (
                    <form onSubmit={handleSubmit(createGroup)}>
                                <input  className={css.formInput} type="text"  {...register('group')}/>
                            <Button variant="contained" size="small" sx={{ width: '49%', maxHeight: '20px',  backgroundColor: "green"}}>
                                'CREATE GROUP'
                            </Button>
                    </form>
                        ) : (
            <select className={css.formInput} {...register("group")}>
                <option value=""></option>
                {groups.map((group) => (
                    <option key={group.id} value={group.id}>
                        {group.title}
                    </option>
                ))}
            </select>
                        )}

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
            <input  className={css.formInput} type="text"  {...register('age')}/>
                </div>
                <div className={css.formColumn}>
                    <label>Status</label>
            <select className={css.formInput}  name={'status'}>
                <option value=''></option>
                <option value={EStatus.In_work}>{EStatus.In_work}</option>
                <option value={EStatus.New}>{EStatus.New}</option>
                <option value={EStatus.Aggre}>{EStatus.Aggre}</option>
                <option value={EStatus.Disaggre}>{EStatus.Disaggre}</option>
                <option value={EStatus.Dubbing}>{EStatus.Dubbing}</option>
            </select>
                    <label>Sum</label>
            <input  className={css.formInput} type="text"  {...register('sum')}/>
                    <label>Already paid</label>
            <input  className={css.formInput} type="text"  {...register('alreadyPaid')}/>
                    <label>Course</label>
            <select  className={css.formInput} name={'course'}>
                <option value='FS'>FS</option>
                <option value='QACX'>QACX</option>
                <option value='JCX'>JCX</option>
                <option value='JSCX'>JSCX</option>
                <option value='FE'>FE</option>
                <option value='PCX'>PCX</option>
            </select>
                    <label>Course format</label>
            <select  className={css.formInput} name={'course_format'}>
                <option value='static'>static</option>
                <option value='online'>online</option>

            </select>
                    <label>Course type</label>
            <select  className={css.formInput} name={'course_type'}>
                <option value='pro'>pro</option>
                <option value='minimal'>minimal</option>
                <option value='premium'>premium</option>
                <option value='incubator'>incubato</option>
                <option value='vip'>vip</option>
            </select>

            <Button
                className={css.formButton}
                variant="contained"
                color="primary"
            >
                SUBMIT
            </Button>
            <Button
                className={css.formButton}
                variant="contained"
                color="secondary"
                onClick={() => dispatch(orderModalActions.closeOrderEditModal())}
            >
                CLOSE
            </Button>
                </div>
            </div>
        </form>
            </div>
        </Modal>
    );
};

export {OrderEditModal};
