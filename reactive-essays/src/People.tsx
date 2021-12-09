import React, { FC } from "react";

interface PeopleProps {
    rows: number;
    columns: number;
    people: number;
    percentage: number;
    hasIcon?: boolean;
    darkTheme?: boolean;
}

/**
 * A component that acts like those infographics with people percentages.
 * (Barebones, change later)
 * @param {number} rows
 * @param {number} columns
 * @param {number} people
 * @param {number} percentage
 * @param {boolean} [hasIcon] Default true
 * @param {boolean} [darkTheme] Default false
 */

const People: FC<PeopleProps> = ({
    rows,
    columns,
    people,
    percentage,
    hasIcon,
    darkTheme,
}: PeopleProps) => {
    if (percentage > 100 || percentage < 0) {
        throw new Error(
            "Percentage cannot be greater than 100 or less than 0."
        );
    } else if (rows < 0) {
        throw new Error("Rows cannot less than 0.");
    } else if (people < 0) {
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
    return (
        <div
            style={{
                display: "grid",
                gridTemplateRows: `repeat(${rows}, minmax(0, 1fr))`,
                gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))`,
                padding: "7.5px",
                gap: "7.5px",
                width: "max-content",
                height: "max-content",
                borderRadius: "7.5px",
                backgroundColor: darkTheme ? "#27272A" : "#E4E4E7",
            }}
        >
            {list.map((highlight: boolean, index: number) => {
                return (
                    <div
                        key={index}
                        style={{
                            width: "20px",
                            height: "20px",
                            backgroundColor: highlight
                                ? "#F87171"
                                : darkTheme
                                ? "#3F3F46"
                                : "#D4D4D8",
                            display: "grid",
                            placeItems: "center",
                            borderRadius: "5px",
                        }}
                    >
                        {/* The SVG bellow is from Google's Material icon pack */}
                        {hasIcon ? (
                            <svg
                                height="17.5px"
                                width="17.5px"
                                viewBox="0 0 24 24"
                                fill={
                                    highlight
                                        ? "#991B1B"
                                        : darkTheme
                                        ? "#71717A"
                                        : "#A1A1AA"
                                }
                            >
                                <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v1c0 .55.45 1 1 1h14c.55 0 1-.45 1-1v-1c0-2.66-5.33-4-8-4z" />
                            </svg>
                        ) : (
                            <></>
                        )}
                    </div>
                );
            })}
        </div>
    );
};
People.defaultProps = {
    hasIcon: true,
    darkTheme: false
}
export default People;
