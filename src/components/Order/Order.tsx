import {FC} from 'react';
import {IOrder} from "../../interfaces";
import {useAppDispatch} from "../../hooks";

interface IProps {
order: IOrder
}

const Order: FC<IProps> = ({order}) => {
    const {id, name, surname, email, phone, age, course, course_format, course_type, sum, alreadyPaid, group, created_at, status, manager } = order;
    const dispatch = useAppDispatch();
    console.log(created_at);

    return (
            <table>
                <tr>
                    <td>{id}</td>
                    <td>{name}</td>
                    <td>{surname}</td>
                    <td>{email}</td>
                    <td>{phone}</td>
                    <td>{age}</td>
                    <td>{course}</td>
                    <td>{course_format}</td>
                    <td>{course_type}</td>
                    <td>{status}</td>
                    <td>{sum}</td>
                    <td>{alreadyPaid}</td>
                    <td>{group}</td>
                    {/*<td>{created_at}</td>*/}
                    <td>{manager}</td>

                </tr>
            </table>
    );
};

export {Order};
