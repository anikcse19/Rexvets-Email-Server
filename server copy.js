// const express = require("express");
// const nodemailer = require("nodemailer");
// const cors = require("cors"); // Import CORS
// require("dotenv").config(); // Load environment variables from .env file
// const app = express();
// const PORT = process.env.PORT || 5000;

// app.use(cors()); // Enable CORS for all routes
// app.use(express.json()); // Middleware to parse JSON bodies

// // Setup Nodemailer with Brevo SMTP configuration
// const transporter = nodemailer.createTransport({
//   host: process.env.SMTP_HOST,
//   port: process.env.SMTP_PORT,
//   auth: {
//     user: process.env.SMTP_USER, // Using environment variable for user
//     pass: process.env.SMTP_PASSWORD, // Using environment variable for password
//   },
//   debug: true, // Enable debug output
//   logger: true, // Log to console
// });
// const moment = require("moment-timezone");

// // Configura el huso horario de Miami

// // Importar Firebase Admin SDK
// const admin = require("firebase-admin");
// const serviceAccount = require("./serviceAccountKey.json");
// // Inicializar Firebase Admin
// admin.initializeApp({
//   credential: admin.credential.cert(serviceAccount),
//   databaseURL: "https://rexvets-database.firebaseio.com",
// });

// const db = admin.firestore();

// // EMAILS

// app.post("/sendWelcomeEmailParent", (req, res) => {
//   console.log("Received request to send welcome email:", req.body); // Log incoming request data
//   const { email, name } = req.body;

//   const mailOptions = {
//     from: "support@rexvets.com",
//     to: email,
//     subject: "Welcome to Rex Vets!",
//     html: `
//             <h1>Welcome to Rex Vets!</h1>
//             <p>Dear ${name},</p>
//             <p>Welcome to Rex Vets and thank you for choosing us for your pet's healthcare needs. We're thrilled to have you on board and look forward to helping you and your furry friend live happier, healthier lives.</p>
//             <p>You're now part of a community of pet lovers who are committed to providing the best care for their pets. To schedule your first video call with one of our experienced veterinarians, simply visit the "Home" tab in your account and click "Book a video call", and you'll be on your way to a virtual appointment.</p>
//             <p>If you have any questions or need assistance at any point along the way, please don't hesitate to reach out to our dedicated support team at support@rexvets.com. We're here to make your experience with Rex Vets as seamless and enjoyable as possible.</p>
//             <p>Thank you once again for choosing Rex Vets. We can't wait to assist you in providing the best possible care for your pet.</p>
//             <p>Warm regards,<br>The Team at Rex Vets</p>

//             <!-- Add logo here -->
//             <p><img src="https://www.rexvets.com/static/media/Logo.c536919c80b8ff104089.png" alt="Rex Vets Logo" width="150" /></p>
//         `,
//   };
//   transporter.sendMail(mailOptions, (error, info) => {
//     if (error) {
//       console.log("Error sending email:", error); // Log email sending error
//       return res.status(500).send({ message: "Failed to send email" });
//     }
//     console.log("Email sent:", info.response); // Log email success
//     res.send({ message: "Welcome email sent successfully!" });
//   });
// });

// // Route to send booking confirmation emails
// app.post("/sendBookingConfirmation", async (req, res) => {
//   console.log("Received request to send booking confirmation:", req.body); // Log incoming request data
//   const {
//     doctorEmail,
//     doctorName,
//     parentEmail,
//     parentName,
//     petName,
//     appointmentDate,
//     appointmentTime,
//     meetingLink,
//   } = req.body;
//   console.log(
//     doctorEmail,
//     doctorName,
//     parentEmail,
//     parentName,
//     petName,
//     appointmentDate,
//     appointmentTime,
//     meetingLink
//   );

//   // Email content for doctor (same copy as for parents)
//   // Email content for doctor
//   const mailOptionsDoctor = {
//     from: "support@rexvets.com",
//     to: doctorEmail,
//     subject: "Appointment Confirmation - Rex Vets",
//     html: `
//             <p>Dear ${doctorName},</p>

//             <p>We're excited to confirm your upcoming video call appointment with ${parentName} at Rex Vets. Here are the details for your appointment:</p>
//             <p><strong>Start Time:</strong> ${appointmentDate} ${appointmentTime}</p>
//             <p><strong>Veterinarian:</strong> ${doctorName}</p>
//             <p><strong>Parent:</strong> ${parentName}</p>
//             <p><strong>Pet Name:</strong> ${petName}</p>
//             <p><strong>Meeting Link:</strong> <a href="${meetingLink}">${meetingLink}</a></p>

//             <p>Please make sure you're ready for the call at least a few minutes before the scheduled time.</p>

//             <p>If you need to reschedule or have any other questions, please feel free to reply to this email or contact our support team at <a href="mailto:support@rexvets.com">support@rexvets.com</a>.</p>

//             <p>We thank you for your dedication to pet's care.</p>

//             <p>Warm regards,<br>The Team at Rex Vets</p>

//             <!-- Add logo here -->
//             <p><img src="https://www.rexvets.com/static/media/Logo.c536919c80b8ff104089.png" alt="Rex Vets Logo" width="150" /></p>
//         `,
//   };

//   // Email content for parent (same copy as for doctors)
//   const mailOptionsParent = {
//     from: "support@rexvets.com",
//     to: parentEmail,
//     subject: "Your Appointment Confirmation - Rex Vets",
//     html: `
//             <p>Dear ${parentName},</p>

//             <p>We're excited to confirm your upcoming video call appointment with <strong>${doctorName}</strong> at Rex Vets. Here are the details for your appointment:</p>
//             <p><strong>Start Time:</strong> ${appointmentDate} ${appointmentTime}</p>
//             <p><strong>Veterinarian:</strong> ${doctorName}</p>
//             <p><strong>Pet Name:</strong> ${petName}</p>
//             <p><strong>Meeting Link:</strong> <a href="${meetingLink}">${meetingLink}</a></p>

//             <p>Please make sure you're ready for the call at least a few minutes before the scheduled time. ${doctorName} is here to address any questions or concerns you have about your pet's health.</p>

//             <p>If you need to reschedule or have any other questions, please feel free to reply to this email or contact our support team at <a href="mailto:support@rexvets.com">support@rexvets.com</a>.</p>

//             <p>We look forward to assisting you with your pet's care.</p>

//             <p>Warm regards,<br>The Team at Rex Vets</p>

//             <!-- Add logo here -->
//             <p><img src="https://www.rexvets.com/static/media/Logo.c536919c80b8ff104089.png" alt="Rex Vets Logo" width="150" /></p>
//         `,
//   };

//   try {
//     // Send emails
//     await transporter.sendMail(mailOptionsDoctor);
//     await transporter.sendMail(mailOptionsParent);

//     // Response
//     res.send({ message: "Booking confirmation emails sent successfully!" });
//     console.log("Booking confirmation emails sent successfully!");

//     // IMPORTANT: Store reminder in Firestore instead of using setTimeout
//     console.log("🔄 Attempting to schedule reminder in Firestore...");
//     try {
//       const reminderData = {
//         appointmentDate,
//         appointmentTime,
//         parentEmail,
//         parentName,
//         doctorName,
//         doctorEmail,
//         meetingLink,
//         scheduledAt: new Date().toISOString(),
//         reminderSent: false,
//         testReminder: true, // Mark as test reminder for 5 minutes
//         createdAt: admin.firestore.FieldValue.serverTimestamp(),
//       };

//       const reminderRef = await db
//         .collection("ReminderEmails")
//         .add(reminderData);
//       console.log(
//         "✅ Reminder scheduled in Firestore with ID:",
//         reminderRef.id
//       );
//     } catch (firestoreError) {
//       console.error("❌ Error storing reminder in Firestore:", firestoreError);
//     }

//     // Add test reminder scheduling with detailed logging
//     console.log("🕐 Setting up setTimeout for test reminder (5 minutes)...");
//     console.log("📅 Current time:", new Date().toISOString());
//     console.log(
//       "⏰ Timeout will fire at:",
//       new Date(Date.now() + 5 * 60 * 1000).toISOString()
//     );

//     const timeoutId = setTimeout(() => {
//       console.log("🚀 TIMEOUT FIRED! Executing test reminder email...");
//       console.log("📧 Calling sendTestReminderEmail function...");
//       sendTestReminderEmail(
//         appointmentDate,
//         appointmentTime,
//         parentEmail,
//         parentName,
//         doctorName,
//         doctorEmail,
//         meetingLink
//       );
//     }, 5 * 60 * 1000); // 5 minutes in milliseconds milliseconds

//     console.log("⏳ setTimeout created with ID:", timeoutId);
//     console.log(
//       "🔍 Process will likely terminate before timeout executes in serverless environment"
//     );
//   } catch (error) {
//     console.error("Error sending booking confirmation emails:", error);
//     res
//       .status(500)
//       .send({ message: "Failed to send booking confirmation emails" });
//   }
// });

// // Add new function for test reminder with enhanced logging
// function sendTestReminderEmail(
//   appointmentDate,
//   appointmentTime,
//   parentEmail,
//   parentName,
//   doctorName,
//   doctorEmail,
//   meetingLink
// ) {
//   console.log("🎯 sendTestReminderEmail function called!");
//   console.log("📧 Sending test reminder email 5 minutes after confirmation.");
//   console.log("📝 Email details:", { parentEmail, parentName, doctorName });

//   const testEmailContent = `<!DOCTYPE html>
//     <html>
//     <head>
//         <title>Test Reminder</title>
//         <style>
//             body { font-family: Arial, sans-serif; margin: 20px; }
//             .container { max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #ddd; border-radius: 10px; }
//             .header { background-color: #002366; color: white; padding: 15px; text-align: center; border-radius: 5px; }
//             .content { padding: 20px 0; }
//             .button { background-color: #002366; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; display: inline-block; margin: 10px 0; }
//         </style>
//     </head>
//     <body>
//         <div class="container">
//             <div class="header">
//                 <h1>🧪 TEST REMINDER EMAIL</h1>
//             </div>
//             <div class="content">
//                 <h2>Dear ${parentName}</h2>
//                 <p>This is a <strong>TEST</strong> reminder email for your upcoming video call appointment with <strong>${doctorName}</strong> at Rex Vets.</p>
//                 <p>In a real scenario, this email would be sent 10 minutes before your appointment.</p>
//                 <p><strong>Appointment:</strong> ${appointmentDate} at ${appointmentTime}</p>
//                 <p><strong>Meeting Link:</strong> <a href="${meetingLink}" target="_blank">${meetingLink}</a></p>
//                 <div style="text-align: center;">
//                     <a href="${meetingLink}" target="_blank" class="button">
//                         <strong>JOIN TEST MEETING</strong>
//                     </a>
//                 </div>
//                 <p style="font-size: 12px; color: #666; margin-top: 30px; border-top: 1px solid #eee; padding-top: 15px;">
//                     ⚠️ This is a test email sent for development purposes.
//                     <br>Timestamp: ${new Date().toISOString()}
//                     <br>Function executed successfully in serverless environment
//                 </p>
//             </div>
//         </div>
//     </body>
//     </html>`;

//   const mailOptionsParentTest = {
//     from: "support@rexvets.com",
//     to: parentEmail,
//     subject: "🧪 TEST - Appointment Reminder (5min delay) - Rex Vets",
//     html: testEmailContent,
//   };

//   console.log("📤 Attempting to send test reminder email...");
//   transporter.sendMail(mailOptionsParentTest, (error, info) => {
//     if (error) {
//       console.log("❌ Error sending test reminder email:", error);
//     } else {
//       console.log("✅ Test reminder email sent successfully:", info.response);
//       console.log("📧 Email sent to reciver:", parentEmail);
//     }
//   });

//   // Optionally send to doctor for testing
//   const mailOptionsDoctorTest = {
//     from: "support@rexvets.com",
//     to: doctorEmail,
//     subject: "🧪 TEST - Appointment Reminder (5min delay) - Rex Vets",
//     html: testEmailContent
//       .replace(parentName, doctorName)
//       .replace("Dear " + doctorName, "Dear Dr. " + doctorName),
//   };

//   if (doctorEmail) {
//     transporter.sendMail(mailOptionsDoctorTest, (error, info) => {
//       if (error) {
//         console.log("❌ Error sending test reminder email to doctor:", error);
//       } else {
//         console.log(
//           "✅ Test reminder email sent to doctor successfully:",
//           info.response
//         );
//       }
//     });
//   }
// }

// //RECORDATORIO EMAIL

// const TIMEZONE = "America/New_York"; // Configura el huso horario deseado

// function scheduleReminderEmail(
//   appointmentDate,
//   appointmentTime,
//   parentEmail,
//   parentName,
//   doctorName,
//   doctorEmail,
//   meetingLink
// ) {
//   console.log("Attempting to schedule reminder email.");
//   const now = moment().tz(TIMEZONE);

//   // Clone the appointmentMoment and subtract 10 minutes
//   const appointmentMoment = moment.tz(
//     `${appointmentDate} ${appointmentTime}`,
//     "YYYY-MM-DD h:mm A",
//     TIMEZONE
//   );

//   console.log(`Current time (${TIMEZONE}): ${now.format("YYYY-MM-DD h:mm A")}`);
//   console.log(
//     `Appointment time (${TIMEZONE}): ${appointmentMoment.format(
//       "YYYY-MM-DD h:mm A"
//     )}`
//   );

//   // Calculate the difference in milliseconds between now and 10 minutes before the appointment
//   const appointmentMomentMinus10 = appointmentMoment
//     .clone()
//     .subtract(10, "minutes");
//   console.log(
//     `Reminder scheduled for: ${appointmentMomentMinus10.format(
//       "YYYY-MM-DD h:mm A"
//     )}`
//   );

//   const timeDifference = appointmentMomentMinus10.diff(now);
//   console.log(`Time difference until reminder (ms): ${timeDifference}`);

//   if (timeDifference > 0) {
//     console.log(
//       `Scheduling reminder email for ${parentEmail} in ${timeDifference}ms.`
//     );
//     setTimeout(() => {
//       let EMAILFORPATIENTPREV = `<!DOCTYPE html>
//       <html xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office" lang="en">
//       <head>
//         <title></title>
//         <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
//         <meta name="viewport" content="width=device-width, initial-scale=1.0">
//         <link href="https://fonts.googleapis.com/css?family=Lato" rel="stylesheet" type="text/css">
//         <style>
//           * { box-sizing: border-box; }
//           body { margin: 0; padding: 0; }
//           a[x-apple-data-detectors] { color: inherit !important; text-decoration: inherit !important; }
//           #MessageViewBody a { color: inherit; text-decoration: none; }
//           p { line-height: inherit }
//           .desktop_hide, .desktop_hide table { mso-hide: all; display: none; max-height: 0px; overflow: hidden; }
//           .image_block img+div { display: none; }
//           sup, sub { line-height: 0; font-size: 75%; }
//           @media (max-width:660px) {
//             .desktop_hide table.icons-inner, .social_block.desktop_hide .social-table {
//               display: inline-block !important;
//             }
//             .icons-inner { text-align: center; }
//             .icons-inner td { margin: 0 auto; }
//             .mobile_hide { display: none; }
//             .row-content { width: 100% !important; }
//             .stack .column { width: 100%; display: block; }
//             .mobile_hide { min-height: 0; max-height: 0; max-width: 0; overflow: hidden; font-size: 0px; }
//             .desktop_hide, .desktop_hide table { display: table !important; max-height: none !important; }
//           }
//         </style>
//       </head>
//       <body class="body" style="background-color: #c5f1fc; margin: 0; padding: 0; -webkit-text-size-adjust: none; text-size-adjust: none;">
//       <div class="CompleteEmail"><table class="nl-container" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #c5f1fc;">
//           <tbody>
//             <tr>
//               <td>
//                 <table class="row row-1" align="center" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
//                   <tbody>
//                     <tr>
//                       <td>
//                         <table class="row-content stack" align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; color: #000000; width: 640px; margin: 0 auto;" width="640">
//                           <tbody>
//                             <tr>
//                               <td class="column column-1" width="100%" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; padding-bottom: 5px; padding-top: 5px; vertical-align: top; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;">
//                                 <div class="spacer_block block-1" style="height:50px;line-height:50px;font-size:1px;">&#8202;</div>
//                               </td>
//                             </tr>
//                           </tbody>
//                         </table>
//                       </td>
//                     </tr>
//                   </tbody>
//                 </table>
//                 <table class="row row-2" align="center" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
//                   <tbody>
//                     <tr>
//                       <td>
//                         <table class="row-content stack" align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #ffffff; color: #000000; width: 640px; margin: 0 auto;" width="640">
//                           <tbody>
//                             <tr>
//                               <td class="column column-1" width="100%" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; vertical-align: top; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;">
//                                 <table class="image_block block-1" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
//                                   <tr>
//                                     <td class="pad" style="width:100%;">
//                                       <div class="alignment" align="center" style="line-height:10px">
//                                         <div style="max-width: 640px;"><img src="https://i.imgur.com/5AOt9ex.png" style="display: block; height: auto; border: 0; width: 100%;" width="640" alt="Dog Banner" title="Dog Banner" height="auto"></div>
//                                       </div>
//                                     </td>
//                                   </tr>
//                                 </table>
//                               </td>
//                             </tr>
//                           </tbody>
//                         </table>
//                       </td>
//                     </tr>
//                   </tbody>
//                 </table>
//                 <table class="row row-3" align="center" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
//                   <tbody>
//                     <tr>
//                       <td>
//                         <table class="row-content stack" align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; border-radius: 0; color: #000000; width: 640px; margin: 0 auto;" width="640">
//                           <tbody>
//                             <tr>
//                               <td class="column column-1" width="100%" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; background-color: #ffffff; padding-bottom: 5px; padding-top: 5px; vertical-align: top; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;">
//                                 <table class="heading_block block-1" width="100%" border="0" cellpadding="10" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
//                                   <tr>
//                                     <td class="pad">
//                                       <h1 style="margin: 0; color: #7747FF; direction: ltr; font-family: Lato, Tahoma, Verdana, Segoe, sans-serif; font-size: 38px; font-weight: 700; letter-spacing: normal; line-height: 120%; text-align: left; margin-top: 0; margin-bottom: 0; mso-line-height-alt: 45.6px;">
//                                         <span style="word-break: break-word; color: #000000;"><strong>Dear ${parentName}</strong></span>
//                                       </h1>
//                                     </td>
//                                   </tr>
//                                 </table>
//                               </td>
//                             </tr>
//                           </tbody>
//                         </table>
//                       </td>
//                     </tr>
//                   </tbody>
//                 </table>
//                 <table class="row row-4" align="center" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
//                   <tbody>
//                     <tr>
//                       <td>
//                         <table class="row-content stack" align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; border-radius: 0; color: #000000; width: 640px; margin: 0 auto;" width="640">
//                           <tbody>
//                             <tr>
//                               <td class="column column-1" width="100%" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; background-color: #ffffff; padding-bottom: 5px; padding-top: 5px; vertical-align: top; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;">
//                                 <table class="paragraph_block block-1" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;">
//                                   <tr>
//                                     <td class="pad" style="padding-bottom:10px;padding-left:20px;padding-right:20px;padding-top:10px;">
//                                       <div style="color:#555555;font-family:Lato, Tahoma, Verdana, Segoe, sans-serif;font-size:14px;line-height:120%;text-align:left;mso-line-height-alt:16.8px;">
//                                         <p style="margin: 0; word-break: break-word;">We hope this message finds you well. Your upcoming video call appointment with <strong>${doctorName}</strong> at Rex Vets is just around the corner, and we're thrilled to assist you with your pet's health.</p>
//                                         <p style="margin: 0; word-break: break-word;">&nbsp;</p>
//                                         <p style="margin: 0; word-break: break-word;">The link to join your video call is now available. To access your appointment, please click the following link:</p>
//                                         <p style="margin: 0; word-break: break-word;">&nbsp;</p>
//                                         <p style="margin: 0; word-break: break-word;"><strong><a href="${meetingLink}" target="_blank">Please click here to join video</a></strong></p>
//                                         <p style="margin: 0; word-break: break-word;">&nbsp;</p>
//                                         <p style="margin: 0; word-break: break-word;">Please make sure you're prepared and have any relevant information or questions ready for the call. <strong>${doctorName}</strong> is dedicated to providing the best care for your furry friend.<br><br>If you encounter any issues or have any last-minute questions, don't hesitate to reach out to our support team at <a href="mailto:support@rexvets.com">support@rexvets.com</a></p>
//                                         <p style="margin: 0; word-break: break-word;">&nbsp;</p>
//                                         <p style="margin: 0; word-break: break-word;">We look forward to connecting with you and addressing your pet's health needs.</p>
//                                         <p style="margin: 0; word-break: break-word;">&nbsp;</p>
//                                         <p style="margin: 0; word-break: break-word;">Thank you for choosing Rex Vets for your pet's care.</p>
//                                         <p style="margin: 0; word-break: break-word;">&nbsp;</p>
//                                         <p style="margin: 0; word-break: break-word;">Warm regards, <strong>The Team at Rex Vets</strong></p>
//                                       </div>
//                                     </td>
//                                   </tr>
//                                 </table>
//                                 <table class="button_block block-2" width="100%" border="0" cellpadding="10" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
//                                   <tr>
//                                     <td class="pad">
//                                       <div class="alignment" align="center">
//                                         <a href="${meetingLink}" target="_blank" style="background-color:#002366;border-bottom:0px solid transparent;border-left:0px solid transparent;border-radius:10px;border-right:0px solid transparent;border-top:0px solid transparent;color:#ffffff;display:inline-block;font-family:'Lato', Tahoma, Verdana, Segoe, sans-serif;font-size:16px;font-weight:undefined;mso-border-alt:none;padding-bottom:5px;padding-top:5px;text-align:center;text-decoration:none;width:auto;word-break:keep-all;">
//                                           <span style="word-break: break-word; padding-left: 20px; padding-right: 20px; font-size: 16px; display: inline-block; letter-spacing: normal;">
//                                             <strong>MEETING LINK</strong>
//                                           </span>
//                                         </a>
//                                       </div>
//                                     </td>
//                                   </tr>
//                                 </table>
//                                 <table class="paragraph_block block-3" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;">
//                                   <tr>
//                                     <td class="pad" style="padding-bottom:10px;padding-left:20px;padding-right:20px;padding-top:10px;">
//                                       <div style="color:#555555;font-family:Lato, Tahoma, Verdana, Segoe, sans-serif;font-size:14px;line-height:120%;text-align:left;mso-line-height-alt:16.8px;">&nbsp;</div>
//                                     </td>
//                                   </tr>
//                                 </table>
//                               </td>
//                             </tr>
//                           </tbody>
//                         </table>
//                       </td>
//                     </tr>
//                   </tbody>
//                 </table>
//                 <table class="row row-5" align="center" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
//                   <tbody>
//                     <tr>
//                       <td>
//                       <table class="row-content stack" align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #00b3d3; background-position: center top; color: #000000; width: 640px; margin: 0 auto;" width="640">
//                       <tbody>
//                         <tr>
//                           <td class="column column-1" width="100%" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; background-color: #002366; padding-bottom: 5px; padding-top: 5px; vertical-align: top; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;">
//                             <table class="image_block block-1" width="100%" border="0" cellpadding="10" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
//                               <tr>
//                                 <td class="pad">
//                                   <div class="alignment" align="center" style="line-height:10px">
//                                     <div style="max-width: 620px;"><a href="https://www.rexvets.com" target="_blank" style="outline:none" tabindex="-1"><img src="https://i.ibb.co/3CZBJyh/5bfa.png" style="display: block; height: auto; border: 0; width: 100%;" width="620" alt="Your Logo" title="Your Logo" height="auto"></a></div>
//                                   </div>
//                                 </td>
//                               </tr>
//                             </table>
//                                 <table class="social_block block-2" width="100%" border="0" cellpadding="10" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
//                                   <tr>
//                                     <td class="pad">
//                                       <div class="alignment" align="center">
//                                         <table class="social-table" width="92px" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; display: inline-block;">
//                                           <tr>
//                                             <td style="padding:0 7px 0 7px;"><a href="https://www.facebook.com/rexvets" target="_blank"><img src="https://app-rsrc.getbee.io/public/resources/social-networks-icon-sets/t-circle-white/facebook@2x.png" width="32" height="auto" alt="Facebook" title="Facebook" style="display: block; height: auto; border: 0;"></a></td>
//                                             <td style="padding:0 7px 0 7px;"><a href="https://www.instagram.com/rexvets" target="_blank"><img src="https://app-rsrc.getbee.io/public/resources/social-networks-icon-sets/t-circle-white/instagram@2x.png" width="32" height="auto" alt="Instagram" title="Instagram" style="display: block; height: auto; border: 0;"></a></td>
//                                           </tr>
//                                         </table>
//                                       </div>
//                                     </td>
//                                   </tr>
//                                 </table>
//                                 <table class="paragraph_block block-3" width="100%" border="0" cellpadding="10" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;">
//                                   <tr>
//                                     <td class="pad">
//                                       <div style="color:#555555;font-family:Lato, Tahoma, Verdana, Segoe, sans-serif;font-size:14px;line-height:120%;text-align:center;mso-line-height-alt:16.8px;">
//                                         <p style="margin: 0; word-break: break-word;"><span style="word-break: break-word; color: #ffffff;"><strong>Rex Vets </strong>is a <strong>non-profit organization</strong>, and our efforts are sustained by the generosity of our donors. If you would like to support our mission with a donation, we would be deeply grateful. You can make a contribution through <strong><a href="https://www.rexvets.com/PetParents" target="_blank" style="color: #ffffff;">the following link</a></strong></span></p>
//                                       </div>
//                                     </td>
//                                   </tr>
//                                 </table>
//                                 <div class="spacer_block block-4" style="height:30px;line-height:30px;font-size:1px;">&#8202;</div>
//                               </td>
//                             </tr>
//                           </tbody>
//                         </table>
//                       </td>
//                     </tr>
//                   </tbody>
//                 </table>
//               </td>
//             </tr>
//           </tbody>
//         </table>
//       </body>
//       </html>

//     `;
//       const mailOptionsParent = {
//         from: "support@rexvets.com",
//         to: parentEmail,
//         subject: "Appointment Reminder - Rex Vets",
//         html: EMAILFORPATIENTPREV,
//       };

//       transporter.sendMail(mailOptionsParent, (error, info) => {
//         if (error) {
//           console.log("Error sending reminder email to parent:", error);
//         } else {
//           console.log("Reminder email sent to parent:", info.response);
//         }
//       });
//     }, timeDifference);

//     // Programar el envío del correo al doctor
//     setTimeout(() => {
//       let EMAILFORDOCTORSPREV = `<!DOCTYPE html>
//       <html xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office" lang="en">
//       <head>
//         <title></title>
//         <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
//         <meta name="viewport" content="width=device-width, initial-scale=1.0">
//         <link href="https://fonts.googleapis.com/css?family=Lato" rel="stylesheet" type="text/css">
//         <style>
//           * { box-sizing: border-box; }
//           body { margin: 0; padding: 0; }
//           a[x-apple-data-detectors] { color: inherit !important; text-decoration: inherit !important; }
//           #MessageViewBody a { color: inherit; text-decoration: none; }
//           p { line-height: inherit }
//           .desktop_hide, .desktop_hide table { mso-hide: all; display: none; max-height: 0px; overflow: hidden; }
//           .image_block img+div { display: none; }
//           sup, sub { line-height: 0; font-size: 75%; }
//           @media (max-width:660px) {
//             .desktop_hide table.icons-inner, .social_block.desktop_hide .social-table {
//               display: inline-block !important;
//             }
//             .icons-inner { text-align: center; }
//             .icons-inner td { margin: 0 auto; }
//             .mobile_hide { display: none; }
//             .row-content { width: 100% !important; }
//             .stack .column { width: 100%; display: block; }
//             .mobile_hide { min-height: 0; max-height: 0; max-width: 0; overflow: hidden; font-size: 0px; }
//             .desktop_hide, .desktop_hide table { display: table !important; max-height: none !important; }
//           }
//         </style>
//       </head>
//       <body class="body" style="background-color: #c5f1fc; margin: 0; padding: 0; -webkit-text-size-adjust: none; text-size-adjust: none;">
//         <table class="nl-container" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #c5f1fc;">
//           <tbody>
//             <tr>
//               <td>
//                 <table class="row row-1" align="center" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
//                   <tbody>
//                     <tr>
//                       <td>
//                         <table class="row-content stack" align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; color: #000000; width: 640px; margin: 0 auto;" width="640">
//                           <tbody>
//                             <tr>
//                               <td class="column column-1" width="100%" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; padding-bottom: 5px; padding-top: 5px; vertical-align: top; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;">
//                                 <div class="spacer_block block-1" style="height:50px;line-height:50px;font-size:1px;">&#8202;</div>
//                               </td>
//                             </tr>
//                           </tbody>
//                         </table>
//                       </td>
//                     </tr>
//                   </tbody>
//                 </table>
//                 <table class="row row-2" align="center" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
//                   <tbody>
//                     <tr>
//                       <td>
//                         <table class="row-content stack" align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #ffffff; color: #000000; width: 640px; margin: 0 auto;" width="640">
//                           <tbody>
//                             <tr>
//                               <td class="column column-1" width="100%" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; vertical-align: top; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;">
//                                 <table class="image_block block-1" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
//                                   <tr>
//                                     <td class="pad" style="width:100%;">
//                                       <div class="alignment" align="center" style="line-height:10px">
//                                         <div style="max-width: 640px;"><img src="https://i.ibb.co/xHZRkD7/appointment-vets.png" style="display: block; height: auto; border: 0; width: 100%;" width="640" alt="Dog Banner" title="Dog Banner" height="auto"></div>
//                                       </div>
//                                     </td>
//                                   </tr>
//                                 </table>
//                               </td>
//                             </tr>
//                           </tbody>
//                         </table>
//                       </td>
//                     </tr>
//                   </tbody>
//                 </table>
//                 <table class="row row-3" align="center" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
//                   <tbody>
//                     <tr>
//                       <td>
//                         <table class="row-content stack" align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; border-radius: 0; color: #000000; width: 640px; margin: 0 auto;" width="640">
//                           <tbody>
//                             <tr>
//                               <td class="column column-1" width="100%" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; background-color: #ffffff; padding-bottom: 5px; padding-top: 5px; vertical-align: top; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;">
//                                 <table class="heading_block block-1" width="100%" border="0" cellpadding="10" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
//                                   <tr>
//                                     <td class="pad">
//                                       <h1 style="margin: 0; color: #7747FF; direction: ltr; font-family: Lato, Tahoma, Verdana, Segoe, sans-serif; font-size: 38px; font-weight: 700; letter-spacing: normal; line-height: 120%; text-align: left; margin-top: 0; margin-bottom: 0; mso-line-height-alt: 45.6px;">
//                                         <span style="word-break: break-word; color: #000000;"><strong>Dear ${doctorName}</strong></span>
//                                       </h1>
//                                     </td>
//                                   </tr>
//                                 </table>
//                               </td>
//                             </tr>
//                           </tbody>
//                         </table>
//                       </td>
//                     </tr>
//                   </tbody>
//                 </table>
//                 <table class="row row-4" align="center" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
//                   <tbody>
//                     <tr>
//                       <td>
//                         <table class="row-content stack" align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; border-radius: 0; color: #000000; width: 640px; margin: 0 auto;" width="640">
//                           <tbody>
//                             <tr>
//                               <td class="column column-1" width="100%" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; background-color: #ffffff; padding-bottom: 5px; padding-top: 5px; vertical-align: top; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;">
//                                 <table class="paragraph_block block-1" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;">
//                                   <tr>
//                                     <td class="pad" style="padding-bottom:10px;padding-left:20px;padding-right:20px;padding-top:10px;">
//                                       <div style="color:#555555;font-family:Lato, Tahoma, Verdana, Segoe, sans-serif;font-size:14px;line-height:120%;text-align:left;mso-line-height-alt:16.8px;">
//                                         <p style="margin: 0; word-break: break-word;">We hope you're ready for your upcoming appointment with <strong>${parentName}</strong>. The video call for this appointment will be happening shortly.</p>
//                                         <p style="margin: 0; word-break: break-word;">&nbsp;</p>
//                                         <p style="margin: 0; word-break: break-word;">To join the video call, please use the following link:</p>
//                                         <p style="margin: 0; word-break: break-word;">&nbsp;</p>
//                                         <p style="margin: 0; word-break: break-word;"><strong><a href="${meetingLink}" target="_blank">Click here to join the video call</a></strong></p>
//                                         <p style="margin: 0; word-break: break-word;">&nbsp;</p>
//                                         <p style="margin: 0; word-break: break-word;">Make sure you have your notes and any relevant details about <strong>${parentName}</strong>'s pet prepared for the consultation. If you need to reschedule or have any questions, feel free to reach out to our support team at <a href="mailto:support@rexvets.com">support@rexvets.com</a>.</p>
//                                         <p style="margin: 0; word-break: break-word;">&nbsp;</p>
//                                         <p style="margin: 0; word-break: break-word;">Thank you for your commitment to providing excellent care at Rex Vets.</p>
//                                         <p style="margin: 0; word-break: break-word;">&nbsp;</p>
//                                         <p style="margin: 0; word-break: break-word;">Best regards, <strong>The Rex Vets Team</strong></p>
//                                       </div>
//                                     </td>
//                                   </tr>
//                                 </table>
//                                 <table class="button_block block-2" width="100%" border="0" cellpadding="10" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
//                                   <tr>
//                                     <td class="pad">
//                                       <div class="alignment" align="center">
//                                         <a href="${meetingLink}" target="_blank" style="background-color:#002366;border-bottom:0px solid transparent;border-left:0px solid transparent;border-radius:10px;border-right:0px solid transparent;border-top:0px solid transparent;color:#ffffff;display:inline-block;font-family:'Lato', Tahoma, Verdana, Segoe, sans-serif;font-size:16px;font-weight:undefined;mso-border-alt:none;padding-bottom:5px;padding-top:5px;text-align:center;text-decoration:none;width:auto;word-break:keep-all;">
//                                           <span style="word-break: break-word; padding-left: 20px; padding-right: 20px; font-size: 16px; display: inline-block; letter-spacing: normal;">
//                                             <strong>JOIN MEETING</strong>
//                                           </span>
//                                         </a>
//                                       </div>
//                                     </td>
//                                   </tr>
//                                 </table>
//                                 <table class="paragraph_block block-3" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;">
//                                   <tr>
//                                     <td class="pad" style="padding-bottom:10px;padding-left:20px;padding-right:20px;padding-top:10px;">
//                                       <div style="color:#555555;font-family:Lato, Tahoma, Verdana, Segoe, sans-serif;font-size:14px;line-height:120%;text-align:left;mso-line-height-alt:16.8px;">&nbsp;</div>
//                                     </td>
//                                   </tr>
//                                 </table>
//                               </td>
//                             </tr>
//                           </tbody>
//                         </table>
//                       </td>
//                     </tr>
//                   </tbody>
//                 </table>
//                 <table class="row row-5" align="center" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
//                   <tbody>
//                     <tr>
//                       <td>
//                       <table class="row-content stack" align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #00b3d3; background-position: center top; color: #000000; width: 640px; margin: 0 auto;" width="640">
//                       <tbody>
//                         <tr>
//                           <td class="column column-1" width="100%" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; background-color: #002366; padding-bottom: 5px; padding-top: 5px; vertical-align: top; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;">
//                             <table class="image_block block-1" width="100%" border="0" cellpadding="10" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
//                               <tr>
//                                 <td class="pad">
//                                   <div class="alignment" align="center" style="line-height:10px">
//                                     <div style="max-width: 620px;"><a href="https://www.rexvets.com" target="_blank" style="outline:none" tabindex="-1"><img src="https://i.ibb.co/3CZBJyh/5bfa.png" style="display: block; height: auto; border: 0; width: 100%;" width="620" alt="Your Logo" title="Your Logo" height="auto"></a></div>
//                                   </div>
//                                 </td>
//                               </tr>
//                             </table>
//                                 <table class="social_block block-2" width="100%" border="0" cellpadding="10" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
//                                   <tr>
//                                     <td class="pad">
//                                       <div class="alignment" align="center">
//                                         <table class="social-table" width="92px" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; display: inline-block;">
//                                           <tr>
//                                             <td style="padding:0 7px 0 7px;"><a href="https://www.facebook.com/rexvets" target="_blank"><img src="https://app-rsrc.getbee.io/public/resources/social-networks-icon-sets/t-circle-white/facebook@2x.png" width="32" height="auto" alt="Facebook" title="Facebook" style="display: block; height: auto; border: 0;"></a></td>
//                                             <td style="padding:0 7px 0 7px;"><a href="https://www.instagram.com/rexvets" target="_blank"><img src="https://app-rsrc.getbee.io/public/resources/social-networks-icon-sets/t-circle-white/instagram@2x.png" width="32" height="auto" alt="Instagram" title="Instagram" style="display: block; height: auto; border: 0;"></a></td>
//                                           </tr>
//                                         </table>
//                                       </div>
//                                     </td>
//                                   </tr>
//                                 </table>
//                                 <table class="paragraph_block block-3" width="100%" border="0" cellpadding="10" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;">
//                                   <tr>
//                                     <td class="pad">
//                                       <div style="color:#555555;font-family:Lato, Tahoma, Verdana, Segoe, sans-serif;font-size:14px;line-height:120%;text-align:center;mso-line-height-alt:16.8px;">
//                                         <p style="margin: 0; word-break: break-word;"><span style="word-break: break-word; color: #ffffff;"><strong>Rex Vets </strong>is a <strong>non-profit organization</strong>, and our efforts are sustained by the generosity of our donors. If you would like to support our mission with a donation, we would be deeply grateful. You can make a contribution through <strong><a href="https://www.rexvets.com/PetParents" target="_blank" style="color: #ffffff;">the following link</a></strong></span></p>
//                                       </div>
//                                     </td>
//                                   </tr>
//                                 </table>
//                                 <div class="spacer_block block-4" style="height:30px;line-height:30px;font-size:1px;">&#8202;</div>
//                               </td>
//                             </tr>
//                           </tbody>
//                         </table>
//                       </td>
//                     </tr>
//                   </tbody>
//                 </table>
//               </td>
//             </tr>
//           </tbody>
//         </table>
//         </div>
//       </body>
//       </html>

//       `;
//       const mailOptionsDoctor = {
//         from: "support@rexvets.com",
//         to: doctorEmail,
//         subject: "Appointment Reminder - Rex Vets",
//         html: EMAILFORDOCTORSPREV,
//       };

//       transporter.sendMail(mailOptionsDoctor, (error, info) => {
//         if (error) {
//           console.log("Error sending reminder email to doctor:", error);
//         } else {
//           console.log("Reminder email sent to doctor:", info.response);
//         }
//       });
//     }, timeDifference);
//   } else {
//     console.log(
//       "No reminder emails to send, appointment is too close or past."
//     );
//   }
// }

// function trackAppointments() {
//   console.log("Starting appointment tracking.");
//   const appointmentsCol = db.collection("Appointments");

//   // Escuchar cambios en tiempo real
//   console.log("Setting up real-time listener for Appointments collection...");
//   appointmentsCol.onSnapshot(async (snapshot) => {
//     console.log(
//       `Received appointment snapshot with ${
//         snapshot.docChanges().length
//       } changes.`
//     );
//     snapshot.docChanges().forEach(async (change) => {
//       const appointment = change.doc.data();
//       const {
//         AppointmentDate,
//         AppointmentTime,
//         ParentEmail,
//         ParentName,
//         DoctorName,
//         DoctorEmail,
//         MeetingLink,
//         reminderScheduled,
//       } = appointment;

//       console.log(
//         `Processing appointment change type: ${change.type} for parent: ${ParentEmail}`
//       );

//       if (change.type === "added" || change.type === "modified") {
//         // Check if no reminder is scheduled
//         if (!reminderScheduled) {
//           console.log(
//             `Scheduling reminder for new/updated appointment: ${ParentEmail} (ID: ${change.doc.id})`
//           );
//           // Programar el recordatorio
//           scheduleReminderEmail(
//             AppointmentDate,
//             AppointmentTime,
//             ParentEmail,
//             ParentName,
//             DoctorName,
//             DoctorEmail,
//             MeetingLink
//           );

//           // Actualizar la cita en la base de datos
//           const appointmentRef = db
//             .collection("Appointments")
//             .doc(change.doc.id);
//           await appointmentRef.update({ reminderScheduled: true });
//         }
//       }
//     });

//     // Add logic to find and log the next upcoming appointment-del
//     const now = moment().tz(TIMEZONE);
//     const upcomingAppointments = snapshot.docs
//       .map((doc) => ({ id: doc.id, ...doc.data() }))
//       .filter((appointment) => {
//         const appointmentMoment = moment.tz(
//           `${appointment.AppointmentDate} ${appointment.AppointmentTime}`,
//           "YYYY-MM-DD h:mm A",
//           TIMEZONE
//         );
//         return appointmentMoment.isAfter(now);
//       })
//       .sort((a, b) => {
//         const momentA = moment.tz(
//           `${a.AppointmentDate} ${a.AppointmentTime}`,
//           "YYYY-MM-DD h:mm A",
//           TIMEZONE
//         );
//         const momentB = moment.tz(
//           `${b.AppointmentDate} ${b.AppointmentTime}`,
//           "YYYY-MM-DD h:mm A",
//           TIMEZONE
//         );
//         return momentA.diff(now) - momentB.diff(now);
//       });

//     if (upcomingAppointments.length > 0) {
//       const nextAppointment = upcomingAppointments[0];
//       const nextMoment = moment.tz(
//         `${nextAppointment.AppointmentDate} ${nextAppointment.AppointmentTime}`,
//         "YYYY-MM-DD h:mm A",
//         TIMEZONE
//       );
//       console.log(`Next upcoming appointment details:`);
//       console.log(`ID: ${nextAppointment.id}`);
//       console.log(`Date: ${nextAppointment.AppointmentDate}`);
//       console.log(`Time: ${nextAppointment.AppointmentTime}`);
//       console.log(`Parent Email: ${nextAppointment.ParentEmail}`);
//       console.log(`Parent Name: ${nextAppointment.ParentName}`);
//       console.log(`Doctor Name: ${nextAppointment.DoctorName}`);
//       console.log(`Doctor Email: ${nextAppointment.DoctorEmail}`);
//       console.log(`Meeting Link: ${nextAppointment.MeetingLink}`);
//       console.log(
//         `Scheduled Time (in ${TIMEZONE}): ${nextMoment.format(
//           "YYYY-MM-DD h:mm A"
//         )}`
//       );
//     } else {
//       console.log("No upcoming appointments found.");
//     }
//   }); // delete later for testing
//   console.log("Firestore onSnapshot listener setup code executed.");
// }

// // Inicializar el tracking de las citas
// trackAppointments();

// // Función para monitorear mensajes actuales y nuevos en la subcolección de todos los appointments y enviar correos si el remitente comienza con "Dr"
// function trackNewMessagesForAppointment(appointmentHash) {
//   console.log(
//     `Iniciando monitoreo de mensajes para el appointment con hash: ${appointmentHash}`
//   );

//   const appointmentDocRef = db.collection("Appointments").doc(appointmentHash);

//   let initialMessagesTracked = false;
//   let initialMessagesLength = 0;

//   appointmentDocRef.onSnapshot((docSnapshot) => {
//     if (docSnapshot.exists) {
//       const appointmentData = docSnapshot.data();
//       const messages = appointmentData.Messages;

//       if (!initialMessagesTracked) {
//         // Mark that initial messages have been tracked
//         initialMessagesLength = messages ? messages.length : 0;
//         initialMessagesTracked = true;
//         console.log(
//           `Initial messages tracked for appointment ${appointmentHash}: ${initialMessagesLength}`
//         );
//       } else if (messages && messages.length > initialMessagesLength) {
//         const newMessages = messages.slice(initialMessagesLength);
//         newMessages.forEach((message, index) => {
//           console.log(
//             `Nuevo mensaje ${initialMessagesLength + index}:`,
//             message
//           );

//           if (message.sender && message.sender.startsWith("Dr")) {
//             sendEmailToParent(
//               appointmentData.ParentEmail,
//               appointmentData.DoctorName,
//               appointmentData.ParentName,
//               appointmentHash,
//               message
//             );
//           } else {
//             sendEmailToDoctor(
//               appointmentData.DoctorEmail,
//               appointmentData.DoctorName,
//               appointmentData.ParentName,
//               appointmentHash,
//               message
//             );
//           }
//         });
//         initialMessagesLength = messages.length;
//       } else {
//         console.log(`No new messages in appointment ${appointmentHash}`);
//       }
//     } else {
//       console.log(`El appointment con hash ${appointmentHash} no existe`);
//     }
//   });
// }

// // Función para enviar un correo al cliente
// function sendEmailToParent(
//   parentEmail,
//   doctorName,
//   parentName,
//   appointmentHash,
//   message
// ) {
//   let EMAILFORPATIENT = `<!DOCTYPE html>
//   <html xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office" lang="en">
//   <head>
//     <title></title>
//     <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
//     <meta name="viewport" content="width=device-width, initial-scale=1.0">
//     <link href="https://fonts.googleapis.com/css?family=Lato" rel="stylesheet" type="text/css">
//     <style>
//       * { box-sizing: border-box; }
//       body { margin: 0; padding: 0; }
//       a[x-apple-data-detectors] { color: inherit !important; text-decoration: inherit !important; }
//       #MessageViewBody a { color: inherit; text-decoration: none; }
//       p { line-height: inherit }
//       .desktop_hide, .desktop_hide table { mso-hide: all; display: none; max-height: 0px; overflow: hidden; }
//       .image_block img+div { display: none; }
//       sup, sub { line-height: 0; font-size: 75%; }
//       @media (max-width:660px) {
//         .desktop_hide table.icons-inner, .social_block.desktop_hide .social-table {
//           display: inline-block !important;
//         }
//         .icons-inner { text-align: center; }
//         .icons-inner td { margin: 0 auto; }
//         .mobile_hide { display: none; }
//         .row-content { width: 100% !important; }
//         .stack .column { width: 100%; display: block; }
//         .mobile_hide { min-height: 0; max-height: 0; max-width: 0; overflow: hidden; font-size: 0px; }
//         .desktop_hide, .desktop_hide table { display: table !important; max-height: none !important; }
//       }
//     </style>
//   </head>
//   <body class="body" style="background-color: #c5f1fc; margin: 0; padding: 0; -webkit-text-size-adjust: none; text-size-adjust: none;">
//     <table class="nl-container" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #c5f1fc;">
//       <tbody>
//         <tr>
//           <td>
//             <table class="row row-1" align="center" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
//               <tbody>
//                 <tr>
//                   <td>
//                     <table class="row-content stack" align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; color: #000000; width: 640px; margin: 0 auto;" width="640">
//                       <tbody>
//                         <tr>
//                           <td class="column column-1" width="100%" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; padding-bottom: 5px; padding-top: 5px; vertical-align: top; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;">
//                             <div class="spacer_block block-1" style="height:50px;line-height:50px;font-size:1px;">&#8202;</div>
//                           </td>
//                         </tr>
//                       </tbody>
//                     </table>
//                   </td>
//                 </tr>
//               </tbody>
//             </table>
//             <table class="row row-2" align="center" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
//               <tbody>
//                 <tr>
//                   <td>
//                     <table class="row-content stack" align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #ffffff; color: #000000; width: 640px; margin: 0 auto;" width="640">
//                       <tbody>
//                         <tr>
//                           <td class="column column-1" width="100%" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; vertical-align: top; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;">
//                             <table class="image_block block-1" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
//                               <tr>
//                                 <td class="pad" style="width:100%;">
//                                   <div class="alignment" align="center" style="line-height:10px">
//                                     <div style="max-width: 640px;"><img src="https://i.ibb.co/GTpgnRP/new-message.png" style="display: block; height: auto; border: 0; width: 100%;" width="640" alt="Dog Banner" title="Dog Banner" height="auto"></div>
//                                   </div>
//                                 </td>
//                               </tr>
//                             </table>
//                           </td>
//                         </tr>
//                       </tbody>
//                     </table>
//                   </td>
//                 </tr>
//               </tbody>
//             </table>
//             <table class="row row-3" align="center" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
//               <tbody>
//                 <tr>
//                   <td>
//                     <table class="row-content stack" align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; border-radius: 0; color: #000000; width: 640px; margin: 0 auto;" width="640">
//                       <tbody>
//                         <tr>
//                           <td class="column column-1" width="100%" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; background-color: #ffffff; padding-bottom: 5px; padding-top: 5px; vertical-align: top; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;">
//                             <table class="heading_block block-1" width="100%" border="0" cellpadding="10" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
//                               <tr>
//                                 <td class="pad">
//                                   <h1 style="margin: 0; color: #7747FF; direction: ltr; font-family: Lato, Tahoma, Verdana, Segoe, sans-serif; font-size: 38px; font-weight: 700; letter-spacing: normal; line-height: 120%; text-align: left; margin-top: 0; margin-bottom: 0; mso-line-height-alt: 45.6px;">
//                                     <span style="word-break: break-word; color: #000000;"><strong>Dear ${parentName}</strong></span>
//                                   </h1>
//                                 </td>
//                               </tr>
//                             </table>
//                           </td>
//                         </tr>
//                       </tbody>
//                     </table>
//                   </td>
//                 </tr>
//               </tbody>
//             </table>
//             <table class="row row-4" align="center" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
//               <tbody>
//                 <tr>
//                   <td>
//                     <table class="row-content stack" align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; border-radius: 0; color: #000000; width: 640px; margin: 0 auto;" width="640">
//                       <tbody>
//                         <tr>
//                           <td class="column column-1" width="100%" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; background-color: #ffffff; padding-bottom: 5px; padding-top: 5px; vertical-align: top; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;">
//                             <table class="paragraph_block block-1" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;">
//                               <tr>
//                                 <td class="pad" style="padding-bottom:10px;padding-left:20px;padding-right:20px;padding-top:10px;">
//                                   <div style="color:#555555;font-family:Lato, Tahoma, Verdana, Segoe, sans-serif;font-size:14px;line-height:120%;text-align:left;mso-line-height-alt:16.8px;">
//                                     <p style="margin: 0; word-break: break-word;">We hope you and your pet are doing well.</p>
//                                     <p style="margin: 0; word-break: break-word;">&nbsp;</p>
//                                     <p style="margin: 0; word-break: break-word;">You have received a new message from your veterinarian at Rex Vets. To view your message and any related recommendations or treatment plans, please log in to your Rex Vets account using the link below:</p>
//                                     <p style="margin: 0; word-break: break-word;">&nbsp;</p>
//                                     <p style="margin: 0; word-break: break-word;"><strong><a href="https://www.rexvets.com/AppointmentsPetParents" target="_blank">Your Appointments</a></strong></p>
//                                     <p style="margin: 0; word-break: break-word;">&nbsp;</p>
//                                     <p style="margin: 0; word-break: break-word;">If you have any questions or concerns, feel free to reach out to us through your account or by replying to this email. We're here to support you and your pet's health every step of the way!</p>
//                                     <p style="margin: 0; word-break: break-word;">&nbsp;</p>
//                                     <p style="margin: 0; word-break: break-word;">Thank you for trusting Rex Vets with your pet's care.</p>
//                                     <p style="margin: 0; word-break: break-word;">&nbsp;</p>
//                                     <p style="margin: 0; word-break: break-word;">Best regards,<br><strong>The Rex Vets Team</strong></p>
//                                   </div>
//                                 </td>
//                               </tr>
//                             </table>
//                             <table class="button_block block-2" width="100%" border="0" cellpadding="10" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
//                               <tr>
//                                 <td class="pad">
//                                   <div class="alignment" align="center">
//                                     <a href="https://www.rexvets.com/AppointmentsPetParents" target="_blank" style="background-color:#002366;border-bottom:0px solid transparent;border-left:0px solid transparent;border-radius:10px;border-right:0px solid transparent;border-top:0px solid transparent;color:#ffffff;display:inline-block;font-family:'Lato', Tahoma, Verdana, Segoe, sans-serif;font-size:16px;font-weight:undefined;mso-border-alt:none;padding-bottom:5px;padding-top:5px;text-align:center;text-decoration:none;width:auto;word-break:keep-all;">
//                                       <span style="word-break: break-word; padding-left: 20px; padding-right: 20px; font-size: 16px; display: inline-block; letter-spacing: normal;">
//                                         <strong>VIEW APPOINTMENTS</strong>
//                                       </span>
//                                     </a>
//                                   </div>
//                                 </td>
//                               </tr>
//                             </table>
//                             <table class="paragraph_block block-3" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;">
//                               <tr>
//                                 <td class="pad" style="padding-bottom:10px;padding-left:20px;padding-right:20px;padding-top:10px;">
//                                   <div style="color:#555555;font-family:Lato, Tahoma, Verdana, Segoe, sans-serif;font-size:14px;line-height:120%;text-align:left;mso-line-height-alt:16.8px;">&nbsp;</div>
//                                 </td>
//                               </tr>
//                             </table>
//                           </td>
//                         </tr>
//                       </tbody>
//                     </table>
//                   </td>
//                 </tr>
//               </tbody>
//             </table>
//             <table class="row row-5" align="center" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
//               <tbody>
//                 <tr>
//                   <td>
//                   <table class="row-content stack" align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #00b3d3; background-position: center top; color: #000000; width: 640px; margin: 0 auto;" width="640">
//                   <tbody>
//                     <tr>
//                       <td class="column column-1" width="100%" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; background-color: #002366; padding-bottom: 5px; padding-top: 5px; vertical-align: top; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;">
//                         <table class="image_block block-1" width="100%" border="0" cellpadding="10" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
//                           <tr>
//                             <td class="pad">
//                               <div class="alignment" align="center" style="line-height:10px">
//                                 <div style="max-width: 620px;"><a href="https://www.rexvets.com" target="_blank" style="outline:none" tabindex="-1"><img src="https://i.ibb.co/3CZBJyh/5bfa.png" style="display: block; height: auto; border: 0; width: 100%;" width="620" alt="Your Logo" title="Your Logo" height="auto"></a></div>
//                               </div>
//                             </td>
//                           </tr>
//                         </table>
//                             <table class="social_block block-2" width="100%" border="0" cellpadding="10" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
//                               <tr>
//                                 <td class="pad">
//                                   <div class="alignment" align="center">
//                                     <table class="social-table" width="92px" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; display: inline-block;">
//                                       <tr>
//                                         <td style="padding:0 7px 0 7px;"><a href="https://www.facebook.com/rexvets" target="_blank"><img src="https://app-rsrc.getbee.io/public/resources/social-networks-icon-sets/t-circle-white/facebook@2x.png" width="32" height="auto" alt="Facebook" title="Facebook" style="display: block; height: auto; border: 0;"></a></td>
//                                         <td style="padding:0 7px 0 7px;"><a href="https://www.instagram.com/rexvets" target="_blank"><img src="https://app-rsrc.getbee.io/public/resources/social-networks-icon-sets/t-circle-white/instagram@2x.png" width="32" height="auto" alt="Instagram" title="Instagram" style="display: block; height: auto; border: 0;"></a></td>
//                                       </tr>
//                                     </table>
//                                   </div>
//                                 </td>
//                               </tr>
//                             </table>
//                             <table class="paragraph_block block-3" width="100%" border="0" cellpadding="10" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;">
//                               <tr>
//                                 <td class="pad">
//                                   <div style="color:#555555;font-family:Lato, Tahoma, Verdana, Segoe, sans-serif;font-size:14px;line-height:120%;text-align:center;mso-line-height-alt:16.8px;">
//                                     <p style="margin: 0; word-break: break-word;"><span style="word-break: break-word; color: #ffffff;"><strong>Rex Vets </strong>is a <strong>non-profit organization</strong>, and our efforts are sustained by the generosity of our donors. If you would like to support our mission with a donation, we would be deeply grateful. You can make a contribution through <strong><a href="https://www.rexvets.com/PetParents" target="_blank" style="color: #ffffff;">the following link</a></strong></span></p>
//                                   </div>
//                                 </td>
//                               </tr>
//                             </table>
//                             <div class="spacer_block block-4" style="height:30px;line-height:30px;font-size:1px;">&#8202;</div>
//                           </td>
//                         </tr>
//                       </tbody>
//                     </table>
//                   </td>
//                 </tr>
//               </tbody>
//             </table>
//           </td>
//         </tr>
//       </tbody>
//     </table>
//     </div>
//   </body>
//   </html>`;
//   const mailOptions = {
//     from: "support@rexvets.com",
//     to: parentEmail,
//     subject: "You Have a New Message from Your Veterinarian",

//     html: EMAILFORPATIENT,
//   };

//   transporter.sendMail(mailOptions, (error, info) => {
//     if (error) {
//       return console.error(`Error al enviar el correo: ${error}`);
//     }
//     console.log(`Correo enviado: ${info.response}`);
//   });
// }

// // Función para enviar un correo al doctor
// function sendEmailToDoctor(
//   doctorEmail,
//   doctorName,
//   parentName
//   // appointmentHash,
//   // message
// ) {
//   let EMAILFORDOCTORS = `<!DOCTYPE html>
//   <html xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office" lang="en">
//   <head>
//     <title></title>
//     <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
//     <meta name="viewport" content="width=device-width, initial-scale=1.0">
//     <link href="https://fonts.googleapis.com/css?family=Lato" rel="stylesheet" type="text/css">
//     <style>
//       * { box-sizing: border-box; }
//       body { margin: 0; padding: 0; }
//       a[x-apple-data-detectors] { color: inherit !important; text-decoration: inherit !important; }
//       #MessageViewBody a { color: inherit; text-decoration: none; }
//       p { line-height: inherit }
//       .desktop_hide, .desktop_hide table { mso-hide: all; display: none; max-height: 0px; overflow: hidden; }
//       .image_block img+div { display: none; }
//       sup, sub { line-height: 0; font-size: 75%; }
//       @media (max-width:660px) {
//         .desktop_hide table.icons-inner, .social_block.desktop_hide .social-table {
//           display: inline-block !important;
//         }
//         .icons-inner { text-align: center; }
//         .icons-inner td { margin: 0 auto; }
//         .mobile_hide { display: none; }
//         .row-content { width: 100% !important; }
//         .stack .column { width: 100%; display: block; }
//         .mobile_hide { min-height: 0; max-height: 0; max-width: 0; overflow: hidden; font-size: 0px; }
//         .desktop_hide, .desktop_hide table { display: table !important; max-height: none !important; }
//       }
//     </style>
//   </head>
//   <body class="body" style="background-color: #c5f1fc; margin: 0; padding: 0; -webkit-text-size-adjust: none; text-size-adjust: none;">
//     <table class="nl-container" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #c5f1fc;">
//       <tbody>
//         <tr>
//           <td>
//             <table class="row row-1" align="center" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
//               <tbody>
//                 <tr>
//                   <td>
//                     <table class="row-content stack" align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; color: #000000; width: 640px; margin: 0 auto;" width="640">
//                       <tbody>
//                         <tr>
//                           <td class="column column-1" width="100%" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; padding-bottom: 5px; padding-top: 5px; vertical-align: top; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;">
//                             <div class="spacer_block block-1" style="height:50px;line-height:50px;font-size:1px;">&#8202;</div>
//                           </td>
//                         </tr>
//                       </tbody>
//                     </table>
//                   </td>
//                 </tr>
//               </tbody>
//             </table>
//             <table class="row row-2" align="center" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
//               <tbody>
//                 <tr>
//                   <td>
//                     <table class="row-content stack" align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #ffffff; color: #000000; width: 640px; margin: 0 auto;" width="640">
//                       <tbody>
//                         <tr>
//                           <td class="column column-1" width="100%" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; vertical-align: top; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;">
//                             <table class="image_block block-1" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
//                               <tr>
//                                 <td class="pad" style="width:100%;">
//                                   <div class="alignment" align="center" style="line-height:10px">
//                                     <div style="max-width: 640px;"><img src="https://i.ibb.co/GTpgnRP/new-message.png" style="display: block; height: auto; border: 0; width: 100%;" width="640" alt="Dog Banner" title="Dog Banner" height="auto"></div>
//                                   </div>
//                                 </td>
//                               </tr>
//                             </table>
//                           </td>
//                         </tr>
//                       </tbody>
//                     </table>
//                   </td>
//                 </tr>
//               </tbody>
//             </table>
//             <table class="row row-3" align="center" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
//               <tbody>
//                 <tr>
//                   <td>
//                     <table class="row-content stack" align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; border-radius: 0; color: #000000; width: 640px; margin: 0 auto;" width="640">
//                       <tbody>
//                         <tr>
//                           <td class="column column-1" width="100%" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; background-color: #ffffff; padding-bottom: 5px; padding-top: 5px; vertical-align: top; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;">
//                             <table class="heading_block block-1" width="100%" border="0" cellpadding="10" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
//                               <tr>
//                                 <td class="pad">
//                                   <h1 style="margin: 0; color: #7747FF; direction: ltr; font-family: Lato, Tahoma, Verdana, Segoe, sans-serif; font-size: 20px; font-weight: 700; letter-spacing: normal; line-height: 120%; text-align: left; margin-top: 0; margin-bottom: 0; mso-line-height-alt: 45.6px;">
//                                     <span style="word-break: break-word; color: #000000;"><strong>Hello ${doctorName}</strong></span>
//                                   </h1>
//                                 </td>
//                               </tr>
//                             </table>
//                           </td>
//                         </tr>
//                       </tbody>
//                     </table>
//                   </td>
//                 </tr>
//               </tbody>
//             </table>
//             <table class="row row-4" align="center" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
//               <tbody>
//                 <tr>
//                   <td>
//                     <table class="row-content stack" align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; border-radius: 0; color: #000000; width: 640px; margin: 0 auto;" width="640">
//                       <tbody>
//                         <tr>
//                           <td class="column column-1" width="100%" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; background-color: #ffffff; padding-bottom: 5px; padding-top: 5px; vertical-align: top; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;">
//                             <table class="paragraph_block block-1" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;">
//                               <tr>
//                                 <td class="pad" style="padding-bottom:10px;padding-left:20px;padding-right:20px;padding-top:10px;">
//                                   <div style="color:#555555;font-family:Lato, Tahoma, Verdana, Segoe, sans-serif;font-size:14px;line-height:120%;text-align:left;mso-line-height-alt:16.8px;">
//                                     <p style="margin: 0; word-break: break-word;">You have received a new message from your client, ${parentName}. Please log in to your Rex Vets account to review and respond.</p>
//                                     <p style="margin: 0; word-break: break-word;">&nbsp;</p>
//                                     <p style="margin: 0; word-break: break-word;"><strong><a href="https://www.rexvets.com/AppointmentsVetsandTechs" target="_blank">Your Appointments</a></strong></p>
//                                     <p style="margin: 0; word-break: break-word;">&nbsp;</p>
//                                     <p style="margin: 0; word-break: break-word;">Thank you,,<br><strong>The Rex Vets Team</strong></p>
//                                   </div>
//                                 </td>
//                               </tr>
//                             </table>
//                             <table class="button_block block-2" width="100%" border="0" cellpadding="10" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
//                               <tr>
//                                 <td class="pad">
//                                   <div class="alignment" align="center">
//                                     <a href="https://www.rexvets.com/AppointmentsVetsandTechs" target="_blank" style="background-color:#002366;border-bottom:0px solid transparent;border-left:0px solid transparent;border-radius:10px;border-right:0px solid transparent;border-top:0px solid transparent;color:#ffffff;display:inline-block;font-family:'Lato', Tahoma, Verdana, Segoe, sans-serif;font-size:16px;font-weight:undefined;mso-border-alt:none;padding-bottom:5px;padding-top:5px;text-align:center;text-decoration:none;width:auto;word-break:keep-all;">
//                                       <span style="word-break: break-word; padding-left: 20px; padding-right: 20px; font-size: 16px; display: inline-block; letter-spacing: normal;">
//                                         <strong>VIEW APPOINTMENTS</strong>
//                                       </span>
//                                     </a>
//                                   </div>
//                                 </td>
//                               </tr>
//                             </table>
//                             <table class="paragraph_block block-3" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;">
//                               <tr>
//                                 <td class="pad" style="padding-bottom:10px;padding-left:20px;padding-right:20px;padding-top:10px;">
//                                   <div style="color:#555555;font-family:Lato, Tahoma, Verdana, Segoe, sans-serif;font-size:14px;line-height:120%;text-align:left;mso-line-height-alt:16.8px;">&nbsp;</div>
//                                 </td>
//                               </tr>
//                             </table>
//                           </td>
//                         </tr>
//                       </tbody>
//                     </table>
//                   </td>
//                 </tr>
//               </tbody>
//             </table>
//             <table class="row row-5" align="center" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
//               <tbody>
//                 <tr>
//                   <td>
//                   <table class="row-content stack" align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #00b3d3; background-position: center top; color: #000000; width: 640px; margin: 0 auto;" width="640">
//                   <tbody>
//                     <tr>
//                       <td class="column column-1" width="100%" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; background-color: #002366; padding-bottom: 5px; padding-top: 5px; vertical-align: top; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;">
//                         <table class="image_block block-1" width="100%" border="0" cellpadding="10" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
//                           <tr>
//                             <td class="pad">
//                               <div class="alignment" align="center" style="line-height:10px">
//                                 <div style="max-width: 620px;"><a href="https://www.rexvets.com" target="_blank" style="outline:none" tabindex="-1"><img src="https://i.ibb.co/3CZBJyh/5bfa.png" style="display: block; height: auto; border: 0; width: 100%;" width="620" alt="Your Logo" title="Your Logo" height="auto"></a></div>
//                               </div>
//                             </td>
//                           </tr>
//                         </table>
//                             <table class="social_block block-2" width="100%" border="0" cellpadding="10" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
//                               <tr>
//                                 <td class="pad">
//                                   <div class="alignment" align="center">
//                                     <table class="social-table" width="92px" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; display: inline-block;">
//                                       <tr>
//                                         <td style="padding:0 7px 0 7px;"><a href="https://www.facebook.com/rexvets" target="_blank"><img src="https://app-rsrc.getbee.io/public/resources/social-networks-icon-sets/t-circle-white/facebook@2x.png" width="32" height="auto" alt="Facebook" title="Facebook" style="display: block; height: auto; border: 0;"></a></td>
//                                         <td style="padding:0 7px 0 7px;"><a href="https://www.instagram.com/rexvets" target="_blank"><img src="https://app-rsrc.getbee.io/public/resources/social-networks-icon-sets/t-circle-white/instagram@2x.png" width="32" height="auto" alt="Instagram" title="Instagram" style="display: block; height: auto; border: 0;"></a></td>
//                                       </tr>
//                                     </table>
//                                   </div>
//                                 </td>
//                               </tr>
//                             </table>
//                             <table class="paragraph_block block-3" width="100%" border="0" cellpadding="10" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;">
//                               <tr>
//                                 <td class="pad">
//                                   <div style="color:#555555;font-family:Lato, Tahoma, Verdana, Segoe, sans-serif;font-size:14px;line-height:120%;text-align:center;mso-line-height-alt:16.8px;">
//                                     <p style="margin: 0; word-break: break-word;"><span style="word-break: break-word; color: #ffffff;"><strong>Rex Vets </strong>is a <strong>non-profit organization</strong>, and our efforts are sustained by the generosity of our donors. If you would like to support our mission with a donation, we would be deeply grateful. You can make a contribution through <strong><a href="https://www.rexvets.com/PetParents" target="_blank" style="color: #ffffff;">the following link</a></strong></span></p>
//                                   </div>
//                                 </td>
//                               </tr>
//                             </table>
//                             <div class="spacer_block block-4" style="height:30px;line-height:30px;font-size:1px;">&#8202;</div>
//                           </td>
//                         </tr>
//                       </tbody>
//                     </table>
//                   </td>
//                 </tr>
//               </tbody>
//             </table>
//           </td>
//         </tr>
//       </tbody>
//     </table>
//     </div>
//   </body>
//   </html>`;
//   const mailOptions = {
//     from: "support@rexvets.com",
//     to: doctorEmail,
//     subject: `You Have a New Message from Your Client ${parentName}`,

//     html: EMAILFORDOCTORS,
//   };
//   //test
//   transporter.sendMail(mailOptions, (error, info) => {
//     if (error) {
//       return console.error(`Error al enviar el correo al doctor: ${error}`);
//     }
//     console.log(`Correo enviado al doctor: ${info.response}`);
//   });
// }

// // Llamar a la función para monitorear mensajes de todos los appointments
// async function trackMessagesForAllAppointments() {
//   try {
//     const snapshot = await db.collection("Appointments").get();
//     snapshot.forEach((doc) => {
//       const appointmentHash = doc.id;
//       trackNewMessagesForAppointment(appointmentHash);
//     });
//   } catch (error) {
//     console.error("Error al obtener los appointments:", error);
//   }
// }

// // Llamada para iniciar el monitoreo de todos los appointments
// trackMessagesForAllAppointments();

// // TEST ENDPOINT FOR REMINDER EMAIL
// app.post("/testReminderEmail", (req, res) => {
//   console.log("Received request for testReminderEmail:", req.body);

//   const {
//     appointmentDate,
//     appointmentTime,
//     parentEmail,
//     parentName,
//     doctorName,
//     doctorEmail,
//     meetingLink,
//   } = req.body;

//   // Validate required fields
//   if (
//     !appointmentDate ||
//     !appointmentTime ||
//     !parentEmail ||
//     !parentName ||
//     !doctorName ||
//     !meetingLink
//   ) {
//     return res.status(400).send({
//       message:
//         "Missing required fields. Required: appointmentDate, appointmentTime, parentEmail, parentName, doctorName, meetingLink",
//     });
//   }

//   try {
//     // Call the scheduleReminderEmail function directly for testing
//     scheduleReminderEmail(
//       appointmentDate,
//       appointmentTime,
//       parentEmail,
//       parentName,
//       doctorName,
//       doctorEmail,
//       meetingLink
//     );

//     res.send({
//       message: "Test reminder email scheduled successfully!",
//       scheduledFor: `10 minutes before ${appointmentDate} ${appointmentTime}`,
//       details: {
//         appointmentDate,
//         appointmentTime,
//         parentEmail,
//         parentName,
//         doctorName,
//         meetingLink,
//       },
//     });

//     console.log("Test reminder email scheduled for:", parentEmail);
//   } catch (error) {
//     console.error("Error scheduling test reminder email:", error);
//     res.status(500).send({
//       message: "Failed to schedule test reminder email",
//       error: error.message,
//     });
//   }
// });

// // Endpoint to send immediate test reminder email (for immediate testing)
// app.post("/testReminderEmailImmediate", (req, res) => {
//   console.log("Received request for testReminderEmailImmediate:", req.body);

//   const { parentEmail, parentName, doctorName, meetingLink } = req.body;

//   // Validate required fields
//   if (!parentEmail || !parentName || !doctorName || !meetingLink) {
//     return res.status(400).send({
//       message:
//         "Missing required fields. Required: parentEmail, parentName, doctorName, meetingLink",
//     });
//   }

//   // Email template for immediate testing
//   let EMAILFORPATIENTTEST = `<!DOCTYPE html>
//     <html xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office" lang="en">
//     <head>
//         <title></title>
//         <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
//         <meta name="viewport" content="width=device-width, initial-scale=1.0">
//         <link href="https://fonts.googleapis.com/css?family=Lato" rel="stylesheet" type="text/css">
//         <style>
//             * { box-sizing: border-box; }
//             body { margin: 0; padding: 0; }
//             a[x-apple-data-detectors] { color: inherit !important; text-decoration: inherit !important; }
//             #MessageViewBody a { color: inherit; text-decoration: none; }
//             p { line-height: inherit }
//             .desktop_hide, .desktop_hide table { mso-hide: all; display: none; max-height: 0px; overflow: hidden; }
//             .image_block img+div { display: none; }
//             sup, sub { line-height: 0; font-size: 75%; }
//             @media (max-width:660px) {
//                 .desktop_hide table.icons-inner, .social_block.desktop_hide .social-table {
//                     display: inline-block !important;
//                 }
//                 .icons-inner { text-align: center; }
//                 .icons-inner td { margin: 0 auto; }
//                 .mobile_hide { display: none; }
//                 .row-content { width: 100% !important; }
//                 .stack .column { width: 100%; display: block; }
//                 .mobile_hide { min-height: 0; max-height: 0; max-width: 0; overflow: hidden; font-size: 0px; }
//                 .desktop_hide, .desktop_hide table { display: table !important; max-height: none !important; }
//             }
//         </style>
//     </head>
//     <body class="body" style="background-color: #c5f1fc; margin: 0; padding: 0; -webkit-text-size-adjust: none; text-size-adjust: none;">
//         <div style="padding: 20px; background-color: #f0f0f0; font-family: Lato, sans-serif;">
//             <div style="max-width: 600px; margin: 0 auto; background-color: white; padding: 20px; border-radius: 10px;">
//                 <h1 style="color: #000000;">🧪 TEST REMINDER EMAIL</h1>
//                 <h2 style="color: #000000;">Dear ${parentName}</h2>
//                 <p>This is a <strong>TEST</strong> reminder email for your upcoming video call appointment with <strong>${doctorName}</strong> at Rex Vets.</p>
//                 <p>In a real scenario, this email would be sent 10 minutes before your appointment.</p>
//                 <p><strong>Meeting Link:</strong> <a href="${meetingLink}" target="_blank">${meetingLink}</a></p>
//                 <div style="text-align: center; margin: 20px 0;">
//                     <a href="${meetingLink}" target="_blank" style="background-color:#002366;color:#ffffff;padding:10px 20px;text-decoration:none;border-radius:5px;display:inline-block;">
//                         <strong>JOIN TEST MEETING</strong>
//                     </a>
//                 </div>
//                 <p style="font-size: 12px; color: #666; margin-top: 30px;">
//                     ⚠️ This is a test email sent for development purposes.
//                     <br>Timestamp: ${new Date().toISOString()}
//                 </p>
//             </div>
//         </div>
//     </body>
//     </html>`;

//   const mailOptions = {
//     from: "support@rexvets.com",
//     to: parentEmail,
//     subject: "🧪 TEST - Appointment Reminder - Rex Vets",
//     html: EMAILFORPATIENTTEST,
//   };

//   transporter.sendMail(mailOptions, (error, info) => {
//     if (error) {
//       console.log("Error sending test reminder email:", error);
//       return res.status(500).send({
//         message: "Failed to send test reminder email",
//         error: error.message,
//       });
//     }
//     console.log("Test reminder email sent:", info.response);
//     res.send({
//       message: "Test reminder email sent immediately!",
//       emailSentTo: parentEmail,
//       details: {
//         parentName,
//         doctorName,
//         meetingLink,
//         sentAt: new Date().toISOString(),
//       },
//     });
//   });
// });

// // trackAllAppointments();
// // Iniciar el servidor
// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
//   console.log("Email server started and ready.");
// });

// // Add cron job endpoint for processing reminder emails
// app.get("/api/cron/process-reminders", async (req, res) => {
//   console.log("🔄 Cron job triggered: Processing reminder emails...");

//   try {
//     const now = moment().tz(TIMEZONE);
//     console.log(
//       `⏰ Current time (${TIMEZONE}): ${now.format("YYYY-MM-DD h:mm A")}`
//     );

//     // Query for unsent reminders
//     const remindersSnapshot = await db
//       .collection("ReminderEmails")
//       .where("reminderSent", "==", false)
//       .get();

//     console.log(`📧 Found ${remindersSnapshot.size} pending reminders`);

//     let processedCount = 0;
//     let sentCount = 0;

//     for (const doc of remindersSnapshot.docs) {
//       const reminderData = doc.data();
//       const {
//         appointmentDate,
//         appointmentTime,
//         parentEmail,
//         parentName,
//         doctorName,
//         doctorEmail,
//         meetingLink,
//         testReminder,
//         scheduledAt,
//       } = reminderData;

//       processedCount++;

//       // Calculate appointment time
//       const appointmentMoment = moment.tz(
//         `${appointmentDate} ${appointmentTime}`,
//         "YYYY-MM-DD h:mm A",
//         TIMEZONE
//       );

//       let shouldSend = false;
//       let reminderTime;

//       if (testReminder) {
//         // For test reminders, send 5 minutes after scheduling
//         reminderTime = moment(scheduledAt).add(5, "minutes");
//         shouldSend = now.isAfter(reminderTime);
//         console.log(
//           `🧪 Test reminder for ${parentEmail}: scheduled at ${reminderTime.format(
//             "YYYY-MM-DD h:mm A"
//           )}, should send: ${shouldSend}`
//         );
//       } else {
//         // For real reminders, send 10 minutes before appointment
//         reminderTime = appointmentMoment.clone().subtract(10, "minutes");
//         shouldSend =
//           now.isAfter(reminderTime) && now.isBefore(appointmentMoment);
//         console.log(
//           `📅 Real reminder for ${parentEmail}: appointment at ${appointmentMoment.format(
//             "YYYY-MM-DD h:mm A"
//           )}, reminder time: ${reminderTime.format(
//             "YYYY-MM-DD h:mm A"
//           )}, should send: ${shouldSend}`
//         );
//       }

//       if (shouldSend) {
//         console.log(`✅ Sending reminder to ${parentEmail}...`);

//         try {
//           if (testReminder) {
//             // Send test reminder
//             await sendTestReminderEmailSync(
//               appointmentDate,
//               appointmentTime,
//               parentEmail,
//               parentName,
//               doctorName,
//               doctorEmail,
//               meetingLink
//             );
//           } else {
//             // Send real reminder using the existing function
//             await sendReminderEmailSync(
//               appointmentDate,
//               appointmentTime,
//               parentEmail,
//               parentName,
//               doctorName,
//               doctorEmail,
//               meetingLink
//             );
//           }

//           // Mark as sent
//           await doc.ref.update({
//             reminderSent: true,
//             sentAt: admin.firestore.FieldValue.serverTimestamp(),
//           });

//           sentCount++;
//           console.log(`📧 Reminder sent successfully to ${parentEmail}`);
//         } catch (emailError) {
//           console.error(
//             `❌ Error sending reminder to ${parentEmail}:`,
//             emailError
//           );
//           // Mark as failed
//           await doc.ref.update({
//             reminderSent: false,
//             lastError: emailError.message,
//             lastAttempt: admin.firestore.FieldValue.serverTimestamp(),
//           });
//         }
//       }
//     }

//     console.log(
//       `✅ Cron job completed: Processed ${processedCount} reminders, sent ${sentCount} emails`
//     );
//     res.json({
//       success: true,
//       message: `Processed ${processedCount} reminders, sent ${sentCount} emails`,
//       processedCount,
//       sentCount,
//       timestamp: now.toISOString(),
//     });
//   } catch (error) {
//     console.error("❌ Error in cron job:", error);
//     res.status(500).json({
//       success: false,
//       error: error.message,
//       timestamp: new Date().toISOString(),
//     });
//   }
// });

// // Synchronous version of sendTestReminderEmail for use in cron jobs
// async function sendTestReminderEmailSync(
//   appointmentDate,
//   appointmentTime,
//   parentEmail,
//   parentName,
//   doctorName,
//   doctorEmail,
//   meetingLink
// ) {
//   console.log("🎯 sendTestReminderEmailSync function called!");

//   const testEmailContent = `<!DOCTYPE html>
//     <html>
//     <head>
//         <title>Test Reminder</title>
//         <style>
//             body { font-family: Arial, sans-serif; margin: 20px; }
//             .container { max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #ddd; border-radius: 10px; }
//             .header { background-color: #002366; color: white; padding: 15px; text-align: center; border-radius: 5px; }
//             .content { padding: 20px 0; }
//             .button { background-color: #002366; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; display: inline-block; margin: 10px 0; }
//         </style>
//     </head>
//     <body>
//         <div class="container">
//             <div class="header">
//                 <h1>🧪 TEST REMINDER EMAIL (via Cron)</h1>
//             </div>
//             <div class="content">
//                 <h2>Dear ${parentName}</h2>
//                 <p>This is a <strong>TEST</strong> reminder email sent via cron job for your upcoming video call appointment with <strong>${doctorName}</strong> at Rex Vets.</p>
//                 <p>This proves that the scheduling system is working correctly!</p>
//                 <p><strong>Appointment:</strong> ${appointmentDate} at ${appointmentTime}</p>
//                 <p><strong>Meeting Link:</strong> <a href="${meetingLink}" target="_blank">${meetingLink}</a></p>
//                 <div style="text-align: center;">
//                     <a href="${meetingLink}" target="_blank" class="button">
//                         <strong>JOIN TEST MEETING</strong>
//                     </a>
//                 </div>
//                 <p style="font-size: 12px; color: #666; margin-top: 30px; border-top: 1px solid #eee; padding-top: 15px;">
//                     ✅ This email was sent successfully via cron job scheduling system
//                     <br>Timestamp: ${new Date().toISOString()}
//                 </p>
//             </div>
//         </div>
//     </body>
//     </html>`;

//   const mailOptions = {
//     from: "support@rexvets.com",
//     to: parentEmail,
//     subject: "🧪 TEST - Appointment Reminder (via Cron) - Rex Vets",
//     html: testEmailContent,
//   };

//   return new Promise((resolve, reject) => {
//     transporter.sendMail(mailOptions, (error, info) => {
//       if (error) {
//         console.log("❌ Error sending test reminder email:", error);
//         reject(error);
//       } else {
//         console.log("✅ Test reminder email sent successfully:", info.response);
//         resolve(info);
//       }
//     });
//   });
// }

// // Synchronous version of reminder email for real appointments
// async function sendReminderEmailSync(
//   appointmentDate,
//   appointmentTime,
//   parentEmail,
//   parentName,
//   doctorName,
//   doctorEmail,
//   meetingLink
// ) {
//   console.log("📧 Sending real reminder email via cron...");

//   // Use the existing email template from scheduleReminderEmail function
//   let EMAILFORPATIENTPREV = `<!DOCTYPE html>
//   <html xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office" lang="en">
//   <head>
//     <title></title>
//     <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
//     <meta name="viewport" content="width=device-width, initial-scale=1.0">
//     <link href="https://fonts.googleapis.com/css?family=Lato" rel="stylesheet" type="text/css">
//     <style>
//       * { box-sizing: border-box; }
//       body { margin: 0; padding: 0; }
//       a[x-apple-data-detectors] { color: inherit !important; text-decoration: inherit !important; }
//       #MessageViewBody a { color: inherit; text-decoration: none; }
//       p { line-height: inherit }
//       .desktop_hide, .desktop_hide table { mso-hide: all; display: none; max-height: 0px; overflow: hidden; }
//       .image_block img+div { display: none; }
//       sup, sub { line-height: 0; font-size: 75%; }
//       @media (max-width:660px) {
//         .desktop_hide table.icons-inner, .social_block.desktop_hide .social-table {
//           display: inline-block !important;
//         }
//         .icons-inner { text-align: center; }
//         .icons-inner td { margin: 0 auto; }
//         .mobile_hide { display: none; }
//         .row-content { width: 100% !important; }
//         .stack .column { width: 100%; display: block; }
//         .mobile_hide { min-height: 0; max-height: 0; max-width: 0; overflow: hidden; font-size: 0px; }
//         .desktop_hide, .desktop_hide table { display: table !important; max-height: none !important; }
//       }
//     </style>
//   </head>
//   <body class="body" style="background-color: #c5f1fc; margin: 0; padding: 0; -webkit-text-size-adjust: none; text-size-adjust: none;">
//   <div class="CompleteEmail"><table class="nl-container" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #c5f1fc;">
//       <tbody>
//         <tr>
//           <td>
//             <table class="row row-1" align="center" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
//               <tbody>
//                 <tr>
//                   <td>
//                     <table class="row-content stack" align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; color: #000000; width: 640px; margin: 0 auto;" width="640">
//                       <tbody>
//                         <tr>
//                           <td class="column column-1" width="100%" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; padding-bottom: 5px; padding-top: 5px; vertical-align: top; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;">
//                             <div class="spacer_block block-1" style="height:50px;line-height:50px;font-size:1px;">&#8202;</div>
//                           </td>
//                         </tr>
//                       </tbody>
//                     </table>
//                   </td>
//                 </tr>
//               </tbody>
//             </table>
//             <!-- Email content continues... -->
//             <p>Dear ${parentName},</p>
//             <p>Your appointment with ${doctorName} is starting soon!</p>
//             <p><strong>Meeting Link:</strong> <a href="${meetingLink}">${meetingLink}</a></p>
//             <!-- Simplified for brevity -->
//           </td>
//         </tr>
//       </tbody>
//     </table>
//   </body>
//   </html>`;

//   const mailOptions = {
//     from: "support@rexvets.com",
//     to: parentEmail,
//     subject: "Appointment Reminder - Rex Vets",
//     html: EMAILFORPATIENTPREV,
//   };

//   return new Promise((resolve, reject) => {
//     transporter.sendMail(mailOptions, (error, info) => {
//       if (error) {
//         console.log("❌ Error sending reminder email:", error);
//         reject(error);
//       } else {
//         console.log("✅ Reminder email sent successfully:", info.response);
//         resolve(info);
//       }
//     });
//   });
// }

// // Manual trigger endpoint for immediate testing (same as cron but can be called anytime)
// app.post("/api/manual/process-reminders", async (req, res) => {
//   console.log("🔧 Manual trigger: Processing reminder emails...");

//   try {
//     const now = moment().tz(TIMEZONE);
//     console.log(
//       `⏰ Current time (${TIMEZONE}): ${now.format("YYYY-MM-DD h:mm A")}`
//     );

//     // Query for unsent reminders
//     const remindersSnapshot = await db
//       .collection("ReminderEmails")
//       .where("reminderSent", "==", false)
//       .get();

//     console.log(`📧 Found ${remindersSnapshot.size} pending reminders`);

//     let processedCount = 0;
//     let sentCount = 0;

//     for (const doc of remindersSnapshot.docs) {
//       const reminderData = doc.data();
//       const {
//         appointmentDate,
//         appointmentTime,
//         parentEmail,
//         parentName,
//         doctorName,
//         doctorEmail,
//         meetingLink,
//         testReminder,
//         scheduledAt,
//       } = reminderData;

//       processedCount++;

//       // Calculate appointment time
//       const appointmentMoment = moment.tz(
//         `${appointmentDate} ${appointmentTime}`,
//         "YYYY-MM-DD h:mm A",
//         TIMEZONE
//       );

//       let shouldSend = false;
//       let reminderTime;

//       if (testReminder) {
//         // For test reminders, send 5 minutes after scheduling
//         reminderTime = moment(scheduledAt).add(5, "minutes");
//         shouldSend = now.isAfter(reminderTime);
//         console.log(
//           `🧪 Test reminder for ${parentEmail}: scheduled at ${reminderTime.format(
//             "YYYY-MM-DD h:mm A"
//           )}, should send: ${shouldSend}`
//         );
//       } else {
//         // For real reminders, send 10 minutes before appointment
//         reminderTime = appointmentMoment.clone().subtract(10, "minutes");
//         shouldSend =
//           now.isAfter(reminderTime) && now.isBefore(appointmentMoment);
//         console.log(
//           `📅 Real reminder for ${parentEmail}: appointment at ${appointmentMoment.format(
//             "YYYY-MM-DD h:mm A"
//           )}, reminder time: ${reminderTime.format(
//             "YYYY-MM-DD h:mm A"
//           )}, should send: ${shouldSend}`
//         );
//       }

//       if (shouldSend) {
//         console.log(`✅ Sending reminder to ${parentEmail}...`);

//         try {
//           if (testReminder) {
//             // Send test reminder
//             await sendTestReminderEmailSync(
//               appointmentDate,
//               appointmentTime,
//               parentEmail,
//               parentName,
//               doctorName,
//               doctorEmail,
//               meetingLink
//             );
//           } else {
//             // Send real reminder using the existing function
//             await sendReminderEmailSync(
//               appointmentDate,
//               appointmentTime,
//               parentEmail,
//               parentName,
//               doctorName,
//               doctorEmail,
//               meetingLink
//             );
//           }

//           // Mark as sent
//           await doc.ref.update({
//             reminderSent: true,
//             sentAt: admin.firestore.FieldValue.serverTimestamp(),
//           });

//           sentCount++;
//           console.log(`📧 Reminder sent successfully to ${parentEmail}`);
//         } catch (emailError) {
//           console.error(
//             `❌ Error sending reminder to ${parentEmail}:`,
//             emailError
//           );
//           // Mark as failed
//           await doc.ref.update({
//             reminderSent: false,
//             lastError: emailError.message,
//             lastAttempt: admin.firestore.FieldValue.serverTimestamp(),
//           });
//         }
//       }
//     }

//     console.log(
//       `✅ Manual trigger completed: Processed ${processedCount} reminders, sent ${sentCount} emails`
//     );
//     res.json({
//       success: true,
//       message: `Manual trigger: Processed ${processedCount} reminders, sent ${sentCount} emails`,
//       processedCount,
//       sentCount,
//       timestamp: now.toISOString(),
//       trigger: "manual",
//     });
//   } catch (error) {
//     console.error("❌ Error in manual trigger:", error);
//     res.status(500).json({
//       success: false,
//       error: error.message,
//       timestamp: new Date().toISOString(),
//       trigger: "manual",
//     });
//   }
// });

// // Debug endpoint to check pending reminders
// app.get("/api/debug/reminders", async (req, res) => {
//   console.log("🔍 Debug: Checking pending reminders...");

//   try {
//     const now = moment().tz(TIMEZONE);

//     // Get all reminders
//     const allRemindersSnapshot = await db
//       .collection("ReminderEmails")
//       .orderBy("createdAt", "desc")
//       .limit(20)
//       .get();

//     const reminders = [];

//     allRemindersSnapshot.forEach((doc) => {
//       const data = doc.data();
//       const appointmentMoment = moment.tz(
//         `${data.appointmentDate} ${data.appointmentTime}`,
//         "YYYY-MM-DD h:mm A",
//         TIMEZONE
//       );

//       let reminderTime;
//       if (data.testReminder) {
//         reminderTime = moment(data.scheduledAt).add(5, "minutes");
//       } else {
//         reminderTime = appointmentMoment.clone().subtract(10, "minutes");
//       }

//       reminders.push({
//         id: doc.id,
//         parentEmail: data.parentEmail,
//         appointmentDate: data.appointmentDate,
//         appointmentTime: data.appointmentTime,
//         reminderSent: data.reminderSent,
//         testReminder: data.testReminder,
//         scheduledAt: data.scheduledAt,
//         reminderTime: reminderTime.format("YYYY-MM-DD h:mm A"),
//         shouldSendNow: now.isAfter(reminderTime),
//         timeUntilReminder: reminderTime.diff(now, "minutes"),
//       });
//     });

//     res.json({
//       success: true,
//       currentTime: now.format("YYYY-MM-DD h:mm A"),
//       timezone: TIMEZONE,
//       totalReminders: reminders.length,
//       reminders,
//     });
//   } catch (error) {
//     console.error("❌ Error in debug endpoint:", error);
//     res.status(500).json({
//       success: false,
//       error: error.message,
//     });
//   }
// });

// const express = require("express");
// const nodemailer = require("nodemailer");
// const cors = require("cors"); // Import CORS
// require("dotenv").config(); // Load environment variables from .env file
// const app = express();
// const PORT = process.env.PORT || 5000;

// app.use(cors()); // Enable CORS for all routes
// app.use(express.json()); // Middleware to parse JSON bodies

// // Setup Nodemailer with Brevo SMTP configuration
// const transporter = nodemailer.createTransport({
//   host: process.env.SMTP_HOST,
//   port: process.env.SMTP_PORT,
//   auth: {
//     user: process.env.SMTP_USER, // Using environment variable for user
//     pass: process.env.SMTP_PASSWORD, // Using environment variable for password
//   },
//   debug: true, // Enable debug output
//   logger: true, // Log to console
// });
// const moment = require("moment-timezone");

// // Configura el huso horario de Miami

// // Importar Firebase Admin SDK
// const admin = require("firebase-admin");
// const serviceAccount = require("./serviceAccountKey.json");
// // Inicializar Firebase Admin
// admin.initializeApp({
//   credential: admin.credential.cert(serviceAccount),
//   databaseURL: "https://rexvets-database.firebaseio.com",
// });

// const db = admin.firestore();

// // EMAILS

// app.post("/sendWelcomeEmailParent", (req, res) => {
//   console.log("Received request to send welcome email:", req.body); // Log incoming request data
//   const { email, name } = req.body;

//   const mailOptions = {
//     from: "support@rexvets.com",
//     to: email,
//     subject: "Welcome to Rex Vets!",
//     html: `
//             <h1>Welcome to Rex Vets!</h1>
//             <p>Dear ${name},</p>
//             <p>Welcome to Rex Vets and thank you for choosing us for your pet's healthcare needs. We're thrilled to have you on board and look forward to helping you and your furry friend live happier, healthier lives.</p>
//             <p>You're now part of a community of pet lovers who are committed to providing the best care for their pets. To schedule your first video call with one of our experienced veterinarians, simply visit the "Home" tab in your account and click "Book a video call", and you'll be on your way to a virtual appointment.</p>
//             <p>If you have any questions or need assistance at any point along the way, please don't hesitate to reach out to our dedicated support team at support@rexvets.com. We're here to make your experience with Rex Vets as seamless and enjoyable as possible.</p>
//             <p>Thank you once again for choosing Rex Vets. We can't wait to assist you in providing the best possible care for your pet.</p>
//             <p>Warm regards,<br>The Team at Rex Vets</p>

//             <!-- Add logo here -->
//             <p><img src="https://www.rexvets.com/static/media/Logo.c536919c80b8ff104089.png" alt="Rex Vets Logo" width="150" /></p>
//         `,
//   };
//   transporter.sendMail(mailOptions, (error, info) => {
//     if (error) {
//       console.log("Error sending email:", error); // Log email sending error
//       return res.status(500).send({ message: "Failed to send email" });
//     }
//     console.log("Email sent:", info.response); // Log email success
//     res.send({ message: "Welcome email sent successfully!" });
//   });
// });

// // Route to send booking confirmation emails
// app.post("/sendBookingConfirmation", async (req, res) => {
//   console.log("Received request to send booking confirmation:", req.body); // Log incoming request data
//   const {
//     doctorEmail,
//     doctorName,
//     parentEmail,
//     parentName,
//     petName,
//     appointmentDate,
//     appointmentTime,
//     meetingLink,
//   } = req.body;
//   console.log(
//     doctorEmail,
//     doctorName,
//     parentEmail,
//     parentName,
//     petName,
//     appointmentDate,
//     appointmentTime,
//     meetingLink
//   );

//   // Email content for doctor (same copy as for parents)
//   // Email content for doctor
//   const mailOptionsDoctor = {
//     from: "support@rexvets.com",
//     to: doctorEmail,
//     subject: "Appointment Confirmation - Rex Vets",
//     html: `
//             <p>Dear ${doctorName},</p>

//             <p>We're excited to confirm your upcoming video call appointment with ${parentName} at Rex Vets. Here are the details for your appointment:</p>
//             <p><strong>Start Time:</strong> ${appointmentDate} ${appointmentTime}</p>
//             <p><strong>Veterinarian:</strong> ${doctorName}</p>
//             <p><strong>Parent:</strong> ${parentName}</p>
//             <p><strong>Pet Name:</strong> ${petName}</p>
//             <p><strong>Meeting Link:</strong> <a href="${meetingLink}">${meetingLink}</a></p>

//             <p>Please make sure you're ready for the call at least a few minutes before the scheduled time.</p>

//             <p>If you need to reschedule or have any other questions, please feel free to reply to this email or contact our support team at <a href="mailto:support@rexvets.com">support@rexvets.com</a>.</p>

//             <p>We thank you for your dedication to pet's care.</p>

//             <p>Warm regards,<br>The Team at Rex Vets</p>

//             <!-- Add logo here -->
//             <p><img src="https://www.rexvets.com/static/media/Logo.c536919c80b8ff104089.png" alt="Rex Vets Logo" width="150" /></p>
//         `,
//   };

//   // Email content for parent (same copy as for doctors)
//   const mailOptionsParent = {
//     from: "support@rexvets.com",
//     to: parentEmail,
//     subject: "Your Appointment Confirmation - Rex Vets",
//     html: `
//             <p>Dear ${parentName},</p>

//             <p>We're excited to confirm your upcoming video call appointment with <strong>${doctorName}</strong> at Rex Vets. Here are the details for your appointment:</p>
//             <p><strong>Start Time:</strong> ${appointmentDate} ${appointmentTime}</p>
//             <p><strong>Veterinarian:</strong> ${doctorName}</p>
//             <p><strong>Pet Name:</strong> ${petName}</p>
//             <p><strong>Meeting Link:</strong> <a href="${meetingLink}">${meetingLink}</a></p>

//             <p>Please make sure you're ready for the call at least a few minutes before the scheduled time. ${doctorName} is here to address any questions or concerns you have about your pet's health.</p>

//             <p>If you need to reschedule or have any other questions, please feel free to reply to this email or contact our support team at <a href="mailto:support@rexvets.com">support@rexvets.com</a>.</p>

//             <p>We look forward to assisting you with your pet's care.</p>

//             <p>Warm regards,<br>The Team at Rex Vets</p>

//             <!-- Add logo here -->
//             <p><img src="https://www.rexvets.com/static/media/Logo.c536919c80b8ff104089.png" alt="Rex Vets Logo" width="150" /></p>
//         `,
//   };

//   try {
//     // Send emails
//     await transporter.sendMail(mailOptionsDoctor);
//     await transporter.sendMail(mailOptionsParent);

//     // Response
//     res.send({ message: "Booking confirmation emails sent successfully!" });
//     console.log("Booking confirmation emails sent successfully!");
//   } catch (error) {
//     console.error("Error sending booking confirmation emails:", error);
//     res
//       .status(500)
//       .send({ message: "Failed to send booking confirmation emails" });
//   }
// });

// //RECORDATORIO EMAIL

// const TIMEZONE = "America/New_York"; // Configura el huso horario deseado

// function scheduleReminderEmail(
//   appointmentDate,
//   appointmentTime,
//   parentEmail,
//   parentName,
//   doctorName,
//   doctorEmail,
//   meetingLink
// ) {
//   console.log("Attempting to schedule reminder email.");
//   const now = moment().tz(TIMEZONE);

//   // Clone the appointmentMoment and subtract 10 minutes
//   const appointmentMoment = moment.tz(
//     `${appointmentDate} ${appointmentTime}`,
//     "YYYY-MM-DD h:mm A",
//     TIMEZONE
//   );

//   console.log(`Current time (${TIMEZONE}): ${now.format("YYYY-MM-DD h:mm A")}`);
//   console.log(
//     `Appointment time (${TIMEZONE}): ${appointmentMoment.format(
//       "YYYY-MM-DD h:mm A"
//     )}`
//   );

//   // Calculate the difference in milliseconds between now and 10 minutes before the appointment
//   const appointmentMomentMinus10 = appointmentMoment
//     .clone()
//     .subtract(10, "minutes");
//   console.log(
//     `Reminder scheduled for: ${appointmentMomentMinus10.format(
//       "YYYY-MM-DD h:mm A"
//     )}`
//   );

//   const timeDifference = appointmentMomentMinus10.diff(now);
//   console.log(`Time difference until reminder (ms): ${timeDifference}`);

//   if (timeDifference > 0) {
//     console.log(
//       `Scheduling reminder email for ${parentEmail} in ${timeDifference}ms.`
//     );
//     setTimeout(() => {
//       let EMAILFORPATIENTPREV = `<!DOCTYPE html>
//       <html xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office" lang="en">
//       <head>
//         <title></title>
//         <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
//         <meta name="viewport" content="width=device-width, initial-scale=1.0">
//         <link href="https://fonts.googleapis.com/css?family=Lato" rel="stylesheet" type="text/css">
//         <style>
//           * { box-sizing: border-box; }
//           body { margin: 0; padding: 0; }
//           a[x-apple-data-detectors] { color: inherit !important; text-decoration: inherit !important; }
//           #MessageViewBody a { color: inherit; text-decoration: none; }
//           p { line-height: inherit }
//           .desktop_hide, .desktop_hide table { mso-hide: all; display: none; max-height: 0px; overflow: hidden; }
//           .image_block img+div { display: none; }
//           sup, sub { line-height: 0; font-size: 75%; }
//           @media (max-width:660px) {
//             .desktop_hide table.icons-inner, .social_block.desktop_hide .social-table {
//               display: inline-block !important;
//             }
//             .icons-inner { text-align: center; }
//             .icons-inner td { margin: 0 auto; }
//             .mobile_hide { display: none; }
//             .row-content { width: 100% !important; }
//             .stack .column { width: 100%; display: block; }
//             .mobile_hide { min-height: 0; max-height: 0; max-width: 0; overflow: hidden; font-size: 0px; }
//             .desktop_hide, .desktop_hide table { display: table !important; max-height: none !important; }
//           }
//         </style>
//       </head>
//       <body class="body" style="background-color: #c5f1fc; margin: 0; padding: 0; -webkit-text-size-adjust: none; text-size-adjust: none;">
//       <div class="CompleteEmail"><table class="nl-container" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #c5f1fc;">
//           <tbody>
//             <tr>
//               <td>
//                 <table class="row row-1" align="center" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
//                   <tbody>
//                     <tr>
//                       <td>
//                         <table class="row-content stack" align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; color: #000000; width: 640px; margin: 0 auto;" width="640">
//                           <tbody>
//                             <tr>
//                               <td class="column column-1" width="100%" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; padding-bottom: 5px; padding-top: 5px; vertical-align: top; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;">
//                                 <div class="spacer_block block-1" style="height:50px;line-height:50px;font-size:1px;">&#8202;</div>
//                               </td>
//                             </tr>
//                           </tbody>
//                         </table>
//                       </td>
//                     </tr>
//                   </tbody>
//                 </table>
//                 <table class="row row-2" align="center" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
//                   <tbody>
//                     <tr>
//                       <td>
//                         <table class="row-content stack" align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #ffffff; color: #000000; width: 640px; margin: 0 auto;" width="640">
//                           <tbody>
//                             <tr>
//                               <td class="column column-1" width="100%" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; vertical-align: top; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;">
//                                 <table class="image_block block-1" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
//                                   <tr>
//                                     <td class="pad" style="width:100%;">
//                                       <div class="alignment" align="center" style="line-height:10px">
//                                         <div style="max-width: 640px;"><img src="https://i.imgur.com/5AOt9ex.png" style="display: block; height: auto; border: 0; width: 100%;" width="640" alt="Dog Banner" title="Dog Banner" height="auto"></div>
//                                       </div>
//                                     </td>
//                                   </tr>
//                                 </table>
//                               </td>
//                             </tr>
//                           </tbody>
//                         </table>
//                       </td>
//                     </tr>
//                   </tbody>
//                 </table>
//                 <table class="row row-3" align="center" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
//                   <tbody>
//                     <tr>
//                       <td>
//                         <table class="row-content stack" align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; border-radius: 0; color: #000000; width: 640px; margin: 0 auto;" width="640">
//                           <tbody>
//                             <tr>
//                               <td class="column column-1" width="100%" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; background-color: #ffffff; padding-bottom: 5px; padding-top: 5px; vertical-align: top; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;">
//                                 <table class="heading_block block-1" width="100%" border="0" cellpadding="10" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
//                                   <tr>
//                                     <td class="pad">
//                                       <h1 style="margin: 0; color: #7747FF; direction: ltr; font-family: Lato, Tahoma, Verdana, Segoe, sans-serif; font-size: 38px; font-weight: 700; letter-spacing: normal; line-height: 120%; text-align: left; margin-top: 0; margin-bottom: 0; mso-line-height-alt: 45.6px;">
//                                         <span style="word-break: break-word; color: #000000;"><strong>Dear ${parentName}</strong></span>
//                                       </h1>
//                                     </td>
//                                   </tr>
//                                 </table>
//                               </td>
//                             </tr>
//                           </tbody>
//                         </table>
//                       </td>
//                     </tr>
//                   </tbody>
//                 </table>
//                 <table class="row row-4" align="center" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
//                   <tbody>
//                     <tr>
//                       <td>
//                         <table class="row-content stack" align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; border-radius: 0; color: #000000; width: 640px; margin: 0 auto;" width="640">
//                           <tbody>
//                             <tr>
//                               <td class="column column-1" width="100%" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; background-color: #ffffff; padding-bottom: 5px; padding-top: 5px; vertical-align: top; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;">
//                                 <table class="paragraph_block block-1" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;">
//                                   <tr>
//                                     <td class="pad" style="padding-bottom:10px;padding-left:20px;padding-right:20px;padding-top:10px;">
//                                       <div style="color:#555555;font-family:Lato, Tahoma, Verdana, Segoe, sans-serif;font-size:14px;line-height:120%;text-align:left;mso-line-height-alt:16.8px;">
//                                         <p style="margin: 0; word-break: break-word;">We hope this message finds you well. Your upcoming video call appointment with <strong>${doctorName}</strong> at Rex Vets is just around the corner, and we're thrilled to assist you with your pet's health.</p>
//                                         <p style="margin: 0; word-break: break-word;">&nbsp;</p>
//                                         <p style="margin: 0; word-break: break-word;">The link to join your video call is now available. To access your appointment, please click the following link:</p>
//                                         <p style="margin: 0; word-break: break-word;">&nbsp;</p>
//                                         <p style="margin: 0; word-break: break-word;"><strong><a href="${meetingLink}" target="_blank">Please click here to join video</a></strong></p>
//                                         <p style="margin: 0; word-break: break-word;">&nbsp;</p>
//                                         <p style="margin: 0; word-break: break-word;">Please make sure you're prepared and have any relevant information or questions ready for the call. <strong>${doctorName}</strong> is dedicated to providing the best care for your furry friend.<br><br>If you encounter any issues or have any last-minute questions, don't hesitate to reach out to our support team at <a href="mailto:support@rexvets.com">support@rexvets.com</a></p>
//                                         <p style="margin: 0; word-break: break-word;">&nbsp;</p>
//                                         <p style="margin: 0; word-break: break-word;">We look forward to connecting with you and addressing your pet's health needs.</p>
//                                         <p style="margin: 0; word-break: break-word;">&nbsp;</p>
//                                         <p style="margin: 0; word-break: break-word;">Thank you for choosing Rex Vets for your pet's care.</p>
//                                         <p style="margin: 0; word-break: break-word;">&nbsp;</p>
//                                         <p style="margin: 0; word-break: break-word;">Warm regards, <strong>The Team at Rex Vets</strong></p>
//                                       </div>
//                                     </td>
//                                   </tr>
//                                 </table>
//                                 <table class="button_block block-2" width="100%" border="0" cellpadding="10" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
//                                   <tr>
//                                     <td class="pad">
//                                       <div class="alignment" align="center">
//                                         <a href="${meetingLink}" target="_blank" style="background-color:#002366;border-bottom:0px solid transparent;border-left:0px solid transparent;border-radius:10px;border-right:0px solid transparent;border-top:0px solid transparent;color:#ffffff;display:inline-block;font-family:'Lato', Tahoma, Verdana, Segoe, sans-serif;font-size:16px;font-weight:undefined;mso-border-alt:none;padding-bottom:5px;padding-top:5px;text-align:center;text-decoration:none;width:auto;word-break:keep-all;">
//                                           <span style="word-break: break-word; padding-left: 20px; padding-right: 20px; font-size: 16px; display: inline-block; letter-spacing: normal;">
//                                             <strong>MEETING LINK</strong>
//                                           </span>
//                                         </a>
//                                       </div>
//                                     </td>
//                                   </tr>
//                                 </table>
//                                 <table class="paragraph_block block-3" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;">
//                                   <tr>
//                                     <td class="pad" style="padding-bottom:10px;padding-left:20px;padding-right:20px;padding-top:10px;">
//                                       <div style="color:#555555;font-family:Lato, Tahoma, Verdana, Segoe, sans-serif;font-size:14px;line-height:120%;text-align:left;mso-line-height-alt:16.8px;">&nbsp;</div>
//                                     </td>
//                                   </tr>
//                                 </table>
//                               </td>
//                             </tr>
//                           </tbody>
//                         </table>
//                       </td>
//                     </tr>
//                   </tbody>
//                 </table>
//                 <table class="row row-5" align="center" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
//                   <tbody>
//                     <tr>
//                       <td>
//                       <table class="row-content stack" align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #00b3d3; background-position: center top; color: #000000; width: 640px; margin: 0 auto;" width="640">
//                       <tbody>
//                         <tr>
//                           <td class="column column-1" width="100%" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; background-color: #002366; padding-bottom: 5px; padding-top: 5px; vertical-align: top; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;">
//                             <table class="image_block block-1" width="100%" border="0" cellpadding="10" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
//                               <tr>
//                                 <td class="pad">
//                                   <div class="alignment" align="center" style="line-height:10px">
//                                     <div style="max-width: 620px;"><a href="https://www.rexvets.com" target="_blank" style="outline:none" tabindex="-1"><img src="https://i.ibb.co/3CZBJyh/5bfa.png" style="display: block; height: auto; border: 0; width: 100%;" width="620" alt="Your Logo" title="Your Logo" height="auto"></a></div>
//                                   </div>
//                                 </td>
//                               </tr>
//                             </table>
//                                 <table class="social_block block-2" width="100%" border="0" cellpadding="10" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
//                                   <tr>
//                                     <td class="pad">
//                                       <div class="alignment" align="center">
//                                         <table class="social-table" width="92px" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; display: inline-block;">
//                                           <tr>
//                                             <td style="padding:0 7px 0 7px;"><a href="https://www.facebook.com/rexvets" target="_blank"><img src="https://app-rsrc.getbee.io/public/resources/social-networks-icon-sets/t-circle-white/facebook@2x.png" width="32" height="auto" alt="Facebook" title="Facebook" style="display: block; height: auto; border: 0;"></a></td>
//                                             <td style="padding:0 7px 0 7px;"><a href="https://www.instagram.com/rexvets" target="_blank"><img src="https://app-rsrc.getbee.io/public/resources/social-networks-icon-sets/t-circle-white/instagram@2x.png" width="32" height="auto" alt="Instagram" title="Instagram" style="display: block; height: auto; border: 0;"></a></td>
//                                           </tr>
//                                         </table>
//                                       </div>
//                                     </td>
//                                   </tr>
//                                 </table>
//                                 <table class="paragraph_block block-3" width="100%" border="0" cellpadding="10" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;">
//                                   <tr>
//                                     <td class="pad">
//                                       <div style="color:#555555;font-family:Lato, Tahoma, Verdana, Segoe, sans-serif;font-size:14px;line-height:120%;text-align:center;mso-line-height-alt:16.8px;">
//                                         <p style="margin: 0; word-break: break-word;"><span style="word-break: break-word; color: #ffffff;"><strong>Rex Vets </strong>is a <strong>non-profit organization</strong>, and our efforts are sustained by the generosity of our donors. If you would like to support our mission with a donation, we would be deeply grateful. You can make a contribution through <strong><a href="https://www.rexvets.com/PetParents" target="_blank" style="color: #ffffff;">the following link</a></strong></span></p>
//                                       </div>
//                                     </td>
//                                   </tr>
//                                 </table>
//                                 <div class="spacer_block block-4" style="height:30px;line-height:30px;font-size:1px;">&#8202;</div>
//                               </td>
//                             </tr>
//                           </tbody>
//                         </table>
//                       </td>
//                     </tr>
//                   </tbody>
//                 </table>
//               </td>
//             </tr>
//           </tbody>
//         </table>
//       </body>
//       </html>

//     `;
//       const mailOptionsParent = {
//         from: "support@rexvets.com",
//         to: parentEmail,
//         subject: "Appointment Reminder - Rex Vets",
//         html: EMAILFORPATIENTPREV,
//       };

//       transporter.sendMail(mailOptionsParent, (error, info) => {
//         if (error) {
//           console.log("Error sending reminder email to parent:", error);
//         } else {
//           console.log("Reminder email sent to parent:", info.response);
//         }
//       });
//     }, timeDifference);

//     // Programar el envío del correo al doctor
//     setTimeout(() => {
//       let EMAILFORDOCTORSPREV = `<!DOCTYPE html>
//       <html xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office" lang="en">
//       <head>
//         <title></title>
//         <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
//         <meta name="viewport" content="width=device-width, initial-scale=1.0">
//         <link href="https://fonts.googleapis.com/css?family=Lato" rel="stylesheet" type="text/css">
//         <style>
//           * { box-sizing: border-box; }
//           body { margin: 0; padding: 0; }
//           a[x-apple-data-detectors] { color: inherit !important; text-decoration: inherit !important; }
//           #MessageViewBody a { color: inherit; text-decoration: none; }
//           p { line-height: inherit }
//           .desktop_hide, .desktop_hide table { mso-hide: all; display: none; max-height: 0px; overflow: hidden; }
//           .image_block img+div { display: none; }
//           sup, sub { line-height: 0; font-size: 75%; }
//           @media (max-width:660px) {
//             .desktop_hide table.icons-inner, .social_block.desktop_hide .social-table {
//               display: inline-block !important;
//             }
//             .icons-inner { text-align: center; }
//             .icons-inner td { margin: 0 auto; }
//             .mobile_hide { display: none; }
//             .row-content { width: 100% !important; }
//             .stack .column { width: 100%; display: block; }
//             .mobile_hide { min-height: 0; max-height: 0; max-width: 0; overflow: hidden; font-size: 0px; }
//             .desktop_hide, .desktop_hide table { display: table !important; max-height: none !important; }
//           }
//         </style>
//       </head>
//       <body class="body" style="background-color: #c5f1fc; margin: 0; padding: 0; -webkit-text-size-adjust: none; text-size-adjust: none;">
//         <table class="nl-container" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #c5f1fc;">
//           <tbody>
//             <tr>
//               <td>
//                 <table class="row row-1" align="center" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
//                   <tbody>
//                     <tr>
//                       <td>
//                         <table class="row-content stack" align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; color: #000000; width: 640px; margin: 0 auto;" width="640">
//                           <tbody>
//                             <tr>
//                               <td class="column column-1" width="100%" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; padding-bottom: 5px; padding-top: 5px; vertical-align: top; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;">
//                                 <div class="spacer_block block-1" style="height:50px;line-height:50px;font-size:1px;">&#8202;</div>
//                               </td>
//                             </tr>
//                           </tbody>
//                         </table>
//                       </td>
//                     </tr>
//                   </tbody>
//                 </table>
//                 <table class="row row-2" align="center" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
//                   <tbody>
//                     <tr>
//                       <td>
//                         <table class="row-content stack" align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #ffffff; color: #000000; width: 640px; margin: 0 auto;" width="640">
//                           <tbody>
//                             <tr>
//                               <td class="column column-1" width="100%" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; vertical-align: top; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;">
//                                 <table class="image_block block-1" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
//                                   <tr>
//                                     <td class="pad" style="width:100%;">
//                                       <div class="alignment" align="center" style="line-height:10px">
//                                         <div style="max-width: 640px;"><img src="https://i.ibb.co/xHZRkD7/appointment-vets.png" style="display: block; height: auto; border: 0; width: 100%;" width="640" alt="Dog Banner" title="Dog Banner" height="auto"></div>
//                                       </div>
//                                     </td>
//                                   </tr>
//                                 </table>
//                               </td>
//                             </tr>
//                           </tbody>
//                         </table>
//                       </td>
//                     </tr>
//                   </tbody>
//                 </table>
//                 <table class="row row-3" align="center" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
//                   <tbody>
//                     <tr>
//                       <td>
//                         <table class="row-content stack" align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; border-radius: 0; color: #000000; width: 640px; margin: 0 auto;" width="640">
//                           <tbody>
//                             <tr>
//                               <td class="column column-1" width="100%" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; background-color: #ffffff; padding-bottom: 5px; padding-top: 5px; vertical-align: top; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;">
//                                 <table class="heading_block block-1" width="100%" border="0" cellpadding="10" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
//                                   <tr>
//                                     <td class="pad">
//                                       <h1 style="margin: 0; color: #7747FF; direction: ltr; font-family: Lato, Tahoma, Verdana, Segoe, sans-serif; font-size: 38px; font-weight: 700; letter-spacing: normal; line-height: 120%; text-align: left; margin-top: 0; margin-bottom: 0; mso-line-height-alt: 45.6px;">
//                                         <span style="word-break: break-word; color: #000000;"><strong>Dear ${doctorName}</strong></span>
//                                       </h1>
//                                     </td>
//                                   </tr>
//                                 </table>
//                               </td>
//                             </tr>
//                           </tbody>
//                         </table>
//                       </td>
//                     </tr>
//                   </tbody>
//                 </table>
//                 <table class="row row-4" align="center" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
//                   <tbody>
//                     <tr>
//                       <td>
//                         <table class="row-content stack" align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; border-radius: 0; color: #000000; width: 640px; margin: 0 auto;" width="640">
//                           <tbody>
//                             <tr>
//                               <td class="column column-1" width="100%" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; background-color: #ffffff; padding-bottom: 5px; padding-top: 5px; vertical-align: top; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;">
//                                 <table class="paragraph_block block-1" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;">
//                                   <tr>
//                                     <td class="pad" style="padding-bottom:10px;padding-left:20px;padding-right:20px;padding-top:10px;">
//                                       <div style="color:#555555;font-family:Lato, Tahoma, Verdana, Segoe, sans-serif;font-size:14px;line-height:120%;text-align:left;mso-line-height-alt:16.8px;">
//                                         <p style="margin: 0; word-break: break-word;">We hope you're ready for your upcoming appointment with <strong>${parentName}</strong>. The video call for this appointment will be happening shortly.</p>
//                                         <p style="margin: 0; word-break: break-word;">&nbsp;</p>
//                                         <p style="margin: 0; word-break: break-word;">To join the video call, please use the following link:</p>
//                                         <p style="margin: 0; word-break: break-word;">&nbsp;</p>
//                                         <p style="margin: 0; word-break: break-word;"><strong><a href="${meetingLink}" target="_blank">Click here to join the video call</a></strong></p>
//                                         <p style="margin: 0; word-break: break-word;">&nbsp;</p>
//                                         <p style="margin: 0; word-break: break-word;">Make sure you have your notes and any relevant details about <strong>${parentName}</strong>'s pet prepared for the consultation. If you need to reschedule or have any questions, feel free to reach out to our support team at <a href="mailto:support@rexvets.com">support@rexvets.com</a>.</p>
//                                         <p style="margin: 0; word-break: break-word;">&nbsp;</p>
//                                         <p style="margin: 0; word-break: break-word;">Thank you for your commitment to providing excellent care at Rex Vets.</p>
//                                         <p style="margin: 0; word-break: break-word;">&nbsp;</p>
//                                         <p style="margin: 0; word-break: break-word;">Best regards, <strong>The Rex Vets Team</strong></p>
//                                       </div>
//                                     </td>
//                                   </tr>
//                                 </table>
//                                 <table class="button_block block-2" width="100%" border="0" cellpadding="10" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
//                                   <tr>
//                                     <td class="pad">
//                                       <div class="alignment" align="center">
//                                         <a href="${meetingLink}" target="_blank" style="background-color:#002366;border-bottom:0px solid transparent;border-left:0px solid transparent;border-radius:10px;border-right:0px solid transparent;border-top:0px solid transparent;color:#ffffff;display:inline-block;font-family:'Lato', Tahoma, Verdana, Segoe, sans-serif;font-size:16px;font-weight:undefined;mso-border-alt:none;padding-bottom:5px;padding-top:5px;text-align:center;text-decoration:none;width:auto;word-break:keep-all;">
//                                           <span style="word-break: break-word; padding-left: 20px; padding-right: 20px; font-size: 16px; display: inline-block; letter-spacing: normal;">
//                                             <strong>JOIN MEETING</strong>
//                                           </span>
//                                         </a>
//                                       </div>
//                                     </td>
//                                   </tr>
//                                 </table>
//                                 <table class="paragraph_block block-3" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;">
//                                   <tr>
//                                     <td class="pad" style="padding-bottom:10px;padding-left:20px;padding-right:20px;padding-top:10px;">
//                                       <div style="color:#555555;font-family:Lato, Tahoma, Verdana, Segoe, sans-serif;font-size:14px;line-height:120%;text-align:left;mso-line-height-alt:16.8px;">&nbsp;</div>
//                                     </td>
//                                   </tr>
//                                 </table>
//                               </td>
//                             </tr>
//                           </tbody>
//                         </table>
//                       </td>
//                     </tr>
//                   </tbody>
//                 </table>
//                 <table class="row row-5" align="center" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
//                   <tbody>
//                     <tr>
//                       <td>
//                       <table class="row-content stack" align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #00b3d3; background-position: center top; color: #000000; width: 640px; margin: 0 auto;" width="640">
//                       <tbody>
//                         <tr>
//                           <td class="column column-1" width="100%" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; background-color: #002366; padding-bottom: 5px; padding-top: 5px; vertical-align: top; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;">
//                             <table class="image_block block-1" width="100%" border="0" cellpadding="10" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
//                               <tr>
//                                 <td class="pad">
//                                   <div class="alignment" align="center" style="line-height:10px">
//                                     <div style="max-width: 620px;"><a href="https://www.rexvets.com" target="_blank" style="outline:none" tabindex="-1"><img src="https://i.ibb.co/3CZBJyh/5bfa.png" style="display: block; height: auto; border: 0; width: 100%;" width="620" alt="Your Logo" title="Your Logo" height="auto"></a></div>
//                                   </div>
//                                 </td>
//                               </tr>
//                             </table>
//                                 <table class="social_block block-2" width="100%" border="0" cellpadding="10" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
//                                   <tr>
//                                     <td class="pad">
//                                       <div class="alignment" align="center">
//                                         <table class="social-table" width="92px" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; display: inline-block;">
//                                           <tr>
//                                             <td style="padding:0 7px 0 7px;"><a href="https://www.facebook.com/rexvets" target="_blank"><img src="https://app-rsrc.getbee.io/public/resources/social-networks-icon-sets/t-circle-white/facebook@2x.png" width="32" height="auto" alt="Facebook" title="Facebook" style="display: block; height: auto; border: 0;"></a></td>
//                                             <td style="padding:0 7px 0 7px;"><a href="https://www.instagram.com/rexvets" target="_blank"><img src="https://app-rsrc.getbee.io/public/resources/social-networks-icon-sets/t-circle-white/instagram@2x.png" width="32" height="auto" alt="Instagram" title="Instagram" style="display: block; height: auto; border: 0;"></a></td>
//                                           </tr>
//                                         </table>
//                                       </div>
//                                     </td>
//                                   </tr>
//                                 </table>
//                                 <table class="paragraph_block block-3" width="100%" border="0" cellpadding="10" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;">
//                                   <tr>
//                                     <td class="pad">
//                                       <div style="color:#555555;font-family:Lato, Tahoma, Verdana, Segoe, sans-serif;font-size:14px;line-height:120%;text-align:center;mso-line-height-alt:16.8px;">
//                                         <p style="margin: 0; word-break: break-word;"><span style="word-break: break-word; color: #ffffff;"><strong>Rex Vets </strong>is a <strong>non-profit organization</strong>, and our efforts are sustained by the generosity of our donors. If you would like to support our mission with a donation, we would be deeply grateful. You can make a contribution through <strong><a href="https://www.rexvets.com/PetParents" target="_blank" style="color: #ffffff;">the following link</a></strong></span></p>
//                                       </div>
//                                     </td>
//                                   </tr>
//                                 </table>
//                                 <div class="spacer_block block-4" style="height:30px;line-height:30px;font-size:1px;">&#8202;</div>
//                               </td>
//                             </tr>
//                           </tbody>
//                         </table>
//                       </td>
//                     </tr>
//                   </tbody>
//                 </table>
//               </td>
//             </tr>
//           </tbody>
//         </table>
//         </div>
//       </body>
//       </html>

//       `;
//       const mailOptionsDoctor = {
//         from: "support@rexvets.com",
//         to: doctorEmail,
//         subject: "Appointment Reminder - Rex Vets",
//         html: EMAILFORDOCTORSPREV,
//       };

//       transporter.sendMail(mailOptionsDoctor, (error, info) => {
//         if (error) {
//           console.log("Error sending reminder email to doctor:", error);
//         } else {
//           console.log("Reminder email sent to doctor:", info.response);
//         }
//       });
//     }, timeDifference);
//   } else {
//     console.log(
//       "No reminder emails to send, appointment is too close or past."
//     );
//   }
// }

// function trackAppointments() {
//   console.log("Starting appointment tracking.");
//   const appointmentsCol = db.collection("Appointments");

//   // Escuchar cambios en tiempo real
//   console.log("Setting up real-time listener for Appointments collection...");
//   appointmentsCol.onSnapshot(async (snapshot) => {
//     console.log(
//       `Received appointment snapshot with ${
//         snapshot.docChanges().length
//       } changes.`
//     );
//     snapshot.docChanges().forEach(async (change) => {
//       const appointment = change.doc.data();
//       const {
//         AppointmentDate,
//         AppointmentTime,
//         ParentEmail,
//         ParentName,
//         DoctorName,
//         DoctorEmail,
//         MeetingLink,
//         reminderScheduled,
//       } = appointment;

//       console.log(
//         `Processing appointment change type: ${change.type} for parent: ${ParentEmail}`
//       );

//       if (change.type === "added" || change.type === "modified") {
//         // Check if no reminder is scheduled
//         if (!reminderScheduled) {
//           console.log(
//             `Scheduling reminder for new/updated appointment: ${ParentEmail} (ID: ${change.doc.id})`
//           );
//           // Programar el recordatorio
//           scheduleReminderEmail(
//             AppointmentDate,
//             AppointmentTime,
//             ParentEmail,
//             ParentName,
//             DoctorName,
//             DoctorEmail,
//             MeetingLink
//           );

//           // Actualizar la cita en la base de datos
//           const appointmentRef = db
//             .collection("Appointments")
//             .doc(change.doc.id);
//           await appointmentRef.update({ reminderScheduled: true });
//         }
//       }
//     });

//     // Add logic to find and log the next upcoming appointment-del
//     const now = moment().tz(TIMEZONE);
//     const upcomingAppointments = snapshot.docs
//       .map((doc) => ({ id: doc.id, ...doc.data() }))
//       .filter((appointment) => {
//         const appointmentMoment = moment.tz(
//           `${appointment.AppointmentDate} ${appointment.AppointmentTime}`,
//           "YYYY-MM-DD h:mm A",
//           TIMEZONE
//         );
//         return appointmentMoment.isAfter(now);
//       })
//       .sort((a, b) => {
//         const momentA = moment.tz(
//           `${a.AppointmentDate} ${a.AppointmentTime}`,
//           "YYYY-MM-DD h:mm A",
//           TIMEZONE
//         );
//         const momentB = moment.tz(
//           `${b.AppointmentDate} ${b.AppointmentTime}`,
//           "YYYY-MM-DD h:mm A",
//           TIMEZONE
//         );
//         return momentA.diff(now) - momentB.diff(now);
//       });

//     if (upcomingAppointments.length > 0) {
//       const nextAppointment = upcomingAppointments[0];
//       const nextMoment = moment.tz(
//         `${nextAppointment.AppointmentDate} ${nextAppointment.AppointmentTime}`,
//         "YYYY-MM-DD h:mm A",
//         TIMEZONE
//       );
//       console.log(`Next upcoming appointment details:`);
//       console.log(`ID: ${nextAppointment.id}`);
//       console.log(`Date: ${nextAppointment.AppointmentDate}`);
//       console.log(`Time: ${nextAppointment.AppointmentTime}`);
//       console.log(`Parent Email: ${nextAppointment.ParentEmail}`);
//       console.log(`Parent Name: ${nextAppointment.ParentName}`);
//       console.log(`Doctor Name: ${nextAppointment.DoctorName}`);
//       console.log(`Doctor Email: ${nextAppointment.DoctorEmail}`);
//       console.log(`Meeting Link: ${nextAppointment.MeetingLink}`);
//       console.log(
//         `Scheduled Time (in ${TIMEZONE}): ${nextMoment.format(
//           "YYYY-MM-DD h:mm A"
//         )}`
//       );
//     } else {
//       console.log("No upcoming appointments found.");
//     }
//   }); // delete later for testing
//   console.log("Firestore onSnapshot listener setup code executed.");
// }

// // Inicializar el tracking de las citas
// trackAppointments();

// // Función para monitorear mensajes actuales y nuevos en la subcolección de todos los appointments y enviar correos si el remitente comienza con "Dr"
// function trackNewMessagesForAppointment(appointmentHash) {
//   console.log(
//     `Iniciando monitoreo de mensajes para el appointment con hash: ${appointmentHash}`
//   );

//   const appointmentDocRef = db.collection("Appointments").doc(appointmentHash);

//   let initialMessagesTracked = false;
//   let initialMessagesLength = 0;

//   appointmentDocRef.onSnapshot((docSnapshot) => {
//     if (docSnapshot.exists) {
//       const appointmentData = docSnapshot.data();
//       const messages = appointmentData.Messages;

//       if (!initialMessagesTracked) {
//         // Mark that initial messages have been tracked
//         initialMessagesLength = messages ? messages.length : 0;
//         initialMessagesTracked = true;
//         console.log(
//           `Initial messages tracked for appointment ${appointmentHash}: ${initialMessagesLength}`
//         );
//       } else if (messages && messages.length > initialMessagesLength) {
//         const newMessages = messages.slice(initialMessagesLength);
//         newMessages.forEach((message, index) => {
//           console.log(
//             `Nuevo mensaje ${initialMessagesLength + index}:`,
//             message
//           );

//           if (message.sender && message.sender.startsWith("Dr")) {
//             sendEmailToParent(
//               appointmentData.ParentEmail,
//               appointmentData.DoctorName,
//               appointmentData.ParentName,
//               appointmentHash,
//               message
//             );
//           } else {
//             sendEmailToDoctor(
//               appointmentData.DoctorEmail,
//               appointmentData.DoctorName,
//               appointmentData.ParentName,
//               appointmentHash,
//               message
//             );
//           }
//         });
//         initialMessagesLength = messages.length;
//       } else {
//         console.log(`No new messages in appointment ${appointmentHash}`);
//       }
//     } else {
//       console.log(`El appointment con hash ${appointmentHash} no existe`);
//     }
//   });
// }

// // Función para enviar un correo al cliente
// function sendEmailToParent(
//   parentEmail,
//   doctorName,
//   parentName,
//   appointmentHash,
//   message
// ) {
//   let EMAILFORPATIENT = `<!DOCTYPE html>
//   <html xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office" lang="en">
//   <head>
//     <title></title>
//     <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
//     <meta name="viewport" content="width=device-width, initial-scale=1.0">
//     <link href="https://fonts.googleapis.com/css?family=Lato" rel="stylesheet" type="text/css">
//     <style>
//       * { box-sizing: border-box; }
//       body { margin: 0; padding: 0; }
//       a[x-apple-data-detectors] { color: inherit !important; text-decoration: inherit !important; }
//       #MessageViewBody a { color: inherit; text-decoration: none; }
//       p { line-height: inherit }
//       .desktop_hide, .desktop_hide table { mso-hide: all; display: none; max-height: 0px; overflow: hidden; }
//       .image_block img+div { display: none; }
//       sup, sub { line-height: 0; font-size: 75%; }
//       @media (max-width:660px) {
//         .desktop_hide table.icons-inner, .social_block.desktop_hide .social-table {
//           display: inline-block !important;
//         }
//         .icons-inner { text-align: center; }
//         .icons-inner td { margin: 0 auto; }
//         .mobile_hide { display: none; }
//         .row-content { width: 100% !important; }
//         .stack .column { width: 100%; display: block; }
//         .mobile_hide { min-height: 0; max-height: 0; max-width: 0; overflow: hidden; font-size: 0px; }
//         .desktop_hide, .desktop_hide table { display: table !important; max-height: none !important; }
//       }
//     </style>
//   </head>
//   <body class="body" style="background-color: #c5f1fc; margin: 0; padding: 0; -webkit-text-size-adjust: none; text-size-adjust: none;">
//     <table class="nl-container" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #c5f1fc;">
//       <tbody>
//         <tr>
//           <td>
//             <table class="row row-1" align="center" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
//               <tbody>
//                 <tr>
//                   <td>
//                     <table class="row-content stack" align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; color: #000000; width: 640px; margin: 0 auto;" width="640">
//                       <tbody>
//                         <tr>
//                           <td class="column column-1" width="100%" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; padding-bottom: 5px; padding-top: 5px; vertical-align: top; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;">
//                             <div class="spacer_block block-1" style="height:50px;line-height:50px;font-size:1px;">&#8202;</div>
//                           </td>
//                         </tr>
//                       </tbody>
//                     </table>
//                   </td>
//                 </tr>
//               </tbody>
//             </table>
//             <table class="row row-2" align="center" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
//               <tbody>
//                 <tr>
//                   <td>
//                     <table class="row-content stack" align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #ffffff; color: #000000; width: 640px; margin: 0 auto;" width="640">
//                       <tbody>
//                         <tr>
//                           <td class="column column-1" width="100%" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; vertical-align: top; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;">
//                             <table class="image_block block-1" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
//                               <tr>
//                                 <td class="pad" style="width:100%;">
//                                   <div class="alignment" align="center" style="line-height:10px">
//                                     <div style="max-width: 640px;"><img src="https://i.ibb.co/GTpgnRP/new-message.png" style="display: block; height: auto; border: 0; width: 100%;" width="640" alt="Dog Banner" title="Dog Banner" height="auto"></div>
//                                   </div>
//                                 </td>
//                               </tr>
//                             </table>
//                           </td>
//                         </tr>
//                       </tbody>
//                     </table>
//                   </td>
//                 </tr>
//               </tbody>
//             </table>
//             <table class="row row-3" align="center" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
//               <tbody>
//                 <tr>
//                   <td>
//                     <table class="row-content stack" align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; border-radius: 0; color: #000000; width: 640px; margin: 0 auto;" width="640">
//                       <tbody>
//                         <tr>
//                           <td class="column column-1" width="100%" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; background-color: #ffffff; padding-bottom: 5px; padding-top: 5px; vertical-align: top; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;">
//                             <table class="heading_block block-1" width="100%" border="0" cellpadding="10" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
//                               <tr>
//                                 <td class="pad">
//                                   <h1 style="margin: 0; color: #7747FF; direction: ltr; font-family: Lato, Tahoma, Verdana, Segoe, sans-serif; font-size: 38px; font-weight: 700; letter-spacing: normal; line-height: 120%; text-align: left; margin-top: 0; margin-bottom: 0; mso-line-height-alt: 45.6px;">
//                                     <span style="word-break: break-word; color: #000000;"><strong>Dear ${parentName}</strong></span>
//                                   </h1>
//                                 </td>
//                               </tr>
//                             </table>
//                           </td>
//                         </tr>
//                       </tbody>
//                     </table>
//                   </td>
//                 </tr>
//               </tbody>
//             </table>
//             <table class="row row-4" align="center" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
//               <tbody>
//                 <tr>
//                   <td>
//                     <table class="row-content stack" align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; border-radius: 0; color: #000000; width: 640px; margin: 0 auto;" width="640">
//                       <tbody>
//                         <tr>
//                           <td class="column column-1" width="100%" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; background-color: #ffffff; padding-bottom: 5px; padding-top: 5px; vertical-align: top; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;">
//                             <table class="paragraph_block block-1" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;">
//                               <tr>
//                                 <td class="pad" style="padding-bottom:10px;padding-left:20px;padding-right:20px;padding-top:10px;">
//                                   <div style="color:#555555;font-family:Lato, Tahoma, Verdana, Segoe, sans-serif;font-size:14px;line-height:120%;text-align:left;mso-line-height-alt:16.8px;">
//                                     <p style="margin: 0; word-break: break-word;">We hope you and your pet are doing well.</p>
//                                     <p style="margin: 0; word-break: break-word;">&nbsp;</p>
//                                     <p style="margin: 0; word-break: break-word;">You have received a new message from your veterinarian at Rex Vets. To view your message and any related recommendations or treatment plans, please log in to your Rex Vets account using the link below:</p>
//                                     <p style="margin: 0; word-break: break-word;">&nbsp;</p>
//                                     <p style="margin: 0; word-break: break-word;"><strong><a href="https://www.rexvets.com/AppointmentsPetParents" target="_blank">Your Appointments</a></strong></p>
//                                     <p style="margin: 0; word-break: break-word;">&nbsp;</p>
//                                     <p style="margin: 0; word-break: break-word;">If you have any questions or concerns, feel free to reach out to us through your account or by replying to this email. We're here to support you and your pet's health every step of the way!</p>
//                                     <p style="margin: 0; word-break: break-word;">&nbsp;</p>
//                                     <p style="margin: 0; word-break: break-word;">Thank you for trusting Rex Vets with your pet's care.</p>
//                                     <p style="margin: 0; word-break: break-word;">&nbsp;</p>
//                                     <p style="margin: 0; word-break: break-word;">Best regards,<br><strong>The Rex Vets Team</strong></p>
//                                   </div>
//                                 </td>
//                               </tr>
//                             </table>
//                             <table class="button_block block-2" width="100%" border="0" cellpadding="10" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
//                               <tr>
//                                 <td class="pad">
//                                   <div class="alignment" align="center">
//                                     <a href="https://www.rexvets.com/AppointmentsPetParents" target="_blank" style="background-color:#002366;border-bottom:0px solid transparent;border-left:0px solid transparent;border-radius:10px;border-right:0px solid transparent;border-top:0px solid transparent;color:#ffffff;display:inline-block;font-family:'Lato', Tahoma, Verdana, Segoe, sans-serif;font-size:16px;font-weight:undefined;mso-border-alt:none;padding-bottom:5px;padding-top:5px;text-align:center;text-decoration:none;width:auto;word-break:keep-all;">
//                                       <span style="word-break: break-word; padding-left: 20px; padding-right: 20px; font-size: 16px; display: inline-block; letter-spacing: normal;">
//                                         <strong>VIEW APPOINTMENTS</strong>
//                                       </span>
//                                     </a>
//                                   </div>
//                                 </td>
//                               </tr>
//                             </table>
//                             <table class="paragraph_block block-3" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;">
//                               <tr>
//                                 <td class="pad" style="padding-bottom:10px;padding-left:20px;padding-right:20px;padding-top:10px;">
//                                   <div style="color:#555555;font-family:Lato, Tahoma, Verdana, Segoe, sans-serif;font-size:14px;line-height:120%;text-align:left;mso-line-height-alt:16.8px;">&nbsp;</div>
//                                 </td>
//                               </tr>
//                             </table>
//                           </td>
//                         </tr>
//                       </tbody>
//                     </table>
//                   </td>
//                 </tr>
//               </tbody>
//             </table>
//             <table class="row row-5" align="center" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
//               <tbody>
//                 <tr>
//                   <td>
//                   <table class="row-content stack" align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #00b3d3; background-position: center top; color: #000000; width: 640px; margin: 0 auto;" width="640">
//                   <tbody>
//                     <tr>
//                       <td class="column column-1" width="100%" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; background-color: #002366; padding-bottom: 5px; padding-top: 5px; vertical-align: top; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;">
//                         <table class="image_block block-1" width="100%" border="0" cellpadding="10" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
//                           <tr>
//                             <td class="pad">
//                               <div class="alignment" align="center" style="line-height:10px">
//                                 <div style="max-width: 620px;"><a href="https://www.rexvets.com" target="_blank" style="outline:none" tabindex="-1"><img src="https://i.ibb.co/3CZBJyh/5bfa.png" style="display: block; height: auto; border: 0; width: 100%;" width="620" alt="Your Logo" title="Your Logo" height="auto"></a></div>
//                               </div>
//                             </td>
//                           </tr>
//                         </table>
//                             <table class="social_block block-2" width="100%" border="0" cellpadding="10" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
//                               <tr>
//                                 <td class="pad">
//                                   <div class="alignment" align="center">
//                                     <table class="social-table" width="92px" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; display: inline-block;">
//                                       <tr>
//                                         <td style="padding:0 7px 0 7px;"><a href="https://www.facebook.com/rexvets" target="_blank"><img src="https://app-rsrc.getbee.io/public/resources/social-networks-icon-sets/t-circle-white/facebook@2x.png" width="32" height="auto" alt="Facebook" title="Facebook" style="display: block; height: auto; border: 0;"></a></td>
//                                         <td style="padding:0 7px 0 7px;"><a href="https://www.instagram.com/rexvets" target="_blank"><img src="https://app-rsrc.getbee.io/public/resources/social-networks-icon-sets/t-circle-white/instagram@2x.png" width="32" height="auto" alt="Instagram" title="Instagram" style="display: block; height: auto; border: 0;"></a></td>
//                                       </tr>
//                                     </table>
//                                   </div>
//                                 </td>
//                               </tr>
//                             </table>
//                             <table class="paragraph_block block-3" width="100%" border="0" cellpadding="10" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;">
//                               <tr>
//                                 <td class="pad">
//                                   <div style="color:#555555;font-family:Lato, Tahoma, Verdana, Segoe, sans-serif;font-size:14px;line-height:120%;text-align:center;mso-line-height-alt:16.8px;">
//                                     <p style="margin: 0; word-break: break-word;"><span style="word-break: break-word; color: #ffffff;"><strong>Rex Vets </strong>is a <strong>non-profit organization</strong>, and our efforts are sustained by the generosity of our donors. If you would like to support our mission with a donation, we would be deeply grateful. You can make a contribution through <strong><a href="https://www.rexvets.com/PetParents" target="_blank" style="color: #ffffff;">the following link</a></strong></span></p>
//                                   </div>
//                                 </td>
//                               </tr>
//                             </table>
//                             <div class="spacer_block block-4" style="height:30px;line-height:30px;font-size:1px;">&#8202;</div>
//                           </td>
//                         </tr>
//                       </tbody>
//                     </table>
//                   </td>
//                 </tr>
//               </tbody>
//             </table>
//           </td>
//         </tr>
//       </tbody>
//     </table>
//     </div>
//   </body>
//   </html>`;
//   const mailOptions = {
//     from: "support@rexvets.com",
//     to: parentEmail,
//     subject: "You Have a New Message from Your Veterinarian",

//     html: EMAILFORPATIENT,
//   };

//   transporter.sendMail(mailOptions, (error, info) => {
//     if (error) {
//       return console.error(`Error al enviar el correo: ${error}`);
//     }
//     console.log(`Correo enviado: ${info.response}`);
//   });
// }

// // Función para enviar un correo al doctor
// function sendEmailToDoctor(
//   doctorEmail,
//   doctorName,
//   parentName
//   // appointmentHash,
//   // message
// ) {
//   let EMAILFORDOCTORS = `<!DOCTYPE html>
//   <html xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office" lang="en">
//   <head>
//     <title></title>
//     <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
//     <meta name="viewport" content="width=device-width, initial-scale=1.0">
//     <link href="https://fonts.googleapis.com/css?family=Lato" rel="stylesheet" type="text/css">
//     <style>
//       * { box-sizing: border-box; }
//       body { margin: 0; padding: 0; }
//       a[x-apple-data-detectors] { color: inherit !important; text-decoration: inherit !important; }
//       #MessageViewBody a { color: inherit; text-decoration: none; }
//       p { line-height: inherit }
//       .desktop_hide, .desktop_hide table { mso-hide: all; display: none; max-height: 0px; overflow: hidden; }
//       .image_block img+div { display: none; }
//       sup, sub { line-height: 0; font-size: 75%; }
//       @media (max-width:660px) {
//         .desktop_hide table.icons-inner, .social_block.desktop_hide .social-table {
//           display: inline-block !important;
//         }
//         .icons-inner { text-align: center; }
//         .icons-inner td { margin: 0 auto; }
//         .mobile_hide { display: none; }
//         .row-content { width: 100% !important; }
//         .stack .column { width: 100%; display: block; }
//         .mobile_hide { min-height: 0; max-height: 0; max-width: 0; overflow: hidden; font-size: 0px; }
//         .desktop_hide, .desktop_hide table { display: table !important; max-height: none !important; }
//       }
//     </style>
//   </head>
//   <body class="body" style="background-color: #c5f1fc; margin: 0; padding: 0; -webkit-text-size-adjust: none; text-size-adjust: none;">
//     <table class="nl-container" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #c5f1fc;">
//       <tbody>
//         <tr>
//           <td>
//             <table class="row row-1" align="center" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
//               <tbody>
//                 <tr>
//                   <td>
//                     <table class="row-content stack" align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; color: #000000; width: 640px; margin: 0 auto;" width="640">
//                       <tbody>
//                         <tr>
//                           <td class="column column-1" width="100%" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; padding-bottom: 5px; padding-top: 5px; vertical-align: top; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;">
//                             <div class="spacer_block block-1" style="height:50px;line-height:50px;font-size:1px;">&#8202;</div>
//                           </td>
//                         </tr>
//                       </tbody>
//                     </table>
//                   </td>
//                 </tr>
//               </tbody>
//             </table>
//             <table class="row row-2" align="center" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
//               <tbody>
//                 <tr>
//                   <td>
//                     <table class="row-content stack" align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #ffffff; color: #000000; width: 640px; margin: 0 auto;" width="640">
//                       <tbody>
//                         <tr>
//                           <td class="column column-1" width="100%" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; vertical-align: top; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;">
//                             <table class="image_block block-1" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
//                               <tr>
//                                 <td class="pad" style="width:100%;">
//                                   <div class="alignment" align="center" style="line-height:10px">
//                                     <div style="max-width: 640px;"><img src="https://i.ibb.co/GTpgnRP/new-message.png" style="display: block; height: auto; border: 0; width: 100%;" width="640" alt="Dog Banner" title="Dog Banner" height="auto"></div>
//                                   </div>
//                                 </td>
//                               </tr>
//                             </table>
//                           </td>
//                         </tr>
//                       </tbody>
//                     </table>
//                   </td>
//                 </tr>
//               </tbody>
//             </table>
//             <table class="row row-3" align="center" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
//               <tbody>
//                 <tr>
//                   <td>
//                     <table class="row-content stack" align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; border-radius: 0; color: #000000; width: 640px; margin: 0 auto;" width="640">
//                       <tbody>
//                         <tr>
//                           <td class="column column-1" width="100%" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; background-color: #ffffff; padding-bottom: 5px; padding-top: 5px; vertical-align: top; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;">
//                             <table class="heading_block block-1" width="100%" border="0" cellpadding="10" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
//                               <tr>
//                                 <td class="pad">
//                                   <h1 style="margin: 0; color: #7747FF; direction: ltr; font-family: Lato, Tahoma, Verdana, Segoe, sans-serif; font-size: 20px; font-weight: 700; letter-spacing: normal; line-height: 120%; text-align: left; margin-top: 0; margin-bottom: 0; mso-line-height-alt: 45.6px;">
//                                     <span style="word-break: break-word; color: #000000;"><strong>Hello ${doctorName}</strong></span>
//                                   </h1>
//                                 </td>
//                               </tr>
//                             </table>
//                           </td>
//                         </tr>
//                       </tbody>
//                     </table>
//                   </td>
//                 </tr>
//               </tbody>
//             </table>
//             <table class="row row-4" align="center" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
//               <tbody>
//                 <tr>
//                   <td>
//                     <table class="row-content stack" align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; border-radius: 0; color: #000000; width: 640px; margin: 0 auto;" width="640">
//                       <tbody>
//                         <tr>
//                           <td class="column column-1" width="100%" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; background-color: #ffffff; padding-bottom: 5px; padding-top: 5px; vertical-align: top; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;">
//                             <table class="paragraph_block block-1" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;">
//                               <tr>
//                                 <td class="pad" style="padding-bottom:10px;padding-left:20px;padding-right:20px;padding-top:10px;">
//                                   <div style="color:#555555;font-family:Lato, Tahoma, Verdana, Segoe, sans-serif;font-size:14px;line-height:120%;text-align:left;mso-line-height-alt:16.8px;">
//                                     <p style="margin: 0; word-break: break-word;">You have received a new message from your client, ${parentName}. Please log in to your Rex Vets account to review and respond.</p>
//                                     <p style="margin: 0; word-break: break-word;">&nbsp;</p>
//                                     <p style="margin: 0; word-break: break-word;"><strong><a href="https://www.rexvets.com/AppointmentsVetsandTechs" target="_blank">Your Appointments</a></strong></p>
//                                     <p style="margin: 0; word-break: break-word;">&nbsp;</p>
//                                     <p style="margin: 0; word-break: break-word;">Thank you,,<br><strong>The Rex Vets Team</strong></p>
//                                   </div>
//                                 </td>
//                               </tr>
//                             </table>
//                             <table class="button_block block-2" width="100%" border="0" cellpadding="10" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
//                               <tr>
//                                 <td class="pad">
//                                   <div class="alignment" align="center">
//                                     <a href="https://www.rexvets.com/AppointmentsVetsandTechs" target="_blank" style="background-color:#002366;border-bottom:0px solid transparent;border-left:0px solid transparent;border-radius:10px;border-right:0px solid transparent;border-top:0px solid transparent;color:#ffffff;display:inline-block;font-family:'Lato', Tahoma, Verdana, Segoe, sans-serif;font-size:16px;font-weight:undefined;mso-border-alt:none;padding-bottom:5px;padding-top:5px;text-align:center;text-decoration:none;width:auto;word-break:keep-all;">
//                                       <span style="word-break: break-word; padding-left: 20px; padding-right: 20px; font-size: 16px; display: inline-block; letter-spacing: normal;">
//                                         <strong>VIEW APPOINTMENTS</strong>
//                                       </span>
//                                     </a>
//                                   </div>
//                                 </td>
//                               </tr>
//                             </table>
//                             <table class="paragraph_block block-3" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;">
//                               <tr>
//                                 <td class="pad" style="padding-bottom:10px;padding-left:20px;padding-right:20px;padding-top:10px;">
//                                   <div style="color:#555555;font-family:Lato, Tahoma, Verdana, Segoe, sans-serif;font-size:14px;line-height:120%;text-align:left;mso-line-height-alt:16.8px;">&nbsp;</div>
//                                 </td>
//                               </tr>
//                             </table>
//                           </td>
//                         </tr>
//                       </tbody>
//                     </table>
//                   </td>
//                 </tr>
//               </tbody>
//             </table>
//             <table class="row row-5" align="center" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
//               <tbody>
//                 <tr>
//                   <td>
//                   <table class="row-content stack" align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #00b3d3; background-position: center top; color: #000000; width: 640px; margin: 0 auto;" width="640">
//                   <tbody>
//                     <tr>
//                       <td class="column column-1" width="100%" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; background-color: #002366; padding-bottom: 5px; padding-top: 5px; vertical-align: top; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;">
//                         <table class="image_block block-1" width="100%" border="0" cellpadding="10" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
//                           <tr>
//                             <td class="pad">
//                               <div class="alignment" align="center" style="line-height:10px">
//                                 <div style="max-width: 620px;"><a href="https://www.rexvets.com" target="_blank" style="outline:none" tabindex="-1"><img src="https://i.ibb.co/3CZBJyh/5bfa.png" style="display: block; height: auto; border: 0; width: 100%;" width="620" alt="Your Logo" title="Your Logo" height="auto"></a></div>
//                               </div>
//                             </td>
//                           </tr>
//                         </table>
//                             <table class="social_block block-2" width="100%" border="0" cellpadding="10" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
//                               <tr>
//                                 <td class="pad">
//                                   <div class="alignment" align="center">
//                                     <table class="social-table" width="92px" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; display: inline-block;">
//                                       <tr>
//                                         <td style="padding:0 7px 0 7px;"><a href="https://www.facebook.com/rexvets" target="_blank"><img src="https://app-rsrc.getbee.io/public/resources/social-networks-icon-sets/t-circle-white/facebook@2x.png" width="32" height="auto" alt="Facebook" title="Facebook" style="display: block; height: auto; border: 0;"></a></td>
//                                         <td style="padding:0 7px 0 7px;"><a href="https://www.instagram.com/rexvets" target="_blank"><img src="https://app-rsrc.getbee.io/public/resources/social-networks-icon-sets/t-circle-white/instagram@2x.png" width="32" height="auto" alt="Instagram" title="Instagram" style="display: block; height: auto; border: 0;"></a></td>
//                                       </tr>
//                                     </table>
//                                   </div>
//                                 </td>
//                               </tr>
//                             </table>
//                             <table class="paragraph_block block-3" width="100%" border="0" cellpadding="10" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;">
//                               <tr>
//                                 <td class="pad">
//                                   <div style="color:#555555;font-family:Lato, Tahoma, Verdana, Segoe, sans-serif;font-size:14px;line-height:120%;text-align:center;mso-line-height-alt:16.8px;">
//                                     <p style="margin: 0; word-break: break-word;"><span style="word-break: break-word; color: #ffffff;"><strong>Rex Vets </strong>is a <strong>non-profit organization</strong>, and our efforts are sustained by the generosity of our donors. If you would like to support our mission with a donation, we would be deeply grateful. You can make a contribution through <strong><a href="https://www.rexvets.com/PetParents" target="_blank" style="color: #ffffff;">the following link</a></strong></span></p>
//                                   </div>
//                                 </td>
//                               </tr>
//                             </table>
//                             <div class="spacer_block block-4" style="height:30px;line-height:30px;font-size:1px;">&#8202;</div>
//                           </td>
//                         </tr>
//                       </tbody>
//                     </table>
//                   </td>
//                 </tr>
//               </tbody>
//             </table>
//           </td>
//         </tr>
//       </tbody>
//     </table>
//     </div>
//   </body>
//   </html>`;
//   const mailOptions = {
//     from: "support@rexvets.com",
//     to: doctorEmail,
//     subject: `You Have a New Message from Your Client ${parentName}`,

//     html: EMAILFORDOCTORS,
//   };
//   //test
//   transporter.sendMail(mailOptions, (error, info) => {
//     if (error) {
//       return console.error(`Error al enviar el correo al doctor: ${error}`);
//     }
//     console.log(`Correo enviado al doctor: ${info.response}`);
//   });
// }

// // Llamar a la función para monitorear mensajes de todos los appointments
// async function trackMessagesForAllAppointments() {
//   try {
//     const snapshot = await db.collection("Appointments").get();
//     snapshot.forEach((doc) => {
//       const appointmentHash = doc.id;
//       trackNewMessagesForAppointment(appointmentHash);
//     });
//   } catch (error) {
//     console.error("Error al obtener los appointments:", error);
//   }
// }

// // Llamada para iniciar el monitoreo de todos los appointments
// trackMessagesForAllAppointments();

// // TEST ENDPOINT FOR REMINDER EMAIL
// app.post("/testReminderEmail", (req, res) => {
//   console.log("Received request for testReminderEmail:", req.body);

//   const {
//     appointmentDate,
//     appointmentTime,
//     parentEmail,
//     parentName,
//     doctorName,
//     doctorEmail,
//     meetingLink,
//   } = req.body;

//   // Validate required fields
//   if (
//     !appointmentDate ||
//     !appointmentTime ||
//     !parentEmail ||
//     !parentName ||
//     !doctorName ||
//     !meetingLink
//   ) {
//     return res.status(400).send({
//       message:
//         "Missing required fields. Required: appointmentDate, appointmentTime, parentEmail, parentName, doctorName, meetingLink",
//     });
//   }

//   try {
//     // Call the scheduleReminderEmail function directly for testing
//     scheduleReminderEmail(
//       appointmentDate,
//       appointmentTime,
//       parentEmail,
//       parentName,
//       doctorName,
//       doctorEmail,
//       meetingLink
//     );

//     res.send({
//       message: "Test reminder email scheduled successfully!",
//       scheduledFor: `10 minutes before ${appointmentDate} ${appointmentTime}`,
//       details: {
//         appointmentDate,
//         appointmentTime,
//         parentEmail,
//         parentName,
//         doctorName,
//         meetingLink,
//       },
//     });

//     console.log("Test reminder email scheduled for:", parentEmail);
//   } catch (error) {
//     console.error("Error scheduling test reminder email:", error);
//     res.status(500).send({
//       message: "Failed to schedule test reminder email",
//       error: error.message,
//     });
//   }
// });

// // Endpoint to send immediate test reminder email (for immediate testing)
// app.post("/testReminderEmailImmediate", (req, res) => {
//   console.log("Received request for testReminderEmailImmediate:", req.body);

//   const { parentEmail, parentName, doctorName, meetingLink } = req.body;

//   // Validate required fields
//   if (!parentEmail || !parentName || !doctorName || !meetingLink) {
//     return res.status(400).send({
//       message:
//         "Missing required fields. Required: parentEmail, parentName, doctorName, meetingLink",
//     });
//   }

//   // Email template for immediate testing
//   let EMAILFORPATIENTTEST = `<!DOCTYPE html>
//     <html xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office" lang="en">
//     <head>
//         <title></title>
//         <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
//         <meta name="viewport" content="width=device-width, initial-scale=1.0">
//         <link href="https://fonts.googleapis.com/css?family=Lato" rel="stylesheet" type="text/css">
//         <style>
//             * { box-sizing: border-box; }
//             body { margin: 0; padding: 0; }
//             a[x-apple-data-detectors] { color: inherit !important; text-decoration: inherit !important; }
//             #MessageViewBody a { color: inherit; text-decoration: none; }
//             p { line-height: inherit }
//             .desktop_hide, .desktop_hide table { mso-hide: all; display: none; max-height: 0px; overflow: hidden; }
//             .image_block img+div { display: none; }
//             sup, sub { line-height: 0; font-size: 75%; }
//             @media (max-width:660px) {
//                 .desktop_hide table.icons-inner, .social_block.desktop_hide .social-table {
//                     display: inline-block !important;
//                 }
//                 .icons-inner { text-align: center; }
//                 .icons-inner td { margin: 0 auto; }
//                 .mobile_hide { display: none; }
//                 .row-content { width: 100% !important; }
//                 .stack .column { width: 100%; display: block; }
//                 .mobile_hide { min-height: 0; max-height: 0; max-width: 0; overflow: hidden; font-size: 0px; }
//                 .desktop_hide, .desktop_hide table { display: table !important; max-height: none !important; }
//             }
//         </style>
//     </head>
//     <body class="body" style="background-color: #c5f1fc; margin: 0; padding: 0; -webkit-text-size-adjust: none; text-size-adjust: none;">
//         <div style="padding: 20px; background-color: #f0f0f0; font-family: Lato, sans-serif;">
//             <div style="max-width: 600px; margin: 0 auto; background-color: white; padding: 20px; border-radius: 10px;">
//                 <h1 style="color: #000000;">🧪 TEST REMINDER EMAIL</h1>
//                 <h2 style="color: #000000;">Dear ${parentName}</h2>
//                 <p>This is a <strong>TEST</strong> reminder email for your upcoming video call appointment with <strong>${doctorName}</strong> at Rex Vets.</p>
//                 <p>In a real scenario, this email would be sent 10 minutes before your appointment.</p>
//                 <p><strong>Meeting Link:</strong> <a href="${meetingLink}" target="_blank">${meetingLink}</a></p>
//                 <div style="text-align: center; margin: 20px 0;">
//                     <a href="${meetingLink}" target="_blank" style="background-color:#002366;color:#ffffff;padding:10px 20px;text-decoration:none;border-radius:5px;display:inline-block;">
//                         <strong>JOIN TEST MEETING</strong>
//                     </a>
//                 </div>
//                 <p style="font-size: 12px; color: #666; margin-top: 30px;">
//                     ⚠️ This is a test email sent for development purposes.
//                     <br>Timestamp: ${new Date().toISOString()}
//                 </p>
//             </div>
//         </div>
//     </body>
//     </html>`;

//   const mailOptions = {
//     from: "support@rexvets.com",
//     to: parentEmail,
//     subject: "🧪 TEST - Appointment Reminder - Rex Vets",
//     html: EMAILFORPATIENTTEST,
//   };

//   transporter.sendMail(mailOptions, (error, info) => {
//     if (error) {
//       console.log("Error sending test reminder email:", error);
//       return res.status(500).send({
//         message: "Failed to send test reminder email",
//         error: error.message,
//       });
//     }
//     console.log("Test reminder email sent:", info.response);
//     res.send({
//       message: "Test reminder email sent immediately!",
//       emailSentTo: parentEmail,
//       details: {
//         parentName,
//         doctorName,
//         meetingLink,
//         sentAt: new Date().toISOString(),
//       },
//     });
//   });
// });

// // trackAllAppointments();
// // Iniciar el servidor
// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
//   console.log("Email server started and ready.");
// });
