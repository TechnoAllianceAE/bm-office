
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.43.1";
import { ImapFlow } from "https://esm.sh/imapflow@1.0.158";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const supabaseUrl = Deno.env.get("SUPABASE_URL") || "";
const supabaseAnonKey = Deno.env.get("SUPABASE_ANON_KEY") || "";

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { email_address, imap_host, imap_port, username, password, use_ssl } = await req.json();
    
    // Validate input
    if (!email_address || !imap_host || !imap_port || !username || !password) {
      return new Response(
        JSON.stringify({ error: "Missing required fields" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Initialize Supabase client
    const supabase = createClient(supabaseUrl, supabaseAnonKey, {
      global: {
        headers: { Authorization: req.headers.get("Authorization") || "" },
      },
    });
    
    // Get the user id from the JWT token
    const { data: { user }, error: userError } = await supabase.auth.getUser();
    
    if (userError || !user) {
      return new Response(
        JSON.stringify({ error: "Unauthorized" }),
        { status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Try to connect to the IMAP server to verify credentials
    try {
      const client = new ImapFlow({
        host: imap_host,
        port: imap_port,
        secure: use_ssl !== false, // Default to true if not specified
        auth: {
          user: username,
          pass: password,
        },
        logger: false,
      });
      
      await client.connect();
      await client.logout();
    } catch (imapError) {
      return new Response(
        JSON.stringify({ error: "Failed to connect to IMAP server. Please check your credentials." }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }
    
    // Store the email account in the database
    const { data: accountData, error: accountError } = await supabase
      .from("email_accounts")
      .insert({
        user_id: user.id,
        email_address,
        imap_host,
        imap_port,
        username,
        password,
        use_ssl: use_ssl !== false, // Default to true if not specified
      })
      .select();
    
    if (accountError) {
      return new Response(
        JSON.stringify({ error: "Failed to add email account" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }
    
    return new Response(
      JSON.stringify({ success: true, account: accountData[0] }),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
    
  } catch (error) {
    console.error("Error adding email account:", error);
    
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
