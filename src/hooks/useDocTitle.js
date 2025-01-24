import { useEffect } from 'react';

const useDocTitle = (title) => {
    useEffect(() => {
        if (title) {
            document.title = `${title} - AudioLoom`;
        } else {
            document.title = 'AudioLoom | The Perfect Audio Store';
        }
    }, [title]);

    return null;
};

export default useDocTitle;
