export const runtime = "edge";

export async function POST(request: Request): Promise<Response> {
  const body = await request.json().catch(() => ({}));
  const email: unknown = body?.email;

  if (typeof email !== "string" || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return Response.json({ error: "Valid email required." }, { status: 400 });
  }

  const apiKey = process.env.KIT_API_KEY;
  const formId = process.env.KIT_FORM_ID;

  if (!apiKey || !formId) {
    console.error("KIT_API_KEY or KIT_FORM_ID not set");
    return Response.json({ error: "Configuration error." }, { status: 500 });
  }

  const kitRes = await fetch(
    `https://api.kit.com/v4/forms/${formId}/subscribers`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({ email_address: email }),
    }
  );

  if (!kitRes.ok) {
    console.error("Kit API error:", kitRes.status, await kitRes.text());
    return Response.json(
      { error: "Could not subscribe. Please try again." },
      { status: 502 }
    );
  }

  return Response.json({
    ok: true,
    downloadUrl: process.env.PUBLIC_DOWNLOAD_URL ?? "",
  });
}
