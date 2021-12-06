import { jsx as _jsx, Fragment as _Fragment } from "react/jsx-runtime";
const People = ({ rows, columns, people, percentage, hasIcon, darkTheme }) => {
    if (percentage > 100 || percentage < 0) {
        throw new Error("Percentage cannot be greater than 100 or less than 0.");
    }
    else if (rows < 0) {
        throw new Error("Rows cannot less than 0.");
    }
    else if (people < 0) {
        throw new Error("People cannot less than 0.");
    }
    const toPeople = () => {
        let amount = Math.floor((percentage / 100) * people);
        let list = [];
        for (let i = 0; i < people; i++) {
            if (amount > 0) {
                console.log(1);
                list.push(true);
                amount--;
                continue;
            }
            list.push(false);
        }
        return list;
    };
    const list = toPeople();
    return (_jsx("div", { style: {
            display: "grid",
            gridTemplateRows: `repeat(${rows}, minmax(0, 1fr))`,
            gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))`,
            padding: "7.5px",
            gap: "7.5px",
            width: "max-content",
            height: "max-content",
            borderRadius: "7.5px",
            backgroundColor: darkTheme ? "#27272A" : "#E4E4E7"
        }, children: list.map((highlight, index) => {
            return (_jsx("div", { style: {
                    width: "20px",
                    height: "20px",
                    backgroundColor: highlight ? "#F87171" : darkTheme ? "#3F3F46" : "#D4D4D8",
                    display: "grid",
                    placeItems: "center",
                    borderRadius: "5px",
                }, children: hasIcon ? (_jsx("svg", { height: "17.5px", width: "17.5px", viewBox: "0 0 24 24", fill: highlight ? "#991B1B" : darkTheme ? "#71717A" : "#A1A1AA", children: _jsx("path", { d: "M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v1c0 .55.45 1 1 1h14c.55 0 1-.45 1-1v-1c0-2.66-5.33-4-8-4z" }, void 0) }, void 0)) : (_jsx(_Fragment, {}, void 0)) }, index));
        }) }, void 0));
};
export default People;
