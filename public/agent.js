let conversation = null;

async function getToken() {
  const res = await fetch("/token");
  const data = await res.json();
  return data.token;
}

document.getElementById("talkButton").addEventListener("click", async () => {
  if (!conversation) {
    const token = await getToken();

    conversation = window.ElevenLabsConversation.start({
      signedUrl: token,
      onConnect: () => console.log("✅ Connected"),
      onDisconnect: () => {
        conversation = null;
        console.log("🔴 Disconnected");
      }
    });

    document.getElementById("talkButton").innerText = "🔴 End Conversation";
  } else {
    conversation.end();
    conversation = null;
    document.getElementById("talkButton").innerText = "🎧 Talk to Café Buddy";
  }
});
