export interface MedicalHistoryCardProps {
    name: string;
    observationValue: string | number;
    referenceRange: string;
    unitIdentifier: string;
    unitText: string;
    result: string;
    diagnostic?: string;
    diagnosticGroups?: string;
}