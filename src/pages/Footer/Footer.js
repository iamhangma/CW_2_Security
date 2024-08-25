import React from 'react';
import { FiFacebook } from 'react-icons/fi';
import { AiOutlineInstagram } from 'react-icons/ai';
import { IoLogoYoutube } from 'react-icons/io';
import { Input, Stack, Button } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import './footercss.css';

const Footer = () => {
    return (
        <div className="footerCmp">
            <footer>
                <div className="footer-categories">
                    <h1>Categories</h1>
                    <ul>
                        <li><Link to='/shop/?cg=Women'>Women</Link></li>
                        <li><Link to='/shop/?cg=Men'>Men</Link></li>
                        <li><Link to='/shop/?cg=Shoes'>Shoes</Link></li>
                        <li><Link to='/shop/?cg=Watches'>Watches</Link></li>
                    </ul>
                </div>

                <div className="footer-help">
                    <h1>Help</h1>
                    <ul>
                        <li>Track Order</li>
                        <li>Returns</li>
                        <li>Shipping</li>
                        <li>FAQs</li>
                    </ul>
                </div>

                <div className="footer-get-in-touch">
                    <h1>Get in Touch</h1>
                    <p>Any questions? Let us know in store at BP 473 Complexe universitaire Al Qods, Oujda 60000 or call us on (+212) 65964665</p>
                    <div className="footer-icons">
                        <a href="https://facebook.com" aria-label="Facebook"><FiFacebook size="25" /></a>
                        <a href="https://instagram.com" aria-label="Instagram"><AiOutlineInstagram size="25" /></a>
                        <a href="https://youtube.com" aria-label="YouTube"><IoLogoYoutube size="25" /></a>
                    </div>
                </div>

                <div className="footer-newsletter">
                    <h1>Newsletter</h1>
                    <Stack spacing={3} width="200px">
                        <Input variant="flushed" placeholder="email@example.com" />
                        <Button colorScheme="teal" variant="solid" width="100%">Subscribe</Button>
                    </Stack>
                </div>

                <div className="footer-credits">
                    <ul>
                        <li><img src="https://i.imgur.com/AHCoUZO.png" alt="Credit Card 1" className="img1" /></li>
                        <li><img src="https://i.imgur.com/JZRipBg.png" alt="Credit Card 2" className="img2" /></li>
                        <li><img src="https://i.imgur.com/l8OAGyo.png" alt="Credit Card 3" className="img3" /></li>
                        <li><img src="https://i.imgur.com/IDHC2iv.png" alt="Credit Card 4" className="img4" /></li>
                    </ul>
                </div>

                <div className="footer-paragraph">
                    <p>Copyright ©2021 All rights reserved | This template is made with ♡ by Developers of ESTO</p>
                    <div className="footer-links">
                        <Link to='/'>Abdessamad Bourhjoul</Link>
                        <Link to='/'>Soufian Zaan</Link>
                        <Link to='/'>Souhail Ouabou</Link>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default Footer;
