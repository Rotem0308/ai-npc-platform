"use client";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

interface Dialogue {
  id: number;
  text: string;
}

interface Npc {
  name: string;
  role: string;
  personality: string;
  dialogue: Dialogue[];
}

export function NpcCard({ npc }: { npc: Npc }) {
  return (
    <Card className="bg-gradient-to-br from-slate-900 to-slate-800 text-white shadow-lg border border-slate-700 rounded-2xl">
      <CardHeader>
        <CardTitle className="text-xl font-semibold">
          {npc.name} — {npc.role}
        </CardTitle>
        <p className="text-sm text-slate-400">{npc.personality}</p>
      </CardHeader>
      <CardContent className="space-y-4">
        <h3 className="font-semibold text-blue-400">Dialogue</h3>
        <div className="space-y-3">
          {npc.dialogue.map((line) => (
            <div
              key={line.id}
              className="p-3 bg-slate-700/40 rounded-lg border border-slate-600 text-sm"
            >
              <span className="text-blue-300 font-semibold">#{line.id}</span>{" "}
              {line.text}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
