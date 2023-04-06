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
  const prompt = `I am in the middle of reading a book called ${title} by ${author}. It's been some time since I last read it and need help catching up. The last few sentences I read were: ${bookmark}. Give me a brief summary of what happened up to this point and only this point.

  If you don't know what book is being referenced or need more information, reply with: "I don't know this book. Please provide more more sentences. It's also possible that this book could be too new for me.

  Format your response with the following sections, beginning each section with a line break:

  Open with the statement: "Previously on {{book title}} by {{book author}}:" with the book title and author filled in and the quotations removed.

  A short, 3-5 sentence summary of the overall story up to the point of the sentences given. Do not give any spoilers for the rest of the book.

  Begin with the statement: "Major Characters So Far:" with a 1-2 description of each major character that has appeared up to this point in the story. Begin each character summary with the character name and a colon. Make sure each character summary begins and ends with a line break.

  A short, 4-6 sentence description of where we currently are in the story, the location, and what's happening. This section can go into more specific detail. Do not give any spoilers for the rest of the book.

  Here is a formatting example:

  "Previously on The Fellowship of the Ring by J.R.R. Tolkien:

  A book summary goes here.

  Major Characters So Far:

  Frodo Baggins: A hobbit who is the ring bearer.

  Samwise Gamgee: A hobbit who is Frodo's best friend.

  Aragorn: A human who is the heir to the throne of Gondor.

  So far in the story, we are here. Here is a description of the location and what's happening.`;

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
