import React, { useContext, useState } from 'react';

export const ShowModalContext = React.createContext();

export function ShowModalProvider({children}){
    const [showModal, setShowModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);

    return (
        <ShowModalContext.Provider
            value={{
                showModal, setShowModal, showEditModal, setShowEditModal
            }}
            >
                {children}
        </ShowModalContext.Provider>
    )
}

const useModalContext = () => useContext(ShowModalContext);

export default useModalContext;
