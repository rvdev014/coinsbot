import { useEffect, useRef } from 'react';

function useEventListener(eventName: any, handler: any, element: any = window, options: any) {
    const savedHandler = useRef<any>();

    useEffect(() => {
        savedHandler.current = handler;
    }, [handler]);

    useEffect(() => {
        const isSupported = element && element.addEventListener;
        if (!isSupported) return;

        const eventListener = (event: any) => savedHandler.current(event);
        element.addEventListener(eventName, eventListener, options);

        return () => {
            element.removeEventListener(eventName, eventListener, options);
        };
    }, [eventName, element, options]);
}

export default useEventListener;
