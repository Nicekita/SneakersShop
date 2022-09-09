import React, { Children } from "react";
import { cloneElement } from "react";
import {FaChevronLeft, FaChevronRight } from 'react-icons/fa'

function Slaider ({children})  {
    const pageWidth = 960;
    const [pages, setPages] = React.useState([])
    const [offset, setOffset] = React.useState(0)

    const handleLeftArrow = () => {
        setOffset((currentOffsent) => {
            const newOffset = currentOffsent + pageWidth;
            console.log(newOffset)
            return Math.min(newOffset, 0)
        })
    }

    const handleRightArrow = () => {
        setOffset((currentOffsent) => {
            const newOffset = currentOffsent - pageWidth;
            const maxOffset = -(pageWidth * (pages.length - 1));
            console.log(newOffset)
            return Math.max(newOffset, maxOffset)
        })
    }


    React.useEffect(() => {
        setPages(
            Children.map(children.props.children, (child) => {
                return cloneElement(child, {
                    style: {
                        height: '100%',
                        minWidth: `${pageWidth}px`,
                        maxWidth: `${pageWidth}px`,
                    },
                })
            })
        )
    }, []);

    return (
       <div className="main-container">
        <FaChevronLeft className="arrow" onClick={handleLeftArrow}/>
        <div className="window">
            <div className="all-pages-container"
                style={{
                    transform: `translateX(${offset}px)`
                }}
            >
                {pages}
            </div>
        </div>
        <FaChevronRight className="arrow" onClick={handleRightArrow}/>
       </div>
    );
}

export default Slaider;