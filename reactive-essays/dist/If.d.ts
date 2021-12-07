import React, { FC } from "react";
interface IfData {
    [index: string]: number;
}
interface IfStatement {
    (data: IfData): boolean;
}
interface IfProps extends React.HTMLAttributes<HTMLDivElement> {
    statement: IfStatement;
    refs: Array<string> | string;
}
declare const If: FC<IfProps>;
export default If;
