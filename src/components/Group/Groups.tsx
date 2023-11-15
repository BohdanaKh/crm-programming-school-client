import type { FC } from "react";
import React from "react";

import type { IGroup } from "../../interfaces";

interface IProps {
  filteredGroups: IGroup[];
}
const Groups: FC<IProps> = ({ filteredGroups }) => {
  if (filteredGroups.length > 0) {
    return (
      <ul>
        {filteredGroups.map((group) => (
          <li key={group.id}>{group.title}</li>
        ))}
      </ul>
    );
  }
};
export { Groups };
