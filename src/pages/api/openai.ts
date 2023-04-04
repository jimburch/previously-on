import { NextApiRequest, NextApiResponse } from "next";
import { OpenAIStream, OpenAIStreamPayload } from "../../utils/OpenAIStream";

if (!process.env.OPENAI_API_KEY) {
  throw new Error("Missing env var from OpenAI");
}

export const config = {
  runtime: "edge",
};

export default async function handler(req: Request): Promise<Response> {
  const { title, author, bookmark } = (await req.json()) as {
    title?: string;
    author?: string;
    bookmark?: string;
  };

  const role = "user";
  const prompt = `I am in the middle of reading a book called ${title} by ${author}. It's been some time since I last read it and need help catching up. The last few sentences I read were: ${bookmark}. Give me a brief summary of what happened up to this point and only this point. Format your response with the following sections, beginning each section with a line break:

  Open with the statement: "Previously on {{book title}} by {{book author}}:" with the book title and author filled in and the quotations removed.

  A short, 3-5 sentence summary of the overall story up to the point of the sentences given. Do not give any spoilers for the rest of the book.

  Begin with the statement: "Major Characters So Far:" with a 1-2 description of each major character that has appeared up to this point in the story. Begin each character description with a line break, the character's name, and a colon.

  A short, 4-6 sentence description of where we currently are in the story, the location, and what's happening. This section can go into more specific detail. Do not give any spoilers for the rest of the book.`;

  const payload: OpenAIStreamPayload = {
    model: "gpt-3.5-turbo",
    messages: [{ role, content: prompt }],
    temperature: 0.7,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
    max_tokens: 500,
    stream: true,
    n: 1,
  };

  const stream = await OpenAIStream(payload);
  return new Response(stream);
}
