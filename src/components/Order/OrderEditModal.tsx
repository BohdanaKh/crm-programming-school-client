import {FC, useEffect} from 'react';
import {Button, Modal} from "@mui/material";
import {SubmitHandler, useForm} from "react-hook-form";
import {IOrder} from "../../interfaces";

import {useAppDispatch, useAppSelector} from "../../hooks";
import {groupActions, orderActions, orderModalActions} from "../../redux";
import './OrderModal.css';


const OrderEditModal: FC = () => {

    const { handleSubmit, register, setValue} = useForm<IOrder>();
    const dispatch = useAppDispatch();
    const {orderForUpdate} = useAppSelector(state => state.orderReducer);
    const {groups} = useAppSelector(state => state.groupReducer);
    const {isOrderEditModalOpen} = useAppSelector(state => state.orderModalReducer);


    useEffect(() => {
    if (orderForUpdate) {
        dispatch(groupActions.getAll())
    }
    }, [dispatch])
    console.log(groups);


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
        dispatch(orderModalActions.closeOrderEditModal())
    };

    return (
        <Modal
            open={isOrderEditModalOpen}
            onClose={() => dispatch(orderModalActions.closeOrderEditModal())}
            className="modal-background"
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <div className="modal-content">
        <form onSubmit={handleSubmit(update)}>
            <div className="form-container">
                <div className="form-column">
                    <label>Group
            <select className="form-input" name="group">
                {groups.map((group) => (
                    <option key={group.id} value={group.title}/>))}
            </select>
                    </label>
                    <Button variant="contained" size="small" sx={{ width: '100%', maxHeight: '20px',  backgroundColor: "green"}}>
                        ADD GROUP
                    </Button>
                    <label>Name
            <input  className="form-input" type="text"  {...register('name')}/>
                    </label>
                    <label>Surname</label>
            <input  className="form-input" type="text"  {...register('surname')}/>
                    <label>Email</label>
            <input  className="form-input" type="text" {...register('email')}/>
                    <label>Phone</label>
            <input  className="form-input" type="text" {...register('phone')}/>
                    <label>Age</label>
            <input  className="form-input" type="text"  {...register('age')}/>
                </div>
                <div className="form-column">
                    <label>Status</label>
            <select className="form-input"  name={'status'}>
                <option value='In_work'>In_work</option>
                <option value='New'>New</option>
                <option value='Aggre'>Aggre</option>
                <option value='Disaggre'>Disaggre</option>
                <option value='Dubbing'>Dubbing</option>
            </select>
                    <label>Sum</label>
            <input  className="form-input" type="text"  {...register('sum')}/>
                    <label>Already paid</label>
            <input  className="form-input" type="text"  {...register('alreadyPaid')}/>
                    <label>Course</label>
            <select  className="form-input" name={'course'}>
                <option value='FS'>FS</option>
                <option value='QACX'>QACX</option>
                <option value='JCX'>JCX</option>
                <option value='JSCX'>JSCX</option>
                <option value='FE'>FE</option>
                <option value='PCX'>PCX</option>
            </select>
                    <label>Course format</label>
            <select  className="form-input" name={'course_format'}>
                <option value='static'>static</option>
                <option value='online'>online</option>

            </select>
                    <label>Course type</label>
            <select  className="form-input" name={'course_type'}>
                <option value='pro'>pro</option>
                <option value='minimal'>minimal</option>
                <option value='premium'>premium</option>
                <option value='incubator'>incubato</option>
                <option value='vip'>vip</option>
            </select>

            <Button
                className="form-button"
                variant="contained"
                color="primary"
            >
                SUBMIT
            </Button>
            <Button
                className="form-button"
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
