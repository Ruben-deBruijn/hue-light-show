import { colorsDefault } from "./colors/colors";

export const theme = {
    palette: {
        ...colorsDefault,
    },
    text: {
        h1: 22,
        h2: 20,
        h3: 18,
        body1: 14,
        body2: 12,
        caption: 10,
    },
    border: (width = 1, color) => `${width}px solid ${color}`,
};