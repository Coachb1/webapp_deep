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
  const [disabledFilters, setDisabledFilters] = React.useState<string[]>([]);
  const updateCheckedValues = (value: string, checked: boolean) => {
    if (checked) {
      onUpdateCheckedValues([...checkedValues, value]);

      if (
        [...checkedValues, value].includes("coachee") ||
        [...checkedValues, value].includes("mentee")
      ) {
        const disabledFilters = filtersCategory
          .filter((val) => val.filterName === "Expertise")
          .flatMap((filter) => filter.filterName);

        setDisabledFilters(disabledFilters);
      }
    } else {
      onUpdateCheckedValues(checkedValues.filter((v) => v !== value));
      if (value === "coachee" && !checkedValues.includes("mentee")) {
        setDisabledFilters([]);
      }
      if (value === "mentee" && !checkedValues.includes("coachee")) {
        setDisabledFilters([]);
      }
    }
  };

  const isFilterDisabled = (filterName: string) => {
    return disabledFilters.includes(filterName);
  };

  return (
    <>
      <div className="w-full flex items-center flex-row gap-2 max-sm:flex-wrap">
        {filtersCategory.map((filter: any) => (
          <>
            {filter.filterOptions?.length > 0 && (
              <DropdownMenu>
                {filter.filterName === "Profile Type" ? (
                  <DropdownMenuTrigger
                    disabled={isFilterDisabled(filter.filterName)}
                    asChild
                  >
                    <Button
                      variant="outline"
                      className="h-8 border-2 border-blue-400 w-fit p-1 px-2 shadow-lg shadow-blue-200"
                    >
                      Profile Type <ChevronDownIcon className="h-4 w-5 ml-2" />
                    </Button>
                  </DropdownMenuTrigger>
                ) : (
                  <DropdownMenuTrigger
                    disabled={isFilterDisabled(filter.filterName)}
                    asChild
                  >
                    <Button
                      variant="outline"
                      className="h-8 w-fit p-1 px-2 border border-gray-200"
                    >
                      {filter.filterName}{" "}
                      <ChevronDownIcon className="h-4 w-5 ml-2" />
                    </Button>
                  </DropdownMenuTrigger>
                )}
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
                          : option === "feedback_bot"
                          ? "Feedback Requests"
                          : option === "icons_by_ai"
                          ? "Icons by AI"
                          : convertTextToCorrectFormat(option)}
                      </label>
                    </div>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          </>
        ))}
        <div className="h-[20px] w-[2px] bg-gray-500 mx-2"></div>
        <div className="flex flex-row items-center gap-2 border rounded-md px-2 hover:cursor-pointer">
          <Checkbox
            checked={checkedValues.includes("recommended")}
            onCheckedChange={(isChecked: boolean) => {
              updateCheckedValues("recommended", isChecked);
            }}
            id={"recommended"}
          />
          <label
            htmlFor={"recommended"}
            className="text-sm text-gray-700 font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 py-2 "
          >
            {convertTextToCorrectFormat("AI Recommended")}
          </label>
        </div>
      </div>
      <div className="mt-2 flex flex-row flex-wrap items-center gap-2">
        {checkedValues.map((checkedItem) => (
          <div className="flex flex-row items-center bg-gray-200 w-fit p-1 rounded-sm border border-gray-300">
            <p className="text-sm px-1">
              {checkedItem === "accepted"
                ? "Connections"
                : checkedItem === "feedback_bot"
                ? "Feedback Requests"
                : checkedItem === "icons_by_ai"
                ? "Icons by AI"
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
              setDisabledFilters([]);
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
