import { useState, useEffect, useRef } from 'react';
import './styles/Tunnel.css';

interface TunnelAnimationProps {
    active: boolean;
    destination: string;
    continued?: boolean;
    onComplete?: () => void;
    duration?: number;
}

const TunnelAnimation = ({
                             active,
                             destination,
                             continued = false,
                             onComplete,
                             duration = 3000
                         }: TunnelAnimationProps) => {
    const [segments, setSegments] = useState<number[]>([]);
    const [showWarning, setShowWarning] = useState(false);
    const [canRunTunnel, setCanRunTunnel] = useState(false);
    const animationTimer = useRef<number | null>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (active) {
            const isLowPerformance = navigator.hardwareConcurrency && navigator.hardwareConcurrency < 4;
            if (isLowPerformance) {
                setShowWarning(true);
                setTimeout(() => {
                    setShowWarning(false);
                    setCanRunTunnel(true);
                }, 2000);
            } else {
                setCanRunTunnel(true);
            }
        }
    }, [active]);

    useEffect(() => {
        if (active && canRunTunnel) {
            document.body.style.overflow = 'hidden';

            const numberOfSegments = 30;
            setSegments(Array.from({ length: numberOfSegments }, (_, i) => i));

            if (!continued) {
                animationTimer.current = window.setTimeout(() => {
                    window.location.href = destination;
                }, duration - 250);
            } else if (onComplete) {
                animationTimer.current = window.setTimeout(() => {
                    onComplete();
                }, duration);
            }

            if (containerRef.current) {
                containerRef.current.style.willChange = 'transform, opacity';
                containerRef.current.style.transform = 'translateZ(0)';
            }
        } else {
            // Restaura o scroll do usuário
            document.body.style.overflow = '';
        }

        return () => {
            if (animationTimer.current) {
                clearTimeout(animationTimer.current);
            }
            document.body.style.overflow = ''; // Garante que o scroll seja restaurado
        };
    }, [active, canRunTunnel, destination, continued, onComplete, duration]);

    if (!active) return null;

    return (
        <>
            {showWarning && (
                <div className="warning-container">
                    <p className="warning-message">Your device may be slow. Loading...</p>
                </div>
            )}
            {canRunTunnel && (
                <div
                    ref={containerRef}
                    className={`tunnel-container active z-100 ${continued ? 'continued' : ''}`}
                >
                    <div className="tunnel-flash"></div>
                    {segments.map((index) => {
                        const width = 400 + index * 50;
                        const height = 250 + index * 30;

                        const rotation = index % 2 === 0 ? index * 4.5 : -index * 4.5;

                        return (
                            <div
                                key={index}
                                className="tunnel-rotate"
                                style={{
                                    animationDuration: `${12 + index * 1.1}s`,
                                    animationDirection: index % 2 === 0 ? 'normal' : 'reverse'
                                }}
                            >
                                <div
                                    className="tunnel-ring"
                                    style={{
                                        width: `${width}px`,
                                        height: `${height}px`,
                                        animationDelay: `${index * 0.08}s`,
                                        transform: `rotateZ(${rotation}deg) translateZ(${index * 2}px)`,
                                        borderRadius: index % 3 === 0 ? '12px' : '8px'
                                    }}
                                />
                            </div>
                        );
                    })}

                    <div className="light-rays"></div>
                </div>
            )}
        </>
    );
};

export default TunnelAnimation;
