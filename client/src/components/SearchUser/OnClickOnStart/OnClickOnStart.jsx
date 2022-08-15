import React, { useState, useContext, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { SocketContext } from '../../../Context';

import FoundUser from '../FoundUser/FoundUser';

const OnClickOnStart = () => {
    // eslint-disable-next-line no-unused-vars
    const [isFound, setIsFound] = useState(false);
    const socket = useContext(SocketContext);

    const userID = useSelector((state) => state);

    useEffect(() => {
        if (isFound) {
            return
        }
        socket.connected && socket.emit('adding', { userID });
        socket.emit('createRoom', `${userID}-in-search`);
        socket.emit('join')
        socket.on('joined', () => {
            setIsFound(true);
        });
    }, [socket, userID]);

    return isFound ? <FoundUser /> : <div>Searching.....</div>;
};

export default OnClickOnStart;
