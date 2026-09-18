export const getRatingColor = (rating: number) => {
    if (rating >= 7.5) return "text-green-500";
    if (rating >= 5) return "text-yellow-500";
    return "text-red-500";
};

export const getRatingString = (rating: number) => {
    return rating.toFixed(1);
}
