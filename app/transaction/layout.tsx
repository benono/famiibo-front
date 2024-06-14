'use client'

import { motion } from 'framer-motion'
import React from 'react'

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ y: '100%' }}
      animate={{ y: 0 }}
      exit={{ y: '100%' }}
      transition={{ duration: 0.2 }}
    >
      {children}
    </motion.div>
  )
}
