const response = await fetch("http://localhost:3000/api/suggest-messages", {
  method: "POST",
});

const reader = response.body.getReader();
const decoder = new TextDecoder();

while (true) {
  const { done, value } = await reader.read();
  if (done) break;
  process.stdout.write(decoder.decode(value)); // prints each chunk as it arrives
}