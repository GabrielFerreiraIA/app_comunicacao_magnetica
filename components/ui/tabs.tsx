"use client";

import * as React from "react";
import { Tabs as TabsPrimitive } from "@base-ui/react/tabs";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

// Create context to track active tab and animate background smoothly
const TabsContext = React.createContext<{
  value?: string;
  setValue?: (v: string) => void;
}>({});

function Tabs({
  className,
  orientation = "horizontal",
  value: valueProp,
  onValueChange,
  defaultValue,
  ...props
}: TabsPrimitive.Root.Props & {
  onValueChange?: (value: string) => void;
}) {
  const [value, setValue] = React.useState<string>(valueProp || defaultValue || "");

  React.useEffect(() => {
    if (valueProp !== undefined) {
      setValue(valueProp);
    }
  }, [valueProp]);

  const handleValueChange = React.useCallback(
    (val: string) => {
      setValue(val);
      if (onValueChange) {
        onValueChange(val);
      }
    },
    [onValueChange]
  );

  return (
    <TabsContext.Provider value={{ value, setValue: handleValueChange }}>
      <TabsPrimitive.Root
        data-slot="tabs"
        data-orientation={orientation}
        value={value}
        onValueChange={handleValueChange}
        className={cn(
          "group/tabs flex gap-2 data-horizontal:flex-col",
          className
        )}
        {...props}
      />
    </TabsContext.Provider>
  );
}

function TabsList({
  className,
  ...props
}: TabsPrimitive.List.Props) {
  return (
    <TabsPrimitive.List
      data-slot="tabs-list"
      className={cn(
        "inline-flex w-full items-center justify-between rounded-full bg-secondary/45 border border-purple-900/5 p-1 text-muted-foreground shadow-[inset_0_1px_3px_rgba(74,37,116,0.03)] backdrop-blur-md",
        className
      )}
      {...props}
    />
  );
}

interface TabsTriggerProps extends TabsPrimitive.Tab.Props {
  value: string;
}

function TabsTrigger({ className, value, ...props }: TabsTriggerProps) {
  const { value: activeValue } = React.useContext(TabsContext);
  const isActive = activeValue === value;

  return (
    <TabsPrimitive.Tab
      data-slot="tabs-trigger"
      value={value}
      className={cn(
        "relative inline-flex h-8 flex-1 items-center justify-center gap-1.5 rounded-full px-3 py-1.5 text-[10.5px] font-bold tracking-wider uppercase whitespace-nowrap transition-all select-none cursor-pointer outline-none",
        "focus-visible:outline-none focus-visible:ring-1.5 focus-visible:ring-gold/30",
        isActive 
          ? "text-[#1c0d2b]" 
          : "text-[#7d6995]/75 hover:text-[#1c0d2b] active:scale-[0.98]",
        className
      )}
      {...props}
    >
      {isActive && (
        <motion.span
          layoutId="activeTabBackground"
          className="absolute inset-0 bg-gold-gradient rounded-full -z-10 shadow-[0_3px_10px_rgba(201,162,39,0.2)] border border-gold-champagne/45"
          transition={{ type: "spring", stiffness: 420, damping: 30 }}
        />
      )}
      <span className="relative z-10 flex items-center justify-center gap-1">{props.children}</span>
    </TabsPrimitive.Tab>
  );
}

function TabsContent({ className, ...props }: TabsPrimitive.Panel.Props) {
  return (
    <TabsPrimitive.Panel
      data-slot="tabs-content"
      className={cn("flex-1 outline-none", className)}
      {...props}
    />
  );
}

export { Tabs, TabsList, TabsTrigger, TabsContent };
