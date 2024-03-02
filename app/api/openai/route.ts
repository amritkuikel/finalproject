import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

export const POST = async (request: Request) => {
  try {
    const { question } = await request.json();
    const genAI = new GoogleGenerativeAI(process.env.API_KEY!);
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    const prompt = question;
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    console.log(text)
    return NextResponse.json({ text });
  } catch (error: any) {
    return NextResponse.json({ error: error.message });
  }
};