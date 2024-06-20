import { useState, useRef, useLayoutEffect } from "react";

export default function OverflowContainer({
  items,
  getKey,
  renderItem,
  renderOverflow,
  className,
}) {
  const [overflowAmount, setoverflowAmount] = useState(0);
  const containerRef = useRef(null);

  useLayoutEffect(
    function () {
      if (containerRef.current == null) return;

      const observer = new ResizeObserver((entries) => {
        const containerElement = entries[0]?.target;
        if (containerElement == null) return;
        const children = containerElement.querySelectorAll("[data-item]");
        const overflowElement =
          containerElement.parentElement?.querySelector("[data-overflow]");

        if (overflowElement != null) overflowElement.style.display = "none";
        children.forEach((child) => child.style.removeProperty("display"));
        let amount = 0;
        for (let i = children.length - 1; i >= 0; i--) {
          const child = children[i];
          if (containerElement.scrollHeight <= containerElement.clientHeight) {
            break;
          }
          amount = children.length - i;
          child.style.display = "none";
          overflowElement?.style.removeProperty("display");
        }
        setoverflowAmount(amount);
      });

      observer.observe(containerRef.current);

      observer.observe(containerRef.current);

      return () => observer.disconnect;
    },
    [items]
  );

  return (
    <>
      <div className={className} ref={containerRef}>
        {items.map((item) => {
          return (
            <div data-item key={getKey(item)}>
              {renderItem(item)}
            </div>
          );
        })}
      </div>
      <div data-overflow>{renderOverflow(overflowAmount)}</div>
    </>
  );
}
