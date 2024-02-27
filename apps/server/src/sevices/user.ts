
export interface Avatar {
    name: string;
    animal: string;
    color: string;
}

export interface User {
    socketId: string;
    active: boolean;
    avatar: Avatar;
}

const generatedNames: Set<string> = new Set();


const animals: string[] = [
    "Frog",
    "Dragon",
    "Otter",
    "Fishy",
    "Hippo",
    "Cat",
    "Bird",
    "Spider",
    "Horse",
    "Kiwi",
];

const adjectives: string[] = [
    "Majestic",
    "Fierce",
    "Gentle",
    "Swift",
    "Graceful",
    "Radiant",
    "Spirited",
    "Elegant",
    "Vibrant",
    "Brilliant",
    "Dazzling",
    "Fearless",
    "Resilient",
    "Stunning",
    "Regal",
    "Enchanting",
    "Mysterious",
    "Serene",
    "Exquisite",
    "Whimsical",
];

const getRandomInt = (min: number, max: number): number => {
    return Math.floor(Math.random() * (max - min) + min);
};

function getRandomColor() {
    const colors = ['#ff00ff', '#800080', '#135ca4', '#0074e6', '#00b2d6', '#82aeda', '#73e6da', '#41c074', '#fff200', '#78be20', '#968e00', '#3d6d00', '#4e9154', '#8a0000', '#ff0000', '#da3f5a', '#da5656', '#a55e2a', '#ffa500', '#f5deb3', '#ffc0cb'];
    const randomIndex = Math.floor(Math.random() * colors.length);
  
    return colors[randomIndex];
  }

const generateAvatar = (): Avatar => {
    let uniqueName: string;
    let uniqueAvatar: Avatar;
    do {
        const randomAnimalKey = getRandomInt(0, animals.length);
        const randomAnimal = animals[randomAnimalKey];
        const randomColor = getRandomColor();
        const randomAdjective = adjectives[getRandomInt(0, adjectives.length)];
        uniqueName = `${randomAdjective} ${randomAnimal}`;
        uniqueAvatar = {name: uniqueName, animal: randomAnimal || "", color: randomColor};
    } while (generatedNames.has(uniqueName));
    generatedNames.add(uniqueName);
    return uniqueAvatar;
};

export const createUser = (socketId: string): User => {
    const uniqueAvatar = generateAvatar();
    return {socketId, active: true, avatar: uniqueAvatar};
};
