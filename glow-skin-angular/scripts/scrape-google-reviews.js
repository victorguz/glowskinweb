const puppeteer = require("puppeteer");
const fs = require("fs");
const path = require("path");

// URL de Google Maps para Glow Skin
const GOOGLE_MAPS_URL = "https://www.google.com/maps/place/Glow+Skin+@glowskinbq+%7C+Limpieza+Facial+en+Barranquilla/@11.0008178,-74.7989214,17z/data=!4m8!3m7!1s0x8ef42d0017f3d5ed:0x9c66106c69176e22!8m2!3d11.0008178!4d-74.7987817!9m1!1b1!16s%2Fg%2F11vwh0jgsw?entry=ttu&g_ep=EgoyMDI1MDcyMy4wIKXMDSoASAFQAw%3D%3D";

// Función para extraer reviews de Google Maps
async function scrapeGoogleReviews() {
  console.log("🚀 Iniciando web scraping de Google Reviews...");

  let browser;
  try {
    // Iniciar Puppeteer
    browser = await puppeteer.launch({
      headless: true,
      args: [
        "--no-sandbox",
        "--disable-setuid-sandbox",
        "--disable-dev-shm-usage",
        "--disable-accelerated-2d-canvas",
        "--no-first-run",
        "--no-zygote",
        "--disable-gpu",
      ],
    });

    const page = await browser.newPage();

    // Configurar User-Agent realista
    await page.setUserAgent(
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
    );

    // Configurar viewport
    await page.setViewport({ width: 1920, height: 1080 });

    console.log("📄 Navegando a Google Maps...");
    await page.goto(GOOGLE_MAPS_URL, {
      waitUntil: "networkidle2",
      timeout: 30000,
    });

    // Esperar a que cargue la página
    await new Promise((resolve) => setTimeout(resolve, 3000));

    // Hacer scroll para cargar más reviews
    console.log("📜 Haciendo scroll para cargar más reviews...");
    await autoScroll(page);

    // Extraer información del negocio
    console.log("🏢 Extrayendo información del negocio...");
    const businessInfo = await extractBusinessInfo(page);

    // Extraer reviews
    console.log("⭐ Extrayendo reviews...");
    const reviews = await extractReviews(page);

    // Crear objeto final
    const result = {
      business: businessInfo,
      reviews: reviews,
      scrapedAt: new Date().toISOString(),
      totalReviews: reviews.length,
    };

    // Guardar en archivo JSON
    const outputPath = path.join(
      __dirname,
      "../src/assets/data/google-reviews.json"
    );
    const outputDir = path.dirname(outputPath);

    // Crear directorio si no existe
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }

    fs.writeFileSync(outputPath, JSON.stringify(result, null, 2));

    console.log("✅ Web scraping completado exitosamente!");
    console.log(`📊 Resultados:`);
    console.log(`   - Nombre: ${businessInfo.name}`);
    console.log(`   - Rating: ${businessInfo.rating}`);
    console.log(`   - Total Reviews: ${reviews.length}`);
    console.log(`   - Archivo guardado en: ${outputPath}`);

    return result;
  } catch (error) {
    console.error("❌ Error durante el web scraping:", error);
    throw error;
  } finally {
    if (browser) {
      await browser.close();
    }
  }
}

// Función para hacer scroll automático
async function autoScroll(page) {
  await page.evaluate(async () => {
    await new Promise((resolve) => {
      let totalHeight = 0;
      const distance = 100;
      const timer = setInterval(() => {
        const scrollHeight = document.body.scrollHeight;
        window.scrollBy(0, distance);
        totalHeight += distance;

        if (totalHeight >= scrollHeight) {
          clearInterval(timer);
          resolve();
        }
      }, 100);
    });
  });
}

// Función para extraer información del negocio
async function extractBusinessInfo(page) {
  try {
    const businessInfo = await page.evaluate(() => {
      // Buscar nombre del negocio
      const nameSelectors = [
        'h1[data-attrid="title"]',
        "h1",
        '[data-attrid="title"]',
        ".fontHeadlineLarge",
      ];

      let name = "Glow Skin";
      for (const selector of nameSelectors) {
        const element = document.querySelector(selector);
        if (element && element.textContent.trim()) {
          name = element.textContent.trim();
          break;
        }
      }

      // Buscar rating
      const ratingSelectors = [
        '[aria-label*="estrellas"]',
        '[aria-label*="stars"]',
        ".fontDisplayLarge",
        ".rating",
      ];

      let rating = 5.0;
      for (const selector of ratingSelectors) {
        const element = document.querySelector(selector);
        if (element) {
          const text =
            element.textContent || element.getAttribute("aria-label") || "";
          const ratingMatch = text.match(/(\d+(?:\.\d+)?)/);
          if (ratingMatch) {
            rating = parseFloat(ratingMatch[1]);
            break;
          }
        }
      }

      // Buscar total de reviews
      const reviewCountSelectors = [
        '[aria-label*="reseñas"]',
        '[aria-label*="reviews"]',
        ".fontBodyMedium",
      ];

      let totalReviews = 0;
      for (const selector of reviewCountSelectors) {
        const elements = document.querySelectorAll(selector);
        for (const element of elements) {
          const text =
            element.textContent || element.getAttribute("aria-label") || "";
          const countMatch = text.match(
            /(\d+)\s*(?:reseñas|reviews|opiniones)/i
          );
          if (countMatch) {
            totalReviews = parseInt(countMatch[1]);
            break;
          }
        }
        if (totalReviews > 0) break;
      }

      return {
        name: name,
        rating: rating,
        totalReviews: totalReviews,
        address: "Barranquilla, Colombia",
        phone: "+57 300 123 4567",
        website: "https://glowskin.com",
      };
    });

    return businessInfo;
  } catch (error) {
    console.error("Error extrayendo información del negocio:", error);
    return {
      name: "Glow Skin",
      rating: 5.0,
      totalReviews: 0,
      address: "Barranquilla, Colombia",
      phone: "+57 300 123 4567",
      website: "https://glowskin.com",
    };
  }
}

// Función para extraer reviews
async function extractReviews(page) {
  try {
    const reviews = await page.evaluate(() => {
      const reviewElements = document.querySelectorAll(
        "[data-review-id], .jftiEf, .d4r55, .review-dialog"
      );
      const extractedReviews = [];

      reviewElements.forEach((element, index) => {
        try {
          // Buscar autor
          const authorSelectors = [
            ".d4r55",
            ".P5Bobd",
            "[data-reviewer-name]",
            ".reviewer-name",
          ];

          let authorName = "Usuario";
          for (const selector of authorSelectors) {
            const authorElement = element.querySelector(selector);
            if (authorElement && authorElement.textContent.trim()) {
              authorName = authorElement.textContent.trim();
              break;
            }
          }

          // Buscar rating
          const ratingSelectors = [
            ".kvMYJc",
            "[data-rating]",
            ".review-rating",
          ];

          let rating = 5;
          for (const selector of ratingSelectors) {
            const ratingElement = element.querySelector(selector);
            if (ratingElement) {
              const text = ratingElement.textContent || "";
              const starCount = (text.match(/★/g) || []).length;
              const numberMatch = text.match(/(\d+(?:\.\d+)?)/);

              if (starCount > 0) {
                rating = starCount;
                break;
              } else if (numberMatch) {
                const numRating = parseFloat(numberMatch[1]);
                rating = numRating <= 5 ? numRating : numRating / 2;
                break;
              }
            }
          }

          // Buscar texto de la review
          const textSelectors = [
            ".wiI7pd",
            "[data-review-text]",
            ".review-snippet",
            ".review-text",
          ];

          let reviewText = "Excelente servicio";
          for (const selector of textSelectors) {
            const textElement = element.querySelector(selector);
            if (textElement && textElement.textContent.trim()) {
              reviewText = textElement.textContent.trim();
              break;
            }
          }

          // Buscar fecha
          const timeSelectors = [
            ".rsqaWe",
            "[data-review-time]",
            ".review-date",
          ];

          let timeDescription = "hace 1 mes";
          for (const selector of timeSelectors) {
            const timeElement = element.querySelector(selector);
            if (timeElement && timeElement.textContent.trim()) {
              timeDescription = timeElement.textContent.trim();
              break;
            }
          }

          // Solo agregar si tenemos texto de review
          if (reviewText && reviewText !== "Excelente servicio") {
            extractedReviews.push({
              author_name: authorName,
              rating: rating,
              relative_time_description: timeDescription,
              text: reviewText,
              language: "es",
              time: Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000,
            });
          }
        } catch (error) {
          console.error("Error procesando review individual:", error);
        }
      });

      return extractedReviews;
    });

    return reviews;
  } catch (error) {
    console.error("Error extrayendo reviews:", error);
    return [];
  }
}

// Función principal
async function main() {
  try {
    await scrapeGoogleReviews();
    console.log("🎉 Script ejecutado exitosamente!");
  } catch (error) {
    console.error("💥 Error en el script:", error);
    process.exit(1);
  }
}

// Ejecutar si es llamado directamente
if (require.main === module) {
  main();
}

module.exports = { scrapeGoogleReviews };
