
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.43.1";
import { ImapFlow } from "https://esm.sh/imapflow@1.0.158";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const supabaseUrl = Deno.env.get("SUPABASE_URL") || "";
const supabaseAnonKey = Deno.env.get("SUPABASE_ANON_KEY") || "";

interface EmailAccount {
  id: string;
  email_address: string;
  imap_host: string;
  imap_port: number;
  username: string;
  password: string;
  use_ssl: boolean;
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { accountId } = await req.json();
    
    if (!accountId) {
      return new Response(
        JSON.stringify({ error: "Account ID is required" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const supabase = createClient(supabaseUrl, supabaseAnonKey);
    
    // Get the email account details
    const { data: accountData, error: accountError } = await supabase
      .from("email_accounts")
      .select("*")
      .eq("id", accountId)
      .single();
    
    if (accountError || !accountData) {
      return new Response(
        JSON.stringify({ error: "Email account not found" }),
        { status: 404, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }
    
    const account = accountData as EmailAccount;
    
    // Connect to IMAP server
    const client = new ImapFlow({
      host: account.imap_host,
      port: account.imap_port,
      secure: account.use_ssl,
      auth: {
        user: account.username,
        pass: account.password,
      },
      logger: false,
    });

    // Wait until client connects and authorizes
    await client.connect();
    
    // Select the INBOX folder
    await client.mailboxOpen("INBOX");
    
    // Fetch the last 20 messages
    const messages = [];
    for await (const message of client.fetch("1:20", { envelope: true, source: true })) {
      const { envelope, source } = message;
      
      // Parse the raw email source to get content
      const content = source.toString();
      
      // Basic content extraction (this is simplified)
      const bodyMatch = content.match(/<body[^>]*>([\s\S]*?)<\/body>/i);
      const htmlContent = bodyMatch ? bodyMatch[1] : "";
      
      // Extract text content
      const textContent = htmlContent.replace(/<[^>]*>/g, "");
      
      // Store the email in the database
      const { data: emailData, error: emailError } = await supabase
        .from("emails")
        .insert({
          account_id: account.id,
          message_id: envelope.messageId,
          sender: envelope.from[0]?.name || envelope.from[0]?.address || "Unknown",
          sender_email: envelope.from[0]?.address || "",
          subject: envelope.subject || "(No Subject)",
          content: textContent || htmlContent || "(No Content)",
          received_date: envelope.date,
          folder: "inbox",
        })
        .select();
      
      if (emailError) {
        console.error("Error storing email:", emailError);
      } else {
        messages.push(emailData[0]);
      }
    }
    
    // Close the connection
    await client.logout();
    
    return new Response(
      JSON.stringify({ success: true, count: messages.length }),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
    
  } catch (error) {
    console.error("Error fetching emails:", error);
    
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
