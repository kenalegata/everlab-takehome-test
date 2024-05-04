import { Avatar, Card, CardContent, CardHeader, Typography } from "@mui/material"
import { PatientCardProps } from "./PatientCard.types"
import { red } from "@mui/material/colors"

export const PatientCard = ({ id, ssnNumber, phoneNumber, name, dob }: PatientCardProps) => {
    return (
        <Card>
            <CardHeader
                avatar={
                    <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                        {name?.charAt(0)}
                    </Avatar>
                }
                subheader={id}
                title={name}
            />
            <CardContent>
                <Typography variant="body2" gutterBottom>SSN Number: {ssnNumber}</Typography>
                <Typography variant="body2" gutterBottom>Date of Birth: {dob}</Typography>
                <Typography variant="body2">Phone Number: {phoneNumber}</Typography>
            </CardContent>
        </Card>
    )
}