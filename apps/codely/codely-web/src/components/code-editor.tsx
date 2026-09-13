'use client';

import { useRef, useState } from 'react';
import { Copy, Image as ImageIcon, Play, RotateCcw, Settings2, ZoomIn, ZoomOut } from 'lucide-react';

export type RunResult = { lines: string[]; error?: boolean };

/**
 * Editor pane: a gutter of line numbers beside a textarea, plus a terminal.
 *
 * Running does not evaluate the code — there is no sandbox yet — it echoes a
 * plausible transcript so the loop is complete and the UI can be reviewed.
 * Swap `run` for a real execution service and nothing else here changes.
 */
export function CodeEditor({
  filename,
  emoji,
  accent,
  initial,
  onSubmit,
}: {
  filename: string;
  emoji: string;
  accent: string;
  initial: string;
  onSubmit?: () => void;
}) {
  const [code, setCode] = useState(initial);
  const [output, setOutput] = useState<RunResult | null>(null);
  const [fontSize, setFontSize] = useState(13);
  const [copied, setCopied] = useState(false);
  const areaRef = useRef<HTMLTextAreaElement | null>(null);

  const lines = code.split('\n');

  function handleKeyDown(event: React.KeyboardEvent<HTMLTextAreaElement>) {
    // Tab should indent, not move focus out of the editor.
    if (event.key !== 'Tab') return;
    event.preventDefault();
    const area = event.currentTarget;
    const { selectionStart, selectionEnd } = area;
    const next = `${code.slice(0, selectionStart)}  ${code.slice(selectionEnd)}`;
    setCode(next);
    requestAnimationFrame(() => {
      area.selectionStart = selectionStart + 2;
      area.selectionEnd = selectionStart + 2;
    });
  }

  function run() {
    const written = lines.filter(
      (line) => line.trim() && !/^\s*(#|\/\/|<!--)/.test(line),
    );

    if (written.length === 0) {
      setOutput({
        lines: [`$ run ${filename}`, 'Nothing to run yet — write some code first.'],
        error: true,
      });
      return;
    }

    setOutput({
      lines: [
        `$ run ${filename}`,
        ...written.map((line) => `→ ${line.trim()}`),
        '',
        `Process finished · ${written.length} statement${written.length === 1 ? '' : 's'}`,
      ],
    });
  }

  async function copy() {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 1400);
    } catch {
      // Clipboard access can be denied; the editor still works without it.
      setCopied(false);
    }
  }

  return (
    <div className="flex h-full min-h-0 flex-col bg-[#0d0d14]">
      <div className="flex items-center border-b border-hairline">
        <span className="flex items-center gap-2 border-r border-hairline px-4 py-2.5 font-mono text-[12px] text-zinc-300">
          <span className="text-[13px] leading-none">{emoji}</span>
          {filename}
        </span>
      </div>

      <div className="relative min-h-0 flex-1 overflow-auto">
        <div className="flex min-h-full">
          <div
            aria-hidden
            className="code-surface shrink-0 select-none border-r border-hairline px-3 py-3 text-right text-zinc-600"
            style={{ fontSize, lineHeight: `${fontSize * 1.62}px` }}
          >
            {lines.map((_, index) => (
              <div key={index}>{index + 1}</div>
            ))}
          </div>

          <textarea
            ref={areaRef}
            value={code}
            onChange={(event) => setCode(event.target.value)}
            onKeyDown={handleKeyDown}
            spellCheck={false}
            aria-label={`${filename} editor`}
            className="code-surface min-h-full flex-1 resize-none bg-transparent px-4 py-3 text-zinc-100 outline-none"
            style={{ fontSize, lineHeight: `${fontSize * 1.62}px` }}
          />
        </div>
      </div>

      <div className="flex items-center gap-1.5 border-y border-hairline px-3 py-2">
        {[
          { icon: Copy, label: copied ? 'Copied' : 'Copy code', action: copy },
          { icon: ImageIcon, label: 'Screenshot', action: () => undefined },
          { icon: RotateCcw, label: 'Reset code', action: () => setCode(initial) },
          { icon: ZoomIn, label: 'Increase font size', action: () => setFontSize((s) => Math.min(s + 1, 20)) },
          { icon: ZoomOut, label: 'Decrease font size', action: () => setFontSize((s) => Math.max(s - 1, 11)) },
          { icon: Settings2, label: 'Editor settings', action: () => undefined },
        ].map((tool) => (
          <button
            key={tool.label}
            type="button"
            title={tool.label}
            aria-label={tool.label}
            onClick={tool.action}
            className="flex size-7 items-center justify-center rounded-md border border-hairline bg-white/[0.04] text-zinc-400 transition-colors hover:bg-white/[0.09] hover:text-white"
          >
            <tool.icon className="size-3.5" />
          </button>
        ))}

        <div className="ml-auto flex items-center gap-2">
          <button
            type="button"
            onClick={run}
            className="flex h-8 items-center gap-1.5 rounded-lg border border-hairline bg-white/[0.06] px-3.5 text-[12.5px] font-semibold text-zinc-100 transition-colors hover:bg-white/[0.12]"
          >
            <Play className="size-3 fill-current" />
            Run
          </button>
          <button
            type="button"
            onClick={onSubmit}
            className="h-8 rounded-lg px-4 text-[12.5px] font-bold text-white transition-opacity hover:opacity-90"
            style={{ backgroundColor: accent }}
          >
            Submit answer
          </button>
        </div>
      </div>

      <div className="flex h-[42%] min-h-[160px] flex-col">
        <p className="px-4 py-2.5 font-mono text-[11.5px] text-zinc-400">Terminal</p>
        <div className="min-h-0 flex-1 overflow-auto px-4 pb-4">
          {output ? (
            <pre
              className={`code-surface whitespace-pre-wrap ${
                output.error ? 'text-amber-300' : 'text-emerald-300'
              }`}
            >
              {output.lines.join('\n')}
            </pre>
          ) : (
            <div className="flex h-full flex-col items-center justify-center gap-2 text-zinc-600">
              <span className="font-mono text-[15px]">&lt; &gt;</span>
              <p className="font-mono text-[11.5px]">
                Click <span className="font-bold text-zinc-400">Run</span> to view your results
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
