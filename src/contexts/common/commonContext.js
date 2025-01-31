import { createContext, useReducer, useEffect } from 'react';
import axios from 'axios'; // Make sure you have axios installed
import commonReducer from './commonReducer';

// Common-Context
const commonContext = createContext();

// Initial State
const initialState = {
    isFormOpen: false,
    formUserInfo: '',  // Initially empty, will be populated from backend
    isSearchOpen: false,
    searchResults: []
};

// Common-Provider Component
const CommonProvider = ({ children }) => {
    const [state, dispatch] = useReducer(commonReducer, initialState);

    // Fetch user info from backend when the component mounts
    useEffect(() => {
        const token = localStorage.getItem('userToken');  // Get the token from localStorage
        if (token) {
            const fetchUserInfo = async () => {
                try {
                    const response = await axios.get('http://localhost:5000/api/user', {
                        headers: {
                            Authorization: `Bearer ${token}`  // Use token for authentication
                        }
                    });

                    const userInfo = response.data;  // Assuming response contains user info
                    dispatch({
                        type: 'SET_FORM_USER_INFO',
                        payload: { info: userInfo }
                    });
                } catch (error) {
                    console.error('Error fetching user info:', error);
                }
            };

            fetchUserInfo();  // Call the function to fetch user data from the backend
        }
    }, []);  // Empty dependency array ensures this runs once on component mount

    // Form actions
    const toggleForm = (toggle) => {
        return dispatch({
            type: 'TOGGLE_FORM',
            payload: { toggle }
        });
    };

    const setFormUserInfo = (info) => {
        return dispatch({
            type: 'SET_FORM_USER_INFO',
            payload: { info }
        });
    };

    // Search actions
    const toggleSearch = (toggle) => {
        return dispatch({
            type: 'TOGGLE_SEARCH',
            payload: { toggle }
        });
    };

    const setSearchResults = (results) => {
        return dispatch({
            type: 'SET_SEARCH_RESULTS',
            payload: { results }
        });
    };

    // Context values
    const values = {
        ...state,
        toggleForm,
        setFormUserInfo,
        toggleSearch,
        setSearchResults
    };

    return (
        <commonContext.Provider value={values}>
            {children}
        </commonContext.Provider>
    );
};

export default commonContext;
export { CommonProvider };
