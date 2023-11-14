import { format } from "date-fns";
import type { FC } from "react";

import { useAppSelector } from "../../hooks";
import type { IComment } from "../../interfaces";

interface IProps {
  item: IComment;
}
const Comment: FC<IProps> = ({ item }) => {
  const { comment, created_at } = item;

  const { me } = useAppSelector((state) => state.authReducer);
  const data = format(new Date(created_at), "MMMM dd, yyyy");
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
      }}
    >
      <div style={{ paddingRight: "20px" }}>{comment}</div>
      <div>
        {" "}
        {me.name} {me.surname} {data}
      </div>
    </div>
  );
};

export { Comment };
