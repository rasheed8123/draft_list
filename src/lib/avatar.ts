// Generate dummy avatar URLs using UI avatars service
export const getDummyAvatar = (name: string, size: number = 200): string => {
  const encodedName = encodeURIComponent(name);
  return `https://ui-avatars.com/api/?name=${encodedName}&size=${size}&background=random&color=fff&font-size=0.4&bold=true`;
};

// Alternative: Generate a gradient background color based on name
export const getColorFromName = (name: string): string => {
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  const hue = hash % 360;
  return `hsl(${hue}, 70%, 60%)`;
};
