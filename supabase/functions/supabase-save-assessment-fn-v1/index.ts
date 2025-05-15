
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.43.2";

// Set up CORS headers
const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

// Create a Supabase client
const supabase = createClient(
  Deno.env.get("SUPABASE_URL") ?? "",
  Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? ""
);

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Get the assessment data from the request
    const { formData, userId } = await req.json();

    // Extract key assessment data fields
    const {
      careType,
      budgetRange,
      locationPreference,
      firstName,
      lastName,
      ...otherData
    } = formData;

    // Generate a summary of the assessment
    const summary = `${firstName} ${lastName} is looking for ${careType} care 
      in ${locationPreference} with a budget of ${budgetRange}.`;

    // Insert the assessment into the database
    const { data, error } = await supabase.from("assessments").insert({
      user_id: userId,
      budget_range: budgetRange,
      preferred_location: locationPreference,
      summary: summary,
      recommended_care_types: [careType],
      conversation_history: [],
      other_preferences: otherData
    });

    if (error) {
      console.error("Error saving assessment:", error);
      return new Response(
        JSON.stringify({ error: error.message }),
        {
          status: 500,
          headers: { "Content-Type": "application/json", ...corsHeaders },
        }
      );
    }

    console.log("Assessment saved successfully:", data);
    return new Response(
      JSON.stringify({ success: true, data }),
      {
        status: 200,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  } catch (error) {
    console.error("Error processing request:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
});
