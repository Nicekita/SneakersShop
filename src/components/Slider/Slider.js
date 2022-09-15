import React, { Children } from "react";
import styles from './Slider.module.scss'
import { cloneElement } from "react";
import {FaChevronLeft, FaChevronRight } from 'react-icons/fa';


function Slaider ({children})  {
    const pageWidth = 1000;
    const [pages, setPages] = React.useState([])
    const [offset, setOffset] = React.useState(0)
    

    const handleLeftArrow = () => {
        setOffset((currentOffsent) => {
            const newOffset = currentOffsent + pageWidth;
            return Math.min(newOffset, 0)
        })
    }

    const handleRightArrow = () => {
        setOffset((currentOffsent) => {
            const newOffset = currentOffsent - pageWidth;
            const maxOffset = -(pageWidth * (pages.length - 1));
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
       <div className={styles.mainContainer}>
        <FaChevronLeft className="arrow" onClick={handleLeftArrow}/>
        <div className={styles.window}>
            <div className={styles.allPagesContainer}
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