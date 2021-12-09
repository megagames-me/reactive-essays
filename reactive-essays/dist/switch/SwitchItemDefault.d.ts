import React, { FC } from "react";
interface SwitchItemDefaultProps extends React.HTMLAttributes<HTMLDivElement> {
    parentId: string;
}
/**
 * Component for default case in `<Switch>`
 *
 * @param {string} parentId ID of parent element (Should be a `<Switch>` component)
 */
declare const SwitchItemDefault: FC<SwitchItemDefaultProps>;
export default SwitchItemDefault;
