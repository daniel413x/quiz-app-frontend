import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { TableData } from '@/lib/data/types';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/common/shadcn/table';
import { cn } from '@/lib/utils';

export type ColDefiner = {
  accessorKey: string;
  header: string;
};

interface DataTableProps {
  tableData: TableData,
  mbMargin: boolean,
}

const DataTable = ({
  tableData,
  mbMargin,
}: DataTableProps) => {
  const columns = tableData.cols;
  const data = tableData.data;
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });
  return (
    <div className={cn('rounded-md border mt-2', {
      'mb-2': mbMargin,
    })}
    >
      {!tableData.name ? null : (
        <div className="w-full border-b text-center py-3">
          {tableData.name}
        </div>
      )}
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header, i) => (
                <TableHead
                  key={header.id}
                  className={cn({
                    'border-r': i < headerGroup.headers.length - 1,
                  })}
                >
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                      header.column.columnDef.header,
                      header.getContext(),
                    )}
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && 'selected'}
              >
                {row.getVisibleCells().map((cell, ii) => (
                  <TableCell
                    key={cell.id}
                    className={cn({
                      'border-r': (ii + 1) / columns.length !== 1,
                    })}
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default DataTable;
