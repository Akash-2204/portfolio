import styles from "./marquee.module.scss";

interface MarqueeProps extends React.HTMLAttributes<HTMLDivElement> {
  vertical?: boolean;
  repeat?: number;
  reverse?: boolean;
  pauseOnHover?: boolean;
  applyMask?: boolean;
}

export default function Marquee({
  children,
  vertical = false,
  repeat = 7,
  pauseOnHover = false,
  reverse = false,
  className,
  applyMask = true,
  ...props
}: MarqueeProps) {
  return (
    <div
      {...props}
      className={`${styles.marqueeContainer} ${
        vertical ? styles.vertical : styles.horizontal
      } ${className}`}
    >
      {Array.from({ length: repeat }).map((_, index) => (
        <div
          key={`item-${index}`}
          className={`${styles.marqueeTrack} ${
            pauseOnHover ? styles.paused : ""
          } ${reverse ? styles.reverse : ""} ${
            vertical ? styles.vertical : styles.horizontal
          }`}
        >
          {children}
        </div>
      ))}
      {applyMask && (
        <div className={`${styles.marqueeMask} ${vertical ? styles.vertical : ""}`} />
      )}
    </div>
  );
}
