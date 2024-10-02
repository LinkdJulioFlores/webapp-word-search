'use client'

import { useState, useRef, useEffect, useImperativeHandle, forwardRef } from "react";
import { SwipeableProps, SwipeableRef } from "src/interfaces/apis";

const SwipeableComponent = forwardRef<SwipeableRef, SwipeableProps>((props, ref) => {
    const { items, componentWidth } = props;
    const [currentIndex, setCurrentIndex] = useState(0);
    const containerRef = useRef<HTMLDivElement>(null);
    const [containerWidth, setContainerWidth] = useState(0);

    const itemWidth = componentWidth + 16; // Fixed width of each item

    const startX = useRef<number>(0);
    const moveX = useRef<number>(0);

    // Measure the container width on mount and resize
    useEffect(() => {
        /**
         * Resizes the parent container width
         */
        const handleResize = () => {
            if (containerRef.current) {
                setContainerWidth(containerRef.current.offsetWidth);
            }
        };

        handleResize(); // Set initial width
        window.addEventListener('resize', handleResize); // Update on resize
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // Handle touch start event
    const handleTouchStart = (e: React.TouchEvent) => {
        startX.current = e.touches[0]!.clientX;
    };

    // Handle touch move event
    const handleTouchMove = (e: React.TouchEvent) => {
        moveX.current = e.touches[0]!.clientX - startX.current;
    };

    // Handle touch end event to snap to the next or previous item
    const handleTouchEnd = () => {
        const threshold = containerWidth * 0.3; // Swipe must move 30% of the container width to switch items

        if (moveX.current > threshold && currentIndex > 0) {
            setCurrentIndex(currentIndex - 1);  // Swipe right to previous
        } else if (moveX.current < -threshold && currentIndex < items.length - 1) {
            setCurrentIndex(currentIndex + 1);  // Swipe left to next
        }

        moveX.current = 0;  // Reset movement
    };

    // Make next and previous functions accessible to the parent
    useImperativeHandle(ref, () => ({
        nextSlide() {
            if (currentIndex < items.length - 1) {
                setCurrentIndex(currentIndex + 1);
            }
        },
        prevSlide() {
            if (currentIndex > 0) {
                setCurrentIndex(currentIndex - 1);
            }
        },
    }));

    return (
        <div className="w-full h-auto">
            {/* Swipeable container */}
            <div
                ref={containerRef}
                className="overflow-hidden"
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
            >
                <div
                    className="flex transition-transform duration-300"

                    style={{ transform: `translateX(-${currentIndex * itemWidth}px)` }}
                >
                    {items.map((item, index) => (
                        <div key={index} className="flex-shrink-0" style={{ width: `${itemWidth}px` }}>
                            {item}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
});

export default SwipeableComponent;
