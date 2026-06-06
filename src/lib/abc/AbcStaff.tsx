import { useEffect, useRef } from 'react'
import abcjs from 'abcjs'
import { notesToAbc } from './notesToAbc'

interface AbcStaffProps {
  notes: string[]
  clef?: 'treble' | 'bass'
}

// Renders a row of notes on a staff via abcjs. Pitch order/content comes from
// lib/music; this only formats (notesToAbc) and draws.
function AbcStaff({ notes, clef = 'treble' }: AbcStaffProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const abc = notesToAbc(notes, { clef })

  useEffect(() => {
    if (containerRef.current) {
      abcjs.renderAbc(containerRef.current, abc, { responsive: 'resize' })
    }
  }, [abc])

  return <div ref={containerRef} />
}

export default AbcStaff
