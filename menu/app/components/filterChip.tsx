import React, { memo, useCallback } from "react";

type Size = "small" | "medium" | "large";

interface FilterChipProps {
  label: string;
  isActive?: boolean;
  count?: number | string;
  disabled?: boolean;
  size?: Size;
  onClick?: () => void;
  className?: string;
  "aria-label"?: string;
}

interface FilterChipListProps {
  chips: { id: string | number; label: string; count?: number | string }[];
  activeId?: string | number;
  size?: Size;
  onSelect?: (id: string | number) => void;
  className?: string;
  scrollable?: boolean;
}

const sizeStyles: Record<Size, { fontSize: string; padding: string }> = {
  small: { fontSize: "12px", padding: "6px 12px" },
  medium: { fontSize: "14px", padding: "8px 16px" },
  large: { fontSize: "16px", padding: "10px 20px" },
};

const FilterChip = memo(function FilterChip({
  label,
  isActive = false,
  count,
  disabled = false,
  size = "medium",
  onClick,
  className,
  "aria-label": ariaLabel,
}: FilterChipProps) {
  const s = sizeStyles[size];

  const baseStyle: React.CSSProperties = {
    display: "inline-flex",
    alignItems: "center",
    gap: 8,
    borderRadius: 8,
    border: isActive ? "2px solid #3b82f6" : "2px solid #e5e7eb",
    background: isActive ? "#eff6ff" : "#ffffff",
    color: isActive ? "#1e40af" : "#6b7280",
    cursor: disabled ? "not-allowed" : "pointer",
    opacity: disabled ? 0.6 : 1,
    userSelect: "none",
    transition: "all 0.2s ease",
    fontWeight: isActive ? 600 : 500,
    whiteSpace: "nowrap",
    ...s,
  };

  const countStyle: React.CSSProperties = {
    background: isActive ? "rgba(30, 64, 175, 0.1)" : "rgba(107, 114, 128, 0.1)",
    borderRadius: 12,
    padding: "2px 8px",
    fontSize: "12px",
    lineHeight: 1,
    fontWeight: 600,
  };

  return (
    <button
      role="tab"
      aria-selected={isActive}
      aria-label={ariaLabel ?? label}
      onClick={onClick}
      disabled={disabled}
      className={className}
      style={baseStyle}
    >
      <span>{label}</span>
      {count !== undefined && <span style={countStyle}>{count}</span>}
    </button>
  );
});

FilterChip.displayName = "FilterChip";

const FilterChipList = memo(function FilterChipList({
  chips,
  activeId,
  size = "medium",
  onSelect,
  className,
  scrollable = true,
}: FilterChipListProps) {
  const handleSelect = useCallback(
    (id: string | number) => {
      onSelect?.(id);
    },
    [onSelect]
  );

  const containerStyle: React.CSSProperties = {
    display: "flex",
    gap: 12,
    flexWrap: scrollable ? "nowrap" : "wrap",
    overflowX: scrollable ? "auto" : "visible",
    overflowY: "hidden",
    paddingBottom: scrollable ? 8 : 0,
    scrollBehavior: "smooth",
  };

  const scrollbarStyle = `
    ::-webkit-scrollbar {
      height: 4px;
    }
    ::-webkit-scrollbar-track {
      background: #f1f5f9;
    }
    ::-webkit-scrollbar-thumb {
      background: #cbd5e1;
      border-radius: 2px;
    }
    ::-webkit-scrollbar-thumb:hover {
      background: #94a3b8;
    }
  `;

  return (
    <>
      <style>{scrollbarStyle}</style>
      <div
        role="tablist"
        className={className}
        style={containerStyle}
      >
        {chips.map((chip) => (
          <FilterChip
            key={chip.id}
            label={chip.label}
            count={chip.count}
            isActive={activeId === chip.id}
            size={size}
            onClick={() => handleSelect(chip.id)}
          />
        ))}
      </div>
    </>
  );
});

FilterChipList.displayName = "FilterChipList";

export default FilterChipList;