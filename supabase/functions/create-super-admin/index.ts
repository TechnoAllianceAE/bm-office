
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
    const { email, password, fullName } = await req.json();

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
        JSON.stringify({ error: 'Error checking existing user' }),
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
          JSON.stringify({ error: 'Error creating user' }),
          { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }

      userId = userData.user.id;
    }

    // Update user's role to Super Admin
    const { error: updateRoleError } = await supabase
      .from('app_users')
      .update({ role: 'Super Admin' })
      .eq('user_id', userId);

    if (updateRoleError) {
      console.error('Error updating user role:', updateRoleError);
      return new Response(
        JSON.stringify({ error: 'Error updating user role' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Create permissions for all applications
    const { data: rolesData, error: rolesError } = await supabase
      .from('roles')
      .select('id, name')
      .eq('name', 'Super Admin')
      .single();

    if (rolesError) {
      console.error('Error getting Super Admin role:', rolesError);
      return new Response(
        JSON.stringify({ error: 'Error getting Super Admin role' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const applications = [
      'Dashboard', 'Timesheet', 'Projects', 'Calendar', 'HR', 'Directory', 
      'Mailbox', 'AI Assistant', 'AI Workflow', 'DMS', 'Tools', 'Analytics', 
      'MIS', 'Requisition', 'Help Desk', 'LMS', 'Settings', 'User Management'
    ];

    const permissionsToInsert = applications.map(app => ({
      role_id: rolesData.id,
      application: app,
      can_view: true,
      can_create: true,
      can_edit: true,
      can_delete: true
    }));

    // Check if permissions already exist
    const { data: existingPermissions, error: permCheckError } = await supabase
      .from('permissions')
      .select('*')
      .eq('role_id', rolesData.id);

    if (permCheckError) {
      console.error('Error checking existing permissions:', permCheckError);
      return new Response(
        JSON.stringify({ error: 'Error checking existing permissions' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    if (existingPermissions.length === 0) {
      const { error: permError } = await supabase
        .from('permissions')
        .insert(permissionsToInsert);

      if (permError) {
        console.error('Error creating permissions:', permError);
        return new Response(
          JSON.stringify({ error: 'Error creating permissions' }),
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
      JSON.stringify({ error: 'Internal server error' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
