'use client'

import React, {useState} from "react"
import ReportFailureModal from '@/components/ui/report-failure'

export default function App() {
  const [open, setOpen] = useState(true)

  return (
    <>
      <ReportFailureModal open={open} onClose={() => setOpen(false)} />
    </>
  )
}
