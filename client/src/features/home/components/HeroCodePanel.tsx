
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Circle, FolderOpen, Play } from "lucide-react";

const codeLines = [
    {
        content: (
            <span className="text-slate-500 italic">
                // Welcome to my workspace
            </span>
        ),
        text: "// Welcome to my workspace",
    },
    {
        content: (
            <>
                <span className="text-purple-700">import</span>{" "}
                <span className="text-blue-700">{"{ Developer }"}</span>{" "}
                <span className="text-purple-700">from</span>{" "}
                <span className="text-emerald-700">
                    './universe'
                </span>;
            </>
        ),
        text: "import { Developer } from './universe';",
    },
    { content: null, text: "" },
    {
        content: (
            <>
                <span className="text-purple-700">const</span>{" "}
                <span className="text-yellow-700">Portfolio</span>{" "}
                = () =&gt; {"{"}
            </>
        ),
        text: "const Portfolio = () => {",
    },
    {
        content: (
            <>
                {"   "}
                <span className="text-purple-700">return</span> (
            </>
        ),
        text: "   return (",
    },
    {
        content: (
            <>
                {"      "}
                <span className="text-orange-600">
                    {"<Developer"}
                </span>
            </>
        ),
        text: "      <Developer",
    },
    {
        content: (
            <>
                {"         "}
                <span className="text-blue-700">name</span>=
                <span className="text-emerald-700">
                    "Ayush Kumar"
                </span>
            </>
        ),
        text: '         name="Ayush Kumar"',
    },
    {
        content: (
            <>
                {"         "}
                <span className="text-blue-700">role</span>=
                <span className="text-emerald-700">
                    "Software Developer"
                </span>
            </>
        ),
        text: '         role="Software Developer"',
    },
    {
        content: (
            <>
                {"         "}
                <span className="text-blue-700">passion</span>=
                <span className="text-emerald-700">
                    "Building web applications"
                </span>
            </>
        ),
        text: '         passion="Building web applications"',
    },
    {
        content: (
            <>
                {"      "}
                <span className="text-orange-600">{" />"}</span>
            </>
        ),
        text: "      />",
    },
    { content: <>{"   "});</>, text: "   );" },
    { content: <>{"};"}</>, text: "};" },
];

const sourceCode = codeLines.map((line) => line.text).join("\n");
const PANEL_START_DELAY_MS = 3000;

const HeroCodePanel = () => {
    const [canReveal, setCanReveal] = useState(false);
    const [typedCharacters, setTypedCharacters] = useState(() =>
        typeof window !== "undefined" &&
        window.matchMedia("(prefers-reduced-motion: reduce)").matches
            ? sourceCode.length
            : 0,
    );

    useEffect(() => {
        const startTimer = window.setTimeout(
            () => setCanReveal(true),
            PANEL_START_DELAY_MS,
        );

        return () => window.clearTimeout(startTimer);
    }, []);

    useEffect(() => {
        if (!canReveal) return;

        const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        if (reducedMotion) return;

        let timer = 0;
        let characterIndex = 0;

        const typeNextCharacter = () => {
            characterIndex += 1;
            setTypedCharacters(characterIndex);

            if (characterIndex < sourceCode.length) {
                const finishedLine = sourceCode[characterIndex] === "\n";
                timer = window.setTimeout(typeNextCharacter, finishedLine ? 20 : 20);
            }
        };

        timer = window.setTimeout(typeNextCharacter, 100);
        return () => window.clearTimeout(timer);
    }, [canReveal]);

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.98, x: 16 }}
            animate={canReveal ? { opacity: 1, scale: 1, x: 0 } : { opacity: 0, scale: 0.98, x: 16 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="relative mx-auto w-full max-w-xl shadow-3xl shadow-[-10px_10px_30px_rgba(37,99,235,0.5),10px_10px_30px_rgba(249,105,0,0.5)] rounded-lg"
        >
            {/* Background Glow */}
            <div className="absolute -inset-4 rounded-3xl bg-blue-200/30 blur-2xl" />

            <div className="relative overflow-hidden rounded-2xl border border-blue-100 bg-white shadow-[0_20px_60px_rgba(37,99,235,0.12)]">

                {/* Editor Header */}
                <div className="relative flex items-center justify-between border-b border-slate-100 bg-slate-100 px-4 py-3 sm:px-5">

                    <div className="flex items-center gap-2">
                        <Circle size={10} className="fill-red-400 text-red-400" />
                        <Circle size={10} className="fill-amber-400 text-amber-400" />
                        <Circle size={10} className="fill-green-500 text-green-500" />
                    </div>

                    <div className="absolute left-1/2 flex -translate-x-1/2 items-center gap-2 font-mono text-xs font-semibold text-slate-700 sm:text-sm">
                        <span className="h-2 w-2 rounded-full bg-blue-500" />
                        portfolio.tsx
                    </div>

                    <span className="w-[42px]" aria-hidden="true" />
                </div>

                {/* Code Editor */}
                <div
                    className="overflow-x-auto px-3 py-5 sm:px-5 sm:py-6"
                    aria-label="Portfolio code"
                >
                    <div className="min-w-max font-mono text-xs font-semibold leading-[1.75] sm:text-sm">

                        {codeLines.map((line, index) => {
                            const lineStart = codeLines
                                .slice(0, index)
                                .reduce((total, previousLine) => total + previousLine.text.length + 1, 0);
                            const charactersOnLine = Math.min(
                                line.text.length,
                                Math.max(0, typedCharacters - lineStart),
                            );
                            const isVisible = charactersOnLine === line.text.length;
                            const isCurrentLine =
                                typedCharacters >= lineStart &&
                                typedCharacters < lineStart + line.text.length;

                            return (
                                <div
                                    key={index}
                                    className="flex min-h-[1.65em] gap-4 sm:gap-5"
                                >
                                    {/* Line Number */}
                                    <span className="w-5 shrink-0 select-none text-right text-slate-400">
                                        {index + 1}
                                    </span>

                                    {/* Code */}
                                    <span className="whitespace-pre">
                                        {isVisible ? line.content : line.text.slice(0, charactersOnLine)}

                                        {isCurrentLine &&
                                            typedCharacters < sourceCode.length && (
                                                <span className="animate-pulse text-blue-600">
                                                    ▍
                                                </span>
                                            )}
                                    </span>
                                </div>
                            );
                        })}

                    </div>
                </div>

                {/* Editor Footer */}
                <div className="flex flex-wrap items-center gap-3 border-t border-slate-100 px-4 py-4 sm:px-6">

                    <a
                        href="#about"
                        className="inline-flex items-center gap-2 rounded-lg border border-blue-200 bg-blue-50 px-4 py-2.5 text-sm font-semibold text-blue-700 transition-colors duration-300 hover:bg-blue-100"
                    >
                        <Play size={16} />
                        Run Profile
                    </a>

                    <a
                        href="#projects"
                        className="inline-flex items-center gap-2 rounded-lg border border-slate-200 px-4 py-2.5 text-sm font-semibold text-slate-700 transition-colors duration-300 hover:border-blue-300 hover:text-blue-700"
                    >
                        <FolderOpen size={16} />
                        View Projects
                    </a>

                </div>
            </div>
        </motion.div>
    );
};

export default HeroCodePanel;
