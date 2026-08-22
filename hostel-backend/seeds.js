require("dotenv").config();

const fs = require("fs");
const path = require("path");

const connectDB = require("./config/db");
const Hostel = require("./models/Hostel");
const hostels = require("./data/hostels");
const imagekit = require("./config/imagekit");


// =====================================================
// SETTINGS
// =====================================================

const IMAGE_ROOT = path.join(__dirname, "hostel-images");

const ALLOWED_EXTENSIONS = [
  ".jpg",
  ".jpeg",
  ".png",
  ".webp"
];


// =====================================================
// GET LOCAL IMAGES
// =====================================================

function getLocalImages(hostelNumber) {

  const folder = path.join(
    IMAGE_ROOT,
    `hostel${hostelNumber}`
  );

  if (!fs.existsSync(folder)) {
    throw new Error(
      `Image folder missing: ${folder}`
    );
  }

  const files = fs
    .readdirSync(folder)
    .filter((file) => {
      const extension = path
        .extname(file)
        .toLowerCase();

      return ALLOWED_EXTENSIONS.includes(extension);
    })
    .sort();

  if (files.length === 0) {
    throw new Error(
      `No images found in: ${folder}`
    );
  }

  return files.map((file) =>
    path.join(folder, file)
  );
}


// =====================================================
// VALIDATE ALL IMAGE FOLDERS BEFORE DOING ANYTHING
// =====================================================

function validateImageFolders() {

  console.log("\nChecking local image folders...\n");

  for (let i = 1; i <= hostels.length; i++) {

    const imageFiles = getLocalImages(i);

    console.log(
      `Hostel ${i}: ${imageFiles.length} image(s)`
    );
  }

  console.log("\n✅ All image folders are ready\n");
}


// =====================================================
// UPLOAD LOCAL IMAGE TO IMAGEKIT
// =====================================================

async function uploadImageToImageKit(
  filePath,
  hostelNumber
) {

  try {

    const fileBuffer = fs.readFileSync(filePath);

    const originalName = path.basename(filePath);

    const extension = path.extname(originalName);

    const baseName = path.basename(
      originalName,
      extension
    );

    console.log(
      `      Uploading: ${originalName}`
    );

    const result = await imagekit.files.upload({

      // Convert local image to Base64
      file: fileBuffer.toString("base64"),

      fileName:
        `${baseName}-${Date.now()}${extension}`,

      folder:
        `/hostels/hostel${hostelNumber}`,

      useUniqueFileName: true
    });

    console.log(
      `      ✅ Uploaded`
    );

    return result.url;

  } catch (error) {

    console.error(
      `      ❌ Failed: ${path.basename(filePath)}`
    );

    console.error(
      `      ${error.message}`
    );

    throw error;
  }
}


// =====================================================
// SEED DATABASE
// =====================================================

async function seedHostels() {

  try {

    console.log("\n=================================");
    console.log("HOSTEL DATA MIGRATION");
    console.log("=================================\n");


    // -------------------------------------------------
    // STEP 1: Validate image folders FIRST
    // -------------------------------------------------

    validateImageFolders();


    // -------------------------------------------------
    // STEP 2: Connect MongoDB
    // -------------------------------------------------

    await connectDB();


    console.log(
      `Found ${hostels.length} hostels in data file`
    );


    // -------------------------------------------------
    // STEP 3: Upload all images
    // -------------------------------------------------

    const finalHostels = [];


    for (
      let i = 0;
      i < hostels.length;
      i++
    ) {

      const hostelNumber = i + 1;

      const hostel = hostels[i];

      console.log("\n---------------------------------");

      console.log(
        `Processing Hostel ${hostelNumber}/${hostels.length}`
      );

      console.log(
        `Name: ${hostel.name}`
      );


      // Get local images
      const localImages =
        getLocalImages(hostelNumber);


      console.log(
        `Found ${localImages.length} local image(s)`
      );


      // Upload images
      const imageKitUrls = [];


      for (
        let j = 0;
        j < localImages.length;
        j++
      ) {

        const imageKitUrl =
          await uploadImageToImageKit(
            localImages[j],
            hostelNumber
          );

        imageKitUrls.push(imageKitUrl);
      }


      // Remove old UUID id and old Cloudinary images
      const {
        id,
        images,
        ...hostelData
      } = hostel;


      // Create final MongoDB document
      finalHostels.push({

        ...hostelData,

        // ONLY ImageKit URLs
        images: imageKitUrls

      });


      console.log(
        `✅ Hostel ready with ${imageKitUrls.length} ImageKit image(s)`
      );
    }


    // -------------------------------------------------
    // STEP 4: Remove old hostel records
    // -------------------------------------------------

    console.log("\n");
    console.log("Removing old hostel records...");

    await Hostel.deleteMany({});

    console.log(
      "✅ Old hostel records removed"
    );


    // -------------------------------------------------
    // STEP 5: Insert new records
    // -------------------------------------------------

    console.log(
      "\nInserting new hostel records..."
    );

    await Hostel.insertMany(finalHostels);


    // -------------------------------------------------
    // COMPLETE
    // -------------------------------------------------

    console.log("\n=================================");
    console.log("✅ MIGRATION COMPLETED");
    console.log("=================================");

    console.log(
      `Hostels inserted: ${finalHostels.length}`
    );

    console.log(
      "Images uploaded to ImageKit: YES"
    );

    console.log(
      "Cloudinary URLs stored in MongoDB: NO"
    );

    console.log(
      "=================================\n"
    );


    process.exit(0);

  } catch (error) {

    console.error("\n=================================");
    console.error("❌ MIGRATION FAILED");
    console.error("=================================");

    console.error(error.message);

    console.error(
      "\nNo database replacement should happen if image validation failed."
    );

    process.exit(1);
  }
}


seedHostels();