import './Table.css'
import {
    useReactTable,
    getCoreRowModel,
    flexRender,
    getPaginationRowModel,
    getSortedRowModel,
    getFilteredRowModel,
} from '@tanstack/react-table'

import { useState } from 'react'

// eslint-disable-next-line react/prop-types
function Table({ data, columns }) {

    const [sorting, setSorting] = useState([]);
    const [filtering, setFiltering] = useState("");

    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        state: {
            sorting,
            globalFilter: filtering
        },
        onSortingChange: setSorting,
        onGlobalFilterChange: setFiltering,
    });

    return (
        <div className='tableBody'>
            <div className="encabezadoTabla">
            <input
                placeholder='Buscar'
                type="text"
                value={filtering}
                onChange={(e) => setFiltering(e.target.value)}
            />
            </div>

            <table>
                <thead>
                    {table.getHeaderGroups().map((headerGroup) => (
                        <tr key={headerGroup.id}>
                            {headerGroup.headers.map((header) => (
                                <th
                                    key={header.id}
                                    onClick={header.column.getToggleSortingHandler()}
                                >
                                    <div>
                                        {flexRender(
                                            header.column.columnDef.header,
                                            header.getContext()
                                        )}

                                        {
                                            { asc: "⬆️", desc: "⬇️" }[
                                            header.column.getIsSorted() ?? null
                                            ]
                                        }
                                    </div>
                                </th>
                            ))}
                        </tr>
                    ))}
                </thead>
                <tbody>
                    {table.getRowModel().rows.map((row) => (
                        <tr key={row.id}>
                            {row.getVisibleCells().map((cell) => (
                                // eslint-disable-next-line react/jsx-key
                                <td>
                                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>

            <div className="botones">
                <button onClick={() => table.setPageIndex(0)}>Primer Pagina</button>
                <button onClick={() => table.previousPage()}>Pagina Anterior</button>
                <button onClick={() => table.nextPage()}>Pagina Siguiente</button>
                <button onClick={() => table.setPageIndex(table.getPageCount() - 1)}>
                    Ultima Pagina
                </button>
            </div>
        </div>
    );
}

export default Table;