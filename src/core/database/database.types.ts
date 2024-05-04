export interface DiagnosticMetric {
    name: string;
    oru_sonic_codes: string;
    diagnostic: string;
    diagnostic_groups: string;
    oru_sonic_units: string;
    units: string;
    min_age: number | string;
    max_age: number | string;
    gender: string;
    standard_lower: number | string;
    standard_higher: number | string;
    everlab_lower: number | string;
    everlab_higher: number | string;
}