'use client';

import { MotionConfig } from 'framer-motion';

/* Membuat SELURUH animasi framer-motion menghormati setelan "kurangi gerak"
   di sistem pengguna. Blok @media di globals.css hanya mengendalikan animasi
   CSS — framer-motion menganimasi lewat JavaScript, jadi tidak ikut terpengaruh
   tanpa pembungkus ini. */
export default function MotionProvider({ children }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
