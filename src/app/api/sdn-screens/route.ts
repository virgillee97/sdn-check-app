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

interface SearchFields {
  fullName: string;
  dob: string;
  country: string;
}

function buildResponseData(sdnResult: SDNResult) {
  const matchFields = sdnResult?.matches?.[0]?.matchSummary?.matchFields || [];

  const results = matchFields.reduce(
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

  return results;
}

async function verifyCustomerWithOFAC(
  requestBody: SearchFields
): Promise<SDNResult> {
  const sdnRequestBody = {
    apiKey: process.env.NEXT_PUBLIC_OFAC_API_KEY,
    source: ["SDN"],
    types: ["person"],
    cases: [
      {
        name: requestBody.fullName,
        dob: requestBody.dob,
        address: { country: requestBody.country },
      },
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

  return resData?.results[0];
}

export async function POST(req: any) {
  try {
    const requestBody: SearchFields = await req.json();

    const resData = await verifyCustomerWithOFAC(requestBody);
    const responseData = buildResponseData(resData);

    return NextResponse.json(responseData);
  } catch (error) {
    return new NextResponse("Internal Server Error.", {
      status: 500,
    });
  }
}
