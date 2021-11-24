import React from 'react';
import Divider from '@mui/material/Divider';

interface IFooterProps {

}

const Footer = (props: IFooterProps) => {
    return (
        <footer>
             <Divider />
            <small className="copyright">Atakan Yasin Uludağ</small>
        </footer>
    )
}

export default Footer;