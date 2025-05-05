import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import OpenAI from 'openai';
import fetch from 'node-fetch'; // Use node-fetch for ElevenLabs API call

dotenv.config();

const app = express();
const port = process.env.PORT || 4000; // Use environment variable for port

// --- Environment Variable Checks ---
if (!process.env.OPENAI_API_KEY) {
  console.error('FATAL ERROR: OPENAI_API_KEY environment variable is not set.');
  process.exit(1);
}
if (!process.env.ELEVENLABS_API_KEY) {
  console.warn('WARNING: ELEVENLABS_API_KEY environment variable is not set. Text-to-speech will not function.');
}
const elevenLabsVoiceId = process.env.ELEVENLABS_VOICE_ID || '21m00Tcm4TlvDq8ikWAM'; // Default voice ID if not set

// --- OpenAI Client Setup ---
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// --- CORS Configuration ---
const corsOptions = {
  origin: process.env.CORS_ORIGIN || 'http://localhost:3000', // Use env var or default
  optionsSuccessStatus: 200
};
app.use(cors(corsOptions));

app.use(express.json());

// --- System Prompt for Assessment ---
const systemPrompt = `You are Ava, a friendly and empathetic virtual assistant for HealthProAssist. Your goal is to conduct a care needs assessment for senior living. 
Ask questions one at a time to gather the following information:
1.  Basic info: Name of the person needing care, their relationship to the user (if different), age, current living situation.
2.  Location: Preferred city/area in Arizona.
3.  Care Needs: Required level of care (Independent Living, Assisted Living, Memory Care, Skilled Nursing), specific medical conditions (e.g., Dementia, Diabetes, Mobility issues), assistance needed with Activities of Daily Living (ADLs) like bathing, dressing, eating, medication management.
4.  Preferences: Budget range (per month), desired amenities (e.g., pet-friendly, fitness center, specific social activities), room preference (private/shared).
5.  Timeline: When is the move-in desired?
Keep your responses concise and friendly. Guide the user through the process step-by-step. Start by asking for the name of the person needing care.`;

// --- API Endpoints ---

// Endpoint for Chat Completions (OpenAI)
app.post('/api/chat', async (req, res) => {
  const { messages } = req.body; // Expecting an array of messages { role: 'user' | 'assistant', content: string }

  if (!messages || !Array.isArray(messages) || messages.length === 0) {
    return res.status(400).json({ error: 'Invalid request body. Expected { messages: [...] }' });
  }

  try {
    const conversation = [
      { role: 'system', content: systemPrompt },
      ...messages
    ];

    const completion = await openai.chat.completions.create({
      model: process.env.OPENAI_MODEL || 'gpt-4',
      messages: conversation as any,
      temperature: 0.7,
    });

    const assistantResponse = completion.choices?.[0]?.message?.content;

    if (!assistantResponse) {
      throw new Error('No response content received from OpenAI.');
    }

    res.json({ response: assistantResponse });

  } catch (err: any) {
    console.error('OpenAI API error:', err.message);
    if (err instanceof OpenAI.APIError) {
        console.error('Status:', err.status);
        console.error('Error Code:', err.code);
        console.error('Error Type:', err.type);
    }
    res.status(500).json({ error: 'Failed to get response from AI assistant.' });
  }
});

// Endpoint for Text-to-Speech (ElevenLabs)
app.post('/api/tts', async (req, res) => {
  const { text } = req.body;

  if (!text) {
    return res.status(400).json({ error: 'Invalid request body. Expected { text: "..." }' });
  }

  if (!process.env.ELEVENLABS_API_KEY) {
    return res.status(503).json({ error: 'Text-to-speech service is not configured.' });
  }

  const ttsUrl = `https://api.elevenlabs.io/v1/text-to-speech/${elevenLabsVoiceId}/stream`;
  const headers = {
    'Accept': 'audio/mpeg',
    'Content-Type': 'application/json',
    'xi-api-key': process.env.ELEVENLABS_API_KEY,
  };
  const body = JSON.stringify({
    text: text,
    model_id: 'eleven_multilingual_v2', // Or another suitable model
    voice_settings: {
      stability: 0.5,
      similarity_boost: 0.75,
      style: 0.3, // Adjust style as needed
      use_speaker_boost: true
    }
  });

  try {
    const response = await fetch(ttsUrl, {
      method: 'POST',
      headers: headers,
      body: body,
    });

    if (!response.ok) {
      const errorBody = await response.text();
      console.error(`ElevenLabs API Error (${response.status}):`, errorBody);
      throw new Error(`ElevenLabs API request failed with status ${response.status}`);
    }

    // Stream the audio back to the client
    res.setHeader('Content-Type', 'audio/mpeg');
    response.body.pipe(res);

  } catch (err: any) {
    console.error('ElevenLabs API error:', err.message);
    res.status(500).json({ error: 'Failed to generate audio.' });
  }
});

// --- Server Start ---
app.listen(port, () => {
  console.log(`Assessment AI server listening at http://localhost:${port}`);
});

