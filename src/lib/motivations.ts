// Random motivational and cricket-related quotes
export const motivationalQuotes = [
  "Every great player started from where you are now.",
  "Greatness is not achieved overnight, it's built with dedication.",
  "Champions are made in the moments when they're pushed beyond their limits.",
  "Your only limit is your mind. Think big, play bigger.",
  "Success in cricket is 10% talent and 90% hard work.",
  "The bat speaks louder than words. Let your performance do the talking.",
  "Cricket teaches us patience, strategy, and the value of teamwork.",
  "Every boundary crossed is a step towards excellence.",
  "Believe in yourself, and the crowd will believe in you.",
  "A true cricketer is defined by their character, not just their runs.",
  "The pitch doesn't care about your past, only your present.",
  "Victory favors the prepared mind.",
  "Your determination is your greatest weapon on the field.",
  "In cricket, as in life, timing is everything.",
  "Pressure is a privilege reserved for champions.",
  "Every wicket taken is proof of your skill and strategy.",
  "Rise above the noise and focus on the game.",
  "The journey of a thousand runs begins with a single boundary.",
  "Champions don't give up, they give more.",
  "Your potential is limitless when you believe.",
];

export const getRandomMotivation = (): string => {
  const randomIndex = Math.floor(Math.random() * motivationalQuotes.length);
  return motivationalQuotes[randomIndex];
};
