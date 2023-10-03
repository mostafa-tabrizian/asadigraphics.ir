'use client'

import Link from 'next/link'
import Image from 'next/image'

import { DataGrid, GridColDef } from '@mui/x-data-grid'
import { IDesign } from '@/models/design'

const DesignsTable = ({ designs }: { designs: IDesign[] }) => {
   const columns: GridColDef[] = [
      {
         field: 'id',
         headerName: 'ردیف',
         width: 30,
         valueGetter: ({ value }) => {
            if (!value) value
            return value.toLocaleString('fa')
         },
      },
      {
         field: 'frontSrc',
         headerName: 'جلو',
         width: 80,
         renderCell: ({ value }) => (
            <Link
               target='_blank'
               href={`https://tabrizian.storage.iran.liara.space/asadi_designs/designs/${
                  value as string
               }`}
            >
               {value ? (
                  <Image
                     className='rounded-xl object-cover'
                     src={`https://tabrizian.storage.iran.liara.space/asadi_designs/designs/${
                        value as string
                     }`}
                     alt={String(value)}
                     height={50}
                     width={50}
                  />
               ) : (
                  ''
               )}
            </Link>
         ),
      },
      {
         field: 'backSrc',
         headerName: 'پشت',
         width: 80,
         renderCell: ({ value }) => (
            <Link
               target='_blank'
               href={`https://tabrizian.storage.iran.liara.space/asadi_designs/designs/${
                  value as string
               }`}
            >
               {value ? (
                  <Image
                     className='rounded-xl object-cover'
                     src={`https://tabrizian.storage.iran.liara.space/asadi_designs/designs/${
                        value as string
                     }`}
                     alt={String(value)}
                     height={50}
                     width={50}
                  />
               ) : (
                  ''
               )}
            </Link>
         ),
      },
      {
         field: 'active',
         headerName: 'فعال',
         width: 75,
         renderCell: ({ value }) =>
            value ? (
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
            ),
      },

      {
         field: 'name',
         headerName: 'عنوان',
         width: 300,
         renderCell: ({ value }) => (
            <Link href={`/--admin--/designs/${(value as string).replaceAll(' ', '-')}`}>
               <span>{value}</span>
            </Link>
         ),
      },

      {
         field: 'createdAt',
         headerName: 'تاریخ ایجاد',
         width: 200,
      },
   ]

   const rows = designs?.map((design, index) => {
      return {
         id: index,
         ...design,
      }
   })

   return (
      <div style={{ width: '100%' }} className='rtl'>
         <DataGrid
            rows={rows}
            columns={columns}
            initialState={{
               pagination: {
                  paginationModel: { page: 0, pageSize: 10 },
               },
            }}
            pageSizeOptions={[10, 20, 50, 100]}
            density='comfortable'
         />
      </div>
   )
}

export default DesignsTable
