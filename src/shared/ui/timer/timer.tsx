import React, {FC, useEffect, useState} from 'react';

interface IProps {
    fromDate?: string|Date;
    toDate: string|Date;
    onTimerEnds?: () => void;
}

export const Timer:FC<IProps> = ({fromDate, toDate, onTimerEnds}) => {
    const [timeLeft, setTimeLeft] = useState({
        days: '00',
        hours: '00',
        minutes: '00',
        seconds: '00'
    });

    useEffect(() => {
        const from = new Date(fromDate || new Date());
        const to = new Date(toDate).getTime() + 1000;

        const calculateTimeLeft = () => {
            const now = new Date();
            const distance = to - now.getTime();

            if (distance < 0) {
                clearInterval(timerInterval);
                return {
                    days: '00',
                    hours: '00',
                    minutes: '00',
                    seconds: '00'
                };
            }

            const days = Math.floor(distance / (1000 * 60 * 60 * 24));
            const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((distance % (1000 * 60)) / 1000);

            return {
                days: String(days).padStart(2, '0'),
                hours: String(hours).padStart(2, '0'),
                minutes: String(minutes).padStart(2, '0'),
                seconds: String(seconds).padStart(2, '0')
            };
        };

        const timerInterval = setInterval(() => {
            const timeLeft = calculateTimeLeft();
            if (timeLeft.days === '00' && timeLeft.hours === '00' && timeLeft.minutes === '00' && timeLeft.seconds === '00') {
                clearInterval(timerInterval);
                onTimerEnds && onTimerEnds();
            }
            setTimeLeft(timeLeft);
        }, 1000);

        // Initial call to set the timer immediately
        setTimeLeft(calculateTimeLeft());

        // Cleanup interval on component unmount
        return () => clearInterval(timerInterval);
    }, [fromDate, toDate]);

    return <>{timeLeft.hours}:{timeLeft.minutes}:{timeLeft.seconds}</>;
};