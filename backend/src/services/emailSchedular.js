import cron from "node-cron";
import Leads from "../models/leads.model.js";
import { adminService } from "../DB_Services/admin.service.js";
import { sendEmail } from "../utils/sendEmail.js";

const scheduleEmail = () => {
  cron.schedule(
    "30 10 * * *",
    async () => {
      // Start of today (UTC)
      const today = new Date();
      today.setUTCHours(0, 0, 0, 0);

      // Start of tomorrow (UTC)
      const tomorrow = new Date(today);
      tomorrow.setUTCDate(today.getUTCDate() + 1);

      // Get today's follow-up leads
      const leadsToFollowUp = await Leads.find({
        status: "Follow Up",
        followUp: {
          $gte: today,
          $lt: tomorrow,
        },
      });

      if (!leadsToFollowUp.length) {
        console.log("✅ No follow-ups today");
        return;
      }

      //Group leads by admin
      const leadsByAdmin = leadsToFollowUp.reduce((acc, lead) => {
        const adminId = String(lead.admin);

        if (!acc[adminId]) acc[adminId] = [];
        acc[adminId].push(lead);

        return acc;
      }, {});

      //Fetch all admins at once
      const adminIds = Object.keys(leadsByAdmin);

      const admins = await adminService.getByFilter({
        _id: { $in: adminIds },
      });

      const adminMap = Object.fromEntries(
        admins.map((admin) => [String(admin._id), admin]),
      );

      // Send ONE email per admin
      for (const adminId of adminIds) {
        const admin = adminMap[adminId];
        if (!admin?.email) continue;

        const adminLeads = leadsByAdmin[adminId];

        const emailBody = `
          <h2>📌 Today's Follow-ups (${adminLeads.length})</h2>
          <ul>
            ${adminLeads
              .map(
                (lead) => `
                  <li>
                    <strong>${lead.name}</strong><br/>
                    Phone: ${lead.phone}<br/>
                    Follow-up Date: ${new Date(lead.followUp).toDateString()}
                  </li>
                  <hr/>
                `,
              )
              .join("")}
          </ul>
        `;

        try {
          await sendEmail({
            to: admin.email,
            subject: "📌 Today's Follow-up Leads",
            html: emailBody,
          });

          console.log(`✅ Email sent to admin: ${admin.email}`);
        } catch (error) {
          console.error(`❌ Failed to send email to ${admin.email}`, error);
        }
      }
    },
    {
      timezone: "Asia/Kathmandu",
    },
  );
};

//sending email for the client dead line coming

const scheduleEmailForClient = () => {
  cron.schedule("30 11 * * *", async () => {
    console.log("checking client followup");

    const currDate = new Date();
    currDate.setUTCHours(0, 0, 0, 0);

    const tensDayBefore = new Date(currDate);
    tensDayBefore.setUTCDate(currDate.getUTCDate() + 10);

    const statuses = ["Client", "Student"];
    console.log("currdate", currDate);
    console.log("nextdate", tensDayBefore);

    const userToRemind = await Auth.find({
      status: { $in: statuses },
      endDate: {
        $lte: tensDayBefore,
      },
    });
    console.log(userToRemind.length);
    console.log("userToRemind", userToRemind);
    for (const user of userToRemind) {
      try {
        await sendEmail({
          subject: ` Reminder: Your Project Deadline is Approaching: ${user.name}`,
          html: `<h1>Client Name ${user.name}</h1>
                    <p>Client phone Number:<b> ${user.phone} </b></p>
                    <p>This is a reminder that your deadline is on <b>${user.endDate}</b></p>
                    <p>Please ensure all necessary actions are completed before the due date </b></p>
                    <p>student phone Number:<b> ${user.email} </b></p>
                    <p>student enquires for:<b> ${user.service}</b></p>
                    <p>course fees:<b> ${user.budget} </b></p>`,
        });

        console.log("follow up email send");
      } catch (error) {
        console.error(`Error sending email to ${user.name}:`, error);
      }
    }
  });
};

export { scheduleEmail, scheduleEmailForClient };
