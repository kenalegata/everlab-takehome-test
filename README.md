# Overview

Node version used v18.19.0
Just run `npm install` to install all dependencies then you should be ready to go.

First screen will show you an upload feature that only accepts 1 file and with extension `oru.txt`.
Second screen will show you the extracted data from oru file.
It shows a brief info of the patient and its recent medical history. Which I suppose the first thing that the doctor needs.
It list down all of the OBX and checks the result based on the given value and reference range.
It gives a result of 'Good' and 'Needs observation' depending on the result.
It gives a suggestion of which Diagnostic and Diagnostic Group to the doctor.
It also gives no result if the OBX has no value and reference range.

If you check in the console, you should be able to see a stringified version of the parsed oru file.

