export const rescheduleConfirmationParentTemplate = (
  parentName,
  doctorName,
  petName,
  oldDate,
  oldTime,
  appointmentDate,
  userDisplayTime,
  meetingLink
) => `
          <div style="background-color: #c5f1fc; padding: 0; text-align: center; width: 100%;">
            <img src="https://res.cloudinary.com/di6zff0rd/image/upload/v1748961858/emailtemp1_sv6jxx.jpg" alt="Top Banner" style="display: block; height: auto; border: 0; width: 100%;" />
          </div>
        
          <p>Dear ${parentName},</p>
        
          <p>Your video call appointment with <strong>Dr. ${doctorName}</strong> at Rex Vets for <strong>${petName}</strong> has been <strong>rescheduled</strong>.</p>
        
          ${
            oldDate
              ? `<p><strong>Previous Time:</strong>${oldDate} at ${oldTime}</p>`
              : ""
          }
        
          <p><strong>New Start Time:</strong> ${appointmentDate} at ${userDisplayTime}</p>
          <p><strong>Veterinarian:</strong> Dr. ${doctorName}</p>
          <p><strong>Pet Name:</strong> ${petName}</p>
        
          <div style="text-align: center; margin: 20px 0;">
            <a href="${meetingLink}" style="background-color: #002366; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; display: inline-block; font-weight: bold;">
              Join Your Appointment
            </a>
          </div>
        
          <p style="text-align: center; word-break: break-all; color: #666;">
            Or copy and paste this link in your browser:<br/> ${meetingLink}
          </p>
        
          <p>Please make sure you're ready and in a quiet place a few minutes before your scheduled time.</p>
        
          <p>If you need to change your appointment again or have any questions, reply to this email or contact our team at <a href="mailto:support@rexvets.com">support@rexvets.com</a>.</p>
        
          <p>We look forward to helping ${petName} feel their best!</p>
        
          <p>Warm regards,<br>The Team at Rex Vets</p>
        
          <div style="background-color: #002366; padding: 10px; text-align: center;">
            <img src="https://res.cloudinary.com/di6zff0rd/image/upload/v1747926532/Logo_debjuj.png" alt="Rex Vets Logo" width="150" style="display: block; margin: 0 auto;" />
          </div>
        `;

export const donationThankYouTemplate = (
  name,
  donationAmount,
  isRecurring,
  badgeName,
  donationDate,
  paymentMethod,
  serviceValue,
  taxDeductibleAmount
) => {
  const recurringText = isRecurring
    ? "Your recurring monthly donation will help us provide continuous care to pets in need."
    : "Your one-time donation makes an immediate impact on the lives of pets and their families.";

  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Donation Thank You - Rex Vets</title>
    </head>
    <body style="margin: 0; padding: 20px; font-family: Arial, sans-serif; background-color: #c5f1fc;">
      
      <div style="max-width: 600px; margin: 0 auto; background-color: white; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
        
        <!-- Header Banner -->
        <div style="background-color: #c5f1fc; padding: 0; text-align: center; width: 100%;">
          <img src="https://res.cloudinary.com/di6zff0rd/image/upload/v1748961858/emailtemp1_sv6jxx.jpg" alt="Top Banner" style="display: block; height: auto; border: 0; width: 100%;" />
        </div>

        <!-- Thank You Header -->
        <div style="background: linear-gradient(135deg, #002366 0%, #1e3a8a 100%); color: white; padding: 30px 20px; text-align: center;">
          <h1 style="margin: 0; font-size: 28px; font-weight: bold;">Thank You for Your Donation!</h1>
          <p style="margin: 10px 0 0 0; font-size: 16px; opacity: 0.9;">Rex Vets - 501(c)(3) Non-Profit Organization</p>
          <p style="margin: 5px 0 0 0; font-size: 14px; opacity: 0.8;">EIN: 12-3456789</p>
        </div>

        <!-- Content -->
        <div style="padding: 30px 20px;">
          
          <!-- Personal Greeting -->
          <div style="margin-bottom: 25px;">
            <h2 style="color: #002366; font-size: 24px; margin-bottom: 10px;">Dear ${name},</h2>
            <p style="color: #374151; font-size: 16px; line-height: 1.6; margin: 0;">
              We are incredibly grateful for your generous donation to Rex Vets. Your support makes a real difference in the lives of pets and their families.
            </p>
          </div>
          
          <!-- Donation Summary -->
          <div style="background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 20px; margin-bottom: 25px;">
            <h3 style="color: #002366; font-size: 20px; margin-bottom: 15px; border-bottom: 2px solid #002366; padding-bottom: 8px;">Donation Receipt</h3>
            
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px; border-bottom: 1px solid #e5e7eb; padding-bottom: 8px;">
              <span style="color: #6b7280; font-size: 16px; font-weight: 500;">Donation Amount:</span>
              <span style="color: #059669; font-size: 24px; font-weight: bold;">$${parseFloat(
                donationAmount
              ).toFixed(2)}</span>
            </div>
            
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px; border-bottom: 1px solid #e5e7eb; padding-bottom: 8px;">
              <span style="color: #6b7280; font-size: 16px; font-weight: 500;">Date:</span>
              <span style="color: #374151; font-size: 16px; font-weight: 600;">${
                donationDate || new Date().toLocaleDateString()
              }</span>
            </div>
            
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px; border-bottom: 1px solid #e5e7eb; padding-bottom: 8px;">
              <span style="color: #6b7280; font-size: 16px; font-weight: 500;">Payment Method:</span>
              <span style="color: #374151; font-size: 16px; font-weight: 600;">${
                paymentMethod || "Not specified"
              }</span>
            </div>
            
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 15px;">
              <span style="color: #6b7280; font-size: 16px; font-weight: 500;">Receipt #:</span>
              <span style="color: #374151; font-size: 16px; font-weight: 600;">RX-${
                donationDate
                  ? donationDate.replace(/[^0-9]/g, "")
                  : new Date().getTime()
              }</span>
            </div>
            
            ${
              isRecurring
                ? '<div style="background-color: #ecfeff; border: 1px solid #06b6d4; border-radius: 6px; padding: 12px; margin-top: 15px;"><p style="color: #0891b2; font-style: italic; margin: 0; font-size: 14px; font-weight: 500;">✓ Recurring Monthly Donation</p></div>'
                : ""
            }
          </div>

          <!-- Impact Message -->
          <div style="background: linear-gradient(135deg, #ecfeff 0%, #f0f9ff 100%); border-left: 4px solid #002366; padding: 20px; border-radius: 8px; margin-bottom: 25px;">
            <h3 style="color: #002366; margin-top: 0; font-size: 18px; font-weight: bold;">Your Impact</h3>
            <p style="color: #374151; margin: 10px 0; line-height: 1.6; font-size: 16px;">${recurringText}</p>
            <p style="color: #374151; margin: 10px 0; line-height: 1.6; font-size: 16px;">Every dollar you contribute helps us provide essential veterinary care to pets in need and supports families who might otherwise be unable to afford medical treatment for their beloved animals.</p>
          </div>

          <!-- Tax Information -->
          <div style="background-color: #fef3c7; border: 1px solid #f59e0b; border-radius: 8px; padding: 15px; margin-bottom: 25px;">
            <p style="color: #92400e; margin: 0; font-size: 14px; line-height: 1.5; font-weight: 500;">
              <strong>Tax Deductible:</strong> This donation is tax-deductible to the full extent allowed by law. 
              Rex Vets is a 501(c)(3) non-profit organization. Please keep this receipt for your tax records.
            </p>
          </div>

          <!-- Contact Information -->
          <div style="text-align: center; padding: 20px 0; border-top: 1px solid #e5e7eb;">
            <p style="color: #6b7280; margin: 5px 0; font-size: 14px;">Questions about your donation?</p>
            <p style="color: #002366; margin: 5px 0; font-size: 14px; font-weight: 500;">
              Email: <a href="mailto:support@rexvets.com" style="color: #002366; text-decoration: none;">support@rexvets.com</a> | 
              Phone: <a href="tel:+11234567890" style="color: #002366; text-decoration: none;">(123) 456-7890</a>
            </p>
            <p style="color: #6b7280; margin: 15px 0 5px 0; font-size: 12px;">123 Animal Care Drive, Miami, Florida 33101</p>
            <p style="color: #6b7280; margin: 5px 0; font-size: 12px;">www.rexvets.com</p>
          </div>

        </div>

        <!-- Footer with Logo -->
        <div style="background-color: #002366; padding: 20px; text-align: center;">
          <img src="https://res.cloudinary.com/di6zff0rd/image/upload/v1747926532/Logo_debjuj.png" alt="Rex Vets Logo" width="150" style="display: block; margin: 0 auto 15px auto;" />
          <p style="margin: 0; font-size: 14px; opacity: 0.9; color: white;">Thank you for supporting Rex Vets!</p>
          <p style="margin: 5px 0 0 0; font-size: 12px; opacity: 0.7; color: white;">Making veterinary care accessible to all pets and families.</p>
        </div>

      </div>
    </body>
    </html>
  `;
};

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
                                    <span style="word-break: break-word; color: #000000;"><strong>Hello ${doctorName}</strong></span>,
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
                                    <p style="margin: 0; word-break: break-word;">Thank you,<br><strong>The Rex Vets Team</strong></p>
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
