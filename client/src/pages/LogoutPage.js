import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';

const LogoutPage = () => {
    // hook to navigate
    const history = useHistory();
// redirect using useEffect to home page
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