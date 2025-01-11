import pLimit from "p-limit";
import { AITool } from "../models/AIToolsModel.js";
import { generateTagsLLM } from "../services/llm_Models/tagGeneratorGemini.js";
import { generateDescriptionLLM } from "../services/llm_Models/descriptionGeneratorGemini.js";
import { generateProsConsLLM } from "../services/llm_Models/prosConsGeneratorGemini.js";
import { takeScreenshot } from "../services/others/captureToolsShots.js";
import { uploadImageToCloudinary } from "../services/others/cloudnaryToolsImgs.js";



export const getAITools = async (req, res) => {
  try {
   
    const now = new Date();
    const last12MonthsDate = new Date(now.setMonth(now.getMonth() - 12));

    const pipeline = [
      {
     
        $addFields: {
          year: { $year: { $toDate: "$created_at" } },
          month: { $month: { $toDate: "$created_at" } },
          createdAt: { $toDate: "$created_at" },
        },
      },
      {
        $facet: {
         
          year: [
            { $sort: { year: -1, createdAt: 1 } },  
            {
              $group: {
                _id: "$year",
                documents: { $push: "$$ROOT" },
              },
            },
            {
              $project: {
                _id: 0,
                year: "$_id",
                documents: { $slice: ["$documents", 15] },  
              },
            },
            {
              $group: {
                _id: null,
                years: { $push: { k: { $toString: "$year" }, v: "$documents" } },
              },
            },
            { $project: { _id: 0, year: { $arrayToObject: "$years" } } },
          ],

          months: [
            {
              $match: {
                createdAt: { $gte: last12MonthsDate },  
              },
            },
            { $sort: { createdAt: 1 } }, 
            {
              $group: {
                _id: { year: "$year", month: "$month" },
                documents: { $push: "$$ROOT" },
              },
            },
            {
              $project: {
                _id: 0,
                year: "$_id.year",
                month: "$_id.month",
                documents: { $slice: ["$documents", 15] }, 
              },
            },
            {
              $group: {
                _id: null,
                months: {
                  $push: {
                    k: {
                      $concat: [
                        { $toString: "$month" },
                        "-",
                        { $toString: "$year" },
                      ],
                    },
                    v: "$documents",
                  },
                },
              },
            },
            { $project: { _id: 0, months: { $arrayToObject: "$months" } } },
          ],
        },
      },
    ];


    const result = await AITool.aggregate(pipeline);

    if (!result || !result.length || !result[0]) {
      return res.status(404).json({ message: "No tools found in the last 12 months." });
    }

   
    res.status(200).json({
      year: result[0]?.year || [], 
      months: result[0]?.months || [], 
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "An error occurred while retrieving AI tools.",
      error: error.message || error,
    });
  }
};









const parseDate = (dateString) => {
  const dateInfo = dateString.split("/");
  const newDate =
    dateInfo[2].length > 2
      ? `${dateInfo[2]}-${dateInfo[1]}-${dateInfo[0]}`
      : `20${dateInfo[2]}-${dateInfo[1]}-${dateInfo[0]}`;

  return new Date(newDate);
};

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const retryWithBackoff = async (fn, retries = 5, delayMs = 1000) => {
  let attempt = 0;
  while (attempt < retries) {
    try {
      return await fn();
    } catch (error) {
      if (error.response?.status === 429 && attempt < retries - 1) {
        console.log(`Retrying after ${delayMs}ms due to rate limit...`);
        await delay(delayMs);
        delayMs *= 2;
        attempt++;
      } else {
        throw error;
      }
    }
  }
};

const TIMEOUT_LIMIT = 30000; 

export const uploadAIToolsData = async (req, res) => {
  try {
    const toolsData = req.body;

    if (!toolsData || !Array.isArray(toolsData) || toolsData.length === 0) {
      return res.status(400).json({
        error:
          "No data provided or invalid format. Please provide an array of AI tools.",
      });
    }

    const processedTools = [];
    const failedTools = []; 
    const batchSize = 500;
    const limit = pLimit(1);

    for (let i = 0; i < toolsData.length; i += batchSize) {
      const batch = toolsData.slice(i, i + batchSize);

      const batchResults = await Promise.all(
        batch.map((tool, index) =>
          limit(async () => {
            const timeout = setTimeout(() => {
              failedTools.push(tool);
            }, TIMEOUT_LIMIT); 

            try {
              await delay(index * 100);

              if (!tool.name || !tool.website_url) {
                throw new Error("Tool name and website URL are required.");
              }
              if (tool.created_at) {
                const date = parseDate(tool.created_at);
                tool.created_at = date;
              }


              const tags = await retryWithBackoff(() =>
                generateTagsLLM(tool.name, tool.website_url, tool.description, tool.categories)
              );

              await delay(index * 100);

              const description = await retryWithBackoff(() =>
                generateDescriptionLLM(
                  tool.name,
                  tool.website_url,
                  tool.description,
                  tool.categories
                )
              );

              await delay(index * 100);

              const prosCons = await retryWithBackoff(() =>
                generateProsConsLLM(
                  tool.name,
                  tool.website_url,
                  tool.description,
                  tool.categories
                )
              );

              await delay(index * 100);

              if (!tags || !description || !prosCons) {
                failedTools.push(tool); 
                clearTimeout(timeout); 
                return;
              }

              const toolWithDetails = {
                ...tool,
                tags: tags.split(","),
                description,
                pros_cons: { pros: prosCons[0], cons: prosCons[1] },
              };

              const screenshotPath = `./screenshots/${tool.name}.png`;
              const screenshotTaken = await retryWithBackoff(() =>
                takeScreenshot(tool.website_url, screenshotPath)
              );
              const imageUrl = await retryWithBackoff(() =>
                uploadImageToCloudinary(`${tool.name}.png`)
              );
              toolWithDetails.img_url = imageUrl;

              await delay(index * 100);

              clearTimeout(timeout); 
              console.log(tool.name)
              return toolWithDetails;
            } catch (error) {
              console.error(
                `Error processing tool "${tool.name || "unknown"}": ${error.message}`
              );
              failedTools.push(tool); 
              clearTimeout(timeout); 
            }
          })
        )
      );

      processedTools.push(batchResults);
      // console.log(processedTools)
      await delay(100);
    }

    const validTools = processedTools[0].filter((tool) => tool !== undefined);

    if (validTools.length === 0) {
      return res.status(400).json({
        message: "No valid tools were processed. Please check the input.",
        failedCount: failedTools.length,
        failedTools,
      });
    }

    
    // if (validTools.length > 0) {
    //   await AITool.insertMany(validTools, { ordered: false });
    //   console.log("saved all");
    // }

    if (validTools.length > 0) {
      try {
        const bulkOperations = validTools.map((tool) => ({
          updateOne: {
            filter: { name: tool.name }, 
            update: { $setOnInsert: tool },
            upsert: true,
          },
        }));
    
        if (bulkOperations.length > 0) {
          const bulkWriteResult = await AITool.bulkWrite(bulkOperations, {
            ordered: false, 
          });
    
          console.log(
            `${bulkWriteResult.upsertedCount} new tools added, ${bulkWriteResult.modifiedCount} existing tools untouched.`
          );
        } else {
          console.log('No valid tools to process.');
        }
      } catch (error) {
        console.error('Error while processing tools:', error);
      }
    }
    


    res.status(201).json({
      message: `${validTools.length} tools uploaded successfully.`,
      failedCount: failedTools.length,
      failedTools,
    });
  } catch (error) {
    console.error("Error in uploadAIToolsData:", error);
    res
      .status(500)
      .json({ error: "An unexpected error occurred. Please try again later." });
  }
};









export const deleteItemsInRange = async (req, res) => {
  try {
    const startIndex = 0;
    const endIndex = 0;

    if (startIndex < 0 || endIndex < startIndex) {
      return res.status(400).json({ error: "Invalid range specified." });
    }

    const idsToDelete = await AITool.find({})
      .sort({ _id: 1 })
      .skip(startIndex)
      .limit(endIndex - startIndex + 1)
      .select("_id")
      .exec();

    const idArray = idsToDelete.map((doc) => doc._id);

    if (idArray.length === 0) {
      return res
        .status(404)
        .json({ message: "No items found in the specified range." });
    }

    const deleteResult = await AITool.deleteMany({ _id: { $in: idArray } });

    res.status(200).json({
      message: `${deleteResult.deletedCount} items successfully deleted.`,
      deletedCount: deleteResult.deletedCount,
    });
  } catch (error) {
    console.error("Error deleting items:", error);
    res.status(500).json({
      error: "An error occurred while deleting items. Please try again.",
    });
  }
};
