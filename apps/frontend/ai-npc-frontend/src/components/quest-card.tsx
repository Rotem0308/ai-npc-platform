"use client";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

interface Quest {
  title: string;
  description: string;
  objectives: string[];
  rewards: string[];
  difficulty: string;
  connections: string[];
}

export function QuestCard({ quest }: { quest: Quest }) {
  return (
    <Card className="bg-gradient-to-br from-emerald-900 to-emerald-800 text-white shadow-lg border border-emerald-700 rounded-2xl">
      <CardHeader>
        <CardTitle className="text-xl font-semibold">{quest.title}</CardTitle>
        <p className="text-sm text-emerald-300">{quest.difficulty}</p>
      </CardHeader>
      <CardContent className="space-y-5">
        <div>
          <h3 className="font-semibold text-emerald-400">Description</h3>
          <p className="text-sm mt-2 text-emerald-100">{quest.description}</p>
        </div>

        <div>
          <h3 className="font-semibold text-emerald-400">Objectives</h3>
          <ul className="list-disc list-inside text-sm mt-2 text-emerald-100 space-y-1">
            {quest.objectives.map((obj, i) => (
              <li key={i}>{obj}</li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="font-semibold text-emerald-400">Rewards</h3>
          <ul className="list-disc list-inside text-sm mt-2 text-emerald-100 space-y-1">
            {quest.rewards.map((reward, i) => (
              <li key={i}>{reward}</li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="font-semibold text-emerald-400">Connections</h3>
          <p className="text-sm mt-2 text-emerald-100">
            {quest.connections.join(", ")}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
