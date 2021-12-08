import React, { FC, useEffect, useState } from "react";

import { off, on } from "../helpers";

interface SwitchItemDefaultProps extends React.HTMLAttributes<HTMLDivElement> {
    // ID of parent switch
    parentId: string;
}

const SwitchItemDefault: FC<SwitchItemDefaultProps> = (
    props: SwitchItemDefaultProps
) => {
    const [active, setActive] = useState(false);

    function handleValChange(e: any) {
        setActive(e.detail.active);
    }

    useEffect(() => {
        if (document.querySelector("#" + props.parentId)) {
            on(props.parentId + ":switchdefault", handleValChange);
        } else {
            throw new DOMException(
                "The reactive-essays <Switch> component with the id '" +
                    props.parentId +
                    "' doesn't exist. Try fixing the parentId prop."
            );
        }

        return function cleanup() {
            if (document.querySelector("#" + props.parentId)) {
                off(props.parentId + ":switchdefault", handleValChange);
            }
        };
    }, []);

    // remove custom props from final render so no errors happen
    const propstoadd = (({ parentId, ...o }) => o)(props);
    if (!active) {
        return null;
    }

    return (
        <div
            {...propstoadd}
            className={
                "RESwitchItemDefault" +
                (props.className ? " " + props.className : "")
            }
        >
            {props.children}
        </div>
    );
};

export default SwitchItemDefault;
