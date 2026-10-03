import React, { useEffect } from 'react';
import { View } from 'react-native';

export default function CustomCursor() {
  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (window.matchMedia && !window.matchMedia("(pointer: fine)").matches) return;

    // 1. Create cursor elements
    const cursor = document.createElement('div');
    cursor.className = 'firmeza-cursor';
    cursor.innerHTML = `
      <span class="cursor-icon relative flex items-center justify-center w-6 h-6">
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor" class="relative z-10 text-amber-500 drop-shadow-[0_0_8px_rgba(245,158,11,1)] -scale-x-100 rotate-12">
          <path d="M21.7,2.3 C21.7,2.3 17,2 12,7 C9,10 7,14 7,14 C7,14 10,17 14,17 C16.5,17 21,13 21.7,2.3 Z M8.5,15.5 L4.5,19.5 C3.7,20.3 2.5,20.3 1.8,19.5 C1.0,18.7 1.0,17.5 1.8,16.7 L5.8,12.7 C6.5,12 7.5,12 8.2,12.7 C9.0,13.5 9.0,14.7 8.5,15.5 Z"/>
        </svg>
      </span>
    `;

    const cursorRing = document.createElement('div');
    cursorRing.className = 'firmeza-cursor-ring';

    const cursorGlow = document.createElement('div');
    cursorGlow.className = 'firmeza-cursor-glow';

    document.body.appendChild(cursorGlow);
    document.body.appendChild(cursorRing);
    document.body.appendChild(cursor);

    let mx = -1000, my = -1000;
    let cx = -1000, cy = -1000;
    let rx = -1000, ry = -1000;
    let gx = -1000, gy = -1000;
    let animationFrameId: number;

    const onMouseMove = (e: MouseEvent) => {
        mx = e.clientX;
        my = e.clientY;
    };

    document.addEventListener('mousemove', onMouseMove);

    const render = () => {
        // Cursor core (fastest)
        cx += (mx - cx) * 0.4;
        cy += (my - cy) * 0.4;
        
        // Ring (slower)
        rx += (mx - rx) * 0.15;
        ry += (my - ry) * 0.15;

        // Glow (slowest)
        gx += (mx - gx) * 0.08;
        gy += (my - gy) * 0.08;
        
        cursor.style.transform = `translate(${cx}px, ${cy}px) translate(-50%, -50%)`;
        cursorRing.style.transform = `translate(${rx}px, ${ry}px) translate(-50%, -50%)`;
        cursorGlow.style.transform = `translate(${gx}px, ${gy}px) translate(-50%, -50%)`;
        
        animationFrameId = requestAnimationFrame(render);
    };
    render();

    // Attach hover effects to interactive elements dynamically
    let hoverInterval: NodeJS.Timeout;
    const attachHoverHandlers = () => {
        const els = document.querySelectorAll('a, button, input, textarea, select, [role="button"], .cursor-pointer');
        els.forEach(el => {
            const htmlEl = el as HTMLElement;
            if(htmlEl.dataset.cursorAttached) return;
            htmlEl.dataset.cursorAttached = "true";

            htmlEl.addEventListener('mouseenter', () => {
                cursor.classList.add('hover');
                cursorRing.classList.add('hover');
            });
            htmlEl.addEventListener('mouseleave', () => {
                cursor.classList.remove('hover');
                cursorRing.classList.remove('hover');
            });
        });
    };

    attachHoverHandlers();
    hoverInterval = setInterval(attachHoverHandlers, 1000); // Check for new elements periodically

    return () => {
        document.removeEventListener('mousemove', onMouseMove);
        cancelAnimationFrame(animationFrameId);
        clearInterval(hoverInterval);
        
        if (document.body.contains(cursor)) document.body.removeChild(cursor);
        if (document.body.contains(cursorRing)) document.body.removeChild(cursorRing);
        if (document.body.contains(cursorGlow)) document.body.removeChild(cursorGlow);
    };
  }, []);

  return null;
}
