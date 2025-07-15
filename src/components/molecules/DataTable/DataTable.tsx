import { ReactNode } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card } from "@/components/atoms/Card/Card";

export interface TableHeader {
  key: string;
  label: string;
  className?: string;
  sortable?: boolean;
}

export interface DataTableProps<T = any> {
  headers: TableHeader[];
  data: T[];
  renderCell: (item: T, header: TableHeader) => ReactNode;
  renderActions?: (item: T) => ReactNode;
  className?: string;
  emptyMessage?: string;
}

export function DataTable<T = any>({
  headers,
  data,
  renderCell,
  renderActions,
  className = "",
  emptyMessage = "No data available",
}: DataTableProps<T>) {
  return (
    <div className={`overflow-x-auto ${className}`}>
      <Table>
        <TableHeader>
          <TableRow>
            {headers.map((header) => (
              <TableHead key={header.key} className={header.className}>
                {header.label}
              </TableHead>
            ))}
            {renderActions && (
              <TableHead className="text-right">Actions</TableHead>
            )}
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.length === 0 ? (
            <TableRow>
              <TableCell
                colSpan={headers.length + (renderActions ? 1 : 0)}
                className="text-center py-8 text-muted-foreground"
              >
                {emptyMessage}
              </TableCell>
            </TableRow>
          ) : (
            data.map((item, index) => (
              <TableRow key={index}>
                {headers.map((header) => (
                  <TableCell key={header.key} className={header.className}>
                    {renderCell(item, header)}
                  </TableCell>
                ))}
                {renderActions && (
                  <TableCell className="text-right">
                    {renderActions(item)}
                  </TableCell>
                )}
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}
