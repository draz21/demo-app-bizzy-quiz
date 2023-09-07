export const ShuffleArray = (array: string[]) => { 
    return array.sort(() => Math.random() - 0.5); 
}; 

