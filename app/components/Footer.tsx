import React from 'react';

interface IFooterProps {

}

const Footer = (props: IFooterProps) => {
    return (
        <footer className="footer text-center py-2 theme-bg-dark">
            <small className="copyright">Atakan Yasin Uludağ</small>
        </footer>
    )
}

export default Footer;