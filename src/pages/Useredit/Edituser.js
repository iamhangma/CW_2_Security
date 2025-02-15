import React, { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getUserDetails, updateUser } from '../../actions/userActions';
import { AiOutlineUser } from 'react-icons/ai';
import { HiOutlineMail } from 'react-icons/hi';
import HashLoader from 'react-spinners/HashLoader';
import { Input, InputGroup, InputRightElement } from '@chakra-ui/input';
import { Checkbox } from '@chakra-ui/checkbox';
import { USER_UPDATE_RESET } from '../../constants/userConstants';
import { Helmet } from 'react-helmet';
import './Edituser.css';

const Edituser = ({ match, history }) => {
    const userId = match.params.id;
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [isAdmin, setIsAdmin] = useState(false);
    const [message] = useState(null);

    const dispatch = useDispatch();
    const userDetails = useSelector((state) => state.userDetails);
    const { loading, error, user } = userDetails;

    const userUpdate = useSelector((state) => state.userUpdate);
    const { loading: loadingUpdate, error: errorUpdate, success: successUpdate } = userUpdate;

    useEffect(() => {
        if (successUpdate) {
            dispatch({ type: USER_UPDATE_RESET });
            history.push('/admin/userlist');
        } else {
            if (!user.name || user._id !== userId) {
                dispatch(getUserDetails(userId));
            } else {
                setName(user.name);
                setEmail(user.email);
                setIsAdmin(user.isAdmin);
            }
        }
    }, [dispatch, userId, history, user, successUpdate]);

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(updateUser({ _id: userId, name, email, isAdmin }));
    };

    return (
        <div className='Edituser'>
            <Helmet>
                <title>Edit User</title>
            </Helmet>
            {error || errorUpdate ? <h4>{error || errorUpdate}</h4> : null}
            {successUpdate ? <h4>Profile Updated</h4> : null}
            {loading || loadingUpdate ? (
                <div className='loading'>
                    <HashLoader color={"#1e1e2c"} loading={loading || loadingUpdate} size={40} />
                </div>
            ) : (
                <div>
                    <h4 className='Edittitle'>Edit User :</h4>
                    <div className='formedit'>
                        <form onSubmit={submitHandler}>
                            <div>
                                <div className="input-div zz">
                                    <div className="div">
                                        <InputGroup>
                                            <Input
                                                type="text"
                                                value={name}
                                                placeholder="Enter name"
                                                onChange={(e) => setName(e.target.value)}
                                                className="inputa"
                                            />
                                            <InputRightElement children={<AiOutlineUser />} />
                                        </InputGroup>
                                    </div>
                                </div>

                                <div className="input-div one">
                                    <div className="div">
                                        <InputGroup>
                                            <Input
                                                type="email"
                                                value={email}
                                                placeholder="Enter email"
                                                onChange={(e) => setEmail(e.target.value)}
                                                className="inputa"
                                            />
                                            <InputRightElement children={<HiOutlineMail />} />
                                        </InputGroup>
                                    </div>
                                </div>

                                <div className="input-div pass">
                                    <div className="div">
                                        <Checkbox
                                            isChecked={isAdmin}
                                            onChange={(e) => setIsAdmin(e.target.checked)}
                                        >
                                            isAdmin
                                        </Checkbox>
                                    </div>
                                </div>
                                {message && <h4 className='Message'>{message}</h4>}
                                <input type="submit" className="btna2" value="Update" />
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Edituser;
