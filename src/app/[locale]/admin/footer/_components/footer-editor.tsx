"use client";

import { useState } from "react";
import {
  ArrowDown,
  ArrowUp,
  Columns3,
  Image as ImageIcon,
  Plus,
  Rows3,
  Trash2,
  Type,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { AdminImagePicker } from "@/components/admin/image-picker";
import type { FooterElementType } from "../_hooks/use-footer-form";

interface ElementData {
  type: FooterElementType;
  content: string;
  link: string;
}

interface RowData {
  elements: ElementData[];
}

interface ColumnData {
  title: string;
  rows: RowData[];
}

interface EditorProps {
  columns: ColumnData[];
  language: "vi" | "en";
  is_active: boolean;
  onLanguageChange: (lang: "vi" | "en") => void;
  onActiveChange: (v: boolean) => void;
  onAddColumn: () => void;
  onRemoveColumn: (idx: number) => void;
  onMoveColumn: (idx: number, direction: -1 | 1) => void;
  onUpdateColumnTitle: (idx: number, title: string) => void;
  onAddRow: (colIdx: number) => void;
  onRemoveRow: (colIdx: number, rowIdx: number) => void;
  onMoveRow: (colIdx: number, rowIdx: number, direction: -1 | 1) => void;
  onAddElement: (colIdx: number, rowIdx: number, type: FooterElementType) => void;
  onRemoveElement: (colIdx: number, rowIdx: number, elIdx: number) => void;
  onMoveElement: (colIdx: number, rowIdx: number, elIdx: number, direction: -1 | 1) => void;
  onUpdateElement: (
    colIdx: number,
    rowIdx: number,
    elIdx: number,
    field: keyof ElementData,
    value: string,
  ) => void;
}

function MoveButtons({
  onMove,
  disableUp,
  disableDown,
}: {
  onMove: (direction: -1 | 1) => void;
  disableUp: boolean;
  disableDown: boolean;
}) {
  return (
    <div className="flex items-center gap-1">
      <button
        type="button"
        disabled={disableUp}
        onClick={() => onMove(-1)}
        className="flex h-7 w-7 items-center justify-center rounded-md text-slate-500 transition hover:bg-[#063e8e]/10 hover:text-[#063e8e] disabled:cursor-not-allowed disabled:opacity-30"
        title="Di chuyển lên"
      >
        <ArrowUp className="h-3.5 w-3.5" />
      </button>
      <button
        type="button"
        disabled={disableDown}
        onClick={() => onMove(1)}
        className="flex h-7 w-7 items-center justify-center rounded-md text-slate-500 transition hover:bg-[#063e8e]/10 hover:text-[#063e8e] disabled:cursor-not-allowed disabled:opacity-30"
        title="Di chuyển xuống"
      >
        <ArrowDown className="h-3.5 w-3.5" />
      </button>
    </div>
  );
}

function RemoveButton({ onRemove, small }: { onRemove: () => void; small?: boolean }) {
  return (
    <button
      type="button"
      onClick={onRemove}
      className={`flex items-center justify-center rounded-md transition hover:bg-red-50 ${small ? "h-7 w-7" : "h-8 w-8"
        }`}
      title="Xóa"
    >
      <Trash2 className={`${small ? "h-3.5 w-3.5" : "h-4 w-4"} text-red-600`} />
    </button>
  );
}

export function FooterEditor(props: EditorProps) {
  const {
    columns,
    language,
    is_active,
    onLanguageChange,
    onActiveChange,
    onAddColumn,
    onRemoveColumn,
    onMoveColumn,
    onUpdateColumnTitle,
    onAddRow,
    onRemoveRow,
    onMoveRow,
    onAddElement,
    onRemoveElement,
    onMoveElement,
    onUpdateElement,
  } = props;

  // Track which element is picking an image: "colIdx-rowIdx-elIdx"
  const [imagePickerTarget, setImagePickerTarget] = useState<string | null>(null);

  return (
    <div className="space-y-4">
      {/* Basic settings */}
      <Card>
        <div className="space-y-4 p-5">
          <div className="flex items-center gap-3 border-b pb-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#063e8e]/10">
              <Columns3 className="h-5 w-5 text-[#063e8e]" />
            </div>
            <div>
              <h3 className="text-lg font-semibold">Cài đặt chung</h3>
              <p className="text-sm text-slate-500">Ngôn ngữ và trạng thái footer</p>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label>Ngôn ngữ</Label>
              <div className="flex gap-2">
                {(["vi", "en"] as const).map((lang) => (
                  <Button
                    key={lang}
                    type="button"
                    variant={language === lang ? "default" : "outline"}
                    size="sm"
                    onClick={() => onLanguageChange(lang)}
                    className={language === lang ? "bg-[#063e8e] hover:bg-[#063e8e]/90" : ""}
                  >
                    {lang === "vi" ? "Tiếng Việt" : "English"}
                  </Button>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <Label>Trạng thái hiển thị</Label>
              <div className="flex items-center gap-3 pt-1">
                <Switch checked={is_active} onCheckedChange={onActiveChange} />
                <span className="text-sm text-slate-500">
                  {is_active ? "Đang hiển thị" : "Đang ẩn"}
                </span>
              </div>
            </div>
          </div>
        </div>
      </Card>

      {/* Columns */}
      <div className="space-y-4">
        {columns.map((column, colIdx) => (
          <Card key={`col-${colIdx}`}>
            <div className="space-y-4 p-5">
              <div className="flex items-center justify-between border-b pb-3">
                <div className="flex items-center gap-2">
                  <Columns3 className="h-4 w-4 text-slate-500" />
                  <span className="text-sm font-medium text-slate-500">Cột {colIdx + 1}</span>
                </div>
                <div className="flex items-center gap-1">
                  <MoveButtons
                    onMove={(dir) => onMoveColumn(colIdx, dir)}
                    disableUp={colIdx === 0}
                    disableDown={colIdx === columns.length - 1}
                  />
                  <RemoveButton onRemove={() => onRemoveColumn(colIdx)} />
                </div>
              </div>

              <Input
                value={column.title}
                onChange={(e) => onUpdateColumnTitle(colIdx, e.target.value)}
                placeholder="Tiêu đề cột (vd: Giải pháp, Sản phẩm...)"
                className="bg-slate-50"
              />

              {/* Rows */}
              <div className="space-y-3">
                {column.rows.map((row, rowIdx) => (
                  <div
                    key={`row-${rowIdx}`}
                    className="space-y-3 rounded-lg border border-slate-200 bg-slate-50 p-4"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Rows3 className="h-4 w-4 text-slate-500" />
                        <span className="text-xs font-medium text-slate-500">
                          Hàng {rowIdx + 1}
                        </span>
                      </div>
                      <div className="flex items-center gap-1">
                        <MoveButtons
                          onMove={(dir) => onMoveRow(colIdx, rowIdx, dir)}
                          disableUp={rowIdx === 0}
                          disableDown={rowIdx === column.rows.length - 1}
                        />
                        <RemoveButton small onRemove={() => onRemoveRow(colIdx, rowIdx)} />
                      </div>
                    </div>

                    {/* Elements */}
                    <div
                      className={
                        row.elements.length >= 2
                          ? "grid grid-cols-1 gap-2 md:grid-cols-2 lg:grid-cols-3"
                          : "space-y-2"
                      }
                    >
                      {row.elements.map((el, elIdx) => {
                        const pickerKey = `${colIdx}-${rowIdx}-${elIdx}`;
                        return (
                          <div
                            key={`el-${elIdx}`}
                            className="space-y-2 rounded-md border border-slate-200 bg-white p-3"
                          >
                            <div className="flex items-center justify-between">
                              <div className="flex gap-1">
                                <Button
                                  type="button"
                                  variant={el.type === "text" ? "default" : "outline"}
                                  size="sm"
                                  className={`h-7 px-2 ${el.type === "text" ? "bg-[#063e8e] hover:bg-[#063e8e]/90" : ""
                                    }`}
                                  onClick={() =>
                                    onUpdateElement(colIdx, rowIdx, elIdx, "type", "text")
                                  }
                                >
                                  <Type className="mr-1 h-3 w-3" />
                                  Text
                                </Button>
                                <Button
                                  type="button"
                                  variant={el.type === "image" ? "default" : "outline"}
                                  size="sm"
                                  className={`h-7 px-2 ${el.type === "image" ? "bg-[#063e8e] hover:bg-[#063e8e]/90" : ""
                                    }`}
                                  onClick={() =>
                                    onUpdateElement(colIdx, rowIdx, elIdx, "type", "image")
                                  }
                                >
                                  <ImageIcon className="mr-1 h-3 w-3" />
                                  Image
                                </Button>
                              </div>
                              <div className="flex items-center gap-1">
                                <MoveButtons
                                  onMove={(dir) => onMoveElement(colIdx, rowIdx, elIdx, dir)}
                                  disableUp={elIdx === 0}
                                  disableDown={elIdx === row.elements.length - 1}
                                />
                                <RemoveButton
                                  small
                                  onRemove={() => onRemoveElement(colIdx, rowIdx, elIdx)}
                                />
                              </div>
                            </div>

                            <div className="grid grid-cols-1 gap-2">
                              <div className="space-y-1">
                                <Label className="text-xs text-slate-500">
                                  {el.type === "text" ? "Nội dung text" : "Ảnh"}
                                </Label>
                                {el.type === "image" ? (
                                  <div className="flex items-center gap-2">
                                    <Input
                                      value={el.content}
                                      onChange={(e) =>
                                        onUpdateElement(
                                          colIdx,
                                          rowIdx,
                                          elIdx,
                                          "content",
                                          e.target.value,
                                        )
                                      }
                                      placeholder="https://... hoặc chọn từ thư viện"
                                      className="h-8 bg-slate-50 text-sm"
                                    />
                                    <Button
                                      type="button"
                                      variant="outline"
                                      size="sm"
                                      className="h-8 flex-shrink-0"
                                      onClick={() => setImagePickerTarget(pickerKey)}
                                    >
                                      <ImageIcon className="h-3.5 w-3.5" />
                                    </Button>
                                    <AdminImagePicker
                                      open={imagePickerTarget === pickerKey}
                                      onOpenChange={(open) =>
                                        setImagePickerTarget(open ? pickerKey : null)
                                      }
                                      onSelect={(item) => {
                                        onUpdateElement(
                                          colIdx,
                                          rowIdx,
                                          elIdx,
                                          "content",
                                          item.url,
                                        );
                                        setImagePickerTarget(null);
                                      }}
                                    />
                                  </div>
                                ) : (
                                  <Input
                                    value={el.content}
                                    onChange={(e) =>
                                      onUpdateElement(
                                        colIdx,
                                        rowIdx,
                                        elIdx,
                                        "content",
                                        e.target.value,
                                      )
                                    }
                                    placeholder="Về chúng tôi"
                                    className="h-8 bg-slate-50 text-sm"
                                  />
                                )}
                              </div>
                              <div className="space-y-1">
                                <Label className="text-xs text-slate-500">Link (tùy chọn)</Label>
                                <Input
                                  value={el.link}
                                  onChange={(e) =>
                                    onUpdateElement(
                                      colIdx,
                                      rowIdx,
                                      elIdx,
                                      "link",
                                      e.target.value,
                                    )
                                  }
                                  placeholder="/about hoặc https://..."
                                  className="h-8 bg-slate-50 text-sm"
                                />
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>

                    <div className="flex gap-2">
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        className="h-7"
                        onClick={() => onAddElement(colIdx, rowIdx, "text")}
                      >
                        <Type className="mr-1 h-3 w-3" />
                        Thêm text
                      </Button>
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        className="h-7"
                        onClick={() => onAddElement(colIdx, rowIdx, "image")}
                      >
                        <ImageIcon className="mr-1 h-3 w-3" />
                        Thêm image
                      </Button>
                    </div>
                  </div>
                ))}
              </div>

              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => onAddRow(colIdx)}
              >
                <Rows3 className="mr-2 h-4 w-4" />
                Thêm hàng
              </Button>
            </div>
          </Card>
        ))}
      </div>

      <Button type="button" variant="outline" onClick={onAddColumn}>
        <Plus className="mr-2 h-4 w-4" />
        Thêm cột
      </Button>
    </div>
  );
}
