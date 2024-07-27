import { NextApiRequest } from "next";
import { NextResponse } from "next/server";

interface SDNResult {
  name: string;
  matchCount: number;
  matches: {
    score: number;
    matchSummary: {
      matchFields: {
        fieldName: string;
      }[];
    };
  }[];
}

function buildResponseData(sdnResult: SDNResult) {
  const matchFields = sdnResult?.matches[0]?.matchSummary?.matchFields;

  return matchFields.reduce(
    (acc, cv) => {
      switch (cv.fieldName.toLowerCase()) {
        case "name":
          acc.isNameMatched = true;
          break;
        case "dob":
          acc.isDoBMatched = true;
          break;
        case "nationality":
          acc.isCountryMatched = true;
          break;
        default:
          break;
      }
      return acc;
    },
    {
      isNameMatched: false,
      isDoBMatched: false,
      isCountryMatched: false,
    }
  );
}

export async function POST(req: any) {
  try {
    const requestBody = await req.json();

    console.log(requestBody);
    const sdnRequestBody = {
      apiKey: "d7d880d4-c45d-46ba-a4f5-0a0aefdff128",
      source: ["SDN"],
      types: ["person"],
      cases: [
        { name: "Abu Abbas" },
        // {
        //   name: requestBody.fullName,
        //   dob: requestBody.dob,
        //   nationality: requestBody.country,
        // },
      ],
    };

    const res = await fetch("https://api.ofac-api.com/v4/screen", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(sdnRequestBody),
    });
    const resData = await res.json();
    console.log(resData.results);

    const responseData = buildResponseData(resData.results[0]);

    return NextResponse.json(responseData);
  } catch (error) {
    console.log(error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
