export const welcomeEmailTemplate = (name) => `
            <h1>Welcome to Rex Vets!</h1>
            <p>Dear ${name},</p>
            <p>Welcome to Rex Vets and thank you for choosing us for your pet's healthcare needs. We're thrilled to have you on board and look forward to helping you and your furry friend live happier, healthier lives.</p>
            <p>You're now part of a community of pet lovers who are committed to providing the best care for their pets. To schedule your first video call with one of our experienced veterinarians, simply visit the 'Home' tab in your account and click 'Book a video call', and you'll be on your way to a virtual appointment.</p>
            <p>If you have any questions or need assistance at any point along the way, please don't hesitate to reach out to our dedicated support team at support@rexvets.com. We're here to make your experience with Rex Vets as seamless and enjoyable as possible.</p>
            <p>Thank you once again for choosing Rex Vets. We can't wait to assist you in providing the best possible care for your pet.</p>
            <p>Warm regards,<br>The Team at Rex Vets</p>
            
            <!-- Add logo here -->
            <div style="background-color: #002366; padding: 10px; text-align: center;">
                <img src="https://www.rexvets.com/static/media/Logo.c536919c80b8ff104089.png" alt="Rex Vets Logo" width="150" style="display: block; margin: 0 auto;" />
            </div>
        `;

export const bookingConfirmationDoctorTemplate = (
  doctorName,
  parentName,
  appointmentDate,
  appointmentTime,
  petName,
  meetingLink
) => `
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
            <div style="background-color: #002366; padding: 10px; text-align: center;">
                <img src="https://www.rexvets.com/static/media/Logo.c536919c80b8ff104089.png" alt="Rex Vets Logo" width="150" style="display: block; margin: 0 auto;" />
            </div>
        `;

export const bookingConfirmationParentTemplate = (
  parentName,
  doctorName,
  appointmentDate,
  appointmentTime,
  petName,
  meetingLink
) => `
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
            <div style="background-color: #002366; padding: 10px; text-align: center;">
                <img src="https://www.rexvets.com/static/media/Logo.c536919c80b8ff104089.png" alt="Rex Vets Logo" width="150" style="display: block; margin: 0 auto;" />
            </div>
        `;

export const reminderParentTemplate = (
  parentName,
  doctorName,
  appointmentDate,
  appointmentTime,
  meetingLink
) => `
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
    <div style="background-color: #002366; padding: 10px; text-align: center;">
        <img src="https://www.rexvets.com/static/media/Logo.c536919c80b8ff104089.png" alt="Rex Vets Logo" width="150" style="display: block; margin: 0 auto;" />
    </div>
  `;

export const reminderDoctorTemplate = (
  doctorName,
  parentName,
  appointmentDate,
  appointmentTime,
  meetingLink
) => `
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
    <div style="background-color: #002366; padding: 10px; text-align: center;">
        <img src="https://www.rexvets.com/static/media/Logo.c536919c80b8ff104089.png" alt="Rex Vets Logo" width="150" style="display: block; margin: 0 auto;" />
    </div>
  `;

export const donationThankYouTemplate = (
  name,
  donationAmount,
  isRecurring,
  badgeName
) => {
  const recurringText = isRecurring
    ? "Your recurring monthly donation will help us provide continuous care to pets in need."
    : "Your one-time donation makes an immediate impact on the lives of pets and their families.";

  return `
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
            <div style="background-color: #002366; padding: 10px; text-align: center;">
                <img src="https://www.rexvets.com/static/media/Logo.c536919c80b8ff104089.png" alt="Rex Vets Logo" width="150" style="display: block; margin: 0 auto;" />
            </div>
        `;
};

export const messageToParentTemplate = (
  parentName,
  doctorName,
  appointmentHash
) => `<!DOCTYPE html>
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

export const messageToDoctorTemplate = (
  doctorName,
  parentName,
  appointmentHash
) => `<!DOCTYPE html>
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
