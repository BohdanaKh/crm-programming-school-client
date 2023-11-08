import {FC} from 'react';
import {format} from "date-fns";
import { useAppSelector} from "../../hooks";




const Comment: FC = () => {
    const { comment: item } = useAppSelector(state => state.commentReducer)
const { comment,  created_at } = item;


const { me } = useAppSelector(state => state.authReducer);
const data = format(new Date(created_at), "MMMM dd, yyyy")
    return (
        <div style={{display: "flex", flexDirection: "row", justifyContent: "space-between"}}>

            <div style={{paddingRight: "20px"}}>{comment}</div>
            <div> {me.name} {me.surname} {data}</div>
        </div>
    );
};

export {Comment};
