import { createClient } from "https://esm.sh/@supabase/supabase-js@2.39.3";
import { Resend } from "npm:resend@3.2.0";

const corsHeaders = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers":
        "authorization, x-client-info, apikey, content-type",
};

Deno.serve(async (req) => {
    // Handle CORS preflight requests
    if (req.method === "OPTIONS") {
        return new Response("ok", { headers: corsHeaders });
    }

    try {
        // Create Supabase client with service role key for admin access
        const supabaseClient = createClient(
            Deno.env.get("SUPABASE_URL") ?? "",
            Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "",
            {
                auth: {
                    autoRefreshToken: false,
                    persistSession: false,
                },
            },
        );

        const now = new Date().toISOString();
        console.log(`Checking for expired subscriptions at ${now}`);

        // Find all subscriptions that have expired
        const { data: expiredProfiles, error: fetchError } =
            await supabaseClient
                .from("profiles")
                .select(
                    "id, email, full_name, subscription_plan, subscription_end",
                )
                .eq("is_subscribed", true)
                .lt("subscription_end", now);

        if (fetchError) {
            console.error("Error fetching expired subscriptions:", fetchError);
            throw fetchError;
        }

        if (!expiredProfiles || expiredProfiles.length === 0) {
            console.log("No expired subscriptions found");
            return new Response(
                JSON.stringify({
                    success: true,
                    message: "No expired subscriptions found",
                    count: 0,
                }),
                {
                    headers: {
                        ...corsHeaders,
                        "Content-Type": "application/json",
                    },
                    status: 200,
                },
            );
        }

        console.log(`Found ${expiredProfiles.length} expired subscriptions`);

        // Update expired profiles
        const profileIds = expiredProfiles.map((p) => p.id);

        const { error: updateError } = await supabaseClient
            .from("profiles")
            .update({
                is_subscribed: false,
                subscription_status: "expired",
                subscription_plan: "inactive",
            })
            .in("id", profileIds);

        if (updateError) {
            console.error("Error updating expired profiles:", updateError);
            throw updateError;
        }

        // Send expiration notification emails
        const resend = new Resend(Deno.env.get("RESEND_API_KEY") ?? "");
        const emailResults = [];

        for (const profile of expiredProfiles) {
            try {
                const { data, error } = await resend.emails.send({
                    from: "membership@virstravelclub.com",
                    to: profile.email,
                    subject: "Your Virstravel subscription has expired",
                    html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
              <h2>Your Subscription Has Expired</h2>
              <p>Hi ${profile.full_name || "there"},</p>
              <p>Your ${profile.subscription_plan} subscription expired on ${
                        new Date(profile.subscription_end).toLocaleDateString()
                    }.</p>
              <p>We hope you enjoyed your time as a Virstravel Club member!</p>
              <p>To continue enjoying exclusive travel perks and discounts, you can renew your subscription anytime.</p>
              <div style="margin: 30px 0; text-align: center;">
                <a href="${Deno.env.get("NEXT_PUBLIC_BASEURL")}/pricing" 
                   style="background-color: #FF6B35; color: white; padding: 14px 28px; text-decoration: none; border-radius: 5px; display: inline-block;">
                  Renew Subscription
                </a>
              </div>
              <p>Thank you for being part of our community!</p>
              <p>Best regards,<br/>The Virstravel Team</p>
            </div>
          `,
                });

                if (error) {
                    console.error(
                        `Failed to send email to ${profile.email}:`,
                        error,
                    );
                    emailResults.push({
                        email: profile.email,
                        success: false,
                        error,
                    });
                } else {
                    console.log(`Expiration email sent to ${profile.email}`);
                    emailResults.push({
                        email: profile.email,
                        success: true,
                        data,
                    });
                }
            } catch (emailError) {
                console.error(
                    `Error sending email to ${profile.email}:`,
                    emailError,
                );
                emailResults.push({
                    email: profile.email,
                    success: false,
                    error: emailError,
                });
            }
        }

        const successfulEmails = emailResults.filter((r) => r.success).length;

        return new Response(
            JSON.stringify({
                success: true,
                message:
                    `Processed ${expiredProfiles.length} expired subscriptions`,
                count: expiredProfiles.length,
                emailsSent: successfulEmails,
                emailsFailed: expiredProfiles.length - successfulEmails,
                details: expiredProfiles.map((p) => ({
                    email: p.email,
                    plan: p.subscription_plan,
                    expiredAt: p.subscription_end,
                })),
            }),
            {
                headers: { ...corsHeaders, "Content-Type": "application/json" },
                status: 200,
            },
        );
    } catch (error) {
        console.error("Error in check-expired-subscriptions function:", error);
        return new Response(
            JSON.stringify({
                success: false,
                error: error.message,
            }),
            {
                headers: { ...corsHeaders, "Content-Type": "application/json" },
                status: 500,
            },
        );
    }
});
