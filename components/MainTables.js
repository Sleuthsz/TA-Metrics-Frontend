import React from 'react';
import TableTitle from "./TableTitle";

const MainTables = () => {
    return (
        <div>
            <TableTitle className="text-1xl" title1="Administrator View"/>
            <TableTitle className="text-1xl" title2="TA View"/>
        </div>
    );
};

export default MainTables;