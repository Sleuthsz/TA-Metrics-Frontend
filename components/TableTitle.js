import React from 'react';
import AdminTable from "AdminComponents/AdminTable";
import TAView from "./TAView";

let TableTitle = ({ title1, title2 }) => {
    if (AdminTable) {
        return (
            <h2>
                {title1}
            </h2>
        );
    }
    if (TAView) {
        return (
            <h2>
                {title2}
            </h2>
        );
    }
};
export default TableTitle;
