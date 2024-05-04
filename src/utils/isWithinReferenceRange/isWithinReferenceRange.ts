export const isWithinReferenceRange = (observationValue: string, referenceRange: string) => {
    const [lowerBound, upperBound] = referenceRange.split('-').map(parseFloat);
    const value = parseFloat(observationValue);
    
    return value >= lowerBound && value <= upperBound;
}