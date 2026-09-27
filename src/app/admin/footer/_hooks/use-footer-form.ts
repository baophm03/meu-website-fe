"use client";

import { useCallback, useState } from "react";

export type FooterElementType = "text" | "image";

export interface FooterElementInput {
  type: FooterElementType;
  content: string;
  link: string;
}

export interface FooterRowInput {
  elements: FooterElementInput[];
}

export interface FooterColumnInput {
  title: string;
  rows: FooterRowInput[];
}

export interface FooterFormState {
  language: "vi" | "en";
  is_active: boolean;
  columns: FooterColumnInput[];
}

export interface FooterSubmitPayload {
  language: "vi" | "en";
  is_active: boolean;
  columns: Array<{
    title: string | null;
    sort_order: number;
    rows: Array<{
      elements: Array<{
        type: FooterElementType;
        content: string | null;
        link: string | null;
        sort_order: number;
      }>;
    }>;
  }>;
}

// ---------------------------------------------------------------------------
// Factory helpers
// ---------------------------------------------------------------------------
const emptyElement = (type: FooterElementType = "text"): FooterElementInput => ({
  type,
  content: "",
  link: "",
});

const emptyRow = (): FooterRowInput => ({
  elements: [emptyElement()],
});

const emptyColumn = (): FooterColumnInput => ({
  title: "",
  rows: [emptyRow()],
});

// ---------------------------------------------------------------------------
// Hook
// ---------------------------------------------------------------------------
export function useFooterForm(initial?: Partial<FooterFormState>) {
  const [formData, setFormData] = useState<FooterFormState>({
    language: initial?.language ?? "vi",
    is_active: initial?.is_active ?? true,
    columns: initial?.columns ?? [emptyColumn()],
  });

  // ---- Column helpers ----
  const addColumn = () => {
    setFormData((prev) => ({
      ...prev,
      columns: [...prev.columns, emptyColumn()],
    }));
  };

  const removeColumn = (colIdx: number) => {
    setFormData((prev) => ({
      ...prev,
      columns: prev.columns.filter((_, i) => i !== colIdx),
    }));
  };

  const updateColumnTitle = (colIdx: number, title: string) => {
    setFormData((prev) => {
      const cols = [...prev.columns];
      cols[colIdx] = { ...cols[colIdx], title };
      return { ...prev, columns: cols };
    });
  };

  // ---- Row helpers ----
  const addRow = (colIdx: number) => {
    setFormData((prev) => {
      const cols = [...prev.columns];
      const col = { ...cols[colIdx] };
      col.rows = [...col.rows, emptyRow()];
      cols[colIdx] = col;
      return { ...prev, columns: cols };
    });
  };

  const removeRow = (colIdx: number, rowIdx: number) => {
    setFormData((prev) => {
      const cols = [...prev.columns];
      const col = { ...cols[colIdx] };
      col.rows = col.rows.filter((_, i) => i !== rowIdx);
      cols[colIdx] = col;
      return { ...prev, columns: cols };
    });
  };

  // ---- Element helpers ----
  const addElement = (colIdx: number, rowIdx: number, type: FooterElementType = "text") => {
    setFormData((prev) => {
      const cols = [...prev.columns];
      const col = { ...cols[colIdx] };
      const rows = [...col.rows];
      const row = { ...rows[rowIdx] };
      row.elements = [...row.elements, emptyElement(type)];
      rows[rowIdx] = row;
      col.rows = rows;
      cols[colIdx] = col;
      return { ...prev, columns: cols };
    });
  };

  const removeElement = (colIdx: number, rowIdx: number, elIdx: number) => {
    setFormData((prev) => {
      const cols = [...prev.columns];
      const col = { ...cols[colIdx] };
      const rows = [...col.rows];
      const row = { ...rows[rowIdx] };
      row.elements = row.elements.filter((_, i) => i !== elIdx);
      rows[rowIdx] = row;
      col.rows = rows;
      cols[colIdx] = col;
      return { ...prev, columns: cols };
    });
  };

  const updateElement = (
    colIdx: number,
    rowIdx: number,
    elIdx: number,
    field: keyof FooterElementInput,
    value: string,
  ) => {
    setFormData((prev) => {
      const cols = [...prev.columns];
      const col = { ...cols[colIdx] };
      const rows = [...col.rows];
      const row = { ...rows[rowIdx] };
      const elements = [...row.elements];
      elements[elIdx] = { ...elements[elIdx], [field]: value };
      row.elements = elements;
      rows[rowIdx] = row;
      col.rows = rows;
      cols[colIdx] = col;
      return { ...prev, columns: cols };
    });
  };

  // ---- Reorder helpers ----
  const moveColumn = (colIdx: number, direction: -1 | 1) => {
    setFormData((prev) => {
      const to = colIdx + direction;
      if (to < 0 || to >= prev.columns.length) return prev;
      const cols = [...prev.columns];
      const [moved] = cols.splice(colIdx, 1);
      cols.splice(to, 0, moved);
      return { ...prev, columns: cols };
    });
  };

  const moveRow = (colIdx: number, rowIdx: number, direction: -1 | 1) => {
    setFormData((prev) => {
      const cols = [...prev.columns];
      const col = { ...cols[colIdx] };
      const to = rowIdx + direction;
      if (to < 0 || to >= col.rows.length) return prev;
      const rows = [...col.rows];
      const [moved] = rows.splice(rowIdx, 1);
      rows.splice(to, 0, moved);
      col.rows = rows;
      cols[colIdx] = col;
      return { ...prev, columns: cols };
    });
  };

  const moveElement = (colIdx: number, rowIdx: number, elIdx: number, direction: -1 | 1) => {
    setFormData((prev) => {
      const cols = [...prev.columns];
      const col = { ...cols[colIdx] };
      const rows = [...col.rows];
      const row = { ...rows[rowIdx] };
      const to = elIdx + direction;
      if (to < 0 || to >= row.elements.length) return prev;
      const elements = [...row.elements];
      const [moved] = elements.splice(elIdx, 1);
      elements.splice(to, 0, moved);
      row.elements = elements;
      rows[rowIdx] = row;
      col.rows = rows;
      cols[colIdx] = col;
      return { ...prev, columns: cols };
    });
  };

  // ---- Submit ----
  const getSubmitData = (): FooterSubmitPayload => ({
    language: formData.language,
    is_active: formData.is_active,
    columns: formData.columns.map((col, cIdx) => ({
      title: col.title.trim() || null,
      sort_order: cIdx,
      rows: col.rows.map((row) => ({
        elements: row.elements
          .filter((el) => el.content.trim() || el.link.trim())
          .map((el, eIdx) => ({
            type: el.type,
            content: el.content.trim() || null,
            link: el.link.trim() || null,
            sort_order: eIdx,
          })),
      })),
    })),
  });

  // ---- Load from API (for edit page) ----
  const loadFromApi = useCallback((data: {
    language?: string;
    is_active?: boolean | null;
    footer_columns?: Array<{
      title?: string | null;
      footer_rows?: Array<{
        footer_elements?: Array<{
          type?: string;
          content?: string | null;
          link?: string | null;
        }>;
      }>;
    }>;
  }) => {
    if (!data) return;
    const columns: FooterColumnInput[] = (data.footer_columns || []).map((col) => ({
      title: col.title || "",
      rows: (col.footer_rows || []).map((row) => ({
        elements: (row.footer_elements || []).map((el) => ({
          type: (el.type as FooterElementType) || "text",
          content: el.content || "",
          link: el.link || "",
        })),
      })),
    }));
    setFormData({
      language: data.language === "en" ? "en" : "vi",
      is_active: data.is_active ?? true,
      columns: columns.length > 0 ? columns : [emptyColumn()],
    });
  }, []);

  return {
    formData,
    setFormData,
    addColumn,
    removeColumn,
    updateColumnTitle,
    addRow,
    removeRow,
    addElement,
    removeElement,
    updateElement,
    moveColumn,
    moveRow,
    moveElement,
    getSubmitData,
    loadFromApi,
  };
}
