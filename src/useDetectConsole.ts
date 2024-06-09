import { useEffect } from 'react';

const useDetectConsole = () => {
    useEffect(() => {
        let isConsoleOpen = false;

        const checkConsole = () => {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-expect-error
            if (!(typeof console.log === 'function' && console.clear && console.log && console)) {
                isConsoleOpen = true;
            } else {
                isConsoleOpen = true;
            }
        };

        const reloadIfConsoleOpen = () => {
            checkConsole();
            if (isConsoleOpen) {
                window.location.reload();
            }
        };

        const intervalId = setInterval(reloadIfConsoleOpen, 1000);

        return () => {
            clearInterval(intervalId);
        };
    }, []);
};

export default useDetectConsole;
