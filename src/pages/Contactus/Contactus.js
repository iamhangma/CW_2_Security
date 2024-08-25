import React, { useState } from 'react';
import { Image, Input, InputGroup, InputLeftElement, Textarea, Button } from '@chakra-ui/react';
import { Helmet } from 'react-helmet';
import { BsEnvelope } from 'react-icons/bs';
import { GiPositionMarker } from 'react-icons/gi';
import { HiOutlinePhone } from 'react-icons/hi';
import './contactuscss.css';

const Contactus = () => {
    const [email, setEmail] = useState('');
    const [body, setBody] = useState('');

    const handleSubmit = () => {
        const encodedBody = encodeURIComponent(body);
        window.open(`mailto:abdessamadbouthjoul@gmail.com?subject=Contact&body=${encodedBody}`);
    };

    return (
        <div className="contactUs">
            <Helmet>
                <title>Contact</title>
            </Helmet>
            <div className="headerContact">
                <Image className="imageContact" src='https://i.imgur.com/7rwaigw.jpg' alt="Contact" objectFit="cover" />
                <div className="text">
                    <h2>Contact</h2>
                </div>
            </div>

            <div className="card-contact">
                <div className="sendMsg">
                    <h4>Send Us A Message</h4>
                    <div className="inputContact">
                        <InputGroup width="450px">
                            <InputLeftElement pointerEvents="none" children={<BsEnvelope color="gray.300" />} />
                            <Input 
                                value={email} 
                                onChange={e => setEmail(e.target.value)} 
                                type="email" 
                                placeholder="Your Email Address" 
                                aria-label="Your Email Address"
                            />
                        </InputGroup>
                    </div>
                    <div className="textAreaCnt">
                        <Textarea 
                            value={body} 
                            onChange={e => setBody(e.target.value)} 
                            width="450px" 
                            placeholder="How Can We Help?" 
                            height="200px" 
                            aria-label="Message Body"
                        />
                    </div>
                    <div className="contentContact">
                        <Button 
                            onClick={handleSubmit} 
                            borderRadius="90px" 
                            colorScheme="teal" 
                            variant="solid" 
                            size="lg" 
                            className="contactBtn"
                        >
                            Submit
                        </Button>
                    </div>
                </div>

                <div className="showAdrss">
                    <div className="box">
                        <div className="iconCtn"><GiPositionMarker opacity="0.8" /></div>
                        <div className="adressCtn">
                            <h3>Address</h3>
                            <p>Coza Store Center, 8th Floor, 379 Hudson St, New York, NY 10018 US</p>
                        </div>
                    </div>
                    <div className="box">
                        <div className="iconCtn"><HiOutlinePhone opacity="0.8" /></div>
                        <div className="adressCtn">
                            <h3>Let's Talk</h3>
                            <p className="infoCtn">0657964665</p>
                        </div>
                    </div>
                    <div className="box">
                        <div className="iconCtn"><BsEnvelope opacity="0.8" /></div>
                        <div className="adressCtn">
                            <h3>Sales Support</h3>
                            <p className="infoCtn">store@gmail.com</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Contactus;
