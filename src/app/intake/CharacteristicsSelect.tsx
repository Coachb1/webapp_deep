import React from "react";
import { Select } from "antd";

const onSearch = (value: string) => {
  console.log("search:", value);
};

const filterOption = (
  input: string,
  option?: { label: string; value: string }
) => (option?.label ?? "").toLowerCase().includes(input.toLowerCase());

const CharactericticsSelect = ({
  onCharacteristicsSelect,
  options,
  value,
  disabled,
}: {
  onCharacteristicsSelect: (val: string) => void;
  options: { label: string; value: string; disabled?: boolean }[];
  value: string;
  disabled?: boolean;
}) => {
  return (
    <>
      <Select
        disabled={disabled}
        value={value}
        className="w-full"
        showSearch
        virtual={false}
        placeholder="Select characteristics/skills"
        optionFilterProp="children"
        onChange={onCharacteristicsSelect}
        onSearch={onSearch}
        filterOption={filterOption}
        options={options.sort((a, b) => a.label.localeCompare(b.label))}
      />
    </>
  );
};

export default CharactericticsSelect;
