'use client'

import { useGSAP } from '@gsap/react';
import clsx from 'clsx';
import gsap from 'gsap'
import { useRef } from 'react';

type FadeInProps = {
   children: React.ReactNode;
   vars?: gsap.TweenVars;
   className?: string;
}

gsap.registerPlugin(useGSAP)

export const FadeIn = ({children, vars={}, className} : FadeInProps) => {
    const containerRef = useRef<HTMLDivElement>(null) 
    
    
    useGSAP(()=>{
        const mm = gsap.matchMedia()
        mm.add('(prefers-reduced-motion: no-preference)', ()=>{
            gsap.to(containerRef.current, {
              duration: 5,
              opacity: 1,
              ease: 'power3.out',
              y: 0,
              ...vars,
            })
        })
        mm.add('(prefers-reduced-motion: reduce)', ()=>{
            gsap.to(containerRef.current, {
              duration: 0.5,
              opacity: 1,
              ease: 'none',
              y: 0,
              stagger: 0,
            })
        })
      }, { scope: containerRef })


    return (
        <div ref={containerRef} className={clsx('opacity-0', className)}>
            {children}
        </div>
    )
}