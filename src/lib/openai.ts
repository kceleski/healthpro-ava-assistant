export async function askGPT(userInput: string): Promise<string> {
  const res = await fetch("/api/gpt", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ prompt: userInput }),
  });

  const data = await res.json();
  return data.response || "Sorry, I didn’t catch that.";
}
