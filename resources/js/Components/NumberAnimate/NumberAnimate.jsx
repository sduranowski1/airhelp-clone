import React, { useState, useEffect } from 'react';
import { useInView } from 'react-intersection-observer';

const NumberAnimate = ({ targetNumber, duration }) => {
    const [count, setCount] = useState(0);

    // Detect if the element is in view
    const { ref, inView } = useInView({
        triggerOnce: true, // Trigger the animation only once when in view
        threshold: 0.5, // Start animation when 50% of the element is visible
    });

    useEffect(() => {
        if (inView) {
            // Animation logic
            let startTime = performance.now();
            const animate = (time) => {
                const timeElapsed = (time - startTime) / 1000; // Convert to seconds
                if (timeElapsed < duration) {
                    const progress = timeElapsed / duration;
                    setCount(Math.floor(progress * targetNumber)); // Update the number
                    requestAnimationFrame(animate); // Continue the animation
                } else {
                    setCount(targetNumber); // Set to the final number once animation completes
                }
            };
            requestAnimationFrame(animate);
        }
    }, [inView, targetNumber, duration]);

    return (
        <div ref={ref}>
            <h3 className="greenText font-weight-bold">{count.toLocaleString()}</h3>
        </div>
    );
};

export default NumberAnimate;
