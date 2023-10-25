import {SubmitHandler, useForm} from "react-hook-form";
import {useNavigate} from "react-router-dom";

import {useAppDispatch, useAppSelector} from "../../hooks";
import { IUser} from "../../interfaces";
import {userActions} from "../../redux";
import {useState} from "react";


const UserCreateForm = () => {
    const dispatch = useAppDispatch();
    const {error} = useAppSelector(state => state.userReducer);
    const navigate = useNavigate();
    const {register, handleSubmit, formState: {errors, isValid}} = useForm<IUser>({
        mode: 'all',
        // resolver: joiResolver(authValidator)
    });
    // const [formData, setFormData] = useState({
    //     email: '',
    //     name: '',
    //     surname: '',
    // });
    // const handleSubmit = () => {
    //     onUpdate(formData);
    //     onClose();
    // };

    const createUser: SubmitHandler<IUser> = async (user) => {
        const {meta: {requestStatus}} = await dispatch(userActions.create({user}));
        if (requestStatus === 'fulfilled') {
            navigate('/users')
        }
    };

    return (
        // <Modal isOpen={isOpen} onRequestClose={onClose}>
        <form onSubmit={handleSubmit(createUser)}>
            <label>Email</label>
            <input type="text" placeholder={'Email'} {...register('email')}/>

            <label>Name</label>
            <input type="text" placeholder={'Name'} {...register('name')}/>

            <label>Surname </label>
            <input type="text" placeholder={'Surname'} {...register('surname')}/>

            {/*<button onClick={onClose}>CANCEL</button>*/}
            <button disabled={!isValid}>CREATE</button>
            {Object.keys(errors).length > 0 && <div>{Object.values(errors)[0].message}</div>}
            {/*{error && <div>{error.username[0]}</div>}*/}
        </form>
        // </Modal>
    );
};

export {UserCreateForm};