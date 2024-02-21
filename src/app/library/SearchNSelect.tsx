import React from "react";
import { Select } from "antd";

const filterOption = (
  input: string,
  option?: { label: string; value: string }
) => (option?.label ?? "").toLowerCase().includes(input.toLowerCase());

const SearchNSelect = ({
  onDomainSelectHandler,
  onSearchHandler,
  optionDomains,
  placeholder,
}: {
  onDomainSelectHandler: (val: string) => void;
  placeholder: string;
  onSearchHandler: (val: string) => void;
  optionDomains?: { label: string; value: string; disabled?: boolean }[];
}) => {
  return (
    <>
      <Select
        className="w-full text-left"
        showSearch
        virtual={false}
        placeholder={placeholder}
        optionFilterProp="children"
        onSelect={onDomainSelectHandler}
        onSearch={onSearchHandler}
        filterOption={filterOption}
        options={optionDomains?.sort((a, b) => a.label.localeCompare(b.label))}
      />
    </>
  );
};

export default SearchNSelect;
