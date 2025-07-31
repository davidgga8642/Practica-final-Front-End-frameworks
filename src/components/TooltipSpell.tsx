import * as Tooltip from "@radix-ui/react-tooltip";
import styles from "./tooltip.module.css";

export function TooltipSpell({ spell, children }) {
  return (
    <Tooltip.Provider>
      <Tooltip.Root>
        <Tooltip.Trigger asChild>{children}</Tooltip.Trigger>
        <Tooltip.Portal>
          <Tooltip.Content className={styles.tooltip}>
            <div><strong>{spell.name}</strong></div>
            {spell.concentration && <img src="/icons/concentration.png" alt="Requiere concentración" />}
            {spell.upcast && <img src="/icons/upcast.png" alt="Aumento disponible" />}
            {spell.damageTypes?.map(type => (
              <img key={type} src={`/icons/${type}.png`} alt={type} />
            ))}
          </Tooltip.Content>
        </Tooltip.Portal>
      </Tooltip.Root>
    </Tooltip.Provider>
  );
}