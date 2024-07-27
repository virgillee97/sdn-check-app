import { FormValues } from "@/app/components/sdnForm/sdnForm";
import { endpoint } from "../utils/endpoint";

export async function checkCustomerWithSDN(values: FormValues) {
  // Submit input data to backend endpoint
  const data = await fetch(`${endpoint}/sdn-screens`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      fullName: values.fullName,
      dob: values.dob.format("YYYY-MM-DD").toString(),
      country: values.country,
    }),
  });

  if (!data.ok) {
    throw new Error("Failed to submit data");
  }

  return data.json();
}
