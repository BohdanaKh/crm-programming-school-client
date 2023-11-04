import {SubmitHandler, useForm} from "react-hook-form";
import {useNavigate} from "react-router-dom";
import {Modal} from "@mui/material";

import {useAppDispatch, useAppSelector} from "../../hooks";
import { IUser} from "../../interfaces";
import {adminActions, userActions, userModalActions} from "../../redux";
import './UserModal.css';



const UserCreateModal = () => {
    const dispatch = useAppDispatch();
    const {error} = useAppSelector(state => state.userReducer);
    const navigate = useNavigate();
    const { isUserCreateModalOpen } = useAppSelector(state => state.userModalReducer);

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
            // navigate('/users')
            dispatch(userModalActions.closeUserCreateModal())
            dispatch(adminActions.setShowUsers())

        }
    };

    return (
        <Modal
            open={isUserCreateModalOpen}
            onClose={() => dispatch(userModalActions.closeUserCreateModal())}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            className="modal-background"
        >
            <div className="modal-content">
        <form onSubmit={handleSubmit(createUser)}>
            <div>

            <label className="form-label">Email</label>
            <input className="form-input" type="text" placeholder={'Email'} {...register('email')}/>
            </div>
<div>

            <label className="form-label">Name</label>
            <input className="form-input" type="text" placeholder={'Name'} {...register('name')}/>
</div>
<div>

            <label className="form-label">Surname</label>
            <input className="form-input" type="text" placeholder={'Surname'} {...register('surname')}/>
</div>

            <button  className="form-button" disabled={!isValid}>CREATE</button>
            {Object.keys(errors).length > 0 && <div>{Object.values(errors)[0].message}</div>}
            {/*{error && <div>{error.username[0]}</div>}*/}
            <button  className="form-button" type={"button"} onClick={() => dispatch(userModalActions.closeUserCreateModal())}>CANCEL</button>
        </form>
            </div>
        </Modal>
    );
};

export {UserCreateModal};