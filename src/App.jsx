import React, { useEffect, useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";
import Hls from "hls.js";
import sanaLogo from "./assets/sana-logo.png";
import voiceMp3 from "./assets/voice.mp3";
import {
  BookOpen,
  Building2,
  Crown,
  ExternalLink,
  Eye,
  Globe,
  Headphones,
  HeartHandshake,
  Languages,
  Layers3,
  Link2,
  Mail,
  MapPin,
  Menu,
  MessageCircle,
  Mic2,
  MonitorPlay,
  Pause,
  Play,
  Radio,
  RotateCcw,
  Send,
  ShieldCheck,
  SkipBack,
  SkipForward,
  Sparkles,
  Stars,
  Target,
  Users,
  Volume2,
} from "lucide-react";

const ACCENT = "#F3E7B3";
const CTA_DARK = "#0A2A24";

const OUTER_GRADIENT =
  "bg-[linear-gradient(135deg,rgba(28,63,56,0.90)_0%,rgba(49,69,59,0.88)_50%,rgba(72,78,43,0.82)_100%)]";
const INNER_GRADIENT =
  "bg-[linear-gradient(135deg,rgba(10,28,24,0.92)_0%,rgba(14,36,31,0.86)_100%)]";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.75, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] },
  }),
};

const pulseGlow = {
  opacity: [0.3, 0.65, 0.3],
  scale: [1, 1.06, 1],
  transition: { duration: 5, repeat: Infinity, ease: "easeInOut" },
};

const containerClass =
  "relative z-10 mx-auto max-w-[1680px] px-4 sm:px-6 lg:px-10 xl:px-14";
const glass =
  "border border-white/10 bg-white/10 backdrop-blur-2xl shadow-[0_12px_40px_rgba(0,0,0,0.18)]";
const softCard = `rounded-[2rem] ${glass}`;
const gradientOuterCard = `rounded-[2rem] border border-white/10 ${OUTER_GRADIENT} backdrop-blur-2xl shadow-[0_12px_40px_rgba(0,0,0,0.18)]`;

const navItems = [
  { label: "من نحن", href: "#about" },
  { label: "المميزات", href: "#features" },
  { label: "أعمالنا", href: "#portfolio" },
  { label: "شركاء النجاح", href: "#partners" },
  { label: "تواصل معنا", href: "#contact" },
];

const stats = [
  { value: "+100", label: "لغة عالمية مستهدفة" },
  { value: "24/7", label: "وصول عالمي مستمر" },
  { value: "114", label: "سورة كاملة" },
  { value: "HQ", label: "جودة صوت وصورة عالية" },
];

const heroCards = [
  { value: "114", label: "سورة كاملة" },
  { value: "30", label: "جزءًا من القرآن" },
  { value: "متقن", label: "عرض سمعي بصري" },
];

const heroBadges = [
  { icon: Sparkles, title: "نور وجمال القرآن" },
  { icon: Globe, title: "رسالة إلى العالم" },
];

const identityCards = [
  {
    icon: Users,
    title: "من نحن",
    text: "سنا مشروع وقفي يهدف إلى نشر معاني القرآن الكريم إلى العالم، عبر قنوات صوتية ومرئية تجمع بين التلاوة العذبة والترجمة الدقيقة، لنقدم تجربة إيمانية متكاملة تُقرب كلام الله إلى القلوب بمختلف لغات العالم.",
  },
  {
    icon: Eye,
    title: "الرؤية",
    text: "أن نكون منصة عالمية رائدة في إيصال معاني القرآن الكريم إلى كل إنسان بلغته، بأسلوب عصري يجمع بين الجمال والإتقان والتقنية الحديثة.",
  },
  {
    icon: Target,
    title: "الرسالة",
    text: "تقديم محتوى قرآني صوتي ومرئي مترجم، يتيح فهم معاني القرآن الكريم بوضوح وسهولة، ويساهم في نشر الهداية وتعريف العالم بكلام الله بأسلوب مؤثر وجذاب.",
  },
];

const features = [
  {
    icon: Languages,
    title: "ترجمات متعددة اللغات",
    desc: "إيصال معاني القرآن الكريم إلى الشعوب بلغاتهم، بأسلوب واضح ودقيق يراعي المعنى والرسالة.",
  },
  {
    icon: Headphones,
    title: "تجربة سمعية وبصرية متكاملة",
    desc: "قنوات تجمع بين التلاوة المؤثرة والنص المترجم في تجربة هادئة تليق بجلال القرآن الكريم.",
  },
  {
    icon: Globe,
    title: "انتشار عالمي مستمر",
    desc: "حضور رقمي وفضائي يفتح أبواب الوصول إلى مختلف القارات والمنصات على مدار الساعة.",
  },
  {
    icon: HeartHandshake,
    title: "وقف لله تعالى",
    desc: "رسالة دعوية عالمية يشارك في أجرها كل من يساهم في نشرها أو دعمها أو ينتفع بها.",
  },
];

const channels = [
  {
    icon: Radio,
    title: "القنوات الفضائية والإذاعية",
    desc: "نشر معاني القرآن الكريم عبر قنوات صوتية ومرئية تصل إلى مختلف الشعوب بلغاتها.",
  },
  {
    icon: MonitorPlay,
    title: "منصات التواصل الاجتماعي والمواقع الإلكترونية",
    desc: "حضور رقمي متجدد يسهّل الوصول إلى المحتوى القرآني ونشره على نطاق واسع.",
  },
  {
    icon: Layers3,
    title: "تطبيقات ووسائط رقمية متنوعة",
    desc: "تجربة حديثة ومتنوعة تتيح متابعة المحتوى القرآني بأساليب تناسب مختلف الأجهزة والمنصات.",
  },
];

const partners = [
  {
    icon: ShieldCheck,
    title: "الهيئات الشرعية والمؤسسات الإسلامية",
    desc: "التي ساهمت في تقديم ترجمات معتمدة لمعاني القرآن الكريم، بما يضمن الدقة والتأصيل الشرعي.",
  },
  {
    icon: Mic2,
    title: "القرّاء المؤثرون ذوو الأصوات الندية",
    desc: "الذين أثروا المشروع بتلاوات خاشعة ومؤثرة، تصل إلى القلوب بأسلوب محبب وجذاب.",
  },
  {
    icon: Headphones,
    title: "شركات الإنتاج الصوتي والتقني",
    desc: "التي وفّرت تسجيلات عالية الجودة ومعالجة صوتية وبصرية احترافية.",
  },
  {
    icon: Users,
    title: "المنتجون والمتطوعون",
    desc: "الذين ساهموا في تطوير المحتوى ونشره، ليصل إلى أكبر شريحة ممكنة حول العالم.",
  },
];

const impactCards = [
  {
    icon: Globe,
    title: "وصول عالمي",
    desc: "وصلت رسالة القرآن الكريم إلى بيوت في مختلف دول العالم، بلغات متعددة تُخاطب الناس بلغتهم الأم.",
  },
  {
    icon: Languages,
    title: "ترجمات موثوقة",
    desc: "تم توفير ترجمات دقيقة لمعاني القرآن الكريم بإشراف جهات علمية موثوقة لضمان صحة المعنى.",
  },
  {
    icon: Headphones,
    title: "تجربة متكاملة",
    desc: "محتوى يجمع بين التلاوة الخاشعة والترجمة المرئية ليمنح تجربة إيمانية مؤثرة وسهلة الفهم.",
  },
  {
    icon: Send,
    title: "رسالة ممتدة",
    desc: "يساهم المشروع في نشر الهداية وتعريف العالم بكلام الله بأسلوب عصري يصل إلى مختلف الفئات.",
  },
];

const portfolioVideos = [
  { hls: "/videos/v1/master.m3u8", fallback: "/videos/v1.mp4" },
  { hls: "/videos/v2/master.m3u8", fallback: "/videos/v2.mp4" },
  { hls: "/videos/v3/master.m3u8", fallback: "/videos/v3.mp4" },
];

function sectionBadge(icon, text, textColor = "text-white") {
  const Icon = icon;
  return (
    <div
      className={`inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/10 px-5 py-3 text-sm font-semibold ${textColor} backdrop-blur-xl shadow-[0_10px_35px_rgba(0,0,0,0.18)]`}
    >
      <Icon className="h-5 w-5" style={{ color: ACCENT }} />
      {text}
    </div>
  );
}

function LargeSectionBadge({ icon: Icon, text }) {
  return (
    <div
      className="inline-flex items-center gap-4 rounded-full border border-white/10 bg-white/10 px-8 py-5 text-xl font-bold backdrop-blur-xl shadow-[0_12px_40px_rgba(0,0,0,0.2)] sm:px-10 sm:text-2xl"
      style={{ color: ACCENT }}
    >
      <Icon className="h-7 w-7 sm:h-8 sm:w-8" style={{ color: ACCENT }} />
      <span>{text}</span>
    </div>
  );
}

function AppStoreIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-5 w-5"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <rect x="4" y="4" width="16" height="16" rx="4" />
      <path d="M9 15.5 14.5 8" />
      <path d="M11 8h4" />
      <path d="M9.5 15.5H15" />
      <path d="M10.5 12h5" />
    </svg>
  );
}

function GooglePlayIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-5 w-5"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M5 4.5v15l8.8-7.5L5 4.5Z" />
      <path d="m13.8 12 3.6-3 1.6 1.1c1.2.8 1.2 2.1 0 2.9L17.4 14l-3.6-2Z" />
      <path d="m17.4 9-8.2-3.6" />
      <path d="m17.4 15-8.2 3.6" />
    </svg>
  );
}

function formatTime(seconds) {
  if (!Number.isFinite(seconds)) return "00:00";
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
}

function HeroAudioPlayer() {
  const audioRef = useRef(null);
  const blobUrlRef = useRef(null);
  const audioContextRef = useRef(null);
  const analyserRef = useRef(null);
  const sourceNodeRef = useRef(null);
  const animationFrameRef = useRef(null);
  const previousBarsRef = useRef([]);

  const BARS_COUNT = 64;
  const HALF_BARS = BARS_COUNT / 2;
  const MIN_BAR_HEIGHT = 10;
  const MAX_BAR_HEIGHT = 42;

  const idleBars = useMemo(() => {
    const half = Array.from({ length: HALF_BARS }, (_, i) => {
      const t = i / Math.max(1, HALF_BARS - 1);
      return Math.round(12 + t * 4);
    });

    return [...half.slice().reverse(), ...half];
  }, [HALF_BARS]);

  const [bars, setBars] = useState(idleBars);
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [muted, setMuted] = useState(false);

  useEffect(() => {
    previousBarsRef.current = idleBars;
    setBars(idleBars);
  }, [idleBars]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    let cancelled = false;

    const loadAudioAsBlob = async () => {
      try {
        const response = await fetch(voiceMp3, { cache: "force-cache" });
        const blob = await response.blob();
        if (cancelled) return;

        const objectUrl = URL.createObjectURL(blob);
        blobUrlRef.current = objectUrl;
        audio.src = objectUrl;
        audio.load();
      } catch {
        if (!cancelled) {
          audio.src = voiceMp3;
          audio.load();
        }
      }
    };

    loadAudioAsBlob();

    return () => {
      cancelled = true;
      if (blobUrlRef.current) {
        URL.revokeObjectURL(blobUrlRef.current);
        blobUrlRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const onLoaded = () => setDuration(audio.duration || 0);
    const onTime = () => setCurrentTime(audio.currentTime || 0);
    const onPlay = () => setIsPlaying(true);
    const onPause = () => setIsPlaying(false);
    const onEnded = () => {
      setIsPlaying(false);
      setCurrentTime(0);
      previousBarsRef.current = idleBars;
      setBars(idleBars);
    };

    audio.addEventListener("loadedmetadata", onLoaded);
    audio.addEventListener("timeupdate", onTime);
    audio.addEventListener("durationchange", onLoaded);
    audio.addEventListener("play", onPlay);
    audio.addEventListener("pause", onPause);
    audio.addEventListener("ended", onEnded);

    return () => {
      audio.removeEventListener("loadedmetadata", onLoaded);
      audio.removeEventListener("timeupdate", onTime);
      audio.removeEventListener("durationchange", onLoaded);
      audio.removeEventListener("play", onPlay);
      audio.removeEventListener("pause", onPause);
      audio.removeEventListener("ended", onEnded);
    };
  }, [idleBars]);

  useEffect(() => {
    if (!isPlaying) {
      previousBarsRef.current = idleBars;
      setBars(idleBars);

      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
        animationFrameRef.current = null;
      }
      return;
    }

    const analyser = analyserRef.current;
    if (!analyser) return;

    const bufferLength = analyser.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);

    const clamp = (value, min, max) => Math.max(min, Math.min(max, value));

    const animateBars = () => {
      analyser.getByteFrequencyData(dataArray);

      let total = 0;
      for (let i = 0; i < bufferLength; i += 1) total += dataArray[i];
      const globalEnergy = total / bufferLength / 255;

      const halfBars = Array.from({ length: HALF_BARS }, (_, index) => {
        const start = Math.floor((index / HALF_BARS) * bufferLength);
        const end = Math.floor(((index + 1) / HALF_BARS) * bufferLength);

        let localSum = 0;
        let count = 0;

        for (let i = start; i < end; i += 1) {
          localSum += dataArray[i];
          count += 1;
        }

        const localEnergy = count ? localSum / count / 255 : 0;
        const edgeBoost = 0.9 + (index / Math.max(1, HALF_BARS - 1)) * 0.18;

        const mixedEnergy =
          (localEnergy * 0.72 + globalEnergy * 0.28) * edgeBoost;

        const height =
          MIN_BAR_HEIGHT +
          mixedEnergy * (MAX_BAR_HEIGHT - MIN_BAR_HEIGHT);

        return clamp(height, MIN_BAR_HEIGHT, MAX_BAR_HEIGHT);
      });

      const smoothedHalfBars = halfBars.map((value, index, arr) => {
        const prev = arr[index - 1] ?? value;
        const next = arr[index + 1] ?? value;
        const prev2 = arr[index - 2] ?? prev;
        const next2 = arr[index + 2] ?? next;

        const smoothed =
          value * 0.46 +
          (prev + next) * 0.2 +
          (prev2 + next2) * 0.07;

        return clamp(smoothed, MIN_BAR_HEIGHT, MAX_BAR_HEIGHT);
      });

      const mirroredBars = [
        ...smoothedHalfBars.slice().reverse(),
        ...smoothedHalfBars,
      ];

      const animatedBars = mirroredBars.map((value, index) => {
        const previous = previousBarsRef.current[index] ?? idleBars[index];
        return Math.round(previous * 0.45 + value * 0.55);
      });

      previousBarsRef.current = animatedBars;
      setBars(animatedBars);
      animationFrameRef.current = requestAnimationFrame(animateBars);
    };

    animationFrameRef.current = requestAnimationFrame(animateBars);

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
        animationFrameRef.current = null;
      }
    };
  }, [HALF_BARS, MAX_BAR_HEIGHT, MIN_BAR_HEIGHT, idleBars, isPlaying]);

  useEffect(() => {
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      if (audioContextRef.current && audioContextRef.current.state !== "closed") {
        audioContextRef.current.close().catch(() => {});
      }
    };
  }, []);

  const setupAnalyser = async () => {
    const audio = audioRef.current;
    if (!audio) return;

    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    if (!AudioContextClass) return;

    if (!audioContextRef.current) {
      const context = new AudioContextClass();
      const analyser = context.createAnalyser();
      analyser.fftSize = 256;
      analyser.smoothingTimeConstant = 0.9;

      const source = context.createMediaElementSource(audio);
      source.connect(analyser);
      analyser.connect(context.destination);

      audioContextRef.current = context;
      analyserRef.current = analyser;
      sourceNodeRef.current = source;
    }

    if (audioContextRef.current?.state === "suspended") {
      await audioContextRef.current.resume().catch(() => {});
    }
  };

  const progress = useMemo(
    () => (duration ? (currentTime / duration) * 100 : 0),
    [currentTime, duration]
  );

  const togglePlay = async () => {
    const el = audioRef.current;
    if (!el) return;

    await setupAnalyser();

    if (el.paused) {
      el.play().catch(() => {});
    } else {
      el.pause();
    }
  };

  const seekBy = (delta) => {
    const el = audioRef.current;
    if (!el) return;
    el.currentTime = Math.max(
      0,
      Math.min(el.duration || 0, (el.currentTime || 0) + delta)
    );
  };

  const replay = async () => {
    const el = audioRef.current;
    if (!el) return;
    await setupAnalyser();
    el.currentTime = 0;
    el.play().catch(() => {});
  };

  const toggleMute = () => {
    const el = audioRef.current;
    if (!el) return;
    el.muted = !el.muted;
    setMuted(el.muted);
  };

  const handleSeek = (event) => {
    const el = audioRef.current;
    if (!el) return;
    const next = Number(event.target.value);
    el.currentTime = next;
    setCurrentTime(next);
  };

  return (
    <div className="mt-5 rounded-[1.45rem] border border-white/10 bg-[#081512]/60 p-4">
      <audio
        ref={audioRef}
        preload="metadata"
        onContextMenu={(e) => e.preventDefault()}
      />

      <div className="mb-4 flex h-20 items-end gap-[3px] overflow-hidden rounded-2xl border border-white/10 bg-black/10 px-2 py-3">
        {bars.map((height, index) => (
          <motion.div
            key={index}
            animate={{ height }}
            transition={{ duration: 0.14, ease: "easeOut" }}
            className="flex-1 self-end rounded-full bg-gradient-to-t from-emerald-300 via-yellow-100 to-emerald-200 opacity-95"
            style={{ maxHeight: `${MAX_BAR_HEIGHT}px` }}
          />
        ))}
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <button
          type="button"
          onClick={togglePlay}
          className="flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-white transition hover:bg-white/10"
          aria-label={isPlaying ? "إيقاف مؤقت" : "تشغيل"}
        >
          {isPlaying ? (
            <Pause className="h-5 w-5" style={{ color: ACCENT }} />
          ) : (
            <Play className="h-5 w-5" style={{ color: ACCENT }} />
          )}
        </button>

        <button
          type="button"
          onClick={() => seekBy(-10)}
          className="flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-white transition hover:bg-white/10"
          aria-label="تأخير"
        >
          <SkipBack className="h-5 w-5" style={{ color: ACCENT }} />
        </button>

        <button
          type="button"
          onClick={replay}
          className="flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-white transition hover:bg-white/10"
          aria-label="إعادة التشغيل"
        >
          <RotateCcw className="h-5 w-5" style={{ color: ACCENT }} />
        </button>

        <button
          type="button"
          onClick={() => seekBy(10)}
          className="flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-white transition hover:bg-white/10"
          aria-label="تقديم"
        >
          <SkipForward className="h-5 w-5" style={{ color: ACCENT }} />
        </button>

        <button
          type="button"
          onClick={toggleMute}
          className="flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-white transition hover:bg-white/10"
          aria-label="الصوت"
        >
          <Volume2
            className={`h-5 w-5 ${muted ? "opacity-50" : ""}`}
            style={{ color: ACCENT }}
          />
        </button>

        <div className="min-w-[62px] text-sm text-white/75">
          {formatTime(currentTime)}
        </div>

        <div className="relative h-2 min-w-[220px] flex-1 overflow-visible rounded-full bg-white/10">
          <div
            className="absolute inset-y-0 right-0 rounded-full bg-gradient-to-r from-emerald-200 via-yellow-100 to-emerald-300"
            style={{ width: `${progress}%` }}
          />
          <input
            type="range"
            min="0"
            max={duration || 0}
            step="0.1"
            value={currentTime}
            onChange={handleSeek}
            className="audio-range absolute inset-0 z-10 h-full w-full cursor-pointer appearance-none bg-transparent"
            style={{ WebkitAppearance: "none" }}
          />
        </div>
      </div>

      <style>{`
        .audio-range::-webkit-slider-runnable-track { height: 8px; background: transparent; }
        .audio-range::-moz-range-track { height: 8px; background: transparent; }
        .audio-range::-webkit-slider-thumb {
          -webkit-appearance: none;
          width: 16px;
          height: 16px;
          margin-top: -4px;
          border-radius: 999px;
          border: 2px solid rgba(255,255,255,0.9);
          background: ${ACCENT};
          box-shadow: 0 0 0 4px rgba(255,255,255,0.08);
        }
        .audio-range::-moz-range-thumb {
          width: 16px;
          height: 16px;
          border: 2px solid rgba(255,255,255,0.9);
          border-radius: 999px;
          background: ${ACCENT};
          box-shadow: 0 0 0 4px rgba(255,255,255,0.08);
        }
      `}</style>
    </div>
  );
}

function StructuredCard({ icon: Icon, title, desc }) {
  return (
    <motion.div whileHover={{ y: -8, scale: 1.01 }} className={`${gradientOuterCard} p-5`}>
      <div className="rounded-[1.6rem] border border-white/10 bg-white/5 p-4">
        <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-gradient-to-l from-white/5 to-white/10 px-4 py-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-emerald-300/10">
            <Icon className="h-5 w-5" style={{ color: ACCENT }} />
          </div>
          <h3 className="text-lg font-bold leading-7 text-white sm:text-xl">{title}</h3>
        </div>
        <div className="mt-4 rounded-2xl border border-white/10 bg-[#081512]/55 px-4 py-5 text-base leading-8 text-white/78">
          {desc}
        </div>
      </div>
    </motion.div>
  );
}

function IdentityCard({ icon: Icon, title, text, large = false }) {
  return (
    <motion.div whileHover={{ y: -8, scale: 1.01 }} className={`${softCard} p-5`}>
      <div className="rounded-[1.6rem] border border-white/10 bg-white/5 p-4">
        <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-gradient-to-l from-white/5 to-white/10 px-4 py-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-emerald-300/10">
            <Icon className="h-5 w-5" style={{ color: ACCENT }} />
          </div>
          <div
            className={`rounded-2xl border border-white/10 bg-white/5 px-4 py-2 font-bold text-white ${
              large ? "text-xl" : "text-lg"
            }`}
          >
            {title}
          </div>
        </div>
        <div
          className={`mt-4 rounded-2xl border border-white/10 bg-[#081512]/55 px-4 py-5 text-white/80 ${
            large ? "text-xl leading-10" : "text-lg leading-8"
          }`}
        >
          {text}
        </div>
      </div>
    </motion.div>
  );
}

function ImpactCard({ icon: Icon, title, desc }) {
  return (
    <motion.div whileHover={{ y: -8, scale: 1.01 }} className={`${softCard} p-5`}>
      <div className="rounded-[1.6rem] border border-white/10 bg-white/5 p-4">
        <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-gradient-to-l from-white/5 to-white/10 px-4 py-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-yellow-100/10">
            <Icon className="h-5 w-5" style={{ color: ACCENT }} />
          </div>
          <h3 className="text-lg font-bold text-white sm:text-xl">{title}</h3>
        </div>
        <div className="mt-4 rounded-2xl border border-white/10 bg-[#081512]/55 px-4 py-5 text-base leading-8 text-white/78">
          {desc}
        </div>
      </div>
    </motion.div>
  );
}

function ProtectedHlsVideoCard({ video, index }) {
  const videoRef = useRef(null);
  const hlsRef = useRef(null);

  const [isReady, setIsReady] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [muted, setMuted] = useState(false);

  useEffect(() => {
    const element = videoRef.current;
    if (!element) return;

    let cancelled = false;

    const cleanupHls = () => {
      if (hlsRef.current) {
        hlsRef.current.destroy();
        hlsRef.current = null;
      }
    };

    const fallbackToMp4 = () => {
      cleanupHls();
      if (element.src !== video.fallback) {
        element.src = video.fallback;
        element.load();
      }
      if (!cancelled) {
        setIsReady(true);
      }
    };

    const onLoaded = () => {
      if (cancelled) return;
      setDuration(element.duration || 0);
      setIsReady(true);
    };
    const onTimeUpdate = () => setCurrentTime(element.currentTime || 0);
    const onPlay = () => setIsPlaying(true);
    const onPause = () => setIsPlaying(false);
    const onEnded = () => {
      setIsPlaying(false);
      setCurrentTime(0);
    };
    const onError = () => fallbackToMp4();

    element.addEventListener("loadedmetadata", onLoaded);
    element.addEventListener("loadeddata", onLoaded);
    element.addEventListener("durationchange", onLoaded);
    element.addEventListener("timeupdate", onTimeUpdate);
    element.addEventListener("play", onPlay);
    element.addEventListener("pause", onPause);
    element.addEventListener("ended", onEnded);
    element.addEventListener("error", onError);

    if (Hls.isSupported()) {
      const hls = new Hls({
        enableWorker: true,
        backBufferLength: 90,
        lowLatencyMode: false,
      });
      hlsRef.current = hls;

      hls.loadSource(video.hls);
      hls.attachMedia(element);

      hls.on(Hls.Events.MANIFEST_PARSED, () => {
        if (!cancelled) setIsReady(true);
      });

      hls.on(Hls.Events.ERROR, (_, data) => {
        if (data?.fatal) fallbackToMp4();
      });
    } else if (element.canPlayType("application/vnd.apple.mpegurl")) {
      element.src = video.hls;
      element.load();
    } else {
      element.src = video.fallback;
      element.load();
      setIsReady(true);
    }

    return () => {
      cancelled = true;
      cleanupHls();
      element.removeEventListener("loadedmetadata", onLoaded);
      element.removeEventListener("loadeddata", onLoaded);
      element.removeEventListener("durationchange", onLoaded);
      element.removeEventListener("timeupdate", onTimeUpdate);
      element.removeEventListener("play", onPlay);
      element.removeEventListener("pause", onPause);
      element.removeEventListener("ended", onEnded);
      element.removeEventListener("error", onError);
    };
  }, [video.fallback, video.hls]);

  const progress = useMemo(
    () => (duration ? (currentTime / duration) * 100 : 0),
    [currentTime, duration]
  );

  const togglePlay = () => {
    const el = videoRef.current;
    if (!el) return;

    if (el.paused) {
      el.play().catch(() => {});
    } else {
      el.pause();
    }
  };

  const replayVideo = () => {
    const el = videoRef.current;
    if (!el) return;
    el.currentTime = 0;
    el.play().catch(() => {});
  };

  const handleSeek = (e) => {
    const el = videoRef.current;
    if (!el) return;
    const next = Number(e.target.value);
    el.currentTime = next;
    setCurrentTime(next);
  };

  const toggleMute = () => {
    const el = videoRef.current;
    if (!el) return;
    const next = !el.muted;
    el.muted = next;
    setMuted(next);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 25 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.8, delay: index * 0.12 }}
      whileHover={{ y: -8, scale: 1.01 }}
      className={`${softCard} p-4`}
    >
      <div className="relative overflow-hidden rounded-[1.5rem] border border-white/10 bg-black/30">
        <video
          ref={videoRef}
          className="aspect-video w-full object-cover"
          playsInline
          preload="metadata"
          controls={false}
          muted={muted}
          onContextMenu={(e) => e.preventDefault()}
        />

        {!isPlaying && (
          <button
            type="button"
            onClick={togglePlay}
            className="absolute inset-0 flex items-center justify-center bg-black/10 transition hover:bg-black/5"
            aria-label="تشغيل الفيديو"
          >
            <span className="flex h-20 w-20 items-center justify-center rounded-full border border-white/20 bg-white/10 backdrop-blur-xl shadow-[0_0_45px_rgba(16,185,129,0.18)]">
              <Play className="mr-1 h-8 w-8 text-white" />
            </span>
          </button>
        )}

        <div className="pointer-events-none absolute left-4 top-4 rounded-full border border-white/10 bg-black/35 px-3 py-1 text-xs text-white/80 backdrop-blur-xl">
          {isReady ? "جاهز للتشغيل" : "جارِ تجهيز البث"}
        </div>
      </div>

      <div className="mt-4 rounded-[1.4rem] border border-white/10 bg-[#081512]/60 p-4">
        <div className="flex flex-wrap items-center gap-3">
          <button
            type="button"
            onClick={toggleMute}
            className="flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-white transition hover:bg-white/10"
            aria-label="كتم الصوت أو تشغيله"
          >
            <Volume2
              className={`h-5 w-5 ${muted ? "opacity-50" : ""}`}
              style={{ color: ACCENT }}
            />
          </button>

          <button
            type="button"
            onClick={replayVideo}
            className="flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-white transition hover:bg-white/10"
            aria-label="إعادة التشغيل"
          >
            <RotateCcw className="h-5 w-5" style={{ color: ACCENT }} />
          </button>

          <button
            type="button"
            onClick={togglePlay}
            className="flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-white transition hover:bg-white/10"
            aria-label={isPlaying ? "إيقاف مؤقت" : "تشغيل"}
          >
            {isPlaying ? (
              <Pause className="h-5 w-5" style={{ color: ACCENT }} />
            ) : (
              <Play className="h-5 w-5" style={{ color: ACCENT }} />
            )}
          </button>

          <div className="min-w-[62px] text-sm text-white/75">
            {formatTime(currentTime)}
          </div>

          <div className="relative h-2 min-w-[180px] flex-1 overflow-visible rounded-full bg-white/10">
            <div
              className="absolute inset-y-0 right-0 rounded-full bg-gradient-to-r from-emerald-200 via-yellow-100 to-emerald-300"
              style={{ width: `${progress}%` }}
            />
            <input
              type="range"
              min="0"
              max={duration || 0}
              step="0.1"
              value={currentTime}
              onChange={handleSeek}
              className="video-range absolute inset-0 z-10 h-full w-full cursor-pointer appearance-none bg-transparent"
            />
          </div>
        </div>
      </div>

      <style>{`
        .video-range::-webkit-slider-runnable-track { height: 8px; background: transparent; }
        .video-range::-moz-range-track { height: 8px; background: transparent; }
        .video-range::-webkit-slider-thumb {
          -webkit-appearance: none;
          width: 16px;
          height: 16px;
          margin-top: -4px;
          border-radius: 999px;
          border: 2px solid rgba(255,255,255,0.9);
          background: ${ACCENT};
          box-shadow: 0 0 0 4px rgba(255,255,255,0.08);
        }
        .video-range::-moz-range-thumb {
          width: 16px;
          height: 16px;
          border: 2px solid rgba(255,255,255,0.9);
          border-radius: 999px;
          background: ${ACCENT};
          box-shadow: 0 0 0 4px rgba(255,255,255,0.08);
        }
      `}</style>
    </motion.div>
  );
}

export default function QuranTranslationLandingPage() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div dir="rtl" className="relative min-h-screen overflow-hidden bg-[#04120f] text-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(16,185,129,0.18),transparent_30%),radial-gradient(circle_at_80%_20%,rgba(250,204,21,0.14),transparent_22%),radial-gradient(circle_at_20%_80%,rgba(34,197,94,0.14),transparent_24%),linear-gradient(180deg,#020617_0%,#04120f_40%,#031b17_100%)]" />
      <motion.div
        className="absolute -top-24 left-1/2 h-96 w-96 -translate-x-1/2 rounded-full bg-emerald-400/20 blur-3xl"
        animate={pulseGlow}
      />
      <div className="absolute inset-0 opacity-[0.10]">
        <div className="h-full w-full bg-[linear-gradient(rgba(255,255,255,0.07)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.07)_1px,transparent_1px)] bg-[size:44px_44px]" />
      </div>

      <div className={containerClass}>
        <header className="pt-6">
          <motion.div
            initial="hidden"
            animate="show"
            variants={fadeUp}
            className={`mx-auto flex items-center justify-between rounded-[2rem] px-4 py-3 ${glass}`}
          >
            <div className="flex items-center gap-4">
              <div className="flex h-16 w-16 items-center justify-center overflow-hidden rounded-full border border-yellow-100/20 bg-white/10 shadow-[0_0_30px_rgba(16,185,129,0.20)]">
                <img
                  src={sanaLogo}
                  alt="شعار قنوات سنا القرآنية"
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="text-xl font-bold tracking-wide">قنوات سنا القرآنية</div>
            </div>

            <nav className="hidden items-center gap-3 md:flex">
              {navItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-white/85 transition hover:border-emerald-200/30 hover:bg-white/10 hover:text-emerald-100"
                >
                  {item.label}
                </a>
              ))}
            </nav>

            <button
              type="button"
              onClick={() => setMenuOpen((v) => !v)}
              className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-white/5 md:hidden"
            >
              <Menu className="h-5 w-5" />
            </button>
          </motion.div>

          {menuOpen && (
            <div className={`mt-3 rounded-[1.6rem] p-4 md:hidden ${glass}`}>
              <div className="grid gap-2">
                {navItems.map((item) => (
                  <a
                    key={item.href}
                    href={item.href}
                    onClick={() => setMenuOpen(false)}
                    className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white/85"
                  >
                    {item.label}
                  </a>
                ))}
              </div>
            </div>
          )}
        </header>

        <section className="relative grid min-h-[88vh] items-center gap-12 py-16 lg:grid-cols-[1.05fr_0.95fr] lg:py-24">
          <div>
            <motion.div
              custom={0}
              initial="hidden"
              animate="show"
              variants={fadeUp}
              className="mb-6 inline-flex items-center gap-2 rounded-full border border-yellow-200/20 bg-white/10 px-4 py-2 text-sm backdrop-blur-xl"
              style={{ color: ACCENT }}
            >
              <Stars className="h-4 w-4" style={{ color: ACCENT }} />
              <span>سنا...بلاغ للعالمين</span>
            </motion.div>

            <motion.h1
              custom={1}
              initial="hidden"
              animate="show"
              variants={fadeUp}
              className="text-4xl font-black leading-[1.2] sm:text-5xl lg:text-7xl"
            >
              <span className="block bg-gradient-to-l from-[#F3E7B3] via-emerald-100 to-yellow-100 bg-clip-text text-transparent">
                قنوات سنا القرآنية
              </span>
            </motion.h1>

            <motion.p
              custom={2}
              initial="hidden"
              animate="show"
              variants={fadeUp}
              className="mt-6 max-w-2xl text-lg leading-8 text-white/75 lg:text-xl"
            >
              قنوات صوتية مرئية لترجمات معاني القرآن الكريم لجميع اللغات العالمية - وقف لله تعالى.
            </motion.p>

            <motion.div
              custom={3}
              initial="hidden"
              animate="show"
              variants={fadeUp}
              className="mt-10 flex flex-col gap-4 sm:flex-row"
            >
              <a
                href="#features"
                className="group inline-flex items-center justify-center gap-3 rounded-2xl border px-7 py-4 text-base font-bold shadow-[0_10px_40px_rgba(8,8,32,0.35)] transition hover:scale-[1.02]"
                style={{
                  backgroundColor: CTA_DARK,
                  borderColor: "rgba(243,231,179,0.18)",
                  color: ACCENT,
                }}
              >
                <Sparkles
                  className="h-5 w-5 transition group-hover:rotate-12"
                  style={{ color: ACCENT }}
                />
                اكتشف المنصة
              </a>

              <a
                href="https://youtube.com/@san-ar-m5i?si=RpejWa62nYgs2LGQ"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center gap-3 rounded-2xl border border-white/15 bg-white/10 px-7 py-4 text-base font-semibold text-white backdrop-blur-2xl transition hover:bg-white/15"
              >
                <Play className="h-5 w-5" />
                زوروا قناتنا
              </a>
            </motion.div>

            <motion.div
              custom={4}
              initial="hidden"
              animate="show"
              variants={fadeUp}
              className="mt-12 grid grid-cols-2 gap-4 lg:grid-cols-4"
            >
              {stats.map((item, i) => (
                <motion.div
                  key={item.label}
                  animate={{ y: [0, -6, 0] }}
                  transition={{ duration: 4 + i, repeat: Infinity, ease: "easeInOut" }}
                  className="rounded-3xl border border-white/10 bg-white/10 p-4 text-center backdrop-blur-2xl shadow-[0_10px_30px_rgba(0,0,0,0.18)]"
                >
                  <div className="text-2xl font-black" style={{ color: ACCENT }}>
                    {item.value}
                  </div>
                  <div className="mt-2 text-sm text-white/70">{item.label}</div>
                </motion.div>
              ))}
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9, rotate: -4 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
            className="relative"
          >
            <motion.div
              animate={{ y: [0, -14, 0] }}
              transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
              className={`relative mx-auto max-w-2xl p-4 ${softCard}`}
            >
              <div className="rounded-[1.7rem] border border-white/10 bg-gradient-to-br from-white/10 to-white/5 p-6">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <p className="text-sm text-white/60">اللغة الحالية</p>
                    <h3 className="mt-1 text-2xl font-bold">القرآن باللغة العربية</h3>
                  </div>
                  <div className="rounded-2xl border border-emerald-300/20 bg-emerald-400/15 px-4 py-2 text-sm text-emerald-100">
                    بث مباشر
                  </div>
                </div>

                <div className="mt-8 rounded-[1.5rem] border border-white/10 bg-[#0b1d19]/70 p-6">
                  <div className="mb-4 flex items-center gap-3 text-white/80">
                    <Headphones className="h-5 w-5 text-emerald-200" />
                    <span>استمع إلى التلاوة مع عرض بصري لمعاني القرآن الكريم</span>
                  </div>

                  <div className="space-y-3">
                    {[65, 88, 42].map((w, idx) => (
                      <motion.div
                        key={idx}
                        animate={{ width: [`${w - 18}%`, `${w}%`, `${w - 10}%`] }}
                        transition={{ duration: 3 + idx, repeat: Infinity, ease: "easeInOut" }}
                        className="h-3 rounded-full bg-gradient-to-r from-emerald-200 via-yellow-100 to-emerald-300"
                      />
                    ))}
                  </div>

                  <div className="mt-8 grid grid-cols-3 gap-3 text-center">
                    {heroCards.map((item) => (
                      <div
                        key={item.label}
                        className="rounded-2xl border border-white/10 bg-white/5 p-4"
                      >
                        <div className="text-lg font-bold" style={{ color: ACCENT }}>
                          {item.value}
                        </div>
                        <div className="text-xs text-white/60">{item.label}</div>
                      </div>
                    ))}
                  </div>

                  <HeroAudioPlayer />
                </div>
              </div>
            </motion.div>

            <div className="mx-auto mt-6 flex max-w-2xl flex-wrap items-center justify-center gap-4">
              {heroBadges.map((item) => {
                const Icon = item.icon;
                return (
                  <div
                    key={item.title}
                    className="min-w-[220px] rounded-[1.6rem] border border-white/10 bg-white/10 px-5 py-4 text-center backdrop-blur-2xl shadow-[0_8px_30px_rgba(0,0,0,0.25)]"
                  >
                    <div className="flex items-center justify-center gap-3">
                      <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-white/5">
                        <Icon className="h-5 w-5" style={{ color: ACCENT }} />
                      </div>
                      <div className="text-base font-bold text-white">{item.title}</div>
                    </div>
                  </div>
                );
              })}
            </div>
          </motion.div>
        </section>

        <section id="about" className="py-4 lg:py-8">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            variants={fadeUp}
            className="mb-8 text-center"
          >
            <LargeSectionBadge icon={BookOpen} text="هوية قرآنية عالمية" />
          </motion.div>

          <div className="space-y-6">
            <motion.div
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.2 }}
              custom={0}
              variants={fadeUp}
            >
              <IdentityCard {...identityCards[0]} large />
            </motion.div>

            <div className="grid gap-6 lg:grid-cols-2">
              {identityCards.slice(1).map((card, i) => (
                <motion.div
                  key={card.title}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true, amount: 0.2 }}
                  custom={i + 1}
                  variants={fadeUp}
                >
                  <IdentityCard {...card} />
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-8 lg:py-12">
          <div className="mb-6 text-center">
            <LargeSectionBadge icon={Building2} text="التنفيذ والإشراف" />
          </div>

          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.25 }}
            variants={fadeUp}
            className={`relative overflow-hidden p-8 md:p-10 ${gradientOuterCard}`}
          >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(16,185,129,0.16),transparent_28%),radial-gradient(circle_at_80%_80%,rgba(250,204,21,0.12),transparent_32%)]" />

            <div className="relative z-10">
              <div className="grid gap-8 lg:grid-cols-2 lg:items-stretch">
                <div className="rounded-[1.8rem] border border-white/10 bg-[#081512]/45 p-6">
                  <div className="h-full rounded-2xl border border-white/10 bg-white/5 p-5">
                    <h2 className="text-3xl font-black sm:text-4xl">شراكة تنفيذية موثوقة</h2>
                    <p className="mt-5 text-lg leading-8 text-white/75">
                      يُنفّذ مشروع <span className="font-bold text-white">قنوات سنا القرآنية</span> من قبل{" "}
                      <span className="font-bold" style={{ color: ACCENT }}>
                        الشركة السعودية الأردنية للبث الفضائي (جاسكو)
                      </span>{" "}
                      – عمّان، الأردن، بخبرة رائدة في مجال الإنتاج والبث الإعلامي.
                    </p>
                  </div>
                </div>

                <div className="rounded-[1.8rem] border border-white/10 bg-[#081512]/70 p-6">
                  <div className="flex h-full flex-col justify-center rounded-2xl border border-white/10 bg-white/5 p-5">
                    <div className="text-sm text-white/60">الموقع الرسمي</div>
                    <div className="mt-2 text-2xl font-bold">Jasco Media City</div>
                    <a
                      href="https://jascomediacity.net/"
                      target="_blank"
                      rel="noreferrer"
                      className="mt-5 inline-flex w-fit items-center gap-2 rounded-2xl border border-emerald-200/20 bg-emerald-400/10 px-5 py-3 text-emerald-100 transition hover:bg-emerald-400/20"
                    >
                      قم بزيارة موقع Jasco
                      <ExternalLink className="h-4 w-4" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </section>

        <section id="features" className="py-14 lg:py-20">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            variants={fadeUp}
            className="mb-10 text-center"
          >
            {sectionBadge(Sparkles, "مميزات المنصة")}
            <h2 className="mt-5 text-3xl font-black sm:text-5xl">سنا... بلاغ للعالمين</h2>
            <p className="mx-auto mt-4 max-w-3xl text-lg leading-8 text-white/70">
              منصة قرآنية تستخدم أحدث الوسائل لإيصال معاني القرآن الكريم إلى العالمين، بأسلوب يجمع بين التأصيل الشرعي والتقنيات الحديثة.
            </p>
          </motion.div>

          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {features.map((item, i) => (
              <motion.div
                key={item.title}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.25 }}
                custom={i}
                variants={fadeUp}
              >
                <StructuredCard {...item} />
              </motion.div>
            ))}
          </div>
        </section>

        <section className="py-10 lg:py-14">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            variants={fadeUp}
            className="mb-10 text-center"
          >
            {sectionBadge(Send, "وسائل النشر والوصول")}
            <h2 className="mt-5 text-3xl font-black sm:text-5xl">قنوات حضور متعددة</h2>
          </motion.div>

          <div className="grid gap-6 lg:grid-cols-3">
            {channels.map((item, i) => (
              <motion.div
                key={item.title}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.25 }}
                custom={i}
                variants={fadeUp}
              >
                <StructuredCard {...item} />
              </motion.div>
            ))}
          </div>
        </section>

        <section id="portfolio" className="py-14 lg:py-20">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            variants={fadeUp}
            className="mb-10 text-center"
          >
            {sectionBadge(Crown, "أعمالنا")}
            <h2 className="mt-5 text-3xl font-black sm:text-5xl">نماذج من أعمالنا</h2>
            <p className="mx-auto mt-4 max-w-3xl text-lg leading-8 text-white/70">
              تلاوات قرآنية عطرة وترجمة معاني آيات القرآن الكريم لمختلف لغات العالم - سنا... بلاغ للعالمين.
            </p>
          </motion.div>

          <div className="grid gap-6 lg:grid-cols-3">
            {portfolioVideos.map((video, i) => (
              <ProtectedHlsVideoCard key={video.hls} video={video} index={i} />
            ))}
          </div>
        </section>

        <section className="py-12 lg:py-16">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            variants={fadeUp}
            className="mb-10 text-center"
          >
            {sectionBadge(Globe, "أثر المشروع")}
            <h2 className="mt-5 text-3xl font-black sm:text-5xl">أثر المشروع وانتشاره حول العالم</h2>
            <p className="mx-auto mt-4 max-w-3xl text-lg leading-8 text-white/70">
              رسالة قرآنية عالمية وفّرت ترجمات موثوقة، وقدّمت تجربة مؤثرة، وساهمت في وصول معاني القرآن الكريم إلى بيوت حول العالم.
            </p>
          </motion.div>

          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {impactCards.map((item, i) => (
              <motion.div
                key={item.title}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.25 }}
                custom={i}
                variants={fadeUp}
              >
                <ImpactCard {...item} />
              </motion.div>
            ))}
          </div>
        </section>

        <section id="partners" className="py-14 lg:py-20">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            variants={fadeUp}
            className="mb-10 text-center"
          >
            {sectionBadge(Users, "شركاء النجاح")}
            <h2 className="mt-5 text-3xl font-black sm:text-5xl">نجاحٌ صنعه التعاون</h2>
            <p className="mx-auto mt-4 max-w-3xl text-lg leading-8 text-white/70">
              حقق المشروع نجاحه بفضل تعاون نخبة من الجهات المتميزة، من بينها الجهات الشرعية والإعلامية والإنتاجية والمتطوعون.
            </p>
          </motion.div>

          <div className="grid gap-6 md:grid-cols-2">
            {partners.map((item, i) => (
              <motion.div
                key={item.title}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.25 }}
                custom={i}
                variants={fadeUp}
              >
                <StructuredCard {...item} />
              </motion.div>
            ))}
          </div>
        </section>

        <section id="contact" className="py-8 lg:py-12">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.25 }}
            variants={fadeUp}
          >
            <div className="text-center">
              <div
                className="inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/10 px-7 py-4 text-lg font-semibold backdrop-blur-xl shadow-[0_10px_35px_rgba(0,0,0,0.18)]"
                style={{ color: ACCENT }}
              >
                <Sparkles className="h-5 w-5" style={{ color: ACCENT }} />
                تواصل معنا
              </div>

              <p className="mx-auto mt-5 max-w-4xl text-lg leading-8 text-white/75">
                سنا رسالة دعوية عالمية، ويسعدنا التواصل معكم واستقبال استفساراتكم ومقترحاتكم وشراكاتكم في أي وقت بأسلوب واضح ومباشر.
              </p>
            </div>

            <div className={`mt-8 rounded-[2rem] p-6 md:p-8 ${gradientOuterCard}`}>
              <div className="rounded-[2rem] border border-white/10 bg-[#081512]/70 p-6">
                <div className="rounded-[1.5rem] border border-white/10 bg-white/5 p-5">
                  <div className="mb-4 text-2xl font-bold">اتصل بنا</div>
                  <div className="space-y-3 text-white/75">
                    <div className="rounded-2xl bg-white/5 px-4 py-3">
                      فريقنا سيكون سعيدًا بمساعدتكم والرد عليكم في أقرب وقت.
                    </div>
                    <a
                      href="mailto:snachannel159@gmail.com"
                      className="flex items-center justify-center gap-3 rounded-2xl border border-emerald-200/20 bg-emerald-400/10 px-4 py-3 text-center font-semibold text-emerald-100 transition hover:bg-emerald-400/20"
                    >
                      <Mail className="h-4 w-4" style={{ color: ACCENT }} />
                      إرسال
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </section>

        <footer className="pb-10 pt-4">
          <div className={`rounded-[2.2rem] px-6 py-8 lg:px-10 ${glass}`}>
            <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr_1fr]">
              <div className={`rounded-[1.8rem] border border-white/10 p-6 text-center ${INNER_GRADIENT}`}>
                <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full border border-white/15 bg-white/10 shadow-[0_0_30px_rgba(255,255,255,0.08)] backdrop-blur-xl">
                  <img src={sanaLogo} alt="شعار سنا" className="h-16 w-16 object-contain" />
                </div>

                <div className="mt-4">
                  <span className="inline-flex rounded-full border border-white/10 bg-white/10 px-5 py-2 text-sm text-white/90">
                    قنوات سنا القرآنية
                  </span>
                </div>

                <div className="mt-4 text-3xl font-black" style={{ color: ACCENT }}>
                  سنا... بلاغ للعالمين
                </div>

                <p className="mx-auto mt-4 max-w-xl rounded-[1.4rem] border border-white/10 bg-[rgba(38,67,57,0.55)] px-5 py-4 leading-8 text-white/78">
                  قنوات صوتية مرئية لترجمات معاني القرآن الكريم لجميع اللغات العالمية، في مشروع وقفي يجمع بين جمال العرض ودقة المعنى وروح الرسالة.
                </p>
              </div>

              <div className="rounded-[1.6rem] border border-white/10 bg-white/5 p-5">
                <div className="mb-4 flex items-center gap-2 text-lg font-bold text-white">
                  <MessageCircle className="h-5 w-5" style={{ color: ACCENT }} />
                  تفاصيلنا
                </div>

                <div className="space-y-4 text-white/72">
                  <a
                    href="mailto:snachannel159@gmail.com"
                    className="flex items-center gap-3 rounded-2xl border border-white/10 bg-[#081512]/50 px-4 py-3 transition hover:bg-white/10"
                  >
                    <Mail className="h-4 w-4" style={{ color: ACCENT }} />
                    snachannel159@gmail.com
                  </a>

                  <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-[#081512]/50 px-4 py-3">
                    <MapPin className="h-4 w-4" style={{ color: ACCENT }} />
                    عمّان - الأردن
                  </div>
                </div>

                <div className="mt-5 rounded-[1.4rem] border border-white/10 bg-[#081512]/45 p-4">
                  <a
                    href="https://www.facebook.com/share/1FVbmggbzc/"
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/5 py-3 text-sm font-semibold text-white transition hover:scale-[1.02] hover:bg-white/10"
                  >
                    <Globe className="h-4 w-4" style={{ color: ACCENT }} />
                    تابعنا على فيسبوك
                  </a>

                  <p className="mt-4 text-center text-sm leading-6 text-white/70">
                    ابدأ رحلتك القرآنية الآن
                  </p>
                </div>
              </div>

              <div className="rounded-[1.8rem] border border-white/10 bg-[linear-gradient(145deg,rgba(255,255,255,0.08),rgba(255,255,255,0.04))] p-5 backdrop-blur-2xl">
                <div className="mb-5 flex items-center gap-2 text-lg font-bold text-white">
                  <Link2 className="h-5 w-5" style={{ color: ACCENT }} />
                  روابط تطبيقنا
                </div>

                <div className="rounded-[1.4rem] border border-white/10 bg-[#081512]/45 p-4">
                  <p className="mb-4 text-sm leading-7 text-white/65">
                    حمّل التطبيق وابدأ متابعة المحتوى القرآني بسهولة عبر المنصات الرسمية.
                  </p>

                  <div className="grid gap-3 sm:grid-cols-2">
                    <a
                      href="https://play.google.com/store/apps/details?id=com.sana_all&pcampaignid=web_share"
                      target="_blank"
                      rel="noreferrer"
                      className="group rounded-[1.3rem] border border-white/10 bg-white/5 p-4 transition hover:-translate-y-1 hover:bg-white/10"
                    >
                      <div className="flex items-center justify-between gap-3">
                        <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-emerald-300/10 text-white">
                          <GooglePlayIcon />
                        </div>
                        <span className="whitespace-nowrap text-base font-bold text-white">
                          Google Play
                        </span>
                      </div>
                    </a>

                    <a
                      href="https://apps.apple.com/us/app/sana-tv-%D8%B3%D9%86%D8%A7/id6742054715"
                      target="_blank"
                      rel="noreferrer"
                      className="group rounded-[1.3rem] border border-white/10 bg-white/5 p-4 transition hover:-translate-y-1 hover:bg-white/10"
                    >
                      <div className="flex items-center justify-between gap-3">
                        <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-yellow-100/10 text-white">
                          <AppStoreIcon />
                        </div>
                        <span className="text-base font-bold text-white">App Store</span>
                      </div>
                    </a>
                  </div>

                  <div className="mt-5 rounded-[1.4rem] border border-white/10 bg-[#0b1d19]/60 p-4">
                    <div className="flex items-center justify-between text-xs text-white/65">
                      <span>⭐ 4.9 تقييم</span>
                      <span>🌍 100+ دولة</span>
                    </div>

                    <a
                      href="https://www.youtube.com/@SAN-AR-m5i"
                      target="_blank"
                      rel="noreferrer"
                      className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl border border-emerald-200/20 bg-emerald-400/10 py-3 text-sm font-bold text-emerald-100 transition hover:scale-[1.02] hover:bg-emerald-400/20 hover:shadow-[0_0_20px_rgba(16,185,129,0.3)]"
                    >
                      <Sparkles className="h-4 w-4" />
                      ابدأ الآن
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8 border-t border-white/10 pt-5 text-center text-sm text-white/55">
              جميع الحقوق محفوظة © قنوات سنا القرآنية.
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}