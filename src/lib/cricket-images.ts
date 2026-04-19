// Import cricket player images from assets
import batsmanImg from "@/assets/batsman_avatar.jpg";
import bowlerImg from "@/assets/bowler.jpg";
import wicketKeeperImg from "@/assets/weeket_keeper_avatar.webp";

// Available cricket player images from assets
const cricketImages = [
  batsmanImg,
  bowlerImg,
  wicketKeeperImg,
];

export const getRandomCricketImage = (): string => {
  const randomIndex = Math.floor(Math.random() * cricketImages.length);
  return cricketImages[randomIndex];
};

// Get image based on player ID (consistent for same player)
export const getCricketImageForPlayer = (playerId: string | number): string => {
  const idNumber = typeof playerId === 'string' ? parseInt(playerId, 10) : playerId;
  const index = idNumber % cricketImages.length;
  return cricketImages[index];
};

// Get player image from assets/players folder, fallback to dummy image
export const getPlayerImageUrl = (playerId: string | number, playerName?: string): string => {
  const imageUrl = `/assets/players/${playerId}.jpg`;
  return imageUrl;
};
