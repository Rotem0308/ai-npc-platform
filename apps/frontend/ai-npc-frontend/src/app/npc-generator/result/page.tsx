"use client";

import { NpcCard } from "@/components/npc-card";
import { QuestCard } from "@/components/quest-card";

export default function GeneratorResultPage() {
  const data = {
    npc: {
      name: "rotem",
      role: "king",
      personality: "cheerful",
      dialogue: [
        {
          id: 1,
          text: "Ah, a new face! Welcome, friend! Though my heart is heavy, my spirit remains hopeful.",
        },
        {
          id: 2,
          text: "A young one, known only as 'the child of no one', has vanished from the village outskirts. My people are worried sick.",
        },
        {
          id: 3,
          text: "Could you lend your aid in finding them? It would bring great joy to my kingdom and ease my troubled mind.",
        },
      ],
    },
    quest: {
      title: "The Lost Child",
      description:
        "A young, unnamed child has gone missing from the village. King Rotem seeks a brave soul to find them and bring them back safely.",
      objectives: [
        "Speak to the villagers near the market for clues.",
        "Search the Whispering Woods at the edge of the village.",
        "Locate the lost child.",
        "Escort the child back to King Rotem.",
      ],
      rewards: [
        "500 Gold",
        "1500 Experience",
        "King's Favor (Minor Reputation)",
      ],
      difficulty: "Medium",
      connections: ["rotem"],
    },
  };

  return (
    <div className="min-h-screen bg-slate-950 p-8 text-white">
      <h1 className="text-3xl font-bold mb-8 text-center text-blue-400">
        Generated NPC & Quest
      </h1>
      <div className="max-w-4xl mx-auto grid gap-8 md:grid-cols-2">
        <NpcCard npc={data.npc} />
        <QuestCard quest={data.quest} />
      </div>
    </div>
  );
}
