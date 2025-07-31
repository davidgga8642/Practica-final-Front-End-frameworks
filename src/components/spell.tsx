import c from "classnames";
import { useEffect, useMemo, useState } from "react";
import upcastIcon from "src/assets/icons/other/upcast.png";

import { TooltipSpell } from "./TooltipSpell";  

import type { Spell } from "src/models/spell";

import styles from "./spell.module.css";

export function Spell({
  spell,
  highlighted,
  detailed,
}: {
  spell: Spell;
  highlighted: boolean | undefined;
  detailed: boolean | undefined;
}) {
  const [selected, setSelected] = useState(false);

  const [showImage, setShowImage] = useState(false);
  const randomDuration = useMemo(() => (Math.random() + 0.5).toFixed(2), []);
  const randomDelay = useMemo(() => (Math.random() * 2 + 1).toFixed(2), []);

  const animatedSpellStyles = {
    "--randomDelay": randomDelay + "s",
    "--randomDuration": randomDuration + "s",
  } as React.CSSProperties;

  useEffect(
    function setShowImageWhenTransitionEnds() {
      if (detailed) {
        const transitionTime =
          (parseFloat(randomDuration) + parseFloat(randomDelay)) * 1000;

        const timer = setTimeout(() => {
          setShowImage(true);
        }, transitionTime);

        return () => {
          clearTimeout(timer);
          setShowImage(false);
        };
      } else {
        setShowImage(false);
      }
    },
    [detailed, randomDuration, randomDelay]
  );

  const onClick = () => {
    if (!detailed) {
      return;
    }
    setSelected(!selected);
  };

  return (
  <TooltipSpell spell={spell}>
    <article
      tabIndex={0}
      className={c(
        styles.spell,
        highlighted && !detailed && styles.highlighted,
        detailed && styles.detailed,
        detailed && selected && styles.selected,
      )}
      data-spell-id={spell.id}
      style={animatedSpellStyles}
      aria-label={spell.name}
      aria-detailed={detailed ? "true" : "false"}
      {...(detailed ? { onClick } : {})}
    >
      {detailed && showImage && (
        <div className={styles.image}>
          <img src={spell.icon} alt={spell.name} className={styles.icon} />
          {spell.upcast && (
            <img src={upcastIcon} alt="upcast" className={styles.upcast} />
          )}
        </div>
      )}
    </article>
  </TooltipSpell>
);
}
