import { useEffect, useState } from 'react'
import './App.css'
import { FileUpload } from './components'
import { hl7parser, diagnosticMetrics } from './core';
import { Box, CssBaseline, Grid, ThemeProvider, createTheme } from '@mui/material';
import { SEGMENT_CONSTANTS } from './constants/segments';
import { PatientCard, PatientCardProps } from './components/PatientCard';
import { MedicalHistoryCard } from './components';
import { isWithinReferenceRange } from './utils';


const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

function App() {
  const [patientMedicalRecord, setPatientMedicalRecord] = useState(null)
  const [patientIdentification, setPatientIdentification] = useState({})
  const [simplePatientIdentification, setSimplePatientIdentification] = useState<PatientCardProps>({});
  const [latestOBX, setLatestOBX] = useState([]);

  const gethl7Content = async (file: Blob[]) => {
    const reader = new FileReader()
    
    reader.onload = () => {
      const result = reader.result
      const parsehl7 = hl7parser.gethl7content(result);
      const PID = parsehl7[0][1]

      console.log('parsehl7', JSON.stringify(parsehl7, null, 4))

      const joinedName = `${PID[SEGMENT_CONSTANTS.PID.PATIENT_NAME]['Family Name']}, ${PID[SEGMENT_CONSTANTS.PID.PATIENT_NAME]['Given Name']} ${PID[SEGMENT_CONSTANTS.PID.PATIENT_NAME]['Prefix']}`
      const simpleDob = new Date(Number(PID[SEGMENT_CONSTANTS.PID.DATE_TIME_OF_BIRTH])).toLocaleDateString('en-US', {
        day: 'numeric',
        month: 'short',
        year: 'numeric'
      });;

      const simplePatientIdentificationMap = {
        id: PID[SEGMENT_CONSTANTS.PID.PATIENT_ID],
        ssnNumber: PID[SEGMENT_CONSTANTS.PID.SSN_NUMBER_PATIENT],
        phoneNumber: PID[SEGMENT_CONSTANTS.PID.PHONE_NUMBER_HOME]['Local Number'],
        name: joinedName,
        dob: simpleDob,
      }

      const latestOBX = parsehl7[0].filter((item: { segment: string; }) => item.segment === 'OBX')
      const mappedLatestOBX = latestOBX.map((item: { [x: string]: any; }) => {
        const diagnostic = diagnosticMetrics.find(diagnosticMetricsItem => diagnosticMetricsItem.oru_sonic_codes.includes(item[SEGMENT_CONSTANTS.OBX.OBSERVATION_IDENTIFIER]['Text']))
        const isWithinRange = (item[SEGMENT_CONSTANTS.OBX.OBSERVATION_VALUE] && item[SEGMENT_CONSTANTS.OBX.REFERENCES_RANGE]) ? isWithinReferenceRange(item[SEGMENT_CONSTANTS.OBX.OBSERVATION_VALUE], item[SEGMENT_CONSTANTS.OBX.REFERENCES_RANGE]) ? 'Good' : 'Needs observation' : 'No result'

        return {
          name: diagnostic?.name,
          referenceRange: item[SEGMENT_CONSTANTS.OBX.REFERENCES_RANGE],
          unitText: item[SEGMENT_CONSTANTS.OBX.UNITS]['Text'],
          unitIdentifier: item[SEGMENT_CONSTANTS.OBX.UNITS]['Identifier'],
          observationValue: item[SEGMENT_CONSTANTS.OBX.OBSERVATION_VALUE],
          result: isWithinRange,
          ...isWithinRange !== 'Good' && {
            diagnostic: diagnostic?.diagnostic,
            diagnosticGroups: diagnostic?.diagnostic_groups,
          }
        }
      })

      setSimplePatientIdentification(simplePatientIdentificationMap)
      setPatientIdentification(PID)
      setPatientMedicalRecord(parsehl7)
      setLatestOBX(mappedLatestOBX);
    }

    reader.readAsText(file[0])
  }

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <div style={{ padding: 40 }}>
        {patientMedicalRecord ? (
          <Grid container spacing={2}>
            <Grid item xs={3}>
              <PatientCard
                id={simplePatientIdentification.id}
                ssnNumber={simplePatientIdentification.ssnNumber}
                phoneNumber={simplePatientIdentification.phoneNumber}
                name={simplePatientIdentification.name}
                dob={simplePatientIdentification.dob}
              />
              <Box my={2}>
              </Box>
            </Grid>
            <Grid item xs={9}>
              <Box>
                <MedicalHistoryCard title={'Recent Medical History'} data={latestOBX}/>
              </Box>
            </Grid>
          </Grid>
        ) : (
          <FileUpload onChange={gethl7Content}/>
        )}
      </div>
    </ThemeProvider>
  );
}

export default App;
