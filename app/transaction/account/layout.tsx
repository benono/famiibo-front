'use client'

import { motion } from 'framer-motion'
import React from 'react'

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ x: '100%' }}
      animate={{ x: 0 }}
      exit={{ x: '100%' }}
      transition={{ duration: 0.2 }}
    >
      {children}
    </motion.div>
  )
}
