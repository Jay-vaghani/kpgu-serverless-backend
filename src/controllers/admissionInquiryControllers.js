const { google } = require("googleapis");


module.exports.admissionInquiry = async (req, res) => {

    const { name, email, category, number, state, city, CourseAfterOption, CoursesAfterSelected } = req.body;


    function formatDateIndianStyle(date) {
        const day = date.getDate().toString().padStart(2, "0"); // Get the day with leading zero if needed
        const month = (date.getMonth() + 1).toString().padStart(2, "0"); // Get the month with leading zero if needed
        const year = date.getFullYear(); // Get the full year
        const Hours = new Date().getHours().toString().padStart(2, "0"); //Get the Hours;
        const Minutes = new Date().getMinutes().toString().padStart(2, "0"); //Get the Minutes;
        const Seconds = new Date().getSeconds().toString().padStart(2, "0"); //Get the Seconds;

        return `${day}/${month}/${year}: ${Hours}:${Minutes}:${Seconds}`; // Return the date string in "d/m/yyyy" format with Hour Minutes And Seconds
    }

    const formattedDate = formatDateIndianStyle(new Date());

    const auth = new google.auth.GoogleAuth({
        keyFile: "google-sheets-credentials.json",
        scopes: "https://www.googleapis.com/auth/spreadsheets",
    });

    const client = await auth.getClient();

    const googleSheets = google.sheets({ version: "v4", auth: client });

    // Write vales in spreed sheets
    await googleSheets.spreadsheets.values
        .append({
            auth,
            spreadsheetId: process.env.SPREADSHEET_ID,
            range: "Admission Inquiry",
            valueInputOption: "USER_ENTERED",
            resource: {
                values: [
                    [
                        formattedDate,
                        name.toUpperCase(),
                        email.toLowerCase(),
                        number,
                        category.toUpperCase(),
                        state.toUpperCase(),
                        city.toUpperCase(),
                        CourseAfterOption.toUpperCase(),
                        CoursesAfterSelected.toUpperCase(),
                    ],
                ],
            },
        }).then(() => {
            return (
                res.status(200).json({
                    success: true,
                    message: "Form Submitted Successfully",
                })
            )
        }).catch(() => {
            return (
                res.status(500).json({
                    success: false,
                    error,
                    message: "There Seems To be Some Problem Please Try Again Later",
                })
            )
        })
}
