import {FC} from 'react';
import {IComment} from "../../interfaces";
import {format} from "date-fns";

interface IProps {
item: IComment
}

const Comment: FC<IProps> = ({item}) => {
const { id, comment, userId,  created_at } = item;
const data = format(new Date(created_at), "MMMM dd, yyyy")
    return (
        <div style={{display: "flex", flexDirection: "row", justifyContent: "space-between"}}>
            <div style={{paddingRight: "20px"}}>{comment}</div>
            <div>{userId} {data}</div>
        </div>
    );
};

export {Comment};
