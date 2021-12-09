import React, { FC } from "react";
import { SwitchItemStatement } from "./SwitchTypes";
interface SwitchItemProps extends React.HTMLAttributes<HTMLDivElement> {
    statement: SwitchItemStatement | boolean | string | number;
    parentId: string;
}
/**
 * Component for a case in a `<Switch>`.
 *
 * (Barebones, again. Will fix later.)
 *
 * @param {SwitchItemStatement | boolean | string | number} statement
 * @param {string} parentId
 */
declare const SwitchItem: FC<SwitchItemProps>;
export default SwitchItem;
