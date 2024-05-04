import { Card, CardHeader, Avatar, CardContent, Typography, Divider, Box, Grid } from "@mui/material"
import { MedicalHistoryCardProps } from "./MedicalHistoryCard.types"

export const MedicalHistoryCard = ({ title, data }: { title: string, data: MedicalHistoryCardProps[] }) => {
    return (
        <Card>
            <CardHeader
                title={title}
            />
            <CardContent>
                {data?.map((item: MedicalHistoryCardProps, index) => (
                    <Box mb={4} key={index}>
                        <Grid container spacing={4}>
                            <Grid item xs={6}>
                                <Typography variant="body2" gutterBottom>Diagnostic Name: {item?.name}</Typography>
                                <Typography variant="body2" gutterBottom>Value: {item?.observationValue}</Typography>
                                <Typography variant="body2" gutterBottom>Referene Range: {item?.referenceRange}</Typography>
                            </Grid>
                            <Grid item xs={6}>
                                <Typography variant="body2" gutterBottom>Unit: {item?.unitText}</Typography>
                                <Typography variant="body2" gutterBottom>Result: {item?.result}</Typography>
                            </Grid>
                            {item?.diagnostic && (
                                <Grid item xs={12}>
                                    <Typography variant="body2" gutterBottom>Suggested Diagnostic: {item?.diagnostic}</Typography>
                                    <Typography variant="body2" gutterBottom>Suggested Diagnostic Groups: {item?.diagnosticGroups}</Typography>
                                </Grid>
                            )}
                        </Grid>
                        <Divider />
                    </Box>
                ))}
            </CardContent>
        </Card>
    )
}