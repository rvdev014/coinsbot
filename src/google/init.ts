// src/analytics.js
export const initGA = () => {
    const script = document.createElement('script');
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=G-PY4TZRR9PB`; // Замените на ваш Tracking ID
    document.head.appendChild(script);

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    window.dataLayer = window.dataLayer || [];
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    // eslint-disable-next-line prefer-rest-params
    function gtag(){window.dataLayer.push(arguments);}
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    gtag('js', new Date());
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    gtag('config', 'G-PY4TZRR9PB'); // Замените на ваш Tracking ID
};
