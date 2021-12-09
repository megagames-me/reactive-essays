import React, { BaseSyntheticEvent, FC, useEffect, useState } from "react";

import { on, off, AddS, StyliseN, trigger } from "../helpers";
import { SwitchData, SwitchStatement } from "./SwitchTypes";

function checkForActiveItems(data: HTMLCollection): number {
    var items = 0;
    for (let i = 0; i < data.length; i++) {
        if ((data[i] as HTMLElement).style.display !== "none") {
            items++;
        }
    }
    return items;
}
interface SwitchProps extends React.HTMLAttributes<HTMLDivElement> {
    // the id or ids of inputs that this uses
    refs: Array<string> | string;
    statement: SwitchStatement;
    // ID of switch. Like in value
    id: string;
    defaultCase?: () => FC;
}

/**
 * Component for a React switch, like in js
 * 
 * (Barebones docs, will update soon)
 * 
 * Example:
 * ```ts
 * switch (key) {
    case value:
        console.log("Key is value here!")
        break;

    default:
        console.log("No case matches key.")
        break;
}
 * ```
 * 
 * @param {Array<string> | string} refs
 * @param {SwitchStatement} statement
 * @param {id} id
 * @param {() => FC} [defaultCase] Optional
 */

const Switch: FC<SwitchProps> = (props: SwitchProps) => {
    const [args, setArgs] = useState<Array<string>>(
        typeof props.refs == "object" ? props.refs : [props.refs]
    );
    const [defaultNeed, setDefaultNeed] = React.useState(true);

    function handleValChange(e: any) {
        // Create input data
        const input: SwitchData = {};

        // Fill input object with data from refs
        for (const arg of args) {
            input[arg] = Number(
                (document.querySelector("#" + arg) as HTMLElement)?.dataset
                    .value
            );
        }

        trigger(props.id + ":switch", {
            val: props.statement(input),
            input,
            updatedBy: e.target,
        });
        if (props.defaultCase) {
            if (
                checkForActiveItems(
                    (
                        document.querySelector(
                            `#${props.id}-children`
                        ) as HTMLDivElement
                    ).children
                ) == 0
            ) {
                if (
                    checkForActiveItems(
                        (
                            document.querySelector(
                                `#${props.id}`
                            ) as HTMLDivElement
                        ).children
                    ) == 1
                ) {
                    trigger(props.id + ":switchdefault", {
                        active: true,
                    });
                }
            } else {
                if (
                    checkForActiveItems(
                        (
                            document.querySelector(
                                `#${props.id}`
                            ) as HTMLDivElement
                        ).children
                    ) == 2
                ) {
                    trigger(props.id + ":switchdefault", {
                        active: false,
                    });
                }
            }
        }
    }

    useEffect(() => {
        for (const arg of typeof props.refs == "string"
            ? [props.refs]
            : props.refs) {
            if (document.querySelector("#" + arg)) {
                on(arg + ":change", handleValChange);
            }
        }

        return function cleanup() {
            for (const arg of args) {
                off(arg + ":change", handleValChange);
            }
        };
    }, []);

    // remove custom props from final render so no errors happen
    const propstoadd = (({ statement, refs, defaultCase, ...o }) => o)(props);

    return (
        <div
            {...propstoadd}
            className={
                "RESwitch" + (props.className ? " " + props.className : "")
            }
            style={{}}
        >
            <div id={props.id + "-children"}>{props.children}</div>
            {(() => {
                if (defaultNeed && props.defaultCase) {
                    return props.defaultCase();
                }
                return null;
            })()}
        </div>
    );
};

export default Switch;
