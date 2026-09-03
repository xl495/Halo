import { i as __toESM } from "../_runtime.mjs";
import { o as require_jsx_runtime, r as Slot, s as require_react } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { a as Search, c as PictureInPicture2, d as Monitor, f as Info, i as Settings2, l as Pause, m as Battery, n as Wifi, o as RotateCcw, p as Clock3, s as Play, t as X, u as Palette } from "../_libs/lucide-react.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { n as clsx, t as cva } from "../_libs/class-variance-authority+clsx.mjs";
import { t as twMerge } from "../_libs/tailwind-merge.mjs";
import { i as SliderTrack, n as SliderRange, r as SliderThumb, t as Slider$1 } from "../_libs/@radix-ui/react-slider+[...].mjs";
import { n as SwitchThumb, t as Switch$1 } from "../_libs/radix-ui__react-switch.mjs";
import { t as require_client } from "../_libs/react-dom+scheduler.mjs";
import { n as create, t as persist } from "../_libs/zustand.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-eDKJKbiW.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var import_client = require_client();
function cn(...inputs) {
	return twMerge(clsx(inputs));
}
function HaloMark({ className }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
		viewBox: "0 0 32 32",
		className: cn("text-primary", className),
		"aria-hidden": true,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
			cx: "16",
			cy: "16",
			r: "11",
			fill: "none",
			stroke: "currentColor",
			strokeWidth: "2.4",
			strokeLinecap: "round",
			strokeDasharray: "50 20",
			transform: "rotate(-90 16 16)"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
			cx: "16",
			cy: "16",
			r: "3.4",
			fill: "currentColor"
		})]
	});
}
var buttonVariants = cva("inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-[color,background-color,box-shadow,transform,opacity] duration-150 ease-out disabled:pointer-events-none disabled:opacity-40 [&_svg]:size-4 [&_svg]:shrink-0 active:not-disabled:scale-[0.96]", {
	variants: {
		variant: {
			default: "bg-primary text-primary-fg hover:bg-primary/90",
			secondary: "bg-bg-subtle text-fg hover:bg-bg-subtle/80 shadow-[var(--shadow-border)]",
			ghost: "text-fg-muted hover:bg-bg-subtle hover:text-fg",
			outline: "bg-transparent text-fg shadow-[var(--shadow-border)] hover:bg-bg-subtle",
			danger: "bg-danger text-fg hover:bg-danger/90"
		},
		size: {
			default: "h-10 px-4",
			sm: "h-8 rounded-sm px-3 text-xs",
			lg: "h-11 px-5",
			icon: "size-10",
			"icon-sm": "size-8"
		}
	},
	defaultVariants: {
		variant: "default",
		size: "default"
	}
});
var Button = import_react.forwardRef(({ className, variant, size, asChild = false, ...props }, ref) => {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(asChild ? Slot : "button", {
		className: cn(buttonVariants({
			variant,
			size,
			className
		})),
		ref,
		...props
	});
});
Button.displayName = "Button";
var Input = import_react.forwardRef(({ className, type, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
	type,
	className: cn("flex h-10 w-full rounded-md bg-bg-subtle px-3 text-sm text-fg shadow-[var(--shadow-border)] transition-[box-shadow] duration-150 ease-out placeholder:text-fg-subtle focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 disabled:opacity-50", className),
	ref,
	...props
}));
Input.displayName = "Input";
var Label = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
	ref,
	className: cn("text-xs font-medium text-fg-muted", className),
	...props
}));
Label.displayName = "Label";
var Slider = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Slider$1, {
	ref,
	className: cn("relative flex w-full touch-none select-none items-center", className),
	...props,
	children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SliderTrack, {
		className: "relative h-1.5 w-full grow overflow-hidden rounded-full bg-bg-subtle",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SliderRange, { className: "absolute h-full bg-primary" })
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SliderThumb, { className: "block size-4 rounded-full bg-fg shadow-[var(--shadow-border)] transition-[box-shadow,transform] duration-150 ease-out hover:scale-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50" })]
}));
Slider.displayName = Slider$1.displayName;
var Switch = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Switch$1, {
	className: cn("peer inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full border border-transparent transition-[background-color] duration-150 ease-out data-[state=checked]:bg-primary data-[state=unchecked]:bg-bg-subtle focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50", className),
	...props,
	ref,
	children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SwitchThumb, { className: "pointer-events-none block size-5 rounded-full bg-fg shadow-sm transition-transform duration-150 ease-out data-[state=checked]:translate-x-5 data-[state=unchecked]:translate-x-0.5" })
}));
Switch.displayName = Switch$1.displayName;
function playChime() {
	const AudioCtx = window.AudioContext || window.webkitAudioContext;
	if (!AudioCtx) return;
	const ctx = new AudioCtx();
	const now = ctx.currentTime;
	[
		523.25,
		659.25,
		783.99
	].forEach((freq, i) => {
		const osc = ctx.createOscillator();
		const gain = ctx.createGain();
		osc.type = "sine";
		osc.frequency.value = freq;
		const t0 = now + i * .11;
		gain.gain.setValueAtTime(0, t0);
		gain.gain.linearRampToValueAtTime(.1, t0 + .02);
		gain.gain.exponentialRampToValueAtTime(1e-4, t0 + .72);
		osc.connect(gain);
		gain.connect(ctx.destination);
		osc.start(t0);
		osc.stop(t0 + .75);
	});
	window.setTimeout(() => {
		ctx.close();
	}, 1800);
}
function formatRemaining(ms, showSeconds) {
	const total = Math.max(0, Math.ceil(ms / 1e3));
	const hours = Math.floor(total / 3600);
	const minutes = Math.floor(total % 3600 / 60);
	const seconds = total % 60;
	const pad = (n) => n.toString().padStart(2, "0");
	if (hours > 0) return showSeconds ? `${pad(hours)}:${pad(minutes)}:${pad(seconds)}` : `${pad(hours)}:${pad(minutes)}`;
	if (showSeconds) return `${pad(minutes)}:${pad(seconds)}`;
	return `${pad(minutes)}:${pad(seconds)}`;
}
function formatClock(date) {
	const pad = (n) => n.toString().padStart(2, "0");
	return `${pad(date.getHours())}:${pad(date.getMinutes())}`;
}
var messages = {
	zh: {
		appName: "Halo",
		appTag: "悬浮倒计时",
		counting: "倒计时中",
		paused: "已暂停",
		done: "时间到",
		idle: "就绪",
		settings: "设置",
		timer: "倒计时",
		look: "外观",
		display: "显示",
		about: "关于",
		start: "开始",
		pause: "暂停",
		resume: "继续",
		reset: "重置",
		again: "再来一组",
		eventName: "事件名称",
		eventPlaceholder: "下班、会议、休息…",
		custom: "自定义时长",
		hours: "时",
		minutes: "分",
		seconds: "秒",
		until: "今天结束于",
		apply: "套用并开始",
		presets: "快捷预设",
		pomodoro: "番茄钟 25′",
		shortBreak: "短休息 5′",
		focus: "专注 15′",
		deep: "深度 45′",
		hour: "一小时",
		longFocus: "长专注 90′",
		shape: "形态",
		shapeRing: "圆环",
		shapePill: "胶囊",
		shapeMinimal: "仅时间",
		shapeCard: "卡片",
		theme: "主题",
		size: "尺寸",
		thickness: "环宽",
		opacity: "透明度",
		glass: "玻璃质感",
		showSeconds: "显示秒",
		showLabel: "显示状态文字",
		showProgress: "显示进度",
		language: "语言",
		desktop: "桌面风格",
		mac: "macOS",
		windows: "Windows",
		sound: "结束提示音",
		alwaysOnTop: "始终置顶",
		popOut: "弹出悬浮窗",
		popOutHint: "用画中画把计时器浮在其他窗口之上。",
		focusMode: "专注模式",
		exitFocus: "退出专注",
		aboutBody: "Halo 是一款可完全自定义的悬浮倒计时。把圆环拖到桌面任意位置，选择圆环、胶囊、卡片或只显示时间，并在多款主题之间切换。所有偏好保存在这台设备上。",
		aboutHint: "空格 暂停或继续  ·  R 重置  ·  S 设置  ·  F 专注  ·  Esc 返回",
		pipUnsupported: "当前浏览器不支持弹出悬浮窗，已进入专注模式",
		close: "关闭",
		started: "已开始倒计时",
		timeUp: "时间到",
		widgetHint: "拖动移动 · 悬停显示控制",
		menuView: "显示",
		search: "搜索",
		remaining: "剩余",
		total: "总计",
		targetHint: "若该时刻已过，将计到明天。"
	},
	en: {
		appName: "Halo",
		appTag: "Floating timer",
		counting: "Counting down",
		paused: "Paused",
		done: "Time’s up",
		idle: "Ready",
		settings: "Settings",
		timer: "Timer",
		look: "Look",
		display: "Display",
		about: "About",
		start: "Start",
		pause: "Pause",
		resume: "Resume",
		reset: "Reset",
		again: "Start again",
		eventName: "Event name",
		eventPlaceholder: "Wrap up, meeting, break…",
		custom: "Custom duration",
		hours: "h",
		minutes: "m",
		seconds: "s",
		until: "Until today",
		apply: "Apply & start",
		presets: "Presets",
		pomodoro: "Pomodoro 25′",
		shortBreak: "Short break 5′",
		focus: "Focus 15′",
		deep: "Deep 45′",
		hour: "One hour",
		longFocus: "Long focus 90′",
		shape: "Shape",
		shapeRing: "Ring",
		shapePill: "Pill",
		shapeMinimal: "Time only",
		shapeCard: "Card",
		theme: "Theme",
		size: "Size",
		thickness: "Ring width",
		opacity: "Opacity",
		glass: "Glass",
		showSeconds: "Show seconds",
		showLabel: "Show status label",
		showProgress: "Show progress",
		language: "Language",
		desktop: "Desktop style",
		mac: "macOS",
		windows: "Windows",
		sound: "Completion chime",
		alwaysOnTop: "Always on top",
		popOut: "Pop out",
		popOutHint: "Float the timer over other windows with picture-in-picture.",
		focusMode: "Focus mode",
		exitFocus: "Exit focus",
		aboutBody: "Halo is a fully customizable floating countdown. Drag the ring anywhere on the desk, switch between a ring, a pill, a card, or time-only, and pick a theme. Preferences stay on this device.",
		aboutHint: "Space pause/resume  ·  R reset  ·  S settings  ·  F focus  ·  Esc back",
		pipUnsupported: "Picture-in-picture isn’t available here — switched to focus mode.",
		close: "Close",
		started: "Countdown started",
		timeUp: "Time’s up",
		widgetHint: "Drag to move · hover for controls",
		menuView: "View",
		search: "Search",
		remaining: "Left",
		total: "Total",
		targetHint: "If that time has passed, it counts to tomorrow."
	}
};
function t(lang, key) {
	return messages[lang][key];
}
function WidgetFace({ shape, size, thickness, progress, timeText, label, showLabel, showProgress, glass, done, compact = false }) {
	const timeSize = compact ? Math.max(11, Math.round(size * .16)) : shape === "minimal" ? Math.round(size * .28) : shape === "pill" ? Math.round(size * .2) : Math.round(size * .22);
	const labelSize = compact ? 0 : Math.max(10, Math.round(size * .052));
	const face = /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: cn("halo-face", done && "halo-done"),
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "halo-time tabular-nums font-display tracking-tight",
			style: { fontSize: timeSize },
			children: timeText
		}), showLabel && !compact ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "halo-label",
			style: { fontSize: labelSize },
			children: label
		}) : null]
	});
	if (shape === "ring") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RingFrame, {
		size,
		thickness,
		progress: showProgress ? progress : 0,
		showProgress,
		glass,
		children: face
	});
	if (shape === "pill") return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: cn("halo-pill", glass && "halo-face-glass"),
		style: {
			width: size * 1.28,
			height: Math.max(size * .4, compact ? 44 : 72)
		},
		children: [face, showProgress ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "halo-pill-bar",
			style: { width: `${Math.max(2, progress * 100)}%` }
		}) : null]
	});
	if (shape === "card") return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: cn("halo-card-face", glass && "halo-face-glass"),
		style: {
			width: size * 1.12,
			height: compact ? 64 : size * .78
		},
		children: [face, showProgress ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "halo-card-track",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "halo-card-bar",
				style: { width: `${Math.max(2, progress * 100)}%` }
			})
		}) : null]
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "halo-minimal",
		style: { minWidth: size * .9 },
		children: face
	});
}
function RingFrame({ size, thickness, progress, showProgress, glass, children }) {
	const uid = (0, import_react.useId)();
	const gradId = `halo-grad-${uid.replace(/:/g, "")}`;
	const glowId = `halo-glow-${uid.replace(/:/g, "")}`;
	const inset = 6;
	const cx = size / 2;
	const cy = size / 2;
	const r = (size - thickness) / 2 - inset;
	const circ = 2 * Math.PI * r;
	const dash = Math.max(0, Math.min(1, progress)) * circ;
	const tipX = cx + r * Math.sin(progress * Math.PI * 2);
	const tipY = cy - r * Math.cos(progress * Math.PI * 2);
	const inner = size - (thickness + inset) * 2 - 8;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "halo-ring",
		style: {
			width: size,
			height: size
		},
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
			width: size,
			height: size,
			viewBox: `0 0 ${size} ${size}`,
			className: "halo-ring-svg",
			"aria-hidden": true,
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("defs", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("linearGradient", {
					id: gradId,
					x1: "0%",
					y1: "0%",
					x2: "100%",
					y2: "80%",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
						offset: "0%",
						stopColor: "var(--halo-ring-from)"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
						offset: "100%",
						stopColor: "var(--halo-ring-to)"
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("filter", {
					id: glowId,
					x: "-50%",
					y: "-50%",
					width: "200%",
					height: "200%",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("feGaussianBlur", {
						stdDeviation: "2.6",
						result: "blur"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("feMerge", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("feMergeNode", { in: "blur" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("feMergeNode", { in: "SourceGraphic" })] })]
				})] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
					cx,
					cy,
					r,
					fill: "none",
					stroke: "var(--halo-track)",
					strokeWidth: thickness
				}),
				showProgress ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("g", {
					filter: `url(#${glowId})`,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
						cx,
						cy,
						r,
						fill: "none",
						stroke: `url(#${gradId})`,
						strokeWidth: thickness,
						strokeLinecap: "round",
						strokeDasharray: `${dash} ${circ}`,
						transform: `rotate(-90 ${cx} ${cy})`
					}), progress > .02 && progress < .995 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
						cx: tipX,
						cy: tipY,
						r: thickness / 2 + .6,
						fill: "var(--halo-ring-to)"
					}) : null]
				}) : null
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: cn("halo-ring-inner", glass && "halo-face-glass"),
			style: {
				width: inner,
				height: inner
			},
			children
		})]
	});
}
function useDrag(pos, setPos) {
	const dragging = (0, import_react.useRef)(false);
	const origin = (0, import_react.useRef)({
		px: 0,
		py: 0,
		x: 0,
		y: 0
	});
	return {
		onPointerDown: (e) => {
			if (e.target.closest("[data-no-drag]")) return;
			dragging.current = true;
			e.currentTarget.setPointerCapture(e.pointerId);
			origin.current = {
				px: e.clientX,
				py: e.clientY,
				x: pos.x,
				y: pos.y
			};
		},
		onPointerMove: (e) => {
			if (!dragging.current) return;
			const parent = e.currentTarget.offsetParent;
			const w = parent?.clientWidth ?? window.innerWidth;
			const h = parent?.clientHeight ?? window.innerHeight;
			const dx = (e.clientX - origin.current.px) / w;
			const dy = (e.clientY - origin.current.py) / h;
			setPos(Math.min(.9, Math.max(.01, origin.current.x + dx)), Math.min(.82, Math.max(.04, origin.current.y + dy)));
		},
		onPointerUp: () => {
			dragging.current = false;
		}
	};
}
var DEFAULT_DURATION = 15e5;
var DEFAULT_REMAINING = 991e3;
var useHalo = create()(persist((set, get) => ({
	hasHydrated: false,
	lang: "zh",
	os: "mac",
	shape: "ring",
	themeId: "aurora",
	size: 236,
	opacity: 1,
	thickness: 11,
	glass: false,
	showSeconds: true,
	showLabel: true,
	showProgress: true,
	label: "",
	sound: true,
	alwaysOnTop: true,
	settingsOpen: true,
	settingsTab: "timer",
	focusMode: false,
	durationMs: DEFAULT_DURATION,
	remainingMs: DEFAULT_REMAINING,
	endsAt: null,
	status: "idle",
	widgetPos: {
		x: .07,
		y: .2
	},
	settingsPos: {
		x: .48,
		y: .055
	},
	widgetFocus: false,
	pipActive: false,
	setHasHydrated: (v) => set({ hasHydrated: v }),
	setLang: (lang) => set({ lang }),
	setOs: (os) => set({ os }),
	setShape: (shape) => set({ shape }),
	setTheme: (themeId) => set({ themeId }),
	setSize: (size) => set({ size }),
	setOpacity: (opacity) => set({ opacity }),
	setThickness: (thickness) => set({ thickness }),
	setGlass: (glass) => set({ glass }),
	setShowSeconds: (showSeconds) => set({ showSeconds }),
	setShowLabel: (showLabel) => set({ showLabel }),
	setShowProgress: (showProgress) => set({ showProgress }),
	setLabel: (label) => set({ label }),
	setSound: (sound) => set({ sound }),
	setAlwaysOnTop: (alwaysOnTop) => set({ alwaysOnTop }),
	setSettingsOpen: (settingsOpen) => set({ settingsOpen }),
	setSettingsTab: (settingsTab) => set({ settingsTab }),
	setFocusMode: (focusMode) => set({ focusMode }),
	setWidgetPos: (x, y) => set({ widgetPos: {
		x,
		y
	} }),
	setSettingsPos: (x, y) => set({ settingsPos: {
		x,
		y
	} }),
	setWidgetFocus: (widgetFocus) => set({ widgetFocus }),
	setPipActive: (pipActive) => set({ pipActive }),
	start: (durationMs) => {
		const next = durationMs ?? get().remainingMs ?? get().durationMs;
		const ms = Math.max(1e3, next);
		set({
			durationMs: durationMs ?? get().durationMs,
			remainingMs: ms,
			endsAt: Date.now() + ms,
			status: "running"
		});
	},
	pause: () => {
		const { status, endsAt } = get();
		if (status !== "running" || !endsAt) return;
		set({
			remainingMs: Math.max(0, endsAt - Date.now()),
			endsAt: null,
			status: "paused"
		});
	},
	resume: () => {
		const { status, remainingMs } = get();
		if (status !== "paused") return;
		set({
			endsAt: Date.now() + Math.max(0, remainingMs),
			status: "running"
		});
	},
	reset: () => {
		const { durationMs } = get();
		set({
			remainingMs: durationMs,
			endsAt: null,
			status: "idle"
		});
	},
	finish: () => {
		if (get().status === "done") return;
		set({
			remainingMs: 0,
			endsAt: null,
			status: "done"
		});
	},
	again: () => {
		const { durationMs } = get();
		set({
			remainingMs: durationMs,
			endsAt: Date.now() + durationMs,
			status: "running"
		});
	},
	remainingNow: () => {
		const { status, endsAt, remainingMs } = get();
		if (status === "running" && endsAt) return Math.max(0, endsAt - Date.now());
		if (status === "done") return 0;
		return remainingMs;
	}
}), {
	name: "halo-widget",
	partialize: (s) => ({
		lang: s.lang,
		os: s.os,
		shape: s.shape,
		themeId: s.themeId,
		size: s.size,
		opacity: s.opacity,
		thickness: s.thickness,
		glass: s.glass,
		showSeconds: s.showSeconds,
		showLabel: s.showLabel,
		showProgress: s.showProgress,
		label: s.label,
		sound: s.sound,
		alwaysOnTop: s.alwaysOnTop,
		settingsOpen: s.settingsOpen,
		settingsTab: s.settingsTab,
		durationMs: s.durationMs,
		remainingMs: s.remainingMs,
		endsAt: s.endsAt,
		status: s.status,
		widgetPos: s.widgetPos,
		settingsPos: s.settingsPos
	}),
	onRehydrateStorage: () => (state) => {
		if (state) {
			if (state.status === "running" && state.endsAt && state.endsAt <= Date.now()) {
				state.status = "done";
				state.remainingMs = 0;
				state.endsAt = null;
			}
			state.hasHydrated = true;
		} else useHalo.setState({ hasHydrated: true });
	}
}));
function HaloWidget({ preview = false, embedded = false, forceSize }) {
	const lang = useHalo((s) => s.lang);
	const shape = useHalo((s) => s.shape);
	const themeId = useHalo((s) => s.themeId);
	const size = useHalo((s) => s.size);
	const opacity = useHalo((s) => s.opacity);
	const thickness = useHalo((s) => s.thickness);
	const glass = useHalo((s) => s.glass);
	const showSeconds = useHalo((s) => s.showSeconds);
	const showLabel = useHalo((s) => s.showLabel);
	const showProgress = useHalo((s) => s.showProgress);
	const customLabel = useHalo((s) => s.label);
	const status = useHalo((s) => s.status);
	const durationMs = useHalo((s) => s.durationMs);
	const remainingMs = useHalo((s) => s.remainingMs);
	const endsAt = useHalo((s) => s.endsAt);
	const widgetPos = useHalo((s) => s.widgetPos);
	const alwaysOnTop = useHalo((s) => s.alwaysOnTop);
	const widgetFocus = useHalo((s) => s.widgetFocus);
	const pipActive = useHalo((s) => s.pipActive);
	const pause = useHalo((s) => s.pause);
	const resume = useHalo((s) => s.resume);
	const reset = useHalo((s) => s.reset);
	const start = useHalo((s) => s.start);
	const again = useHalo((s) => s.again);
	const setSettingsOpen = useHalo((s) => s.setSettingsOpen);
	const setSettingsTab = useHalo((s) => s.setSettingsTab);
	const setWidgetPos = useHalo((s) => s.setWidgetPos);
	const setWidgetFocus = useHalo((s) => s.setWidgetFocus);
	const finish = useHalo((s) => s.finish);
	const [now, setNow] = (0, import_react.useState)(() => Date.now());
	const [fit, setFit] = (0, import_react.useState)(size);
	(0, import_react.useEffect)(() => {
		if (status !== "running") return;
		const id = window.setInterval(() => setNow(Date.now()), 80);
		return () => window.clearInterval(id);
	}, [status]);
	(0, import_react.useEffect)(() => {
		const apply = () => setFit(Math.min(forceSize ?? size, Math.max(140, window.innerWidth - 40)));
		apply();
		window.addEventListener("resize", apply);
		return () => window.removeEventListener("resize", apply);
	}, [size, forceSize]);
	const remaining = (0, import_react.useMemo)(() => {
		if (status === "running" && endsAt) return Math.max(0, endsAt - now);
		if (status === "done") return 0;
		return remainingMs;
	}, [
		status,
		endsAt,
		now,
		remainingMs
	]);
	(0, import_react.useEffect)(() => {
		if (status === "running" && remaining <= 0) finish();
	}, [
		status,
		remaining,
		finish
	]);
	const progress = durationMs > 0 ? remaining / durationMs : 0;
	const timeText = formatRemaining(remaining, showSeconds);
	const statusLabel = customLabel.trim() || t(lang, status === "done" ? "done" : status === "paused" ? "paused" : "counting");
	const drag = useDrag(widgetPos, setWidgetPos);
	const z = alwaysOnTop ? 50 : widgetFocus ? 40 : 24;
	if (pipActive && !preview && !embedded) return null;
	const floating = !preview && !embedded;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: cn("halo-float", !floating && "halo-float-preview", status === "done" && "halo-float-done"),
		style: floating ? {
			left: `${widgetPos.x * 100}%`,
			top: `${widgetPos.y * 100}%`,
			zIndex: z,
			opacity
		} : { opacity },
		"data-halo-theme": themeId,
		"data-halo-glass": glass ? "true" : "false",
		onPointerDown: (e) => {
			if (!floating) return;
			setWidgetFocus(true);
			drag.onPointerDown(e);
		},
		onPointerMove: floating ? drag.onPointerMove : void 0,
		onPointerUp: floating ? drag.onPointerUp : void 0,
		onPointerCancel: floating ? drag.onPointerUp : void 0,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(WidgetFace, {
			shape,
			size: preview ? forceSize ?? 72 : fit,
			thickness: preview ? Math.max(6, thickness * .7) : thickness,
			progress,
			timeText,
			label: statusLabel,
			showLabel,
			showProgress,
			glass,
			done: status === "done",
			compact: preview
		}), preview ? null : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "halo-controls",
			"data-no-drag": true,
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					className: "halo-ctrl",
					"aria-label": status === "running" ? t(lang, "pause") : t(lang, "start"),
					onClick: () => {
						if (status === "running") pause();
						else if (status === "paused") resume();
						else if (status === "done") again();
						else start();
					},
					children: status === "running" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pause, {}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Play, {})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					className: "halo-ctrl",
					"aria-label": t(lang, "reset"),
					onClick: () => reset(),
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RotateCcw, {})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					className: "halo-ctrl",
					"aria-label": t(lang, "settings"),
					onClick: () => {
						setSettingsTab("timer");
						setSettingsOpen(true);
						useHalo.getState().setFocusMode(false);
					},
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Settings2, {})
				})
			]
		})]
	});
}
var pipRoot = null;
async function openHaloPip(size) {
	const dip = window.documentPictureInPicture;
	if (!dip) return false;
	const pip = await dip.requestWindow({
		width: Math.max(220, Math.round(size + 48)),
		height: Math.max(220, Math.round(size + 80))
	});
	for (const node of document.querySelectorAll("style, link[rel='stylesheet']")) pip.document.head.appendChild(node.cloneNode(true));
	pip.document.body.style.margin = "0";
	pip.document.body.style.background = "transparent";
	pip.document.documentElement.style.background = "transparent";
	pip.document.body.style.display = "grid";
	pip.document.body.style.placeItems = "center";
	pip.document.body.style.minHeight = "100vh";
	pip.document.body.style.overflow = "hidden";
	const mount = pip.document.createElement("div");
	pip.document.body.appendChild(mount);
	pipRoot = (0, import_client.createRoot)(mount);
	pipRoot.render((0, import_react.createElement)(HaloWidget, { embedded: true }));
	useHalo.getState().setPipActive(true);
	pip.addEventListener("pagehide", () => {
		pipRoot?.unmount();
		pipRoot = null;
		useHalo.getState().setPipActive(false);
	});
	return true;
}
var THEMES = [
	{
		id: "aurora",
		zh: "极光",
		en: "Aurora"
	},
	{
		id: "ice",
		zh: "冰河",
		en: "Ice"
	},
	{
		id: "ember",
		zh: "余烬",
		en: "Ember"
	},
	{
		id: "ink",
		zh: "墨白",
		en: "Ink"
	},
	{
		id: "tide",
		zh: "潮汐",
		en: "Tide"
	},
	{
		id: "moss",
		zh: "苔原",
		en: "Moss"
	}
];
var SHAPES = [
	"ring",
	"pill",
	"minimal",
	"card"
];
var PRESETS = [
	{
		id: "pomodoro",
		minutes: 25,
		key: "pomodoro"
	},
	{
		id: "shortBreak",
		minutes: 5,
		key: "shortBreak"
	},
	{
		id: "focus",
		minutes: 15,
		key: "focus"
	},
	{
		id: "deep",
		minutes: 45,
		key: "deep"
	},
	{
		id: "hour",
		minutes: 60,
		key: "hour"
	},
	{
		id: "longFocus",
		minutes: 90,
		key: "longFocus"
	}
];
var TABS = [
	{
		id: "timer",
		icon: Clock3,
		key: "timer"
	},
	{
		id: "look",
		icon: Palette,
		key: "look"
	},
	{
		id: "display",
		icon: Monitor,
		key: "display"
	},
	{
		id: "about",
		icon: Info,
		key: "about"
	}
];
function SettingsWindow() {
	const lang = useHalo((s) => s.lang);
	const open = useHalo((s) => s.settingsOpen);
	const focusMode = useHalo((s) => s.focusMode);
	const tab = useHalo((s) => s.settingsTab);
	const pos = useHalo((s) => s.settingsPos);
	const alwaysOnTop = useHalo((s) => s.alwaysOnTop);
	const widgetFocus = useHalo((s) => s.widgetFocus);
	const os = useHalo((s) => s.os);
	const setOpen = useHalo((s) => s.setSettingsOpen);
	const setTab = useHalo((s) => s.setSettingsTab);
	const setPos = useHalo((s) => s.setSettingsPos);
	const setWidgetFocus = useHalo((s) => s.setWidgetFocus);
	const drag = useDrag(pos, setPos);
	if (!open || focusMode) return null;
	const z = alwaysOnTop && widgetFocus ? 30 : 42;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "halo-settings",
		style: {
			left: `${pos.x * 100}%`,
			top: `${pos.y * 100}%`,
			zIndex: z
		},
		onPointerDown: () => setWidgetFocus(false),
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
			className: "halo-settings-bar",
			onPointerDown: drag.onPointerDown,
			onPointerMove: drag.onPointerMove,
			onPointerUp: drag.onPointerUp,
			children: [
				os === "mac" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "halo-traffic",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							className: "halo-traffic-btn halo-traffic-close",
							"aria-label": t(lang, "close"),
							"data-no-drag": true,
							onClick: () => setOpen(false)
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "halo-traffic-btn halo-traffic-min" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "halo-traffic-btn halo-traffic-max" })
					]
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "halo-win-mark",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HaloMark, { className: "size-3.5" })
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "halo-settings-title",
					children: t(lang, "settings")
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					className: "halo-settings-x",
					"aria-label": t(lang, "close"),
					"data-no-drag": true,
					onClick: () => setOpen(false),
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "size-3.5" })
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "halo-settings-body",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
				className: "halo-settings-nav",
				"aria-label": t(lang, "settings"),
				children: TABS.map((item) => {
					const Icon = item.icon;
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						className: cn("halo-nav-btn", tab === item.id && "halo-nav-btn-active"),
						onClick: () => setTab(item.id),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "size-4" }), t(lang, item.key)]
					}, item.id);
				})
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "halo-settings-content",
				children: [
					tab === "timer" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TimerPanel, {}) : null,
					tab === "look" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LookPanel, {}) : null,
					tab === "display" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DisplayPanel, {}) : null,
					tab === "about" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AboutPanel, {}) : null
				]
			})]
		})]
	});
}
function TimerPanel() {
	const lang = useHalo((s) => s.lang);
	const status = useHalo((s) => s.status);
	const durationMs = useHalo((s) => s.durationMs);
	const remainingMs = useHalo((s) => s.remainingMs);
	const endsAt = useHalo((s) => s.endsAt);
	const showSeconds = useHalo((s) => s.showSeconds);
	const customLabel = useHalo((s) => s.label);
	const setLabel = useHalo((s) => s.setLabel);
	const start = useHalo((s) => s.start);
	const pause = useHalo((s) => s.pause);
	const resume = useHalo((s) => s.resume);
	const reset = useHalo((s) => s.reset);
	const again = useHalo((s) => s.again);
	const [now, setNow] = (0, import_react.useState)(() => Date.now());
	const [hours, setHours] = (0, import_react.useState)(0);
	const [mins, setMins] = (0, import_react.useState)(25);
	const [secs, setSecs] = (0, import_react.useState)(0);
	const [until, setUntil] = (0, import_react.useState)("18:00");
	(0, import_react.useEffect)(() => {
		if (status !== "running") return;
		const id = window.setInterval(() => setNow(Date.now()), 200);
		return () => window.clearInterval(id);
	}, [status]);
	const remaining = status === "running" && endsAt ? Math.max(0, endsAt - now) : status === "done" ? 0 : remainingMs;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "halo-panel",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "halo-big-time tabular-nums font-display",
				children: formatRemaining(remaining, showSeconds)
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "halo-big-sub",
				children: status === "done" ? t(lang, "done") : `${t(lang, "total")} · ${formatRemaining(durationMs, false)}`
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "halo-row",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					onClick: () => {
						if (status === "running") pause();
						else if (status === "paused") resume();
						else if (status === "done") again();
						else start();
						if (status !== "running") toast(t(lang, "started"));
					},
					children: status === "running" ? t(lang, "pause") : status === "paused" ? t(lang, "resume") : status === "done" ? t(lang, "again") : t(lang, "start")
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					variant: "secondary",
					onClick: () => reset(),
					children: t(lang, "reset")
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: t(lang, "eventName") }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
				value: customLabel,
				placeholder: t(lang, "eventPlaceholder"),
				onChange: (e) => setLabel(e.target.value),
				maxLength: 24
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: t(lang, "presets") }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "halo-preset-grid",
				children: PRESETS.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					className: "halo-chip",
					onClick: () => {
						start(p.minutes * 60 * 1e3);
						toast(`${t(lang, "started")} · ${t(lang, p.key)}`);
					},
					children: t(lang, p.key)
				}, p.id))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: t(lang, "custom") }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "halo-duration",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(NumberField, {
						label: t(lang, "hours"),
						value: hours,
						max: 23,
						onChange: setHours
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(NumberField, {
						label: t(lang, "minutes"),
						value: mins,
						max: 59,
						onChange: setMins
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(NumberField, {
						label: t(lang, "seconds"),
						value: secs,
						max: 59,
						onChange: setSecs
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				variant: "outline",
				onClick: () => {
					const ms = (hours * 3600 + mins * 60 + secs) * 1e3 || 1e3;
					start(ms);
					toast(t(lang, "started"));
				},
				children: t(lang, "apply")
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
				htmlFor: "halo-until",
				children: t(lang, "until")
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "halo-row",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
					id: "halo-until",
					type: "time",
					value: until,
					onChange: (e) => setUntil(e.target.value)
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					variant: "secondary",
					onClick: () => {
						const [h, m] = until.split(":").map(Number);
						const d = /* @__PURE__ */ new Date();
						d.setHours(h || 0, m || 0, 0, 0);
						if (d.getTime() <= Date.now()) d.setDate(d.getDate() + 1);
						start(d.getTime() - Date.now());
						toast(t(lang, "started"));
					},
					children: t(lang, "apply")
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "halo-hint",
				children: t(lang, "targetHint")
			})
		]
	});
}
function NumberField({ label, value, max, onChange }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
		className: "halo-num",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: label }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
			type: "number",
			min: 0,
			max,
			value,
			onChange: (e) => onChange(Math.max(0, Math.min(max, Number(e.target.value) || 0)))
		})]
	});
}
function LookPanel() {
	const lang = useHalo((s) => s.lang);
	const shape = useHalo((s) => s.shape);
	const themeId = useHalo((s) => s.themeId);
	const size = useHalo((s) => s.size);
	const thickness = useHalo((s) => s.thickness);
	const opacity = useHalo((s) => s.opacity);
	const glass = useHalo((s) => s.glass);
	const setShape = useHalo((s) => s.setShape);
	const setTheme = useHalo((s) => s.setTheme);
	const setSize = useHalo((s) => s.setSize);
	const setThickness = useHalo((s) => s.setThickness);
	const setOpacity = useHalo((s) => s.setOpacity);
	const setGlass = useHalo((s) => s.setGlass);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "halo-panel",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: t(lang, "shape") }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "halo-shape-grid",
				children: SHAPES.map((id) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					type: "button",
					className: cn("halo-shape-card", shape === id && "is-active"),
					"data-halo-theme": themeId,
					onClick: () => setShape(id),
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: cn("halo-shape-icon", `is-${id}`),
						"aria-hidden": true
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: t(lang, id === "ring" ? "shapeRing" : id === "pill" ? "shapePill" : id === "minimal" ? "shapeMinimal" : "shapeCard") })]
				}, id))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: t(lang, "theme") }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "halo-theme-grid",
				children: THEMES.map((theme) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					type: "button",
					className: cn("halo-theme-swatch", themeId === theme.id && "is-active"),
					"data-halo-theme": theme.id,
					onClick: () => setTheme(theme.id),
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "halo-theme-ring" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: lang === "zh" ? theme.zh : theme.en })]
				}, theme.id))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "halo-slider-row",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Label, { children: [
					t(lang, "size"),
					" · ",
					size
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Slider, {
					min: 140,
					max: 320,
					step: 4,
					value: [size],
					onValueChange: (v) => setSize(v[0] ?? size)
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "halo-slider-row",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Label, { children: [
					t(lang, "thickness"),
					" · ",
					thickness
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Slider, {
					min: 6,
					max: 18,
					step: 1,
					value: [thickness],
					onValueChange: (v) => setThickness(v[0] ?? thickness)
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "halo-slider-row",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Label, { children: [
					t(lang, "opacity"),
					" · ",
					Math.round(opacity * 100),
					"%"
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Slider, {
					min: .55,
					max: 1,
					step: .01,
					value: [opacity],
					onValueChange: (v) => setOpacity(v[0] ?? opacity)
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ToggleRow, {
				label: t(lang, "glass"),
				checked: glass,
				onCheckedChange: setGlass
			})
		]
	});
}
function DisplayPanel() {
	const lang = useHalo((s) => s.lang);
	const os = useHalo((s) => s.os);
	const showSeconds = useHalo((s) => s.showSeconds);
	const showLabel = useHalo((s) => s.showLabel);
	const showProgress = useHalo((s) => s.showProgress);
	const sound = useHalo((s) => s.sound);
	const alwaysOnTop = useHalo((s) => s.alwaysOnTop);
	const setLang = useHalo((s) => s.setLang);
	const setOs = useHalo((s) => s.setOs);
	const setShowSeconds = useHalo((s) => s.setShowSeconds);
	const setShowLabel = useHalo((s) => s.setShowLabel);
	const setShowProgress = useHalo((s) => s.setShowProgress);
	const setSound = useHalo((s) => s.setSound);
	const setAlwaysOnTop = useHalo((s) => s.setAlwaysOnTop);
	const setFocusMode = useHalo((s) => s.setFocusMode);
	const size = useHalo((s) => s.size);
	async function popOut() {
		try {
			if (!await openHaloPip(size)) {
				setFocusMode(true);
				toast(t(lang, "pipUnsupported"));
			} else setFocusMode(true);
		} catch {
			setFocusMode(true);
			toast(t(lang, "pipUnsupported"));
		}
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "halo-panel",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: t(lang, "language") }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "halo-seg",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					className: cn("halo-seg-btn", lang === "zh" && "is-active"),
					onClick: () => setLang("zh"),
					children: "中文"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					className: cn("halo-seg-btn", lang === "en" && "is-active"),
					onClick: () => setLang("en"),
					children: "English"
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: t(lang, "desktop") }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "halo-seg",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					className: cn("halo-seg-btn", os === "mac" && "is-active"),
					onClick: () => setOs("mac"),
					children: t(lang, "mac")
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					className: cn("halo-seg-btn", os === "windows" && "is-active"),
					onClick: () => setOs("windows"),
					children: t(lang, "windows")
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ToggleRow, {
				label: t(lang, "showSeconds"),
				checked: showSeconds,
				onCheckedChange: setShowSeconds
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ToggleRow, {
				label: t(lang, "showLabel"),
				checked: showLabel,
				onCheckedChange: setShowLabel
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ToggleRow, {
				label: t(lang, "showProgress"),
				checked: showProgress,
				onCheckedChange: setShowProgress
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ToggleRow, {
				label: t(lang, "sound"),
				checked: sound,
				onCheckedChange: (v) => {
					setSound(v);
					if (v) playChime();
				}
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ToggleRow, {
				label: t(lang, "alwaysOnTop"),
				checked: alwaysOnTop,
				onCheckedChange: setAlwaysOnTop
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "halo-row halo-row-top",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					variant: "secondary",
					onClick: () => setFocusMode(true),
					children: t(lang, "focusMode")
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
					variant: "outline",
					onClick: () => void popOut(),
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PictureInPicture2, {}), t(lang, "popOut")]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "halo-hint",
				children: t(lang, "popOutHint")
			})
		]
	});
}
function AboutPanel() {
	const lang = useHalo((s) => s.lang);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "halo-panel halo-about",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(HaloMark, { className: "size-12" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "font-display text-lg font-medium tracking-tight",
				children: t(lang, "appName")
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm text-fg-muted",
				children: t(lang, "appTag")
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm leading-relaxed text-pretty text-fg-muted",
				children: t(lang, "aboutBody")
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "halo-hint",
				children: t(lang, "aboutHint")
			})
		]
	});
}
function ToggleRow({ label, checked, onCheckedChange }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "halo-toggle",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: label }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Switch, {
			checked,
			onCheckedChange
		})]
	});
}
function DesktopShell() {
	const lang = useHalo((s) => s.lang);
	const os = useHalo((s) => s.os);
	const focusMode = useHalo((s) => s.focusMode);
	const status = useHalo((s) => s.status);
	const sound = useHalo((s) => s.sound);
	const hasHydrated = useHalo((s) => s.hasHydrated);
	const start = useHalo((s) => s.start);
	const pause = useHalo((s) => s.pause);
	const resume = useHalo((s) => s.resume);
	const reset = useHalo((s) => s.reset);
	const settingsOpen = useHalo((s) => s.settingsOpen);
	const setSettingsOpen = useHalo((s) => s.setSettingsOpen);
	const setFocusMode = useHalo((s) => s.setFocusMode);
	const setLang = useHalo((s) => s.setLang);
	const setOs = useHalo((s) => s.setOs);
	const [clock, setClock] = (0, import_react.useState)(() => formatClock(/* @__PURE__ */ new Date()));
	const didAutostart = (0, import_react.useRef)(false);
	(0, import_react.useEffect)(() => {
		document.documentElement.lang = lang;
	}, [lang]);
	(0, import_react.useEffect)(() => {
		const id = window.setInterval(() => setClock(formatClock(/* @__PURE__ */ new Date())), 1e3);
		return () => window.clearInterval(id);
	}, []);
	(0, import_react.useEffect)(() => {
		if (!hasHydrated) {
			const unsub = useHalo.persist.onFinishHydration(() => {
				useHalo.setState({ hasHydrated: true });
			});
			if (useHalo.persist.hasHydrated()) useHalo.setState({ hasHydrated: true });
			return unsub;
		}
		if (didAutostart.current) return;
		didAutostart.current = true;
		if (useHalo.getState().status === "idle") start();
	}, [hasHydrated, start]);
	(0, import_react.useEffect)(() => {
		if (status !== "done") return;
		if (sound) playChime();
		toast(t(lang, "timeUp"));
	}, [
		status,
		sound,
		lang
	]);
	(0, import_react.useEffect)(() => {
		function onKey(e) {
			const tag = e.target?.tagName;
			if (tag === "INPUT" || tag === "TEXTAREA" || tag === "SELECT") return;
			if (e.key === " " || e.code === "Space") {
				e.preventDefault();
				const s = useHalo.getState();
				if (s.status === "running") s.pause();
				else if (s.status === "paused") s.resume();
				else if (s.status === "done") s.again();
				else s.start();
			} else if (e.key === "r" || e.key === "R") reset();
			else if (e.key === "s" || e.key === "S") {
				setFocusMode(false);
				setSettingsOpen(!useHalo.getState().settingsOpen);
			} else if (e.key === "f" || e.key === "F") setFocusMode(!useHalo.getState().focusMode);
			else if (e.key === "Escape") {
				if (useHalo.getState().focusMode) setFocusMode(false);
				else setSettingsOpen(false);
			}
		}
		window.addEventListener("keydown", onKey);
		return () => window.removeEventListener("keydown", onKey);
	}, [
		pause,
		resume,
		reset,
		setSettingsOpen,
		setFocusMode
	]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: cn("halo-desktop", os === "windows" && "is-windows"),
		"data-os": os,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "halo-wallpaper",
				"aria-hidden": true,
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
					src: os === "mac" ? "/wallpaper-mac.jpg" : "/wallpaper-win.jpg",
					alt: "",
					className: "halo-wallpaper-img"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "halo-grain" })]
			}),
			os === "mac" && !focusMode ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MacBar, {
				clock,
				lang,
				onToggleLang: () => setLang(lang === "zh" ? "en" : "zh"),
				onToggleOs: () => setOs("windows"),
				onOpenSettings: () => {
					setFocusMode(false);
					setSettingsOpen(true);
				}
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "halo-stage",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(HaloWidget, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SettingsWindow, {})]
			}),
			focusMode ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				className: "halo-exit-focus",
				onClick: () => setFocusMode(false),
				children: t(lang, "exitFocus")
			}) : null,
			os === "mac" && !focusMode ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MacDock, {
				settingsOpen,
				onOpenSettings: () => setSettingsOpen(true),
				onFocus: () => setFocusMode(true)
			}) : null,
			os === "windows" && !focusMode ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(WinBar, {
				clock,
				lang,
				onToggleLang: () => setLang(lang === "zh" ? "en" : "zh"),
				onToggleOs: () => setOs("mac"),
				onOpenSettings: () => {
					setFocusMode(false);
					setSettingsOpen(true);
				}
			}) : null
		]
	});
}
function MacBar({ clock, lang, onToggleLang, onToggleOs, onOpenSettings }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
		className: "halo-menubar",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "halo-menubar-left",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(HaloMark, { className: "size-4" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					className: "halo-menu-strong",
					onClick: onOpenSettings,
					children: t(lang, "appName")
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					className: "halo-menu-item",
					onClick: onOpenSettings,
					children: t(lang, "timer")
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					className: "halo-menu-item",
					onClick: onOpenSettings,
					children: t(lang, "menuView")
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "halo-menubar-right",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					className: "halo-menu-item",
					onClick: onToggleOs,
					children: t(lang, "windows")
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					className: "halo-menu-item",
					onClick: onToggleLang,
					children: lang === "zh" ? "EN" : "中"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Wifi, { className: "size-3.5 opacity-80" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "tabular-nums",
					children: clock
				})
			]
		})]
	});
}
function MacDock({ settingsOpen, onOpenSettings, onFocus }) {
	const lang = useHalo((s) => s.lang);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("nav", {
		className: "halo-dock",
		"aria-label": "Dock",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
			type: "button",
			className: "halo-dock-item is-live",
			onClick: onFocus,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HaloMark, { className: "size-7" })
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
			type: "button",
			className: cn("halo-dock-item", settingsOpen && "is-live"),
			onClick: onOpenSettings,
			"aria-label": t(lang, "settings"),
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "halo-dock-gear" })
		})]
	});
}
function WinBar({ clock, lang, onToggleLang, onToggleOs, onOpenSettings }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("footer", {
		className: "halo-taskbar",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "halo-taskbar-cluster",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					className: "halo-taskbar-start",
					onClick: onOpenSettings,
					"aria-label": t(lang, "appName"),
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HaloMark, { className: "size-5" })
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					type: "button",
					className: "halo-taskbar-search",
					onClick: onOpenSettings,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "size-3.5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: t(lang, "search") })]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					className: "halo-taskbar-pin is-live",
					onClick: onOpenSettings,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HaloMark, { className: "size-5" })
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "halo-taskbar-tray",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					className: "halo-menu-item",
					onClick: onToggleOs,
					children: t(lang, "mac")
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					className: "halo-menu-item",
					onClick: onToggleLang,
					children: lang === "zh" ? "EN" : "中"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Wifi, { className: "size-3.5 opacity-80" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Battery, { className: "size-3.5 opacity-80" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "tabular-nums",
					children: clock
				})
			]
		})]
	});
}
function Home() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DesktopShell, {});
}
//#endregion
export { Home as component };
