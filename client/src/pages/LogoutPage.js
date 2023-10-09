import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';

const LogoutPage = () => {
    const history = useHistory();

    useEffect(() => {
        history.push('/');
    }, [history]);

    return (
     <div>
        Logging out...
    </div>
    );
};

export default LogoutPage;