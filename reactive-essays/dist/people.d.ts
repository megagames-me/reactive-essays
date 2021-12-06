import { FC } from "react";
interface PeopleProps {
    rows: number;
    columns: number;
    people: number;
    percentage: number;
    hasIcon: boolean;
    darkTheme: boolean;
}
declare const People: FC<PeopleProps>;
export default People;
