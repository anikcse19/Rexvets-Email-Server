const express = require("express");
const nodemailer = require("nodemailer");
const cors = require("cors"); // Import CORS
require("dotenv").config(); // Load environment variables from .env file
const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors()); // Enable CORS for all routes
app.use(express.json()); // Middleware to parse JSON bodies

// Setup Nodemailer with Brevo SMTP configuration
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  auth: {
    user: process.env.SMTP_USER, // Using environment variable for user
    pass: process.env.SMTP_PASSWORD, // Using environment variable for password
  },
  debug: true, // Enable debug output
  logger: true, // Log to console
});
const moment = require("moment-timezone");

// Configura el huso horario de Miami

// Importar Firebase Admin SDK
const admin = require("firebase-admin");
const serviceAccount = require("./serviceAccountKey.json");
// Inicializar Firebase Admin
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://rexvets-database.firebaseio.com",
});

const db = admin.firestore();

// EMAILS

app.post("/sendWelcomeEmailParent", (req, res) => {
  console.log("Received request to send welcome email:", req.body); // Log incoming request data
  const { email, name } = req.body;

  const mailOptions = {
    from: "support@rexvets.com",
    to: email,
    subject: "Welcome to Rex Vets!",
    html: `
            <h1>Welcome to Rex Vets!</h1>
            <p>Dear ${name},</p>
            <p>Welcome to Rex Vets and thank you for choosing us for your pet's healthcare needs. We're thrilled to have you on board and look forward to helping you and your furry friend live happier, healthier lives.</p>
            <p>You're now part of a community of pet lovers who are committed to providing the best care for their pets. To schedule your first video call with one of our experienced veterinarians, simply visit the "Home" tab in your account and click "Book a video call", and you'll be on your way to a virtual appointment.</p>
            <p>If you have any questions or need assistance at any point along the way, please don't hesitate to reach out to our dedicated support team at support@rexvets.com. We're here to make your experience with Rex Vets as seamless and enjoyable as possible.</p>
            <p>Thank you once again for choosing Rex Vets. We can't wait to assist you in providing the best possible care for your pet.</p>
            <p>Warm regards,<br>The Team at Rex Vets</p>
    
            <!-- Add logo here -->
            <p><img src="https://www.rexvets.com/static/media/Logo.c536919c80b8ff104089.png" alt="Rex Vets Logo" width="150" /></p>
        `,
  };
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log("Error sending email:", error); // Log email sending error
      return res.status(500).send({ message: "Failed to send email" });
    }
    console.log("Email sent:", info.response); // Log email success
    res.send({ message: "Welcome email sent successfully!" });
  });
});

// Route to send booking confirmation emails
app.post("/sendBookingConfirmation", async (req, res) => {
  console.log("Received request to send booking confirmation:", req.body); // Log incoming request data
  const {
    doctorEmail,
    doctorName,
    parentEmail,
    parentName,
    petName,
    appointmentDate,
    appointmentTime,
    meetingLink,
  } = req.body;
  console.log(
    doctorEmail,
    doctorName,
    parentEmail,
    parentName,
    petName,
    appointmentDate,
    appointmentTime,
    meetingLink
  );

  // Email content for doctor (same copy as for parents)
  // Email content for doctor
  const mailOptionsDoctor = {
    from: "support@rexvets.com",
    to: doctorEmail,
    subject: "Appointment Confirmation - Rex Vets",
    html: `
            <p>Dear ${doctorName},</p>

            <p>We're excited to confirm your upcoming video call appointment with ${parentName} at Rex Vets. Here are the details for your appointment:</p>
            <p><strong>Start Time:</strong> ${appointmentDate} ${appointmentTime}</p>
            <p><strong>Veterinarian:</strong> ${doctorName}</p>
            <p><strong>Parent:</strong> ${parentName}</p>
            <p><strong>Pet Name:</strong> ${petName}</p>
            <p><strong>Meeting Link:</strong> <a href="${meetingLink}">${meetingLink}</a></p>

            <p>Please make sure you're ready for the call at least a few minutes before the scheduled time.</p>

            <p>If you need to reschedule or have any other questions, please feel free to reply to this email or contact our support team at <a href="mailto:support@rexvets.com">support@rexvets.com</a>.</p>

            <p>We thank you for your dedication to pet's care.</p>

            <p>Warm regards,<br>The Team at Rex Vets</p>

            <!-- Add logo here -->
            <p><img src="https://www.rexvets.com/static/media/Logo.c536919c80b8ff104089.png" alt="Rex Vets Logo" width="150" /></p>
        `,
  };

  // Email content for parent (same copy as for doctors)
  const mailOptionsParent = {
    from: "support@rexvets.com",
    to: parentEmail,
    subject: "Your Appointment Confirmation - Rex Vets",
    html: `
            <p>Dear ${parentName},</p>

            <p>We're excited to confirm your upcoming video call appointment with <strong>${doctorName}</strong> at Rex Vets. Here are the details for your appointment:</p>
            <p><strong>Start Time:</strong> ${appointmentDate} ${appointmentTime}</p>
            <p><strong>Veterinarian:</strong> ${doctorName}</p>
            <p><strong>Pet Name:</strong> ${petName}</p>
            <p><strong>Meeting Link:</strong> <a href="${meetingLink}">${meetingLink}</a></p>

            <p>Please make sure you're ready for the call at least a few minutes before the scheduled time. ${doctorName} is here to address any questions or concerns you have about your pet's health.</p>

            <p>If you need to reschedule or have any other questions, please feel free to reply to this email or contact our support team at <a href="mailto:support@rexvets.com">support@rexvets.com</a>.</p>

            <p>We look forward to assisting you with your pet's care.</p>

            <p>Warm regards,<br>The Team at Rex Vets</p>

            <!-- Add logo here -->
            <p><img src="https://www.rexvets.com/static/media/Logo.c536919c80b8ff104089.png" alt="Rex Vets Logo" width="150" /></p>
        `,
  };

  try {
    // Send emails
    await transporter.sendMail(mailOptionsDoctor);
    await transporter.sendMail(mailOptionsParent);

    // Response
    res.send({ message: "Booking confirmation emails sent successfully!" });
    console.log("Booking confirmation emails sent successfully!");

    // IMPORTANT: Store reminder in Firestore instead of using setTimeout
    console.log("🔄 Attempting to schedule reminder in Firestore...");
    try {
      const reminderData = {
        appointmentDate,
        appointmentTime,
        parentEmail,
        parentName,
        doctorName,
        doctorEmail,
        meetingLink,
        scheduledAt: new Date().toISOString(),
        reminderSent: false,
        createdAt: admin.firestore.FieldValue.serverTimestamp(),
      };

      const reminderRef = await db
        .collection("ReminderEmails")
        .add(reminderData);
      console.log(
        "✅ Reminder scheduled in Firestore with ID:",
        reminderRef.id
      );
    } catch (firestoreError) {
      console.error("❌ Error storing reminder in Firestore:", firestoreError);
    }
  } catch (error) {
    console.error("Error sending booking confirmation emails:", error);
    res
      .status(500)
      .send({ message: "Failed to send booking confirmation emails" });
  }
});

// Function to send 10-minute reminder emails to both parent and doctor
async function sendReminderEmails(
  appointmentDate,
  appointmentTime,
  parentEmail,
  parentName,
  doctorName,
  doctorEmail,
  meetingLink
) {
  console.log("📧 Starting to send 10-minute reminder emails...");
  console.log(
    `📝 Appointment details: ${appointmentDate} at ${appointmentTime}`
  );
  console.log(`👨‍⚕️ Doctor: ${doctorName} (${doctorEmail})`);
  console.log(`👤 Parent: ${parentName} (${parentEmail})`);

  // Email template for parent
  const parentReminderEmail = `
    <p>Dear ${parentName},</p>

    <p>This is a friendly reminder that your video call appointment with <strong> ${doctorName}</strong> at Rex Vets is starting in just 10 minutes!</p>
    
    <p><strong>Appointment Details:</strong></p>
    <p><strong>Date & Time:</strong> ${appointmentDate} at ${appointmentTime}</p>
    <p><strong>Veterinarian:</strong> ${doctorName}</p>
    <p><strong>Meeting Link:</strong> <a href="${meetingLink}">${meetingLink}</a></p>

    <p>Please ensure you're ready for the call and have any questions or concerns about your pet prepared for the consultation. ${doctorName} is looking forward to helping you and your furry friend.</p>

    <p>To join your appointment, simply click the meeting link above a few minutes before your scheduled time.</p>

    <p>If you experience any technical difficulties or need to reschedule, please contact our support team immediately at <a href="mailto:support@rexvets.com">support@rexvets.com</a>.</p>

    <p>Thank you for choosing Rex Vets for your pet's healthcare needs.</p>

    <p>Warm regards,<br>The Team at Rex Vets</p>

    <!-- Add logo here -->
    <p><img src="https://www.rexvets.com/static/media/Logo.c536919c80b8ff104089.png" alt="Rex Vets Logo" width="150" /></p>
  `;

  // Email template for doctor
  const doctorReminderEmail = `
    <p>Dear ${doctorName},</p>

    <p>This is a reminder that your video call appointment with <strong>${parentName}</strong> is starting in 10 minutes.</p>
    
    <p><strong>Appointment Details:</strong></p>
    <p><strong>Date & Time:</strong> ${appointmentDate} at ${appointmentTime}</p>
    <p><strong>Client:</strong> ${parentName}</p>
    <p><strong>Meeting Link:</strong> <a href="${meetingLink}">${meetingLink}</a></p>

    <p>Please ensure you're prepared for the consultation and have your notes ready. ${parentName} is counting on your expertise to help with their pet's healthcare needs.</p>

    <p>To join the appointment, click the meeting link above when you're ready.</p>

    <p>If you encounter any technical issues or need assistance, please contact our support team at <a href="mailto:support@rexvets.com">support@rexvets.com</a>.</p>

    <p>Thank you for your dedication to providing excellent veterinary care through Rex Vets.</p>

    <p>Best regards,<br>The Rex Vets Team</p>

    <!-- Add logo here -->
    <p><img src="https://www.rexvets.com/static/media/Logo.c536919c80b8ff104089.png" alt="Rex Vets Logo" width="150" /></p>
  `;

  const parentMailOptions = {
    from: "support@rexvets.com",
    to: parentEmail,
    subject: "Appointment Starting Soon - Rex Vets",
    html: parentReminderEmail,
  };

  const doctorMailOptions = {
    from: "support@rexvets.com",
    to: doctorEmail,
    subject: "Appointment Starting Soon - Rex Vets",
    html: doctorReminderEmail,
  };

  // Send reminder email to parent
  try {
    console.log(`📤 Sending reminder email to parent: ${parentEmail}...`);
    const parentInfo = await transporter.sendMail(parentMailOptions);
    console.log(
      `✅ Reminder email sent successfully to parent: ${parentInfo.response}`
    );
  } catch (error) {
    console.error(
      `❌ Error sending reminder email to parent ${parentEmail}:`,
      error
    );
    throw error;
  }

  // Send reminder email to doctor
  try {
    console.log(`📤 Sending reminder email to doctor: ${doctorEmail}...`);
    const doctorInfo = await transporter.sendMail(doctorMailOptions);
    console.log(
      `✅ Reminder email sent successfully to doctor: ${doctorInfo.response}`
    );
  } catch (error) {
    console.error(
      `❌ Error sending reminder email to doctor ${doctorEmail}:`,
      error
    );
    throw error;
  }

  console.log("🎉 All reminder emails sent successfully!");
}

//RECORDATORIO EMAIL

const TIMEZONE = "America/New_York"; // Configura el huso horario deseado

function scheduleReminderEmail(
  appointmentDate,
  appointmentTime,
  parentEmail,
  parentName,
  doctorName,
  doctorEmail,
  meetingLink
) {
  console.log("Attempting to schedule reminder email.");
  const now = moment().tz(TIMEZONE);

  // Clone the appointmentMoment and subtract 10 minutes
  const appointmentMoment = moment.tz(
    `${appointmentDate} ${appointmentTime}`,
    "YYYY-MM-DD h:mm A",
    TIMEZONE
  );

  console.log(`Current time (${TIMEZONE}): ${now.format("YYYY-MM-DD h:mm A")}`);
  console.log(
    `Appointment time (${TIMEZONE}): ${appointmentMoment.format(
      "YYYY-MM-DD h:mm A"
    )}`
  );

  // Calculate the difference in milliseconds between now and 10 minutes before the appointment
  const appointmentMomentMinus10 = appointmentMoment
    .clone()
    .subtract(10, "minutes");
  console.log(
    `Reminder scheduled for: ${appointmentMomentMinus10.format(
      "YYYY-MM-DD h:mm A"
    )}`
  );

  const timeDifference = appointmentMomentMinus10.diff(now);
  console.log(`Time difference until reminder (ms): ${timeDifference}`);

  if (timeDifference > 0) {
    console.log(
      `Scheduling reminder email for ${parentEmail} in ${timeDifference}ms.`
    );
    setTimeout(() => {
      let EMAILFORPATIENTPREV = `<!DOCTYPE html>
      <html xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office" lang="en">
      <head>
        <title></title>
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <link href="https://fonts.googleapis.com/css?family=Lato" rel="stylesheet" type="text/css">
        <style>
          * { box-sizing: border-box; }
          body { margin: 0; padding: 0; }
          a[x-apple-data-detectors] { color: inherit !important; text-decoration: inherit !important; }
          #MessageViewBody a { color: inherit; text-decoration: none; }
          p { line-height: inherit }
          .desktop_hide, .desktop_hide table { mso-hide: all; display: none; max-height: 0px; overflow: hidden; }
          .image_block img+div { display: none; }
          sup, sub { line-height: 0; font-size: 75%; }
          @media (max-width:660px) {
            .desktop_hide table.icons-inner, .social_block.desktop_hide .social-table {
              display: inline-block !important;
            }
            .icons-inner { text-align: center; }
            .icons-inner td { margin: 0 auto; }
            .mobile_hide { display: none; }
            .row-content { width: 100% !important; }
            .stack .column { width: 100%; display: block; }
            .mobile_hide { min-height: 0; max-height: 0; max-width: 0; overflow: hidden; font-size: 0px; }
            .desktop_hide, .desktop_hide table { display: table !important; max-height: none !important; }
          }
        </style>
      </head>
      <body class="body" style="background-color: #c5f1fc; margin: 0; padding: 0; -webkit-text-size-adjust: none; text-size-adjust: none;">
      <div class="CompleteEmail"><table class="nl-container" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #c5f1fc;">
          <tbody>
            <tr>
              <td>
                <table class="row row-1" align="center" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                  <tbody>
                    <tr>
                      <td>
                        <table class="row-content stack" align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; color: #000000; width: 640px; margin: 0 auto;" width="640">
                          <tbody>
                            <tr>
                              <td class="column column-1" width="100%" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; padding-bottom: 5px; padding-top: 5px; vertical-align: top; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;">
                                <div class="spacer_block block-1" style="height:50px;line-height:50px;font-size:1px;">&#8202;</div>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </td>
                    </tr>
                  </tbody>
                </table>
                <table class="row row-2" align="center" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                  <tbody>
                    <tr>
                      <td>
                        <table class="row-content stack" align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #ffffff; color: #000000; width: 640px; margin: 0 auto;" width="640">
                          <tbody>
                            <tr>
                              <td class="column column-1" width="100%" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; vertical-align: top; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;">
                                <table class="image_block block-1" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                                  <tr>
                                    <td class="pad" style="width:100%;">
                                      <div class="alignment" align="center" style="line-height:10px">
                                        <div style="max-width: 640px;"><img src="https://i.imgur.com/5AOt9ex.png" style="display: block; height: auto; border: 0; width: 100%;" width="640" alt="Dog Banner" title="Dog Banner" height="auto"></div>
                                      </div>
                                    </td>
                                  </tr>
                                </table>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </td>
                    </tr>
                  </tbody>
                </table>
                <table class="row row-3" align="center" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                  <tbody>
                    <tr>
                      <td>
                        <table class="row-content stack" align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; border-radius: 0; color: #000000; width: 640px; margin: 0 auto;" width="640">
                          <tbody>
                            <tr>
                              <td class="column column-1" width="100%" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; background-color: #ffffff; padding-bottom: 5px; padding-top: 5px; vertical-align: top; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;">
                                <table class="heading_block block-1" width="100%" border="0" cellpadding="10" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                                  <tr>
                                    <td class="pad">
                                      <h1 style="margin: 0; color: #7747FF; direction: ltr; font-family: Lato, Tahoma, Verdana, Segoe, sans-serif; font-size: 38px; font-weight: 700; letter-spacing: normal; line-height: 120%; text-align: left; margin-top: 0; margin-bottom: 0; mso-line-height-alt: 45.6px;">
                                        <span style="word-break: break-word; color: #000000;"><strong>Dear ${parentName}</strong></span>
                                      </h1>
                                    </td>
                                  </tr>
                                </table>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </td>
                    </tr>
                  </tbody>
                </table>
                <table class="row row-4" align="center" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                  <tbody>
                    <tr>
                      <td>
                        <table class="row-content stack" align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; border-radius: 0; color: #000000; width: 640px; margin: 0 auto;" width="640">
                          <tbody>
                            <tr>
                              <td class="column column-1" width="100%" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; background-color: #ffffff; padding-bottom: 5px; padding-top: 5px; vertical-align: top; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;">
                                <table class="paragraph_block block-1" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;">
                                  <tr>
                                    <td class="pad" style="padding-bottom:10px;padding-left:20px;padding-right:20px;padding-top:10px;">
                                      <div style="color:#555555;font-family:Lato, Tahoma, Verdana, Segoe, sans-serif;font-size:14px;line-height:120%;text-align:left;mso-line-height-alt:16.8px;">
                                        <p style="margin: 0; word-break: break-word;">We hope this message finds you well. Your upcoming video call appointment with <strong>${doctorName}</strong> at Rex Vets is just around the corner, and we're thrilled to assist you with your pet's health.</p>
                                        <p style="margin: 0; word-break: break-word;">&nbsp;</p>
                                        <p style="margin: 0; word-break: break-word;">The link to join your video call is now available. To access your appointment, please click the following link:</p>
                                        <p style="margin: 0; word-break: break-word;">&nbsp;</p>
                                        <p style="margin: 0; word-break: break-word;"><strong><a href="${meetingLink}" target="_blank">Please click here to join video</a></strong></p>
                                        <p style="margin: 0; word-break: break-word;">&nbsp;</p>
                                        <p style="margin: 0; word-break: break-word;">Please make sure you're prepared and have any relevant information or questions ready for the call. <strong>${doctorName}</strong> is dedicated to providing the best care for your furry friend.<br><br>If you encounter any issues or have any last-minute questions, don't hesitate to reach out to our support team at <a href="mailto:support@rexvets.com">support@rexvets.com</a></p>
                                        <p style="margin: 0; word-break: break-word;">&nbsp;</p>
                                        <p style="margin: 0; word-break: break-word;">We look forward to connecting with you and addressing your pet's health needs.</p>
                                        <p style="margin: 0; word-break: break-word;">&nbsp;</p>
                                        <p style="margin: 0; word-break: break-word;">Thank you for choosing Rex Vets for your pet's care.</p>
                                        <p style="margin: 0; word-break: break-word;">&nbsp;</p>
                                        <p style="margin: 0; word-break: break-word;">Warm regards, <strong>The Team at Rex Vets</strong></p>
                                      </div>
                                    </td>
                                  </tr>
                                </table>
                                <table class="button_block block-2" width="100%" border="0" cellpadding="10" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                                  <tr>
                                    <td class="pad">
                                      <div class="alignment" align="center">
                                        <a href="${meetingLink}" target="_blank" style="background-color:#002366;border-bottom:0px solid transparent;border-left:0px solid transparent;border-radius:10px;border-right:0px solid transparent;border-top:0px solid transparent;color:#ffffff;display:inline-block;font-family:'Lato', Tahoma, Verdana, Segoe, sans-serif;font-size:16px;font-weight:undefined;mso-border-alt:none;padding-bottom:5px;padding-top:5px;text-align:center;text-decoration:none;width:auto;word-break:keep-all;">
                                          <span style="word-break: break-word; padding-left: 20px; padding-right: 20px; font-size: 16px; display: inline-block; letter-spacing: normal;">
                                            <strong>MEETING LINK</strong>
                                          </span>
                                        </a>
                                      </div>
                                    </td>
                                  </tr>
                                </table>
                                <table class="paragraph_block block-3" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;">
                                  <tr>
                                    <td class="pad" style="padding-bottom:10px;padding-left:20px;padding-right:20px;padding-top:10px;">
                                      <div style="color:#555555;font-family:Lato, Tahoma, Verdana, Segoe, sans-serif;font-size:14px;line-height:120%;text-align:left;mso-line-height-alt:16.8px;">&nbsp;</div>
                                    </td>
                                  </tr>
                                </table>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </td>
                    </tr>
                  </tbody>
                </table>
                <table class="row row-5" align="center" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                  <tbody>
                    <tr>
                      <td>
                      <table class="row-content stack" align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #00b3d3; background-position: center top; color: #000000; width: 640px; margin: 0 auto;" width="640">
                      <tbody>
                        <tr>
                          <td class="column column-1" width="100%" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; background-color: #002366; padding-bottom: 5px; padding-top: 5px; vertical-align: top; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;">
                            <table class="image_block block-1" width="100%" border="0" cellpadding="10" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                              <tr>
                                <td class="pad">
                                  <div class="alignment" align="center" style="line-height:10px">
                                    <div style="max-width: 620px;"><a href="https://www.rexvets.com" target="_blank" style="outline:none" tabindex="-1"><img src="https://i.ibb.co/3CZBJyh/5bfa.png" style="display: block; height: auto; border: 0; width: 100%;" width="620" alt="Your Logo" title="Your Logo" height="auto"></a></div>
                                  </div>
                                </td>
                              </tr>
                            </table>
                                <table class="social_block block-2" width="100%" border="0" cellpadding="10" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                                  <tr>
                                    <td class="pad">
                                      <div class="alignment" align="center">
                                        <table class="social-table" width="92px" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; display: inline-block;">
                                          <tr>
                                            <td style="padding:0 7px 0 7px;"><a href="https://www.facebook.com/rexvets" target="_blank"><img src="https://app-rsrc.getbee.io/public/resources/social-networks-icon-sets/t-circle-white/facebook@2x.png" width="32" height="auto" alt="Facebook" title="Facebook" style="display: block; height: auto; border: 0;"></a></td>
                                            <td style="padding:0 7px 0 7px;"><a href="https://www.instagram.com/rexvets" target="_blank"><img src="https://app-rsrc.getbee.io/public/resources/social-networks-icon-sets/t-circle-white/instagram@2x.png" width="32" height="auto" alt="Instagram" title="Instagram" style="display: block; height: auto; border: 0;"></a></td>
                                          </tr>
                                        </table>
                                      </div>
                                    </td>
                                  </tr>
                                </table>
                                <table class="paragraph_block block-3" width="100%" border="0" cellpadding="10" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;">
                                  <tr>
                                    <td class="pad">
                                      <div style="color:#555555;font-family:Lato, Tahoma, Verdana, Segoe, sans-serif;font-size:14px;line-height:120%;text-align:center;mso-line-height-alt:16.8px;">
                                        <p style="margin: 0; word-break: break-word;"><span style="word-break: break-word; color: #ffffff;"><strong>Rex Vets </strong>is a <strong>non-profit organization</strong>, and our efforts are sustained by the generosity of our donors. If you would like to support our mission with a donation, we would be deeply grateful. You can make a contribution through <strong><a href="https://www.rexvets.com/PetParents" target="_blank" style="color: #ffffff;">the following link</a></strong></span></p>
                                      </div>
                                    </td>
                                  </tr>
                                </table>
                                <div class="spacer_block block-4" style="height:30px;line-height:30px;font-size:1px;">&#8202;</div>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </td>
            </tr>
          </tbody>
        </table>
      </body>
      </html>
      
    `;
      const mailOptionsParent = {
        from: "support@rexvets.com",
        to: parentEmail,
        subject: "Appointment Reminder - Rex Vets",
        html: EMAILFORPATIENTPREV,
      };

      transporter.sendMail(mailOptionsParent, (error, info) => {
        if (error) {
          console.log("Error sending reminder email to parent:", error);
        } else {
          console.log("Reminder email sent to parent:", info.response);
        }
      });
    }, timeDifference);

    // Programar el envío del correo al doctor
    setTimeout(() => {
      let EMAILFORDOCTORSPREV = `<!DOCTYPE html>
      <html xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office" lang="en">
      <head>
        <title></title>
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <link href="https://fonts.googleapis.com/css?family=Lato" rel="stylesheet" type="text/css">
        <style>
          * { box-sizing: border-box; }
          body { margin: 0; padding: 0; }
          a[x-apple-data-detectors] { color: inherit !important; text-decoration: inherit !important; }
          #MessageViewBody a { color: inherit; text-decoration: none; }
          p { line-height: inherit }
          .desktop_hide, .desktop_hide table { mso-hide: all; display: none; max-height: 0px; overflow: hidden; }
          .image_block img+div { display: none; }
          sup, sub { line-height: 0; font-size: 75%; }
          @media (max-width:660px) {
            .desktop_hide table.icons-inner, .social_block.desktop_hide .social-table {
              display: inline-block !important;
            }
            .icons-inner { text-align: center; }
            .icons-inner td { margin: 0 auto; }
            .mobile_hide { display: none; }
            .row-content { width: 100% !important; }
            .stack .column { width: 100%; display: block; }
            .mobile_hide { min-height: 0; max-height: 0; max-width: 0; overflow: hidden; font-size: 0px; }
            .desktop_hide, .desktop_hide table { display: table !important; max-height: none !important; }
          }
        </style>
      </head>
      <body class="body" style="background-color: #c5f1fc; margin: 0; padding: 0; -webkit-text-size-adjust: none; text-size-adjust: none;">
        <table class="nl-container" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #c5f1fc;">
          <tbody>
            <tr>
              <td>
                <table class="row row-1" align="center" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                  <tbody>
                    <tr>
                      <td>
                        <table class="row-content stack" align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; color: #000000; width: 640px; margin: 0 auto;" width="640">
                          <tbody>
                            <tr>
                              <td class="column column-1" width="100%" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; padding-bottom: 5px; padding-top: 5px; vertical-align: top; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;">
                                <div class="spacer_block block-1" style="height:50px;line-height:50px;font-size:1px;">&#8202;</div>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </td>
                    </tr>
                  </tbody>
                </table>
                <table class="row row-2" align="center" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                  <tbody>
                    <tr>
                      <td>
                        <table class="row-content stack" align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #ffffff; color: #000000; width: 640px; margin: 0 auto;" width="640">
                          <tbody>
                            <tr>
                              <td class="column column-1" width="100%" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; vertical-align: top; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;">
                                <table class="image_block block-1" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                                  <tr>
                                    <td class="pad" style="width:100%;">
                                      <div class="alignment" align="center" style="line-height:10px">
                                        <div style="max-width: 640px;"><img src="https://i.ibb.co/xHZRkD7/appointment-vets.png" style="display: block; height: auto; border: 0; width: 100%;" width="640" alt="Dog Banner" title="Dog Banner" height="auto"></div>
                                      </div>
                                    </td>
                                  </tr>
                                </table>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </td>
                    </tr>
                  </tbody>
                </table>
                <table class="row row-3" align="center" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                  <tbody>
                    <tr>
                      <td>
                        <table class="row-content stack" align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; border-radius: 0; color: #000000; width: 640px; margin: 0 auto;" width="640">
                          <tbody>
                            <tr>
                              <td class="column column-1" width="100%" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; background-color: #ffffff; padding-bottom: 5px; padding-top: 5px; vertical-align: top; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;">
                                <table class="heading_block block-1" width="100%" border="0" cellpadding="10" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                                  <tr>
                                    <td class="pad">
                                      <h1 style="margin: 0; color: #7747FF; direction: ltr; font-family: Lato, Tahoma, Verdana, Segoe, sans-serif; font-size: 38px; font-weight: 700; letter-spacing: normal; line-height: 120%; text-align: left; margin-top: 0; margin-bottom: 0; mso-line-height-alt: 45.6px;">
                                        <span style="word-break: break-word; color: #000000;"><strong>Dear ${doctorName}</strong></span>
                                      </h1>
                                    </td>
                                  </tr>
                                </table>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </td>
                    </tr>
                  </tbody>
                </table>
                <table class="row row-4" align="center" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                  <tbody>
                    <tr>
                      <td>
                        <table class="row-content stack" align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; border-radius: 0; color: #000000; width: 640px; margin: 0 auto;" width="640">
                          <tbody>
                            <tr>
                              <td class="column column-1" width="100%" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; background-color: #ffffff; padding-bottom: 5px; padding-top: 5px; vertical-align: top; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;">
                                <table class="paragraph_block block-1" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;">
                                  <tr>
                                    <td class="pad" style="padding-bottom:10px;padding-left:20px;padding-right:20px;padding-top:10px;">
                                      <div style="color:#555555;font-family:Lato, Tahoma, Verdana, Segoe, sans-serif;font-size:14px;line-height:120%;text-align:left;mso-line-height-alt:16.8px;">
                                        <p style="margin: 0; word-break: break-word;">We hope you're ready for your upcoming appointment with <strong>${parentName}</strong>. The video call for this appointment will be happening shortly.</p>
                                        <p style="margin: 0; word-break: break-word;">&nbsp;</p>
                                        <p style="margin: 0; word-break: break-word;">To join the video call, please use the following link:</p>
                                        <p style="margin: 0; word-break: break-word;">&nbsp;</p>
                                        <p style="margin: 0; word-break: break-word;"><strong><a href="${meetingLink}" target="_blank">Click here to join the video call</a></strong></p>
                                        <p style="margin: 0; word-break: break-word;">&nbsp;</p>
                                        <p style="margin: 0; word-break: break-word;">Make sure you have your notes and any relevant details about <strong>${parentName}</strong>'s pet prepared for the consultation. If you need to reschedule or have any questions, feel free to reach out to our support team at <a href="mailto:support@rexvets.com">support@rexvets.com</a>.</p>
                                        <p style="margin: 0; word-break: break-word;">&nbsp;</p>
                                        <p style="margin: 0; word-break: break-word;">Thank you for your commitment to providing excellent care at Rex Vets.</p>
                                        <p style="margin: 0; word-break: break-word;">&nbsp;</p>
                                        <p style="margin: 0; word-break: break-word;">Best regards, <strong>The Rex Vets Team</strong></p>
                                      </div>
                                    </td>
                                  </tr>
                                </table>
                                <table class="button_block block-2" width="100%" border="0" cellpadding="10" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                                  <tr>
                                    <td class="pad">
                                      <div class="alignment" align="center">
                                        <a href="${meetingLink}" target="_blank" style="background-color:#002366;border-bottom:0px solid transparent;border-left:0px solid transparent;border-radius:10px;border-right:0px solid transparent;border-top:0px solid transparent;color:#ffffff;display:inline-block;font-family:'Lato', Tahoma, Verdana, Segoe, sans-serif;font-size:16px;font-weight:undefined;mso-border-alt:none;padding-bottom:5px;padding-top:5px;text-align:center;text-decoration:none;width:auto;word-break:keep-all;">
                                          <span style="word-break: break-word; padding-left: 20px; padding-right: 20px; font-size: 16px; display: inline-block; letter-spacing: normal;">
                                            <strong>JOIN MEETING</strong>
                                          </span>
                                        </a>
                                      </div>
                                    </td>
                                  </tr>
                                </table>
                                <table class="paragraph_block block-3" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;">
                                  <tr>
                                    <td class="pad" style="padding-bottom:10px;padding-left:20px;padding-right:20px;padding-top:10px;">
                                      <div style="color:#555555;font-family:Lato, Tahoma, Verdana, Segoe, sans-serif;font-size:14px;line-height:120%;text-align:left;mso-line-height-alt:16.8px;">&nbsp;</div>
                                    </td>
                                  </tr>
                                </table>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </td>
                    </tr>
                  </tbody>
                </table>
                <table class="row row-5" align="center" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                  <tbody>
                    <tr>
                      <td>
                      <table class="row-content stack" align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #00b3d3; background-position: center top; color: #000000; width: 640px; margin: 0 auto;" width="640">
                      <tbody>
                        <tr>
                          <td class="column column-1" width="100%" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; background-color: #002366; padding-bottom: 5px; padding-top: 5px; vertical-align: top; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;">
                            <table class="image_block block-1" width="100%" border="0" cellpadding="10" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                              <tr>
                                <td class="pad">
                                  <div class="alignment" align="center" style="line-height:10px">
                                    <div style="max-width: 620px;"><a href="https://www.rexvets.com" target="_blank" style="outline:none" tabindex="-1"><img src="https://i.ibb.co/3CZBJyh/5bfa.png" style="display: block; height: auto; border: 0; width: 100%;" width="620" alt="Your Logo" title="Your Logo" height="auto"></a></div>
                                  </div>
                                </td>
                              </tr>
                            </table>
                                <table class="social_block block-2" width="100%" border="0" cellpadding="10" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                                  <tr>
                                    <td class="pad">
                                      <div class="alignment" align="center">
                                        <table class="social-table" width="92px" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; display: inline-block;">
                                          <tr>
                                            <td style="padding:0 7px 0 7px;"><a href="https://www.facebook.com/rexvets" target="_blank"><img src="https://app-rsrc.getbee.io/public/resources/social-networks-icon-sets/t-circle-white/facebook@2x.png" width="32" height="auto" alt="Facebook" title="Facebook" style="display: block; height: auto; border: 0;"></a></td>
                                            <td style="padding:0 7px 0 7px;"><a href="https://www.instagram.com/rexvets" target="_blank"><img src="https://app-rsrc.getbee.io/public/resources/social-networks-icon-sets/t-circle-white/instagram@2x.png" width="32" height="auto" alt="Instagram" title="Instagram" style="display: block; height: auto; border: 0;"></a></td>
                                          </tr>
                                        </table>
                                      </div>
                                    </td>
                                  </tr>
                                </table>
                                <table class="paragraph_block block-3" width="100%" border="0" cellpadding="10" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;">
                                  <tr>
                                    <td class="pad">
                                      <div style="color:#555555;font-family:Lato, Tahoma, Verdana, Segoe, sans-serif;font-size:14px;line-height:120%;text-align:center;mso-line-height-alt:16.8px;">
                                        <p style="margin: 0; word-break: break-word;"><span style="word-break: break-word; color: #ffffff;"><strong>Rex Vets </strong>is a <strong>non-profit organization</strong>, and our efforts are sustained by the generosity of our donors. If you would like to support our mission with a donation, we would be deeply grateful. You can make a contribution through <strong><a href="https://www.rexvets.com/PetParents" target="_blank" style="color: #ffffff;">the following link</a></strong></span></p>
                                      </div>
                                    </td>
                                  </tr>
                                </table>
                                <div class="spacer_block block-4" style="height:30px;line-height:30px;font-size:1px;">&#8202;</div>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </td>
            </tr>
          </tbody>
        </table>
        </div>
      </body>
      </html>
      
      `;
      const mailOptionsDoctor = {
        from: "support@rexvets.com",
        to: doctorEmail,
        subject: "Appointment Reminder - Rex Vets",
        html: EMAILFORDOCTORSPREV,
      };

      transporter.sendMail(mailOptionsDoctor, (error, info) => {
        if (error) {
          console.log("Error sending reminder email to doctor:", error);
        } else {
          console.log("Reminder email sent to doctor:", info.response);
        }
      });
    }, timeDifference);
  } else {
    console.log(
      "No reminder emails to send, appointment is too close or past."
    );
  }
}

function trackAppointments() {
  console.log("Starting appointment tracking.");
  const appointmentsCol = db.collection("Appointments");

  // Escuchar cambios en tiempo real
  console.log("Setting up real-time listener for Appointments collection...");
  appointmentsCol.onSnapshot(async (snapshot) => {
    console.log(
      `Received appointment snapshot with ${
        snapshot.docChanges().length
      } changes.`
    );
    snapshot.docChanges().forEach(async (change) => {
      const appointment = change.doc.data();
      const {
        AppointmentDate,
        AppointmentTime,
        ParentEmail,
        ParentName,
        DoctorName,
        DoctorEmail,
        MeetingLink,
        reminderScheduled,
      } = appointment;

      console.log(
        `Processing appointment change type: ${change.type} for parent: ${ParentEmail}`
      );

      if (change.type === "added" || change.type === "modified") {
        // Check if no reminder is scheduled
        if (!reminderScheduled) {
          console.log(
            `Scheduling reminder for new/updated appointment: ${ParentEmail} (ID: ${change.doc.id})`
          );
          // Programar el recordatorio
          scheduleReminderEmail(
            AppointmentDate,
            AppointmentTime,
            ParentEmail,
            ParentName,
            DoctorName,
            DoctorEmail,
            MeetingLink
          );

          // Actualizar la cita en la base de datos
          const appointmentRef = db
            .collection("Appointments")
            .doc(change.doc.id);
          await appointmentRef.update({ reminderScheduled: true });
        }
      }
    });

    // Add logic to find and log the next upcoming appointment-del
    const now = moment().tz(TIMEZONE);
    const upcomingAppointments = snapshot.docs
      .map((doc) => ({ id: doc.id, ...doc.data() }))
      .filter((appointment) => {
        const appointmentMoment = moment.tz(
          `${appointment.AppointmentDate} ${appointment.AppointmentTime}`,
          "YYYY-MM-DD h:mm A",
          TIMEZONE
        );
        return appointmentMoment.isAfter(now);
      })
      .sort((a, b) => {
        const momentA = moment.tz(
          `${a.AppointmentDate} ${a.AppointmentTime}`,
          "YYYY-MM-DD h:mm A",
          TIMEZONE
        );
        const momentB = moment.tz(
          `${b.AppointmentDate} ${b.AppointmentTime}`,
          "YYYY-MM-DD h:mm A",
          TIMEZONE
        );
        return momentA.diff(now) - momentB.diff(now);
      });

    if (upcomingAppointments.length > 0) {
      const nextAppointment = upcomingAppointments[0];
      const nextMoment = moment.tz(
        `${nextAppointment.AppointmentDate} ${nextAppointment.AppointmentTime}`,
        "YYYY-MM-DD h:mm A",
        TIMEZONE
      );
      console.log(`Next upcoming appointment details:`);
      console.log(`ID: ${nextAppointment.id}`);
      console.log(`Date: ${nextAppointment.AppointmentDate}`);
      console.log(`Time: ${nextAppointment.AppointmentTime}`);
      console.log(`Parent Email: ${nextAppointment.ParentEmail}`);
      console.log(`Parent Name: ${nextAppointment.ParentName}`);
      console.log(`Doctor Name: ${nextAppointment.DoctorName}`);
      console.log(`Doctor Email: ${nextAppointment.DoctorEmail}`);
      console.log(`Meeting Link: ${nextAppointment.MeetingLink}`);
      console.log(
        `Scheduled Time (in ${TIMEZONE}): ${nextMoment.format(
          "YYYY-MM-DD h:mm A"
        )}`
      );
    } else {
      console.log("No upcoming appointments found.");
    }
  }); // delete later for testing
  console.log("Firestore onSnapshot listener setup code executed.");
}

// Inicializar el tracking de las citas
trackAppointments();

// Función para monitorear mensajes actuales y nuevos en la subcolección de todos los appointments y enviar correos si el remitente comienza con "Dr"
function trackNewMessagesForAppointment(appointmentHash) {
  console.log(
    `Iniciando monitoreo de mensajes para el appointment con hash: ${appointmentHash}`
  );

  const appointmentDocRef = db.collection("Appointments").doc(appointmentHash);

  let initialMessagesTracked = false;
  let initialMessagesLength = 0;

  appointmentDocRef.onSnapshot((docSnapshot) => {
    if (docSnapshot.exists) {
      const appointmentData = docSnapshot.data();
      const messages = appointmentData.Messages;

      if (!initialMessagesTracked) {
        // Mark that initial messages have been tracked
        initialMessagesLength = messages ? messages.length : 0;
        initialMessagesTracked = true;
        console.log(
          `Initial messages tracked for appointment ${appointmentHash}: ${initialMessagesLength}`
        );
      } else if (messages && messages.length > initialMessagesLength) {
        const newMessages = messages.slice(initialMessagesLength);
        newMessages.forEach((message, index) => {
          console.log(
            `Nuevo mensaje ${initialMessagesLength + index}:`,
            message
          );

          if (message.sender && message.sender.startsWith("Dr")) {
            sendEmailToParent(
              appointmentData.ParentEmail,
              appointmentData.DoctorName,
              appointmentData.ParentName,
              appointmentHash,
              message
            );
          } else {
            sendEmailToDoctor(
              appointmentData.DoctorEmail,
              appointmentData.DoctorName,
              appointmentData.ParentName,
              appointmentHash,
              message
            );
          }
        });
        initialMessagesLength = messages.length;
      } else {
        console.log(`No new messages in appointment ${appointmentHash}`);
      }
    } else {
      console.log(`El appointment con hash ${appointmentHash} no existe`);
    }
  });
}

// Función para enviar un correo al cliente
function sendEmailToParent(
  parentEmail,
  doctorName,
  parentName,
  appointmentHash,
  message
) {
  let EMAILFORPATIENT = `<!DOCTYPE html>
  <html xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office" lang="en">
  <head>
    <title></title>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link href="https://fonts.googleapis.com/css?family=Lato" rel="stylesheet" type="text/css">
    <style>
      * { box-sizing: border-box; }
      body { margin: 0; padding: 0; }
      a[x-apple-data-detectors] { color: inherit !important; text-decoration: inherit !important; }
      #MessageViewBody a { color: inherit; text-decoration: none; }
      p { line-height: inherit }
      .desktop_hide, .desktop_hide table { mso-hide: all; display: none; max-height: 0px; overflow: hidden; }
      .image_block img+div { display: none; }
      sup, sub { line-height: 0; font-size: 75%; }
      @media (max-width:660px) {
        .desktop_hide table.icons-inner, .social_block.desktop_hide .social-table {
          display: inline-block !important;
        }
        .icons-inner { text-align: center; }
        .icons-inner td { margin: 0 auto; }
        .mobile_hide { display: none; }
        .row-content { width: 100% !important; }
        .stack .column { width: 100%; display: block; }
        .mobile_hide { min-height: 0; max-height: 0; max-width: 0; overflow: hidden; font-size: 0px; }
        .desktop_hide, .desktop_hide table { display: table !important; max-height: none !important; }
      }
    </style>
  </head>
  <body class="body" style="background-color: #c5f1fc; margin: 0; padding: 0; -webkit-text-size-adjust: none; text-size-adjust: none;">
    <table class="nl-container" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #c5f1fc;">
      <tbody>
        <tr>
          <td>
            <table class="row row-1" align="center" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
              <tbody>
                <tr>
                  <td>
                    <table class="row-content stack" align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; color: #000000; width: 640px; margin: 0 auto;" width="640">
                      <tbody>
                        <tr>
                          <td class="column column-1" width="100%" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; padding-bottom: 5px; padding-top: 5px; vertical-align: top; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;">
                            <div class="spacer_block block-1" style="height:50px;line-height:50px;font-size:1px;">&#8202;</div>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </td>
                </tr>
              </tbody>
            </table>
            <table class="row row-2" align="center" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
              <tbody>
                <tr>
                  <td>
                    <table class="row-content stack" align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #ffffff; color: #000000; width: 640px; margin: 0 auto;" width="640">
                      <tbody>
                        <tr>
                          <td class="column column-1" width="100%" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; vertical-align: top; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;">
                            <table class="image_block block-1" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                              <tr>
                                <td class="pad" style="width:100%;">
                                  <div class="alignment" align="center" style="line-height:10px">
                                    <div style="max-width: 640px;"><img src="https://i.ibb.co/GTpgnRP/new-message.png" style="display: block; height: auto; border: 0; width: 100%;" width="640" alt="Dog Banner" title="Dog Banner" height="auto"></div>
                                  </div>
                                </td>
                              </tr>
                            </table>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </td>
                </tr>
              </tbody>
            </table>
            <table class="row row-3" align="center" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
              <tbody>
                <tr>
                  <td>
                    <table class="row-content stack" align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; border-radius: 0; color: #000000; width: 640px; margin: 0 auto;" width="640">
                      <tbody>
                        <tr>
                          <td class="column column-1" width="100%" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; background-color: #ffffff; padding-bottom: 5px; padding-top: 5px; vertical-align: top; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;">
                            <table class="heading_block block-1" width="100%" border="0" cellpadding="10" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                              <tr>
                                <td class="pad">
                                  <h1 style="margin: 0; color: #7747FF; direction: ltr; font-family: Lato, Tahoma, Verdana, Segoe, sans-serif; font-size: 38px; font-weight: 700; letter-spacing: normal; line-height: 120%; text-align: left; margin-top: 0; margin-bottom: 0; mso-line-height-alt: 45.6px;">
                                    <span style="word-break: break-word; color: #000000;"><strong>Dear ${parentName}</strong></span>
                                  </h1>
                                </td>
                              </tr>
                            </table>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </td>
                </tr>
              </tbody>
            </table>
            <table class="row row-4" align="center" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
              <tbody>
                <tr>
                  <td>
                    <table class="row-content stack" align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; border-radius: 0; color: #000000; width: 640px; margin: 0 auto;" width="640">
                      <tbody>
                        <tr>
                          <td class="column column-1" width="100%" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; background-color: #ffffff; padding-bottom: 5px; padding-top: 5px; vertical-align: top; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;">
                            <table class="paragraph_block block-1" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;">
                              <tr>
                                <td class="pad" style="padding-bottom:10px;padding-left:20px;padding-right:20px;padding-top:10px;">
                                  <div style="color:#555555;font-family:Lato, Tahoma, Verdana, Segoe, sans-serif;font-size:14px;line-height:120%;text-align:left;mso-line-height-alt:16.8px;">
                                    <p style="margin: 0; word-break: break-word;">We hope you and your pet are doing well.</p>
                                    <p style="margin: 0; word-break: break-word;">&nbsp;</p>
                                    <p style="margin: 0; word-break: break-word;">You have received a new message from your veterinarian at Rex Vets. To view your message and any related recommendations or treatment plans, please log in to your Rex Vets account using the link below:</p>
                                    <p style="margin: 0; word-break: break-word;">&nbsp;</p>
                                    <p style="margin: 0; word-break: break-word;"><strong><a href="https://www.rexvets.com/AppointmentsPetParents" target="_blank">Your Appointments</a></strong></p>
                                    <p style="margin: 0; word-break: break-word;">&nbsp;</p>
                                    <p style="margin: 0; word-break: break-word;">If you have any questions or concerns, feel free to reach out to us through your account or by replying to this email. We're here to support you and your pet's health every step of the way!</p>
                                    <p style="margin: 0; word-break: break-word;">&nbsp;</p>
                                    <p style="margin: 0; word-break: break-word;">Thank you for trusting Rex Vets with your pet's care.</p>
                                    <p style="margin: 0; word-break: break-word;">&nbsp;</p>
                                    <p style="margin: 0; word-break: break-word;">Best regards,<br><strong>The Rex Vets Team</strong></p>
                                  </div>
                                </td>
                              </tr>
                            </table>
                            <table class="button_block block-2" width="100%" border="0" cellpadding="10" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                              <tr>
                                <td class="pad">
                                  <div class="alignment" align="center">
                                    <a href="https://www.rexvets.com/AppointmentsPetParents" target="_blank" style="background-color:#002366;border-bottom:0px solid transparent;border-left:0px solid transparent;border-radius:10px;border-right:0px solid transparent;border-top:0px solid transparent;color:#ffffff;display:inline-block;font-family:'Lato', Tahoma, Verdana, Segoe, sans-serif;font-size:16px;font-weight:undefined;mso-border-alt:none;padding-bottom:5px;padding-top:5px;text-align:center;text-decoration:none;width:auto;word-break:keep-all;">
                                      <span style="word-break: break-word; padding-left: 20px; padding-right: 20px; font-size: 16px; display: inline-block; letter-spacing: normal;">
                                        <strong>VIEW APPOINTMENTS</strong>
                                      </span>
                                    </a>
                                  </div>
                                </td>
                              </tr>
                            </table>
                            <table class="paragraph_block block-3" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;">
                              <tr>
                                <td class="pad" style="padding-bottom:10px;padding-left:20px;padding-right:20px;padding-top:10px;">
                                  <div style="color:#555555;font-family:Lato, Tahoma, Verdana, Segoe, sans-serif;font-size:14px;line-height:120%;text-align:left;mso-line-height-alt:16.8px;">&nbsp;</div>
                                </td>
                              </tr>
                            </table>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </td>
                </tr>
              </tbody>
            </table>
            <table class="row row-5" align="center" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
              <tbody>
                <tr>
                  <td>
                  <table class="row-content stack" align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #00b3d3; background-position: center top; color: #000000; width: 640px; margin: 0 auto;" width="640">
                  <tbody>
                    <tr>
                      <td class="column column-1" width="100%" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; background-color: #002366; padding-bottom: 5px; padding-top: 5px; vertical-align: top; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;">
                        <table class="image_block block-1" width="100%" border="0" cellpadding="10" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                          <tr>
                            <td class="pad">
                              <div class="alignment" align="center" style="line-height:10px">
                                <div style="max-width: 620px;"><a href="https://www.rexvets.com" target="_blank" style="outline:none" tabindex="-1"><img src="https://i.ibb.co/3CZBJyh/5bfa.png" style="display: block; height: auto; border: 0; width: 100%;" width="620" alt="Your Logo" title="Your Logo" height="auto"></a></div>
                              </div>
                            </td>
                          </tr>
                        </table>
                            <table class="social_block block-2" width="100%" border="0" cellpadding="10" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                              <tr>
                                <td class="pad">
                                  <div class="alignment" align="center">
                                    <table class="social-table" width="92px" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; display: inline-block;">
                                      <tr>
                                        <td style="padding:0 7px 0 7px;"><a href="https://www.facebook.com/rexvets" target="_blank"><img src="https://app-rsrc.getbee.io/public/resources/social-networks-icon-sets/t-circle-white/facebook@2x.png" width="32" height="auto" alt="Facebook" title="Facebook" style="display: block; height: auto; border: 0;"></a></td>
                                        <td style="padding:0 7px 0 7px;"><a href="https://www.instagram.com/rexvets" target="_blank"><img src="https://app-rsrc.getbee.io/public/resources/social-networks-icon-sets/t-circle-white/instagram@2x.png" width="32" height="auto" alt="Instagram" title="Instagram" style="display: block; height: auto; border: 0;"></a></td>
                                      </tr>
                                    </table>
                                  </div>
                                </td>
                              </tr>
                            </table>
                            <table class="paragraph_block block-3" width="100%" border="0" cellpadding="10" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;">
                              <tr>
                                <td class="pad">
                                  <div style="color:#555555;font-family:Lato, Tahoma, Verdana, Segoe, sans-serif;font-size:14px;line-height:120%;text-align:center;mso-line-height-alt:16.8px;">
                                    <p style="margin: 0; word-break: break-word;"><span style="word-break: break-word; color: #ffffff;"><strong>Rex Vets </strong>is a <strong>non-profit organization</strong>, and our efforts are sustained by the generosity of our donors. If you would like to support our mission with a donation, we would be deeply grateful. You can make a contribution through <strong><a href="https://www.rexvets.com/PetParents" target="_blank" style="color: #ffffff;">the following link</a></strong></span></p>
                                  </div>
                                </td>
                              </tr>
                            </table>
                            <div class="spacer_block block-4" style="height:30px;line-height:30px;font-size:1px;">&#8202;</div>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </td>
                </tr>
              </tbody>
            </table>
          </td>
        </tr>
      </tbody>
    </table>
    </div>
  </body>
  </html>`;
  const mailOptions = {
    from: "support@rexvets.com",
    to: parentEmail,
    subject: "You Have a New Message from Your Veterinarian",

    html: EMAILFORPATIENT,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return console.error(`Error al enviar el correo: ${error}`);
    }
    console.log(`Correo enviado: ${info.response}`);
  });
}

// Función para enviar un correo al doctor
function sendEmailToDoctor(
  doctorEmail,
  doctorName,
  parentName
  // appointmentHash,
  // message
) {
  let EMAILFORDOCTORS = `<!DOCTYPE html>
  <html xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office" lang="en">
  <head>
    <title></title>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link href="https://fonts.googleapis.com/css?family=Lato" rel="stylesheet" type="text/css">
    <style>
      * { box-sizing: border-box; }
      body { margin: 0; padding: 0; }
      a[x-apple-data-detectors] { color: inherit !important; text-decoration: inherit !important; }
      #MessageViewBody a { color: inherit; text-decoration: none; }
      p { line-height: inherit }
      .desktop_hide, .desktop_hide table { mso-hide: all; display: none; max-height: 0px; overflow: hidden; }
      .image_block img+div { display: none; }
      sup, sub { line-height: 0; font-size: 75%; }
      @media (max-width:660px) {
        .desktop_hide table.icons-inner, .social_block.desktop_hide .social-table {
          display: inline-block !important;
        }
        .icons-inner { text-align: center; }
        .icons-inner td { margin: 0 auto; }
        .mobile_hide { display: none; }
        .row-content { width: 100% !important; }
        .stack .column { width: 100%; display: block; }
        .mobile_hide { min-height: 0; max-height: 0; max-width: 0; overflow: hidden; font-size: 0px; }
        .desktop_hide, .desktop_hide table { display: table !important; max-height: none !important; }
      }
    </style>
  </head>
  <body class="body" style="background-color: #c5f1fc; margin: 0; padding: 0; -webkit-text-size-adjust: none; text-size-adjust: none;">
    <table class="nl-container" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #c5f1fc;">
      <tbody>
        <tr>
          <td>
            <table class="row row-1" align="center" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
              <tbody>
                <tr>
                  <td>
                    <table class="row-content stack" align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; color: #000000; width: 640px; margin: 0 auto;" width="640">
                      <tbody>
                        <tr>
                          <td class="column column-1" width="100%" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; padding-bottom: 5px; padding-top: 5px; vertical-align: top; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;">
                            <div class="spacer_block block-1" style="height:50px;line-height:50px;font-size:1px;">&#8202;</div>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </td>
                </tr>
              </tbody>
            </table>
            <table class="row row-2" align="center" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
              <tbody>
                <tr>
                  <td>
                    <table class="row-content stack" align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #ffffff; color: #000000; width: 640px; margin: 0 auto;" width="640">
                      <tbody>
                        <tr>
                          <td class="column column-1" width="100%" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; vertical-align: top; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;">
                            <table class="image_block block-1" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                              <tr>
                                <td class="pad" style="width:100%;">
                                  <div class="alignment" align="center" style="line-height:10px">
                                    <div style="max-width: 640px;"><img src="https://i.ibb.co/GTpgnRP/new-message.png" style="display: block; height: auto; border: 0; width: 100%;" width="640" alt="Dog Banner" title="Dog Banner" height="auto"></div>
                                  </div>
                                </td>
                              </tr>
                            </table>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </td>
                </tr>
              </tbody>
            </table>
            <table class="row row-3" align="center" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
              <tbody>
                <tr>
                  <td>
                    <table class="row-content stack" align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; border-radius: 0; color: #000000; width: 640px; margin: 0 auto;" width="640">
                      <tbody>
                        <tr>
                          <td class="column column-1" width="100%" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; background-color: #ffffff; padding-bottom: 5px; padding-top: 5px; vertical-align: top; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;">
                            <table class="heading_block block-1" width="100%" border="0" cellpadding="10" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                              <tr>
                                <td class="pad">
                                  <h1 style="margin: 0; color: #7747FF; direction: ltr; font-family: Lato, Tahoma, Verdana, Segoe, sans-serif; font-size: 20px; font-weight: 700; letter-spacing: normal; line-height: 120%; text-align: left; margin-top: 0; margin-bottom: 0; mso-line-height-alt: 45.6px;">
                                    <span style="word-break: break-word; color: #000000;"><strong>Hello ${doctorName}</strong></span>
                                  </h1>
                                </td>
                              </tr>
                            </table>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </td>
                </tr>
              </tbody>
            </table>
            <table class="row row-4" align="center" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
              <tbody>
                <tr>
                  <td>
                    <table class="row-content stack" align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; border-radius: 0; color: #000000; width: 640px; margin: 0 auto;" width="640">
                      <tbody>
                        <tr>
                          <td class="column column-1" width="100%" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; background-color: #ffffff; padding-bottom: 5px; padding-top: 5px; vertical-align: top; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;">
                            <table class="paragraph_block block-1" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;">
                              <tr>
                                <td class="pad" style="padding-bottom:10px;padding-left:20px;padding-right:20px;padding-top:10px;">
                                  <div style="color:#555555;font-family:Lato, Tahoma, Verdana, Segoe, sans-serif;font-size:14px;line-height:120%;text-align:left;mso-line-height-alt:16.8px;">
                                    <p style="margin: 0; word-break: break-word;">You have received a new message from your client, ${parentName}. Please log in to your Rex Vets account to review and respond.</p>
                                    <p style="margin: 0; word-break: break-word;">&nbsp;</p>
                                    <p style="margin: 0; word-break: break-word;"><strong><a href="https://www.rexvets.com/AppointmentsVetsandTechs" target="_blank">Your Appointments</a></strong></p>
                                    <p style="margin: 0; word-break: break-word;">&nbsp;</p>
                                    <p style="margin: 0; word-break: break-word;">Thank you,,<br><strong>The Rex Vets Team</strong></p>
                                  </div>
                                </td>
                              </tr>
                            </table>
                            <table class="button_block block-2" width="100%" border="0" cellpadding="10" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                              <tr>
                                <td class="pad">
                                  <div class="alignment" align="center">
                                    <a href="https://www.rexvets.com/AppointmentsVetsandTechs" target="_blank" style="background-color:#002366;border-bottom:0px solid transparent;border-left:0px solid transparent;border-radius:10px;border-right:0px solid transparent;border-top:0px solid transparent;color:#ffffff;display:inline-block;font-family:'Lato', Tahoma, Verdana, Segoe, sans-serif;font-size:16px;font-weight:undefined;mso-border-alt:none;padding-bottom:5px;padding-top:5px;text-align:center;text-decoration:none;width:auto;word-break:keep-all;">
                                      <span style="word-break: break-word; padding-left: 20px; padding-right: 20px; font-size: 16px; display: inline-block; letter-spacing: normal;">
                                        <strong>VIEW APPOINTMENTS</strong>
                                      </span>
                                    </a>
                                  </div>
                                </td>
                              </tr>
                            </table>
                            <table class="paragraph_block block-3" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;">
                              <tr>
                                <td class="pad" style="padding-bottom:10px;padding-left:20px;padding-right:20px;padding-top:10px;">
                                  <div style="color:#555555;font-family:Lato, Tahoma, Verdana, Segoe, sans-serif;font-size:14px;line-height:120%;text-align:left;mso-line-height-alt:16.8px;">&nbsp;</div>
                                </td>
                              </tr>
                            </table>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </td>
                </tr>
              </tbody>
            </table>
            <table class="row row-5" align="center" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
              <tbody>
                <tr>
                  <td>
                  <table class="row-content stack" align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #00b3d3; background-position: center top; color: #000000; width: 640px; margin: 0 auto;" width="640">
                  <tbody>
                    <tr>
                      <td class="column column-1" width="100%" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; background-color: #002366; padding-bottom: 5px; padding-top: 5px; vertical-align: top; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;">
                        <table class="image_block block-1" width="100%" border="0" cellpadding="10" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                          <tr>
                            <td class="pad">
                              <div class="alignment" align="center" style="line-height:10px">
                                <div style="max-width: 620px;"><a href="https://www.rexvets.com" target="_blank" style="outline:none" tabindex="-1"><img src="https://i.ibb.co/3CZBJyh/5bfa.png" style="display: block; height: auto; border: 0; width: 100%;" width="620" alt="Your Logo" title="Your Logo" height="auto"></a></div>
                              </div>
                            </td>
                          </tr>
                        </table>
                            <table class="social_block block-2" width="100%" border="0" cellpadding="10" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                              <tr>
                                <td class="pad">
                                  <div class="alignment" align="center">
                                    <table class="social-table" width="92px" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; display: inline-block;">
                                      <tr>
                                        <td style="padding:0 7px 0 7px;"><a href="https://www.facebook.com/rexvets" target="_blank"><img src="https://app-rsrc.getbee.io/public/resources/social-networks-icon-sets/t-circle-white/facebook@2x.png" width="32" height="auto" alt="Facebook" title="Facebook" style="display: block; height: auto; border: 0;"></a></td>
                                        <td style="padding:0 7px 0 7px;"><a href="https://www.instagram.com/rexvets" target="_blank"><img src="https://app-rsrc.getbee.io/public/resources/social-networks-icon-sets/t-circle-white/instagram@2x.png" width="32" height="auto" alt="Instagram" title="Instagram" style="display: block; height: auto; border: 0;"></a></td>
                                      </tr>
                                    </table>
                                  </div>
                                </td>
                              </tr>
                            </table>
                            <table class="paragraph_block block-3" width="100%" border="0" cellpadding="10" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;">
                              <tr>
                                <td class="pad">
                                  <div style="color:#555555;font-family:Lato, Tahoma, Verdana, Segoe, sans-serif;font-size:14px;line-height:120%;text-align:center;mso-line-height-alt:16.8px;">
                                    <p style="margin: 0; word-break: break-word;"><span style="word-break: break-word; color: #ffffff;"><strong>Rex Vets </strong>is a <strong>non-profit organization</strong>, and our efforts are sustained by the generosity of our donors. If you would like to support our mission with a donation, we would be deeply grateful. You can make a contribution through <strong><a href="https://www.rexvets.com/PetParents" target="_blank" style="color: #ffffff;">the following link</a></strong></span></p>
                                  </div>
                                </td>
                              </tr>
                            </table>
                            <div class="spacer_block block-4" style="height:30px;line-height:30px;font-size:1px;">&#8202;</div>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </td>
                </tr>
              </tbody>
            </table>
          </td>
        </tr>
      </tbody>
    </table>
    </div>
  </body>
  </html>`;
  const mailOptions = {
    from: "support@rexvets.com",
    to: doctorEmail,
    subject: `You Have a New Message from Your Client ${parentName}`,

    html: EMAILFORDOCTORS,
  };
  //test
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return console.error(`Error al enviar el correo al doctor: ${error}`);
    }
    console.log(`Correo enviado al doctor: ${info.response}`);
  });
}

// Llamar a la función para monitorear mensajes de todos los appointments
async function trackMessagesForAllAppointments() {
  try {
    const snapshot = await db.collection("Appointments").get();
    snapshot.forEach((doc) => {
      const appointmentHash = doc.id;
      trackNewMessagesForAppointment(appointmentHash);
    });
  } catch (error) {
    console.error("Error al obtener los appointments:", error);
  }
}

// Llamada para iniciar el monitoreo de todos los appointments
trackMessagesForAllAppointments();

// trackAllAppointments();
// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log("Email server started and ready.");
});

// Add cron job endpoint for processing reminder emails
app.get("/api/cron/process-reminders", async (req, res) => {
  console.log("🔄 Cron job triggered: Processing reminder emails...");

  try {
    const now = moment().tz(TIMEZONE);
    console.log(
      `⏰ Current time (${TIMEZONE}): ${now.format("YYYY-MM-DD h:mm A")}`
    );

    // Query for unsent reminders
    const remindersSnapshot = await db
      .collection("ReminderEmails")
      .where("reminderSent", "==", false)
      .get();

    console.log(`📧 Found ${remindersSnapshot.size} pending reminders`);

    let processedCount = 0;
    let sentCount = 0;

    for (const doc of remindersSnapshot.docs) {
      const reminderData = doc.data();
      const {
        appointmentDate,
        appointmentTime,
        parentEmail,
        parentName,
        doctorName,
        doctorEmail,
        meetingLink,
        scheduledAt,
      } = reminderData;

      processedCount++;

      // Calculate appointment time
      const appointmentMoment = moment.tz(
        `${appointmentDate} ${appointmentTime}`,
        "YYYY-MM-DD h:mm A",
        TIMEZONE
      );

      // For real reminders, send 10 minutes before appointment
      const reminderTime = appointmentMoment.clone().subtract(10, "minutes");
      const shouldSend =
        now.isAfter(reminderTime) && now.isBefore(appointmentMoment);

      console.log(
        `📅 Processing reminder for ${parentEmail}: appointment at ${appointmentMoment.format(
          "YYYY-MM-DD h:mm A"
        )}, reminder time: ${reminderTime.format(
          "YYYY-MM-DD h:mm A"
        )}, should send: ${shouldSend}`
      );

      if (shouldSend) {
        console.log(
          `✅ Sending 10-minute reminder to ${parentEmail} and ${doctorEmail}...`
        );

        try {
          // Send reminder emails to both parent and doctor
          await sendReminderEmails(
            appointmentDate,
            appointmentTime,
            parentEmail,
            parentName,
            doctorName,
            doctorEmail,
            meetingLink
          );

          // Mark as sent
          await doc.ref.update({
            reminderSent: true,
            sentAt: admin.firestore.FieldValue.serverTimestamp(),
          });

          sentCount++;
          console.log(
            `🎉 Reminder emails sent successfully to both ${parentEmail} and ${doctorEmail}`
          );
        } catch (emailError) {
          console.error(
            `❌ Error sending reminder emails for appointment with ${parentEmail}:`,
            emailError
          );
          // Mark as failed
          await doc.ref.update({
            reminderSent: false,
            lastError: emailError.message,
            lastAttempt: admin.firestore.FieldValue.serverTimestamp(),
          });
        }
      }
    }

    console.log(
      `✅ Cron job completed: Processed ${processedCount} reminders, sent ${sentCount} emails`
    );
    res.json({
      success: true,
      message: `Processed ${processedCount} reminders, sent ${sentCount} emails`,
      processedCount,
      sentCount,
      timestamp: now.toISOString(),
    });
  } catch (error) {
    console.error("❌ Error in cron job:", error);
    res.status(500).json({
      success: false,
      error: error.message,
      timestamp: new Date().toISOString(),
    });
  }
});

// Manual trigger endpoint for immediate testing (same as cron but can be called anytime)
app.post("/api/manual/process-reminders", async (req, res) => {
  console.log("🔧 Manual trigger: Processing reminder emails...");

  try {
    const now = moment().tz(TIMEZONE);
    console.log(
      `⏰ Current time (${TIMEZONE}): ${now.format("YYYY-MM-DD h:mm A")}`
    );

    // Query for unsent reminders
    const remindersSnapshot = await db
      .collection("ReminderEmails")
      .where("reminderSent", "==", false)
      .get();

    console.log(`📧 Found ${remindersSnapshot.size} pending reminders`);

    let processedCount = 0;
    let sentCount = 0;

    for (const doc of remindersSnapshot.docs) {
      const reminderData = doc.data();
      const {
        appointmentDate,
        appointmentTime,
        parentEmail,
        parentName,
        doctorName,
        doctorEmail,
        meetingLink,
        scheduledAt,
      } = reminderData;

      processedCount++;

      // Calculate appointment time
      const appointmentMoment = moment.tz(
        `${appointmentDate} ${appointmentTime}`,
        "YYYY-MM-DD h:mm A",
        TIMEZONE
      );

      let shouldSend = false;
      let reminderTime;

      // For real reminders, send 10 minutes before appointment
      reminderTime = appointmentMoment.clone().subtract(10, "minutes");
      shouldSend = now.isAfter(reminderTime) && now.isBefore(appointmentMoment);
      console.log(
        `📅 Real reminder for ${parentEmail}: appointment at ${appointmentMoment.format(
          "YYYY-MM-DD h:mm A"
        )}, reminder time: ${reminderTime.format(
          "YYYY-MM-DD h:mm A"
        )}, should send: ${shouldSend}`
      );

      if (shouldSend) {
        console.log(`✅ Sending reminder to ${parentEmail}...`);

        try {
          await sendReminderEmailSync(
            appointmentDate,
            appointmentTime,
            parentEmail,
            parentName,
            doctorName,
            doctorEmail,
            meetingLink
          );

          // Mark as sent
          await doc.ref.update({
            reminderSent: true,
            sentAt: admin.firestore.FieldValue.serverTimestamp(),
          });

          sentCount++;
          console.log(`📧 Reminder sent successfully to ${parentEmail}`);
        } catch (emailError) {
          console.error(
            `❌ Error sending reminder to ${parentEmail}:`,
            emailError
          );
          // Mark as failed
          await doc.ref.update({
            reminderSent: false,
            lastError: emailError.message,
            lastAttempt: admin.firestore.FieldValue.serverTimestamp(),
          });
        }
      }
    }

    console.log(
      `✅ Manual trigger completed: Processed ${processedCount} reminders, sent ${sentCount} emails`
    );
    res.json({
      success: true,
      message: `Manual trigger: Processed ${processedCount} reminders, sent ${sentCount} emails`,
      processedCount,
      sentCount,
      timestamp: now.toISOString(),
      trigger: "manual",
    });
  } catch (error) {
    console.error("❌ Error in manual trigger:", error);
    res.status(500).json({
      success: false,
      error: error.message,
      timestamp: new Date().toISOString(),
      trigger: "manual",
    });
  }
});

// Debug endpoint to check pending reminders
app.get("/api/debug/reminders", async (req, res) => {
  console.log("🔍 Debug: Checking pending reminders...");

  try {
    const now = moment().tz(TIMEZONE);

    // Get all reminders
    const allRemindersSnapshot = await db
      .collection("ReminderEmails")
      .orderBy("createdAt", "desc")
      .limit(20)
      .get();

    const reminders = [];

    allRemindersSnapshot.forEach((doc) => {
      const data = doc.data();
      const appointmentMoment = moment.tz(
        `${data.appointmentDate} ${data.appointmentTime}`,
        "YYYY-MM-DD h:mm A",
        TIMEZONE
      );

      let reminderTime;
      reminderTime = appointmentMoment.clone().subtract(10, "minutes");

      reminders.push({
        id: doc.id,
        parentEmail: data.parentEmail,
        appointmentDate: data.appointmentDate,
        appointmentTime: data.appointmentTime,
        reminderSent: data.reminderSent,
        scheduledAt: data.scheduledAt,
        reminderTime: reminderTime.format("YYYY-MM-DD h:mm A"),
        shouldSendNow: now.isAfter(reminderTime),
        timeUntilReminder: reminderTime.diff(now, "minutes"),
      });
    });

    res.json({
      success: true,
      currentTime: now.format("YYYY-MM-DD h:mm A"),
      timezone: TIMEZONE,
      totalReminders: reminders.length,
      reminders,
    });
  } catch (error) {
    console.error("❌ Error in debug endpoint:", error);
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});

// Route to send donation thank you emails
app.post("/sendDonationThankYou", (req, res) => {
  console.log("Received request to send donation thank you email:", req.body); // Log incoming request data
  const { email, name, donationAmount, isRecurring, badgeName } = req.body;

  const recurringText = isRecurring
    ? "Your recurring monthly donation will help us provide continuous care to pets in need."
    : "Your one-time donation makes an immediate impact on the lives of pets and their families.";

  const mailOptions = {
    from: "support@rexvets.com",
    to: email,
    subject: "Thank You for Your Generous Donation - Rex Vets",
    html: `
            <h1>Thank You for Your Generous Donation!</h1>
            <p>Dear ${name},</p>
            <p>We are deeply grateful for your generous donation of $${donationAmount} to Rex Vets. Your compassion and support make it possible for us to provide essential veterinary care to pets in need, regardless of their families' financial circumstances.</p>
            <p>${recurringText}</p>
            <p>Thanks to donors like you, we can continue our mission of ensuring that every pet receives the love, care, and medical attention they deserve. Your contribution directly supports:</p>
            <ul>
                <li>Telehealth consultations for pets who need immediate care</li>
                <li>Follow-up treatments for chronic conditions</li>
                <li>Emergency care for pets in crisis</li>
                <li>Educational resources for pet parents</li>
            </ul>
            ${
              badgeName
                ? `<p>As a token of our appreciation, you've earned the "${badgeName}" badge, recognizing your commitment to pet welfare and our community.</p>`
                : ""
            }
            <p>Every tail wag, every purr, and every moment of comfort your donation provides is a testament to the difference you're making in the world. From all of us at Rex Vets—and from every pet whose life you've touched—thank you.</p>
            <p>If you have any questions about your donation or would like to learn more about our mission, please don't hesitate to reach out to our support team at support@rexvets.com.</p>
            <p>With heartfelt gratitude,<br>The Team at Rex Vets</p>
    
            <!-- Add logo here -->
            <p><img src="https://www.rexvets.com/static/media/Logo.c536919c80b8ff104089.png" alt="Rex Vets Logo" width="150" /></p>
        `,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log("Error sending donation thank you email:", error); // Log email sending error
      return res
        .status(500)
        .send({ message: "Failed to send donation thank you email" });
    }
    console.log("Donation thank you email sent:", info.response); // Log email success
    res.send({ message: "Donation thank you email sent successfully!" });
  });
});
