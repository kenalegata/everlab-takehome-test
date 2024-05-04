import { SEGMENT_FIELDS, SEGMENT_SUBFIELDS } from "../../constants/segments";

const mapSegment = (data: string, fieldSeparator: string, segmentID: string) => {
    const dataToArray = data.split(fieldSeparator);
    return dataToArray.reduce((prev, cur, index) => {
        if (cur.includes('^') && index >= 2) {
            const mappedCur = cur.split('^')
            const cleanedMappedCur = mappedCur.filter(item => item !== '');
            const mappedSubField = cleanedMappedCur.reduce((prevSub, curSub, indexSub) => {
                const subfields = SEGMENT_SUBFIELDS[segmentID]
                const subfield = subfields[SEGMENT_FIELDS[segmentID][index]]
    
                return {
                    ...prevSub,
                    [subfield[indexSub]]: curSub
                }
            }, {})
    
            return {
                ...prev,
                [SEGMENT_FIELDS[segmentID][index]]: mappedSubField
            }
        }
    
        return {
            ...prev,
            [SEGMENT_FIELDS[segmentID][index]]: cur
        }
    }, {})
}


const parseMSH = (data: string) => {
    const fieldSeparator = data.charAt(3);
    const dataToArray = data.split(fieldSeparator);
    const mappedData = dataToArray.reduce((prev, cur, index) => {
        if (cur.includes('^') && index >= 2) {
            const mappedCur = cur.split('^')
            const mappedSubField = mappedCur.reduce((prevSub, curSub, indexSub) => {
                const subfields = SEGMENT_SUBFIELDS['MSH']
                const subfield = subfields[SEGMENT_FIELDS['MSH'][index]]

                return {
                    ...prevSub,
                    [subfield[indexSub]]: curSub
                }
            }, {})

            return {
                ...prev,
                [SEGMENT_FIELDS['MSH'][index]]: mappedSubField
            }
        }

        return {
            ...prev,
            [SEGMENT_FIELDS['MSH'][index]]: cur
        }
    }, {
        'Field Separator': fieldSeparator
    })

    return mappedData;
}

const parsePID = (data: string, fieldSeparator: string) => {
    const mappedData = mapSegment(data, fieldSeparator, 'PID')
    return mappedData;
}

const parsePV1 = (data: string, fieldSeparator: string) => {
    const mappedData = mapSegment(data, fieldSeparator, 'PV1')
    return mappedData;
}

const parseORC = (data: string, fieldSeparator: string) => {
    const mappedData = mapSegment(data, fieldSeparator, 'ORC')
    return mappedData;
}

const parseOBR = (data: string, fieldSeparator: string) => {
    const mappedData = mapSegment(data, fieldSeparator, 'OBR')
    return mappedData;
}

const parseOBX = (data: string, fieldSeparator: string) => {
    const mappedData = mapSegment(data, fieldSeparator, 'OBX')
    return mappedData;
}

export const hl7parser = {
    gethl7content: (result: any) => {
          const parsedToArray = result?.toString().split(/\r\n/);
          let messageIndex = 0;

          const parsedResult = parsedToArray?.reduce((prev: any, cur: string) => {
            const code = cur.substring(0, 3)
            
            switch (code){
                case 'MSH':
                    const parsedMSH = parseMSH(cur)
                    messageIndex++;
                    
                    return [
                        ...prev,
                        [
                            parsedMSH
                        ]
                    ]
                case 'PID':
                    const parsedPID = parsePID(cur, prev[messageIndex-1][0]['Field Separator'])
                    prev[messageIndex-1].push({
                        ...parsedPID
                    });
                    return prev
                case 'PV1':
                    const parsedPV1 = parsePV1(cur, prev[messageIndex-1][0]['Field Separator'])
                    prev[messageIndex-1].push({
                        ...parsedPV1
                    });
                    return prev
                case 'ORC':
                    const parsedORC = parseORC(cur, prev[messageIndex-1][0]['Field Separator'])
                    prev[messageIndex-1].push({
                        ...parsedORC
                    });
                    return prev
                case 'OBR':
                    const parsedOBR = parseOBR(cur, prev[messageIndex-1][0]['Field Separator'])
                    prev[messageIndex-1].push({
                        ...parsedOBR
                    });
                    return prev
                case 'OBX':
                    const parsedOBX = parseOBX(cur, prev[messageIndex-1][0]['Field Separator'])
                    prev[messageIndex-1].push({
                        ...parsedOBX
                    });
                    return prev
                default:
                    return prev
            }
          },[])

          return parsedResult;
    }
}