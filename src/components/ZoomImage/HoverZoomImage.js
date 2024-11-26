import { useSpring, animated } from '@react-spring/web';

export const HoverZoomImage = ({ src, alt }) => {
  const [styles, setStyles] = useSpring(() => ({
    transform: 'scale(1)',
    config: { tension: 300, friction: 15, mass: 1 },
  }));

  return (
    <div className="relative overflow-hidden">
      <animated.img
        src={src}
        alt={alt}
        className="w-full h-auto"
        style={styles}
        onMouseEnter={() => setStyles({ transform: 'scale(1.6)' })}
        onMouseLeave={() => setStyles({ transform: 'scale(1)' })}  
      />
    </div>
  );
};
