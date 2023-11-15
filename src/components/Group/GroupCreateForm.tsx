import type { FC } from "react";
import React from "react";

import type { IGroup } from "../../interfaces";

interface IProps {
  filteredGroups: IGroup[];
}
const GroupCreateForm: FC<IProps> = ({ filteredGroups }) => {
  // const dispatch = useAppDispatch();
  // const [groupName, setGroupName] = useState<string>();
  //
  // const createGroup = async (groupName: string) => {
  //   await dispatch(groupActions.create({ group: { title: groupName } }));
  // };
  if (filteredGroups.length > 0) {
    return (
      <ul>
        {filteredGroups.map((group) => (
          <li key={group.id}>{group.title}</li>
        ))}
      </ul>

      // <Box
      //   component="form"
      //   sx={{
      //     "& > :not(style)": { m: 1 },
      //   }}
      //   noValidate
      //   autoComplete="off"
      // >
      //   <TextField
      //     placeholder={"enter new group name"}
      //     value={groupName}
      //     onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
      //       setGroupName(e.target.value);
      //     }}
      //   />
      //   <Button
      //     variant="contained"
      //     size="small"
      //     sx={{
      //       width: "49%",
      //       maxHeight: "20px",
      //       backgroundColor: "green",
      //     }}
      //     onClick={async () => {
      //       await createGroup(groupName);
      //     }}
      //   >
      //     ADD Group
      //   </Button>
      // </Box>
    );
  }
};
export { GroupCreateForm };
