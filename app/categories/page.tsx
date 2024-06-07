'use client'

import React from 'react'
import iconMap from '../../components/icon/iconMap'
import { HelpOutline, Add } from '@mui/icons-material' // デフォルトアイコンとして使用

type Category = {
  id: string
  name: string
  icon: string
  color: string
}

const categories: Category[] = [
  {
    id: '1',
    name: 'Food',
    icon: 'LocalDining',
    color: 'red',
  },
  {
    id: '2',
    name: 'Clothing',
    icon: 'LocalGroceryStore',
    color: 'blue',
  },
  {
    id: '3',
    name: 'Entertainment',
    icon: 'LocalMovies',
    color: 'green',
  },
  {
    id: '4',
    name: 'Healthcare',
    icon: 'LocalHospital',
    color: 'yellow',
  },
  {
    id: '5',
    name: 'Miscellaneous',
    icon: 'HelpOutline',
    color: 'black',
  },
]

export default function CategoriesPage() {
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-black p-2">
      <p className="text-center text-2xl font-bold mb-4">Categories</p>
      <div className="grid grid-cols-4 gap-1">
        {categories.map((category) => {
          const IconComponent = iconMap[category.icon] || <HelpOutline />
          return (
            <div
              key={category.id}
              className="flex flex-col items-center justify-center p-4 bg-white dark:bg-gray-800 rounded-md shadow-md"
            >
              {React.cloneElement(IconComponent, {
                style: { color: category.color, fontSize: '2rem' },
              })}
              <span className="mt-2 text-center text-xs lg:text-md font-medium text-gray-700 dark:text-gray-300  truncate w-full">
                {category.name}
              </span>
            </div>
          )
        })}

        {/* 新規追加ボタン */}
        <div
          className="flex flex-col items-center justify-center p-4 bg-white dark:bg-gray-800 rounded-md shadow-md cursor-pointer"
          onClick={() => alert('Add new category')}
        >
          <Add style={{ color: 'green', fontSize: '2rem' }} />
          <span className="mt-2 text-center text-xs lg:text-md font-medium text-gray-700 dark:text-gray-300 truncate w-full">
            Add New
          </span>
        </div>
      </div>
    </div>
  )
}
