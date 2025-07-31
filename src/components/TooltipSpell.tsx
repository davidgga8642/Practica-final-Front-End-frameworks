import * as Tooltip from "@radix-ui/react-tooltip";
import styles from "./tooltip.module.css";
import type{ Spell } from "src/models/spell";
import React from "react";

interface TooltipSpellProps {
  spell: Spell;
  children: React.ReactNode;
}
export function TooltipSpell({ spell, children }: TooltipSpellProps) {
  return (
    <Tooltip.Provider>
      <Tooltip.Root>
        <Tooltip.Trigger asChild>{children}</Tooltip.Trigger>
        <Tooltip.Portal>
          <Tooltip.Content className={styles.tooltip} sideOffset={8}>
            <div>
              <strong>{spell.name}</strong>
            </div>

            {spell.upcast && (
              <div>
                <img src="/icons/upcast.png" alt="Aumento" />
              </div>
            )}

            {spell.damage?.length > 0 && (
              <div>
                {spell.damage.map((dmg, index) => (
                  <img
                    key={index}
                    src={`/icons/${dmg.damageType}.png`}
                    alt={dmg.damageType}
                  />
                ))}
              </div>
            )}
          </Tooltip.Content>
        </Tooltip.Portal>
      </Tooltip.Root>
    </Tooltip.Provider>
  );
}