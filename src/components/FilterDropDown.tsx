"use client";

import * as React from "react";
import { DropdownMenuCheckboxItemProps } from "@radix-ui/react-dropdown-menu";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Checkbox } from "./ui/checkbox";
import { ChevronDownIcon, X } from "lucide-react";
import { convertTextToCorrectFormat } from "@/lib/utils";

type Checked = DropdownMenuCheckboxItemProps["checked"];
interface FilterCategoriesType {
  filterName: string;
  filterOptions: string[];
}
interface FilterDropDownProps {
  checkedValues: string[];
  onUpdateCheckedValues: (newValues: string[]) => void;
  setParentCheckedValues: React.Dispatch<React.SetStateAction<string[]>>;
  filtersCategory: FilterCategoriesType[];
}

const FilterDropDown = ({
  checkedValues,
  onUpdateCheckedValues,
  setParentCheckedValues,
  filtersCategory,
}: FilterDropDownProps) => {
  const updateCheckedValues = (value: string, checked: boolean) => {
    if (checked) {
      onUpdateCheckedValues([...checkedValues, value]);
    } else {
      onUpdateCheckedValues(checkedValues.filter((v) => v !== value));
    }
  };

  return (
    <>
      <div className="w-full flex flex-row gap-2 max-sm:flex-wrap">
        {filtersCategory.map((filter: any) => (
          <>
            {filter.filterOptions.length > 0 && (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="outline"
                    className="h-8 w-fit p-1 px-2 border border-gray-200"
                  >
                    {filter.filterName}{" "}
                    <ChevronDownIcon className="h-4 w-5 ml-2" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-fit">
                  {filter.filterOptions.map((option: any) => (
                    <div className="flex items-center space-x-2 px-2 hover:bg-gray-200 rounded-sm">
                      <Checkbox
                        checked={checkedValues.includes(option)}
                        onCheckedChange={(isChecked: boolean) => {
                          updateCheckedValues(option, isChecked);
                        }}
                        id={option}
                      />
                      <label
                        htmlFor={option}
                        className="text-sm text-gray-700 font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 py-2 "
                      >
                        {option === "accepted"
                          ? "Connections"
                          : convertTextToCorrectFormat(option)}
                      </label>
                    </div>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          </>
        ))}
      </div>
      <div className="mt-2 flex flex-row items-center gap-2">
        {checkedValues.map((checkedItem) => (
          <div className="flex flex-row items-center bg-gray-200 w-fit p-1 rounded-sm border border-gray-300">
            <p className="text-sm px-1">
              {checkedItem === "accepted"
                ? "Connections"
                : convertTextToCorrectFormat(checkedItem)}
            </p>{" "}
            <X
              className="h-4 w-4 ml-1 m-[2px] hover:bg-gray-300 rounded-sm cursor-pointer"
              onClick={() => {
                updateCheckedValues(checkedItem, false);
              }}
            />
          </div>
        ))}
        {checkedValues.length > 0 && (
          <Button
            onClick={() => {
              onUpdateCheckedValues([]);
            }}
            variant={"link"}
          >
            Reset all
          </Button>
        )}
      </div>
    </>
  );
};

export default FilterDropDown;
