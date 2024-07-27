import {
  MultiSelector,
  MultiSelectorContent,
  MultiSelectorInput,
  MultiSelectorItem,
  MultiSelectorList,
  MultiSelectorTrigger,
} from "@/components/ui/multi-select";
import { useEffect, useState } from "react";

export const MultiSelect = () => {
  const [value , setValue] = useState<string[]>([])

  useEffect(() => {
    console.log(value)
  }, [value])

  return (
    <MultiSelector values={value} onValuesChange={setValue} loop className="max-w-xs">
    <MultiSelectorTrigger>
      <MultiSelectorInput placeholder="Select your framework" className="text-sm" />
    </MultiSelectorTrigger>
    <MultiSelectorContent>
      <MultiSelectorList>
        <MultiSelectorItem value={"label-id1"}>label</MultiSelectorItem>
        <MultiSelectorItem value={"Vue-id2"}>Vue</MultiSelectorItem>
        <MultiSelectorItem value={"Svelte-id3"}>Svelte</MultiSelectorItem>
      </MultiSelectorList>
    </MultiSelectorContent>
  </MultiSelector>
  
  );
}