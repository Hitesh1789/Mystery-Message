import { NextResponse } from "next/server";
import { ai } from "@/lib/gemini";


export async function GET() {
  try {

    const stream = await ai.interactions.create({
      model: "gemini-3.1-flash-lite",
      input: "Create a list of three open-ended and engaging questions formatted as a single string. Each question should be separated by '||'. These questions are for an anonymous social messaging platform, like Qooh.me, and should be suitable for a diverse audience. Avoid personal or sensitive topics, focusing instead on universal themes that encourage friendly interaction. For example, your output should be structured like this: 'What's a hobby you've recently started?||If you could have dinner with any historical figure, who would it be?||What's a simple thing that makes you happy?'. Ensure the questions are intriguing, foster curiosity, and contribute to a positive and welcoming conversational environment.",
      stream: true,
    });


    const encoder = new TextEncoder();

    const readableStream = new ReadableStream({
      async start(controller) {
        try {
          for await (const event of stream) {
            if (
              event.event_type === "step.delta" &&
              event.delta.type === "text"
            ) {
              controller.enqueue(
                encoder.encode(event.delta.text)
              );
            }
          }

          controller.close();
        } catch (error) {
          controller.error(error);
        }
      },
    });


    return new Response(readableStream, {
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        "Cache-Control": "no-cache",
      },
    });

  } catch (err) {
    console.error("Error:", err);
    return NextResponse.json(
      { success: false, message: `Error: ${err}` },
      { status: 500 }
    );
  }
}