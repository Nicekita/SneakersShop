import React from "react";
import { Button } from 'react-bootstrap';
import { AppContext } from "../App";
import axios from "axios";




function Pagination () {
    const { setItems, fullItems } = React.useContext(AppContext);
    const countItems = 8;
    let countPages = [];
    
    for (let i = 1; i <=  Math.ceil(fullItems.length / countItems); i++) {
        countPages.push(i);
    }

    const onClickPage = (page) => {
        axios.get(`https://62f4dbd3535c0c50e763e5af.mockapi.io/Items?page=${page}&limit=8`).then(res => setItems(res.data));
    }

    return (
        <div className="d-flex align-center justify-center mt-5 mb-40">
            {
                countPages.map((value) => (
                    <Button key={value} onClick = {((event) => onClickPage(event.target.textContent))} variant="outline-secondary">{value}</Button>
                ))
            }
        </div>
    )
}

export default Pagination