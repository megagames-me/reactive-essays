import React, { BaseSyntheticEvent, FC, useEffect, useState } from "react";

import { on, off, AddS, StyliseN, trigger } from "../helpers";

import { SwitchItemStatement } from "./SwitchTypes";

interface SwitchItemProps extends React.HTMLAttributes<HTMLDivElement> {
    // Function that returns true or false whether it's active
    statement: SwitchItemStatement | boolean | string | number;
    // ID of parent switch
    parentId: string;
}

const SwitchItem: FC<SwitchItemProps> = (props: SwitchItemProps) => {

    const [active, setActive] = useState<boolean>(false);

    function handleValChange(e: any) {
        if (typeof props.statement == "function") {
            setActive(props.statement(e.detail.val, e.detail.input));
        } else {
            setActive(props.statement == e.detail.val);
        }
    }

    useEffect(() => {
        if (document.querySelector("#" + props.parentId)) {
            on(props.parentId + ":switch", handleValChange);
        } else {
            throw new DOMException("The reactive-essays <Switch> component with the id '" + props.parentId + "' doesn't exist. Try fixing the parentId prop.")
        }


        return function cleanup() {
            if (document.querySelector("#" + props.parentId)) {
                off(props.parentId + ":switch", handleValChange);
            }
    
        };
    }, []);

    // remove custom props from final render so no errors happen
    const propstoadd = (({ statement, parentId, ...o }) => o)(props);
    if (!active) {
        return null;
    }
    return (
        <div
            {...propstoadd}
            className={
                "RESwitchItem" + (props.className ? " " + props.className : "")
            }
            style={{}}
        >
            {props.children}
        </div>
    );
};




export default SwitchItem;
