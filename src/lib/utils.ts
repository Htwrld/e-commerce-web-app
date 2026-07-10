import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}

export const reduceWords = (str: string, maxLength: number) => {
    if (str.length <= maxLength) return str
    const words = str.split(" ")
    if (maxLength === 0) return words.join(" ")
    if (words.length <= maxLength) return str
    return words.slice(0, maxLength).join(" ") + "..."
}
