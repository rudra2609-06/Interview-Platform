import { apiInstance } from "./axios.js";

// const PISTON_API = "https://piston-api.vercel.app";
export const LANGUAGE_CONFIG = {
  javascript: { language: "nodejs", versionIndex: "2" },
  python: { language: "python3", versionIndex: "3" },
  java: { language: "java", versionIndex: "0" },
};

/**
 * @param {string} language ---- programming language
 * @param {string} code  ------ source code to execute
 * @returns {Promise<{success:boolean, output?:string, error?:string}>}
 */

export async function executeCode(language, code) {
  try {
    console.log(language);
    console.log(code);
    const res = await apiInstance.post(`/code/execute`, {
      language: LANGUAGE_CONFIG[language].language,
      code,
      version: LANGUAGE_CONFIG[language]?.versionIndex,
    });
    const { data } = res.data;
    if (data.statusCode === 200) {
      return {
        success: true,
        output: String(data.output),
      };
    } else {
      return {
        success: false,
        error: data.error,
      };
    }
  } catch (error) {
    return {
      success: false,
      error: error?.message || String(error),
    };
  }
}
