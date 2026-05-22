import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Increase payload limit for base64 images
  app.use(express.json({ limit: '10mb' }));

  app.get("/api/health", (req, res) => {
    res.json({ status: "ok" });
  });

  // Face scanning endpoint
  app.post("/api/auth/face", async (req, res) => {
    try {
      const { image } = req.body; // base64 image (data:image/jpeg;base64,...)
      
      if (!image) {
        return res.status(400).json({ error: "No image provided" });
      }

      if (!process.env.APP_GEMINI_API_KEY) {
         return res.status(500).json({ error: "Gemini API key is missing. Please add APP_GEMINI_API_KEY to your environment variables." });
      }

      const ai = new GoogleGenAI({ 
        apiKey: process.env.APP_GEMINI_API_KEY,
        httpOptions: {
          headers: { 'User-Agent': 'aistudio-build' }
        }
      });

      const base64Data = image.split(',')[1] || image;
      const webcamImagePart = {
        inlineData: {
          mimeType: "image/jpeg",
          data: base64Data,
        },
      };

      let prompt = "Analyze this image. Does it clearly show a real human face looking at the camera? The image must contain a human face. Answer with exactly just 'TRUE' if there is a clear face, or 'FALSE' if no face is clearly visible or if it's an object/blank space.";
      
      const contents = {
         parts: [webcamImagePart, { text: prompt }]
      };

      // If user provides a reference image URL to truly identify them
      if (process.env.ADMIN_REFERENCE_IMAGE_URL) {
         prompt = "You are a facial recognition security system. Compare the webcam image to the reference image. Do they show the exact same person? If yes, reply with exactly 'TRUE', otherwise exactly 'FALSE'.";
         try {
             // Fetch reference image
             const refRes = await fetch(process.env.ADMIN_REFERENCE_IMAGE_URL);
             
             const contentType = refRes.headers.get('content-type') || '';
             if (contentType.includes('text/html')) {
                 return res.status(400).json({ 
                    success: false, 
                    error: "Invalid reference image URL.",
                    details: "The ADMIN_REFERENCE_IMAGE_URL points to an HTML webpage instead of a raw image file. Ensure you are using the direct image URL from imgbb (it should look like an image when opened in the browser, not the imgbb viewer)." 
                 });
             }
             
             const refBuffer = await refRes.arrayBuffer();
             const refBase64 = Buffer.from(refBuffer).toString('base64');
             
             // Add reference image to the prompt parts
             contents.parts = [
                {
                   inlineData: {
                     mimeType: refRes.headers.get('content-type') || 'image/jpeg',
                     data: refBase64
                   }
                },
                webcamImagePart,
                { text: prompt }
             ];
         } catch(e) {
             console.error("Could not fetch reference image:", e);
         }
      }

      const response = await ai.models.generateContent({
        model: "gemini-3.5-flash",
        contents,
      });

      const result = response.text?.trim().toUpperCase();
      
      if (result === 'TRUE') {
         res.json({ success: true });
      } else {
         res.json({ success: false, reason: "Face verification failed" });
      }

    } catch(err: any) {
       console.error("Face Auth Error:", err);
       res.status(500).json({ error: "Facial analysis failed", details: err.message });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
