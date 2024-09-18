export function getFillDuration(startTime: number, endTime: number): string {
    let milliseconds: number = endTime - startTime;
    let seconds: number = Math.floor(milliseconds / 1000);
    return Math.floor(seconds / 3600) + ":" + Math.floor(seconds / 60 % 60) + ":" + (seconds % 60)
}