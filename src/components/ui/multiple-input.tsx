"use client";

import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { X as RemoveIcon } from "lucide-react";
import React from "react";

/**
 * used for identifying the split char and use will pasting
 */
const SPLITTER_REGEX = /[\n#?=&\t,./-]+/;

/**
 * used for formatting the pasted element for the correct value format to be added
 */
const FORMATTING_REGEX = /^[^a-zA-Z0-9]*|[^a-zA-Z0-9]*$/g;

interface MultipleInputProps extends React.HTMLAttributes<HTMLDivElement> {
  value: string[];
  onValueChange: (value: string[]) => void;
  placeholder?: string;
  secondaryPlaceholder?: string;
  maxItems?: number;
  minItems?: number;
  disabled?: boolean;
}

interface MultipleInputContextProps {
  value: string[];
  onValueChange: (value: string[]) => void;
  inputValues: string[];
  setInputValues: React.Dispatch<React.SetStateAction<string[]>>;
  activeIndex: number;
  setActiveIndex: React.Dispatch<React.SetStateAction<number>>;
}

const MultipleInputContext =
  React.createContext<MultipleInputContextProps | null>(null);

export const MultipleInput = React.forwardRef<
  HTMLDivElement,
  MultipleInputProps
>(
  (
    {
      children,
      value,
      onValueChange,
      placeholder,
      secondaryPlaceholder,
      maxItems,
      minItems,
      className,
      disabled,
      dir,
      ...props
    },
    ref,
  ) => {
    const [activeIndex, setActiveIndex] = React.useState(-1);
    const [inputValues, setInputValues] = React.useState<string[]>([
      ...value,
      "",
    ]);
    React.useEffect(() => {
      setInputValues([...value, ""]);
    }, [value]);

    const parseMinItems = minItems ?? 1;
    const parseMaxItems = maxItems ?? Infinity;

    /**
     * Handles paste events, splitting the pasted text into multiple values.
     */
    const handlePaste = React.useCallback(
      (e: React.ClipboardEvent<HTMLInputElement>) => {
        e.preventDefault();
        const pastedText = e.clipboardData.getData("text");
        const tags = pastedText.split(SPLITTER_REGEX);
        const newValues = [...value];

        tags.forEach((item) => {
          const parsedItem = item.replaceAll(FORMATTING_REGEX, "").trim();
          if (
            parsedItem.length > 0 &&
            !newValues.includes(parsedItem) &&
            newValues.length < parseMaxItems
          ) {
            newValues.push(parsedItem);
          }
        });

        // Ensure there's always an empty input at the end if not exceeding maxItems
        if (newValues.length < parseMaxItems) {
          newValues.push("");
        }

        onValueChange(newValues);
      },
      [value, onValueChange, parseMaxItems],
    );

    /**
     * Removes an input at a specific index.
     */
    const RemoveInput = React.useCallback(
      (index: number) => {
        if (index === 0 && inputValues.length === 1) return; // Prevent deleting the first input
        const newInputs = inputValues.filter((_, i) => i !== index);
        setInputValues(newInputs);
        onValueChange?.(newInputs.filter(Boolean));
        setActiveIndex(index - 1);
      },
      [value, onValueChange, parseMinItems],
    );

    /**
     * Handles keydown events, specifically Backspace for removing inputs.
     */
    const handleKeyDown = React.useCallback(
      (index: number) => (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Backspace" && inputValues[index] === "" && index !== 0) {
          e.preventDefault();
          RemoveInput(index);
          setActiveIndex(index - 1);
        }
      },
      [inputValues, RemoveInput],
    );

    /**
     * Handles input value changes.
     */
    const handleInputChange = React.useCallback(
      (index: number, value: string) => {
        const newInputs = [...inputValues];
        newInputs[index] = value;

        //Add a new input if value is filled on last input
        if (
          index === inputValues.length - 1 &&
          value !== "" &&
          index + 1 < parseMaxItems
        ) {
          newInputs.push("");
        }

        setInputValues(newInputs);
        onValueChange?.(newInputs.filter(Boolean));
      },
      [inputValues, onValueChange],
    );

    /**
     * Prevents default mouse actions to avoid losing focus when clicking the remove button.
     */
    const mousePreventDefault = React.useCallback((e: React.MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();
    }, []);

    return (
      <MultipleInputContext.Provider
        value={{
          value,
          onValueChange,
          inputValues,
          setInputValues,
          activeIndex,
          setActiveIndex,
        }}
      >
        <div
          {...props}
          ref={ref}
          dir={dir}
          className={cn(
            "flex h-56 flex-col items-start space-y-2 overflow-y-scroll rounded-lg bg-background p-2 ring-1 ring-muted",
            {
              "focus-within:ring-ring": activeIndex === -1,
            },
            className,
          )}
        >
          {inputValues.map((item, index) => {
            return (
              <div key={index} className="flex w-full items-center gap-1">
                <Input
                  tabIndex={0}
                  aria-label={`input ${index + 1}`}
                  disabled={disabled}
                  value={item}
                  onChange={(e) => handleInputChange(index, e.target.value)}
                  onPaste={handlePaste}
                  onKeyDown={handleKeyDown(index)}
                  placeholder={index === 0 ? placeholder : secondaryPlaceholder}
                  onFocus={() => setActiveIndex(index)}
                  className={cn(
                    "h-8 rounded border px-2 outline-none focus:ring-2",
                    disabled && "cursor-not-allowed bg-muted",
                  )}
                />
                <button
                  type="button"
                  aria-label={`Remove input ${index + 1}`}
                  onMouseDown={mousePreventDefault}
                  onClick={() => RemoveInput(index)}
                  disabled={
                    disabled || (index === 0 && inputValues.length === 1)
                  }
                  className={cn(
                    "flex items-center justify-center rounded p-1 hover:bg-muted focus:outline-none",
                    (index === 0 && inputValues.length === 1) || disabled
                      ? "invisible"
                      : "",
                  )}
                >
                  <RemoveIcon className="h-4 w-4 text-destructive" />
                  <span className="sr-only">Remove input</span>
                </button>
              </div>
            );
          })}
        </div>
      </MultipleInputContext.Provider>
    );
  },
);

MultipleInput.displayName = "MultipleInput";