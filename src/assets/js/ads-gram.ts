export const adsGram = () => {
    const script = document.createElement('script');
    // script.async = true;
    script.src = `https://sad.adsgram.ai/js/sad.min.js`; // Замените на ваш Tracking ID
    document.head.appendChild(script);
};
