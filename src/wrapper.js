import React from "react";
import { motion } from 'framer-motion';
import { pageEffect } from "./CSS/animation";

const Wrapper = ({children}) =>{
    return(
        <motion.div
            initial= "initial"
            animate= "in"
            exit="out"
            transition={{duration : 0.3}}
            variants={pageEffect}
            >
            {children}
            </motion.div>
    )
}
export default Wrapper;