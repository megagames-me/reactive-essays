import { FC } from "react";
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
declare const People: FC<PeopleProps>;
export default People;
