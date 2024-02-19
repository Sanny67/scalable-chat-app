
export interface Avatar {
    name: string;
    icon: string;
    color: string;
}

export interface User {
    socketId: string;
    avatar: Avatar;
}

const generatedNames: Set<string> = new Set();

const icons: string[] = [
    "faFrog",
    "faDragon",
    "faOtter",
    "faFishFins",
    "faHippo",
    "faCat",
    "faDove",
    "faSpider",
    "faHorse",
    "faKiwiBird",
];

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
    // Generate random values for red, green, and blue components
    const red = Math.floor(Math.random() * 256);
    const green = Math.floor(Math.random() * 256);
    const blue = Math.floor(Math.random() * 256);
    
    // Construct the color string in hexadecimal format
    const color = `#${red.toString(16)}${green.toString(16)}${blue.toString(16)}`;
    
    return color;
};

const generateAvatar = (): Avatar => {
    let uniqueName: string;
    let uniqueAvatar: Avatar;
    do {
        const randomAnimalKey = getRandomInt(0, animals.length);
        const randomAnimal = animals[randomAnimalKey];
        const randomIcon = icons[randomAnimalKey];
        const randomColor = getRandomColor();
        const randomAdjective = adjectives[getRandomInt(0, adjectives.length)];
        uniqueName = `${randomAdjective} ${randomAnimal}`;
        uniqueAvatar = {name: uniqueName, icon: randomIcon || "", color: randomColor};
    } while (generatedNames.has(uniqueName));
    generatedNames.add(uniqueName);
    return uniqueAvatar;
};

export const createUser = (socketId: string): User => {
    const uniqueAvatar = generateAvatar();
    return {socketId, avatar: uniqueAvatar};
};
