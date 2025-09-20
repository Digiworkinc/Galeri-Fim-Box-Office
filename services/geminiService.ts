
import { GoogleGenAI, Type } from "@google/genai";
import type { MovieFromAPI } from '../types';

if (!process.env.API_KEY) {
    throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const fetchMoviesFromAPI = async (): Promise<MovieFromAPI[]> => {
  try {
    const response = await ai.models.generateContent({
       model: "gemini-2.5-flash",
       contents: "Buatkan daftar 50 film populer dan beragam dari berbagai genre dan dekade. Untuk setiap film, berikan judul, deskripsi singkat satu kalimat, tahun rilis, dan genre utama. Kembalikan hasilnya sebagai larik JSON.",
       config: {
         responseMimeType: "application/json",
         responseSchema: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                title: {
                  type: Type.STRING,
                  description: "Judul film.",
                },
                year: {
                  type: Type.INTEGER,
                  description: "Tahun rilis film.",
                },
                description: {
                  type: Type.STRING,
                  description: "Deskripsi singkat film dalam satu kalimat.",
                },
                genre: {
                    type: Type.STRING,
                    description: "Genre utama film."
                }
              },
              required: ["title", "year", "description", "genre"],
            },
          },
       },
    });

    const jsonStr = response.text.trim();
    const movies: MovieFromAPI[] = JSON.parse(jsonStr);
    return movies;

  } catch (error) {
    console.error("Error fetching movies from Gemini API:", error);
    throw new Error("Gagal mengambil data film. Silakan coba lagi nanti.");
  }
};
