"use client";

import * as React from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { PageConfig } from "@/api/models/pageConfig";
import { fieldClassName } from "./constants";

export function PageConfigMultiPicker({
  values,
  options,
  disabled,
  onChange,
}: {
  values: string[];
  options: PageConfig[];
  disabled?: boolean;
  onChange: (values: string[]) => void;
}) {
  const [search, setSearch] = React.useState("");
  const selectedIds = React.useMemo(() => new Set(values), [values]);
  const selectedOptions = React.useMemo(
    () => options.filter((option) => option.id && selectedIds.has(option.id)),
    [options, selectedIds],
  );
  const filteredOptions = React.useMemo(() => {
    const keyword = search.trim().toLowerCase();
    const availableOptions = options.filter(
      (option) => !option.id || !selectedIds.has(option.id),
    );
    const matchedOptions = keyword
      ? availableOptions.filter(
        (option) =>
          option.name?.toLowerCase().includes(keyword) ||
          option.name_en?.toLowerCase().includes(keyword) ||
          option.path?.toLowerCase().includes(keyword),
      )
      : availableOptions;

    return [...selectedOptions, ...matchedOptions];
  }, [options, search, selectedIds, selectedOptions]);

  const toggleValue = (id: string, checked: boolean) => {
    onChange(checked ? [...values, id] : values.filter((item) => item !== id));
  };

  return (
    <div className="space-y-2">
      <div className="mb-3 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
        <div className="min-w-0 flex-1">
          <Label className="mb-1.5 block text-gray-700">Trang hiển thị</Label>
          <Input
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Tìm trang theo tên hoặc đường dẫn"
            disabled={disabled}
            className={fieldClassName}
          />
        </div>
        <div className="rounded-lg border border-[#063e8e]/10 bg-white px-3 py-2 text-sm text-gray-700">
          Đã chọn {values.length} trang
        </div>
      </div>
      <div className="max-h-64 overflow-y-auto rounded-xl border border-[#063e8e]/10 bg-white p-2">
        {filteredOptions.length > 0 ? (
          <div className="grid grid-cols-1 gap-2 md:grid-cols-2">
            {filteredOptions.map((option) => (
              <label
                key={option.id}
                className="flex items-center gap-3 rounded-lg border border-[#063e8e]/10 bg-white px-3 py-2"
              >
                <Checkbox
                  checked={Boolean(option.id && selectedIds.has(option.id))}
                  disabled={disabled}
                  onCheckedChange={(checked) =>
                    option.id && toggleValue(option.id, checked === true)
                  }
                  className="border-[#063e8e]/30 data-[state=checked]:border-[#063e8e] data-[state=checked]:bg-[#063e8e]"
                />
                <span className="min-w-0 truncate text-sm text-gray-700">
                  {option.name}
                  <span className="ml-1.5 text-xs text-gray-500">{option.path}</span>
                </span>
              </label>
            ))}
          </div>
        ) : (
          <p className="px-3 py-2 text-sm text-gray-700">
            Không tìm thấy trang phù hợp.
          </p>
        )}
      </div>
    </div>
  );
}
