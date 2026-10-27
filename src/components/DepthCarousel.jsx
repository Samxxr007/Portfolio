import {
    useCallback,
    useEffect,
    useMemo,
    useRef,
    useState
} from 'react';
import gsap from 'gsap';
import { Github, ExternalLink, Activity, Sparkles, ChevronRight, Layers, Zap } from 'lucide-react';

const clamp = (v, min, max) => Math.min(Math.max(v, min), max);

const DepthCarousel = ({
    items = [],
    cardWidth = 340,
    cardHeight = 460,
    radius = 24,
    tint = '#05060a',
    depth = 220,
    spread = 95,
    tilt = 20,
    tiltDirection = 'right',
    perspective = 1400,
    visibleCards = 3,
    falloff = 0.25,
    blur = 4,
    duration = 600,
    ease = 'power3.out',
    autoplay = false,
    autoplayDelay = 3500,
    loop = true,
    showControls = true,
    showIndicators = true,
    onChange,
    onSelectProject,
    className = ''
}) => {
    const data = useMemo(() => (Array.isArray(items) ? items : []), [items]);
    const count = data.length;

    const rootRef = useRef(null);
    const stageRef = useRef(null);
    const cardRefs = useRef([]);
    const overlayRefs = useRef([]);

    const posRef = useRef(0);
    const focusRef = useRef(0);
    const tweenRef = useRef(null);
    const scaleRef = useRef(1);
    const cfgRef = useRef({});
    const onChangeRef = useRef(onChange);

    const dragRef = useRef(null);
    const wheelTimerRef = useRef(null);
    const autoTimerRef = useRef(null);
    const reducedRef = useRef(false);

    const [active, setActive] = useState(0);

    // Keep imperative animation configuration synchronized after commit, not during render.
    useEffect(() => {
        onChangeRef.current = onChange;
        cfgRef.current = {
            count,
            depth,
            spread,
            tilt,
            tiltDirection,
            visibleCards,
            falloff,
            blur,
            duration,
            ease,
            loop,
            cardWidth,
            autoplayDelay
        };
    }, [onChange, count, depth, spread, tilt, tiltDirection, visibleCards, falloff, blur, duration, ease, loop, cardWidth, autoplayDelay]);

    const layout = useCallback((pos) => {
        const cfg = cfgRef.current;
        const n = cfg.count;
        if (!n) return;
        const dir = cfg.tiltDirection === 'left' ? -1 : 1;
        const sc = scaleRef.current;

        for (let i = 0; i < n; i++) {
            const el = cardRefs.current[i];
            if (!el) continue;

            let d = i - pos;
            if (cfg.loop && n > 1) {
                d = ((d % n) + n) % n;
                if (d > n / 2) d -= n;
            }

            const back = Math.max(0, d);
            const az = Math.abs(d);
            const shown = az <= cfg.visibleCards + 0.5;

            const tz = -cfg.depth * d;
            const tx = dir * cfg.spread * d;
            const ry = dir * cfg.tilt * clamp(d, 0, 1);

            let opacity = d < 0 ? Math.max(0, 1 + d) : 1;
            if (!shown) opacity = 0;

            const brightness = Math.max(0.18, 1 - back * cfg.falloff);
            const blurPx = cfg.blur > 0 ? Math.min(cfg.blur, (back / Math.max(1, cfg.visibleCards)) * cfg.blur) : 0;
            const zi = Math.round(2000 - d * 20);

            el.style.transform = `translate(-50%, -50%) scale(${sc}) translateX(${tx.toFixed(2)}px) translateZ(${tz.toFixed(2)}px) rotateY(${ry.toFixed(3)}deg)`;
            el.style.opacity = opacity.toFixed(3);
            el.style.filter = `brightness(${brightness.toFixed(3)}) blur(${blurPx.toFixed(2)}px)`;
            el.style.zIndex = String(zi);
            el.style.pointerEvents = shown && opacity > 0.05 ? 'auto' : 'none';

            const ov = overlayRefs.current[i];
            if (ov) ov.style.opacity = clamp(back * cfg.falloff * 1.3, 0, 0.85).toFixed(3);
        }
    }, []);

    const notify = useCallback(
        (idx) => {
            setActive(idx);
            onChangeRef.current?.(idx, data[idx]);
        },
        [data]
    );

    const tweenTo = useCallback(
        (target, animate) => {
            tweenRef.current?.kill();
            const cfg = cfgRef.current;
            const proxy = { p: posRef.current };
            const dur = animate && !reducedRef.current ? cfg.duration / 1000 : 0;
            tweenRef.current = gsap.to(proxy, {
                p: target,
                duration: dur,
                ease: cfg.ease,
                onUpdate: () => {
                    posRef.current = proxy.p;
                    layout(proxy.p);
                },
                onComplete: () => {
                    const n = cfg.count;
                    if (n > 0) posRef.current = ((posRef.current % n) + n) % n;
                    layout(posRef.current);
                }
            });
        },
        [layout]
    );

    const setFocus = useCallback(
        (rawIndex, animate = true) => {
            const cfg = cfgRef.current;
            const n = cfg.count;
            if (!n) return;
            const idx = cfg.loop ? ((rawIndex % n) + n) % n : clamp(rawIndex, 0, n - 1);
            let delta = idx - posRef.current;
            if (cfg.loop && n > 1) {
                delta = ((delta % n) + n) % n;
                if (delta > n / 2) delta -= n;
            }
            tweenTo(posRef.current + delta, animate);
            if (idx !== focusRef.current) {
                focusRef.current = idx;
                notify(idx);
            }
        },
        [tweenTo, notify]
    );

    const navigateBy = useCallback((step) => setFocus(focusRef.current + step, true), [setFocus]);

    useEffect(() => {
        const root = rootRef.current;
        if (!root) return;
        const ro = new ResizeObserver(entries => {
            const w = entries[0].contentRect.width;
            const cfg = cfgRef.current;
            // Adaptive scaling on mobile viewports for smooth performance
            const needed = cfg.cardWidth + Math.abs(cfg.spread) * 1.5 + 40;
            scaleRef.current = clamp(w / needed, 0.72, 1);
            layout(posRef.current);
        });
        ro.observe(root);
        return () => ro.disconnect();
    }, [layout]);

    const onPointerDown = useCallback((e) => {
        const cfg = cfgRef.current;
        if (cfg.count < 2) return;
        tweenRef.current?.kill();
        dragRef.current = {
            x: e.clientX,
            y: e.clientY,
            startPos: posRef.current,
            lastX: e.clientX,
            lastT: performance.now(),
            v: 0,
            moved: false,
            id: e.pointerId
        };
    }, []);

    const onPointerMove = useCallback(
        (e) => {
            const drag = dragRef.current;
            if (!drag) return;
            const cfg = cfgRef.current;
            const stepPx = Math.max(cfg.cardWidth * 0.55 * scaleRef.current, 40);
            const dx = e.clientX - drag.x;
            const dy = e.clientY - drag.y;

            // Only capture if horizontal movement dominates vertical scroll
            if (!drag.moved && Math.abs(dx) > 6 && Math.abs(dx) > Math.abs(dy)) {
                drag.moved = true;
                rootRef.current?.setPointerCapture(drag.id);
            }
            if (!drag.moved) return;

            const now = performance.now();
            const dt = Math.max(now - drag.lastT, 1);
            drag.v = (e.clientX - drag.lastX) / dt;
            drag.lastX = e.clientX;
            drag.lastT = now;
            posRef.current = drag.startPos - dx / stepPx;
            layout(posRef.current);
        },
        [layout]
    );

    const onPointerEnd = useCallback(() => {
        const drag = dragRef.current;
        if (!drag) return;
        const wasMoved = drag.moved;
        dragRef.current = null;
        if (!wasMoved) return;
        const cfg = cfgRef.current;
        const stepPx = Math.max(cfg.cardWidth * 0.55 * scaleRef.current, 40);
        const projected = posRef.current - (drag.v * 180) / stepPx;
        setFocus(Math.round(projected), true);
    }, [setFocus]);

    const onKeyDown = useCallback(
        (e) => {
            if (e.key === 'ArrowLeft') {
                e.preventDefault();
                navigateBy(-1);
            } else if (e.key === 'ArrowRight') {
                e.preventDefault();
                navigateBy(1);
            }
        },
        [navigateBy]
    );

    const onCardClick = useCallback(
        (index, project) => {
            if (dragRef.current?.moved) return;
            if (focusRef.current === index) {
                // If clicking active front card, open deep dive modal
                onSelectProject?.(project);
            } else {
                setFocus(index, true);
            }
        },
        [setFocus, onSelectProject]
    );

    useEffect(() => {
        reducedRef.current = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        if (!autoplay || reducedRef.current || count < 2) return;
        const root = rootRef.current;
        let hovered = false;
        let focused = false;
        const stop = () => {
            if (autoTimerRef.current) clearInterval(autoTimerRef.current);
            autoTimerRef.current = null;
        };
        const start = () => {
            stop();
            autoTimerRef.current = setInterval(
                () => {
                    if (!hovered && !focused) navigateBy(1);
                },
                Math.max(cfgRef.current.autoplayDelay, 600)
            );
        };
        const onEnter = () => { hovered = true; };
        const onLeave = () => { hovered = false; };
        const onFocusIn = () => { focused = true; };
        const onFocusOut = () => { focused = false; };
        root?.addEventListener('mouseenter', onEnter);
        root?.addEventListener('mouseleave', onLeave);
        root?.addEventListener('focusin', onFocusIn);
        root?.addEventListener('focusout', onFocusOut);
        start();
        return () => {
            stop();
            root?.removeEventListener('mouseenter', onEnter);
            root?.removeEventListener('mouseleave', onLeave);
            root?.removeEventListener('focusin', onFocusIn);
            root?.removeEventListener('focusout', onFocusOut);
        };
    }, [autoplay, autoplayDelay, count, navigateBy]);

    useEffect(() => {
        layout(posRef.current);
    }, [layout, depth, spread, tilt, tiltDirection, visibleCards, falloff, blur, cardWidth, cardHeight, radius, count]);

    useEffect(() => () => {
        tweenRef.current?.kill();
        if (wheelTimerRef.current) clearTimeout(wheelTimerRef.current);
        if (autoTimerRef.current) clearInterval(autoTimerRef.current);
    }, []);

    return (
        <div
            ref={rootRef}
            className={`relative flex h-[540px] sm:h-[580px] w-full cursor-grab touch-pan-y select-none items-center justify-center outline-none [perspective-origin:50%_50%] active:cursor-grabbing ${className}`.trim()}
            style={{ perspective: `${perspective}px` }}
            role="group"
            aria-roledescription="carousel"
            aria-label="3D Depth Project Carousel"
            tabIndex={0}
            onPointerDown={onPointerDown}
            onPointerMove={onPointerMove}
            onPointerUp={onPointerEnd}
            onPointerCancel={onPointerEnd}
            onKeyDown={onKeyDown}
        >
            <div className="absolute inset-0 [transform-style:preserve-3d]" ref={stageRef}>
                {data.map((item, i) => {
                    const CardIcon = item.icon || Layers;
                    const isActiveCard = active === i;

                    return (
                        <div
                            key={item.id || item.title || i}
                            className={`absolute left-1/2 top-1/2 cursor-pointer overflow-hidden border border-slate-800/80 bg-slate-950/95 shadow-[0_30px_70px_-20px_rgba(0,0,0,0.8),0_10px_30px_-10px_rgba(0,0,0,0.6)] [transform:translate(-50%,-50%)] [transform-origin:center] [will-change:transform,opacity,filter] flex flex-col justify-between text-left transition-colors duration-300 ${
                                isActiveCard ? 'border-[color:var(--color-accent)]/60 shadow-[0_0_40px_color-mix(in_srgb,var(--color-accent)_18%,transparent)]' : ''
                            }`}
                            ref={el => {
                                cardRefs.current[i] = el;
                            }}
                            style={{
                                width: cardWidth,
                                height: cardHeight,
                                borderRadius: radius
                            }}
                            aria-roledescription="slide"
                            aria-label={`${i + 1} of ${count}`}
                            aria-hidden={active !== i}
                            onClick={() => onCardClick(i, item)}
                        >
                            {/* Card Visual Header */}
                            <div className={`h-40 w-full bg-gradient-to-br ${item.gradient || 'from-slate-900 via-slate-950 to-black'} relative overflow-hidden p-4 flex flex-col justify-between border-b border-slate-800/60`}>
                                {/* Grid texture overlay */}
                                <div
                                    className="absolute inset-0 opacity-15"
                                    style={{
                                        backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
                                        backgroundSize: '20px 20px'
                                    }}
                                />

                                <div className="flex items-center justify-between relative z-10">
                                    <span className={`text-[10px] font-extrabold uppercase tracking-wider px-2.5 py-0.5 rounded-full border backdrop-blur-md ${item.badgeColor || 'text-slate-300 border-slate-700 bg-slate-800/50'}`}>
                                        {item.status || 'Active Project'}
                                    </span>
                                    {item.featured && (
                                        <span className="flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full bg-black/60 backdrop-blur-md border border-white/10 text-white shadow-md">
                                            <Sparkles size={11} style={{ color: "var(--color-accent)" }} />
                                            Featured
                                        </span>
                                    )}
                                </div>

                                <div className="relative z-10 flex items-center justify-center my-auto">
                                    <div className="p-3.5 rounded-2xl bg-black/50 border border-white/10 backdrop-blur-md shadow-2xl">
                                        <CardIcon size={32} style={{ color: "var(--color-accent)" }} />
                                    </div>
                                </div>

                                <div className="relative z-10 flex items-center justify-between text-[11px] text-slate-400 font-medium">
                                    <span>{item.category}</span>
                                    <span className="text-[10px] font-bold flex items-center gap-1" style={{ color: "var(--color-accent)" }}>
                                        Details <ChevronRight size={12} />
                                    </span>
                                </div>
                            </div>

                            {/* Card Content Body */}
                            <div className="p-5 flex-1 flex flex-col justify-between text-left">
                                <div>
                                    <h3 className="text-base font-bold text-white mb-2 leading-snug line-clamp-1">
                                        {item.title}
                                    </h3>

                                    {/* Quantified Metric Badge */}
                                    <div className="mb-3">
                                        <span
                                            className="inline-flex items-center gap-1.5 text-[10px] font-bold px-2 py-0.5 rounded-md border"
                                            style={{
                                                borderColor: "color-mix(in srgb, var(--color-accent) 25%, transparent)",
                                                color: "var(--color-accent)",
                                                backgroundColor: "color-mix(in srgb, var(--color-accent) 6%, transparent)"
                                            }}
                                        >
                                            <Activity size={11} />
                                            {item.metric}
                                        </span>
                                    </div>

                                    <p className="text-slate-400 text-xs leading-relaxed line-clamp-3 font-light mb-3">
                                        {item.description}
                                    </p>
                                </div>

                                {/* Tech Tags */}
                                <div>
                                    <div className="flex flex-wrap gap-1 mb-4">
                                        {item.tags?.slice(0, 3).map(tag => (
                                            <span
                                                key={tag}
                                                className="text-[9px] px-2 py-0.5 rounded bg-slate-900 text-slate-300 border border-slate-800"
                                            >
                                                {tag}
                                            </span>
                                        ))}
                                        {item.tags?.length > 3 && (
                                            <span className="text-[9px] px-1.5 py-0.5 rounded text-slate-500 bg-slate-900 border border-slate-800">
                                                +{item.tags.length - 3}
                                            </span>
                                        )}
                                    </div>

                                    {/* Action Links */}
                                    <div
                                        className="flex items-center justify-between pt-3 border-t border-slate-800/80"
                                        onClick={(e) => e.stopPropagation()}
                                    >
                                        <a
                                            href={item.github}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-slate-400 hover:text-white transition-colors flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider"
                                        >
                                            <Github size={14} /> Source
                                        </a>

                                        {item.deploy ? (
                                            <a
                                                href={item.deploy}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                style={{ color: "var(--color-accent)" }}
                                                className="flex items-center gap-1 text-xs font-bold uppercase tracking-wider hover:brightness-125 transition-all"
                                            >
                                                Live <ExternalLink size={12} />
                                            </a>
                                        ) : (
                                            <button
                                                onClick={() => onSelectProject?.(item)}
                                                className="text-slate-500 hover:text-slate-300 text-[10px] font-bold uppercase tracking-wider flex items-center gap-1 transition-colors"
                                            >
                                                Specs <Zap size={11} style={{ color: "var(--color-accent)" }} />
                                            </button>
                                        )}
                                    </div>
                                </div>
                            </div>

                            {/* Depth overlay shadow */}
                            <span
                                className="pointer-events-none absolute inset-0 opacity-0 mix-blend-multiply transition-opacity duration-300"
                                ref={el => {
                                    overlayRefs.current[i] = el;
                                }}
                                style={{ background: tint }}
                            />
                        </div>
                    );
                })}
            </div>

            {/* Carousel Control Buttons */}
            {showControls && count > 1 && (
                <>
                    <button
                        type="button"
                        className="absolute left-2 sm:left-4 top-1/2 z-[3000] grid h-10 w-10 sm:h-11 sm:w-11 -translate-y-1/2 place-items-center rounded-full border border-slate-700 bg-slate-900/80 text-white backdrop-blur-md transition-all hover:bg-slate-800 hover:border-slate-500 active:scale-95 shadow-xl"
                        aria-label="Previous project"
                        onClick={() => navigateBy(-1)}
                    >
                        <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
                            <path
                                d="M15 5l-7 7 7 7"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </svg>
                    </button>
                    <button
                        type="button"
                        className="absolute right-2 sm:right-4 top-1/2 z-[3000] grid h-10 w-10 sm:h-11 sm:w-11 -translate-y-1/2 place-items-center rounded-full border border-slate-700 bg-slate-900/80 text-white backdrop-blur-md transition-all hover:bg-slate-800 hover:border-slate-500 active:scale-95 shadow-xl"
                        aria-label="Next project"
                        onClick={() => navigateBy(1)}
                    >
                        <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
                            <path
                                d="M9 5l7 7-7 7"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </svg>
                    </button>
                </>
            )}

            {/* Indicators */}
            {showIndicators && count > 1 && (
                <div
                    className="absolute -bottom-2 sm:bottom-2 left-1/2 z-[3000] flex -translate-x-1/2 gap-1.5 rounded-full bg-slate-900/80 border border-slate-800 px-3 py-1.5 backdrop-blur-md shadow-xl"
                    role="tablist"
                    aria-label="Project Slides"
                >
                    {data.map((_, i) => (
                        <button
                            key={i}
                            type="button"
                            role="tab"
                            aria-selected={active === i}
                            aria-label={`Go to project ${i + 1}`}
                            className={`h-2 cursor-pointer rounded-full transition-all duration-300 ${
                                active === i
                                    ? 'w-6 bg-[color:var(--color-accent)]'
                                    : 'w-2 bg-slate-700 hover:bg-slate-500'
                            }`}
                            onClick={() => setFocus(i, true)}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};

export default DepthCarousel;
