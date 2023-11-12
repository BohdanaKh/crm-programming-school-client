import { Box, Button, TextField } from "@mui/material";
import type { FC } from "react";
import React, { useState } from "react";

import { useAppDispatch } from "../../hooks";
import { groupActions } from "../../redux";

const Groups: FC = () => {
  const dispatch = useAppDispatch();
  const [groupName, setGroupName] = useState<string>();

  const createGroup = async (groupName: string) => {
    await dispatch(groupActions.create({ group: { title: groupName } }));
  };

  return (
    <Box
      component="form"
      sx={{
        "& > :not(style)": { m: 1 },
      }}
      noValidate
      autoComplete="off"
    >
      <TextField
        placeholder={"enter new group name"}
        value={groupName}
        onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
          setGroupName(e.target.value);
        }}
      />
      <Button
        onClick={async () => {
          await createGroup(groupName);
        }}
      >
        ADD Group
      </Button>
    </Box>
  );
};

export { Groups };
