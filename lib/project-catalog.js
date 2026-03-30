export const PROJECT_CATALOG = [
  {
    slug: 'project-dragonsight',
    index: '01',
    title: 'Project Dragonsight',
    status: 'In Progress',
    eyebrow: 'Project route // RPG analytics in motion',
    summary: 'Understanding and Guiding RPGs through AI analytics and generation.',
    tags: ['RPG', 'AI', 'Analytics', 'Generation'],
    sections: [
      {
        title: 'Project Overview',
        paragraphs: [
          "I called this Project Dragonsight because it was originally focused on Dungeons & Dragons, but it's really about RPGs in general. The goal is to use AI to analyze and generate content for RPGs, with a focus on improving the player experience and providing tools for game masters.",
          "While the core of the system is focused on the Transcription engine, and analysing the data that comes from that, it's not limited to that. I realised that once I'd broken down the essence of what a session was, that there was the abiity to use that information to gather detailled analytics on the game. Enough to make any data science nerd going, anyway. But also to use that information to give the user the ability to generate content that's tailored more intimately to their game, more so than many other generation tools.",
          "When it's complete, the intention is that a user will be able to ingest a transcription of a session using a variety of methods or services, and then get feedback from the system on important metrics and insights, as well as being able to use it to generate content for their game, such as NPCs, quests, enounters and more that are tailored to the specific needs of their game and players.",
        ],
      },
      {
        title: 'Transcribing',
        status: 'In Progress',
        paragraphs: [
          "Here's the big idea: what is Session? You've got a group of people sitting around, talking, joking, playing and interrupting each other. That's a lot to break down. Using various techniques though, you can crystallise it down into a series of interactions with varying degrees of confidence - The Paladin believes that the Mayor is a Vampire. The Wizard blew up the Shining Beam Tavern with a Fireball and he didn't ask the size of the room. The Rogue stole the Gem of Eternal Disappointment from the Cultist and planted it on the Mayor. Interactions that all build a storied web. Put these into a database of linked interactions and you can start to build a picture in data of truth, fiction, myth and speculation as well as the rich and storied history for people and places.",
          "The main challenge is to clean the data and that's where Agentic AI comes in. Using this new technology, we can scrub the data and extract real value."
        ],
      },
      {
        title: 'Analytics',
        status: 'Roadmap',
        paragraphs: [
          "As a Game Master, I often wonder not only about my performance at the table, but also the experience of my players. Are there times that I speak too much? Do not given enough time to some of the quieter ones? Is there someone who generally is disruptive, but you can't put your finger on exactly what their problem is? The crux of this will be to analyse the interactions of the session and produce useful insights into the game, and not just who talked for the longest and who wouldn't shut up about snacks",
        ],
      },
      {
        title: 'Content Generation',
        status: 'Roadmap',
        paragraphs: [
          "Everyone who's ran a roleplaying game has turned to a generator at some point. NPC names. Loot tables. Quest hooks. It's not a path that's gone untrodden. Now, what if you could ground that firmly in the firmament of the information of your campaign? Generate items, quests, NPCs and more that are tailored specifically to your vision of the world and the needs of your plotlines.",
          "That's what I intend to find out."
        ],
      },
      {
        title: 'Methodology',
        paragraphs: [
          '- Ingest transcriptions, notes, or other structured data about the RPG session and turn it into structured data using Agentic AI.',
          '- Once stored, analyse the information to extract insights on the session performance.',
          '- Simultaneously, update the knowledge base of the Characters, Places, NPCs and more that are relevant to the game.',
          '- Use the information to generate content for the game, such as NPCs, quests, encounters and more that are tailored to the specific needs of the game and players.',
          '- Playtest on my own guinea pigs... err, friends.',
          '- Profit'
        ],
      },
    ],
  },
]

export function getProjectBySlug(slug) {
  return PROJECT_CATALOG.find((project) => project.slug === slug)
}
