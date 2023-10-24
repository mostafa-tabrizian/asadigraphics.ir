'use client'

import Link from 'next/link'
import Image from 'next/image'

import {
   ColumnDef,
   flexRender,
   getCoreRowModel,
   getSortedRowModel,
   SortingState,
   useReactTable,
   getPaginationRowModel,
} from '@tanstack/react-table'
import { IDesign } from '@/models/design'
import { useMemo, useState } from 'react'

const DesignsTable = ({ designs }: { designs: IDesign[] }) => {
   const [sorting, setSorting] = useState<SortingState>([])

   const columns = useMemo<ColumnDef<unknown>[]>(
      () => [
         {
            accessorKey: '_id',
            header: 'آیدی',
            cell: (info) => {
               const value = info.getValue() as string
               return <span>{value.slice(-4)}</span>
            },
         },
         {
            accessorKey: 'frontSrc',
            header: 'جلو',
            cell: (info) => {
               const value = info.getValue()
               return (
                  <Link
                     target='_blank'
                     href={`https://tabrizian.storage.iran.liara.space/asadi_designs/designs/${value}`}
                  >
                     {value ? (
                        <Image
                           className='h-auto w-auto max-w-full rounded-md object-cover'
                           src={`https://tabrizian.storage.iran.liara.space/asadi_designs/designs/${value}`}
                           alt={String(value)}
                           height={50}
                           width={50}
                        />
                     ) : (
                        ''
                     )}
                  </Link>
               )
            },
         },
         {
            accessorKey: 'backSrc',
            header: 'پشت',
            cell: (info) => {
               const value = info.getValue()
               return (
                  <Link
                     target='_blank'
                     href={`https://tabrizian.storage.iran.liara.space/asadi_designs/designs/${value}`}
                  >
                     {value ? (
                        <Image
                           className='h-auto w-auto max-w-full rounded-md object-cover'
                           src={`https://tabrizian.storage.iran.liara.space/asadi_designs/designs/${value}`}
                           alt={String(value)}
                           height={50}
                           width={50}
                        />
                     ) : (
                        ''
                     )}
                  </Link>
               )
            },
         },
         {
            accessorKey: 'active',
            header: 'فعال',
            cell: (info) => {
               const value = info.getValue()
               return (
                  <>
                     {value ? (
                        <svg
                           className='h-5 w-5 text-green-700'
                           width='24'
                           height='24'
                           viewBox='0 0 24 24'
                           strokeWidth='2'
                           stroke='currentColor'
                           fill='none'
                           strokeLinecap='round'
                           strokeLinejoin='round'
                        >
                           {' '}
                           <path stroke='none' d='M0 0h24v24H0z' /> <circle cx='12' cy='12' r='9' />{' '}
                           <path d='M9 12l2 2l4 -4' />
                        </svg>
                     ) : (
                        <svg
                           className='h-5 w-5 text-rose-700'
                           width='24'
                           height='24'
                           viewBox='0 0 24 24'
                           strokeWidth='2'
                           stroke='currentColor'
                           fill='none'
                           strokeLinecap='round'
                           strokeLinejoin='round'
                        >
                           {' '}
                           <path stroke='none' d='M0 0h24v24H0z' /> <circle cx='12' cy='12' r='9' />{' '}
                           <path d='M10 10l4 4m0 -4l-4 4' />
                        </svg>
                     )}
                  </>
               )
            },
         },
         {
            accessorKey: 'name',
            header: 'عنوان',
            cell: (info) => {
               const value = info.getValue() as string
               return (
                  <Link href={`/--admin--/designs/${value.replaceAll(' ', '-')}`}>
                     <span className='text-sm text-slate-500'>{value}</span>
                  </Link>
               )
            },
         },
         {
            accessorKey: 'category',
            header: 'دسته بندی',
         },
         {
            accessorKey: 'createdAt',
            header: 'تاریخ ایجاد',
         },
      ],
      [],
   )

   const table = useReactTable({
      data: designs,
      columns,
      state: {
         sorting,
      },
      onSortingChange: setSorting,
      getCoreRowModel: getCoreRowModel(),
      getSortedRowModel: getSortedRowModel(),
      getPaginationRowModel: getPaginationRowModel(),
      debugTable: false,
   })

   return (
      <div className='rtl relative overflow-x-auto'>
         <table className='w-full table-auto text-left text-sm text-slate-500'>
            <thead className='bg-slate-50 text-xs uppercase text-slate-700'>
               {table.getHeaderGroups().map((headerGroup) => (
                  <tr key={headerGroup.id}>
                     {headerGroup.headers.map((header) => {
                        return (
                           <th key={header.id} colSpan={header.colSpan} className='px-6 py-3'>
                              {header.isPlaceholder ? null : (
                                 <div
                                    {...{
                                       className: header.column.getCanSort()
                                          ? 'cursor-pointer select-none'
                                          : '',
                                       onClick: header.column.getToggleSortingHandler(),
                                    }}
                                 >
                                    {flexRender(
                                       header.column.columnDef.header,
                                       header.getContext(),
                                    )}
                                    {{
                                       asc: ' 🔼',
                                       desc: ' 🔽',
                                    }[header.column.getIsSorted() as string] ?? null}
                                 </div>
                              )}
                           </th>
                        )
                     })}
                  </tr>
               ))}
            </thead>
            <tbody className=''>
               {table.getRowModel().rows.map((row) => {
                  return (
                     <tr key={row.id} className='border-b border-slate-300 bg-white'>
                        {row.getVisibleCells().map((cell) => {
                           return (
                              <td key={cell.id} className='px-6 py-4'>
                                 {flexRender(cell.column.columnDef.cell, cell.getContext())}
                              </td>
                           )
                        })}
                     </tr>
                  )
               })}
            </tbody>
         </table>

         <div className='mt-5 flex items-center gap-5'>
            <button
               className='rounded-lg border bg-white p-1 px-2'
               onClick={() => table.setPageIndex(table.getPageCount() - 1)}
               disabled={!table.getCanNextPage()}
            >
               رفتن به صفحه آخر
            </button>
            <button
               className='rounded-lg border bg-white p-1 px-2'
               onClick={() => table.nextPage()}
               disabled={!table.getCanNextPage()}
            >
               صفحه بعد
            </button>
            <button
               className='rounded-lg border bg-white p-1 px-2'
               onClick={() => table.previousPage()}
               disabled={!table.getCanPreviousPage()}
            >
               صفحه قبل
            </button>
            <button
               className='rounded-lg border bg-white p-1 px-2'
               onClick={() => table.setPageIndex(0)}
               disabled={!table.getCanPreviousPage()}
            >
               بازگشت به صفحه اول
            </button>

            <span className='flex items-center gap-1'>
               <div>صفحه</div>
               <strong>
                  {table.getState().pagination.pageIndex + 1} از {table.getPageCount()}
               </strong>
            </span>

            <span className='flex items-center gap-1'>
               برو به صفحه‌:
               <input
                  type='number'
                  defaultValue={table.getState().pagination.pageIndex + 1}
                  onChange={(e) => {
                     const page = e.target.value ? Number(e.target.value) - 1 : 0
                     table.setPageIndex(page)
                  }}
                  className='w-16 rounded border p-1'
               />
            </span>
            <select
               value={table.getState().pagination.pageSize}
               onChange={(e) => {
                  table.setPageSize(Number(e.target.value))
               }}
            >
               {[10, 20, 30, 40, 50].map((pageSize) => (
                  <option key={pageSize} value={pageSize}>
                     {pageSize}
                  </option>
               ))}
            </select>
         </div>
      </div>
   )
}

export default DesignsTable
