
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.38.1";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get('SUPABASE_URL') ?? '';
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '';
    
    if (!supabaseUrl || !supabaseServiceKey) {
      return new Response(
        JSON.stringify({ error: 'Server configuration error' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const supabase = createClient(supabaseUrl, supabaseServiceKey);
    
    // Parse request body
    let body;
    try {
      body = await req.json();
    } catch (error) {
      console.error('Failed to parse request body:', error);
      return new Response(
        JSON.stringify({ error: 'Invalid request body', details: String(error) }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const { email, password, fullName } = body;

    if (!email || !password || !fullName) {
      return new Response(
        JSON.stringify({ error: 'Email, password, and full name are required' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Check if user exists
    const { data: existingUsers, error: userCheckError } = await supabase
      .from('app_users')
      .select('*')
      .eq('email', email)
      .maybeSingle();

    if (userCheckError) {
      console.error('Error checking existing user:', userCheckError);
      return new Response(
        JSON.stringify({ error: 'Error checking existing user', details: userCheckError }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    let userId = existingUsers?.user_id;

    // If user doesn't exist, create a new one
    if (!userId) {
      const { data: userData, error: createUserError } = await supabase.auth.admin.createUser({
        email,
        password,
        email_confirm: true,
        user_metadata: { full_name: fullName }
      });

      if (createUserError) {
        console.error('Error creating user:', createUserError);
        return new Response(
          JSON.stringify({ error: 'Error creating user', details: createUserError }),
          { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }

      userId = userData.user.id;
    }

    // Ensure app_users entry exists
    const { data: appUserData, error: appUserCheckError } = await supabase
      .from('app_users')
      .select('*')
      .eq('user_id', userId)
      .maybeSingle();
      
    if (appUserCheckError) {
      console.error('Error checking app_user entry:', appUserCheckError);
    }
      
    if (!appUserData) {
      // Create app_users entry if it doesn't exist
      const { error: insertError } = await supabase
        .from('app_users')
        .insert({ 
          user_id: userId, 
          email, 
          full_name: fullName,
          role: 'Super Admin',
          status: 'Active'
        });
        
      if (insertError) {
        console.error('Error creating app_user entry:', insertError);
        return new Response(
          JSON.stringify({ error: 'Error creating app_user entry', details: insertError }),
          { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }
    } else {
      // Update existing user's role to Super Admin
      const { error: updateRoleError } = await supabase
        .from('app_users')
        .update({ role: 'Super Admin' })
        .eq('user_id', userId);

      if (updateRoleError) {
        console.error('Error updating user role:', updateRoleError);
        return new Response(
          JSON.stringify({ error: 'Error updating user role', details: updateRoleError }),
          { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }
    }

    return new Response(
      JSON.stringify({ 
        message: 'Super Admin created successfully', 
        email, 
        userId 
      }),
      { 
        status: 200, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );
  } catch (error) {
    console.error('Unexpected error:', error);
    return new Response(
      JSON.stringify({ error: 'Internal server error', details: String(error) }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
