
const ACCESS_TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiYXVkIjoiaHR0cDovLzIwLjI0NC41Ni4xNDQvZXZhbHVhdGlvbi1zZXJ2aWNlIiwiZW1haWwiOiJzYWl0ZWphLjIybWljNzA0OUB2aXRhcHN0dWRlbnQuYWMuaW4iLCJleHAiOjE3Nzg5MzAwMTgsImlhdCI6MTc3ODkyOTExOCwiaXNzIjoiQWZmb3JkIE1lZGljYWwgVGVjaG5vbG9naWVzIFByaXZhdGUgTGltaXRlZCIsImp0aSI6IjdhYTliZDVkLTA2MzktNDZlYi1hOWZhLTE0MTBjNjAwYWEzNyIsImxvY2FsZSI6ImVuLUlOIiwibmFtZSI6ImtvbW1hIHNhaXRlamEiLCJzdWIiOiJkYmEyYjg3Mi1mYTk3LTRlMjEtOWNiMS00ZGIzNDExNTMwOGIifSwiZW1haWwiOiJzYWl0ZWphLjIybWljNzA0OUB2aXRhcHN0dWRlbnQuYWMuaW4iLCJuYW1lIjoia29tbWEgc2FpdGVqYSIsInJvbGxObyI6IjIybWljNzA0OSIsImFjY2Vzc0NvZGUiOiJTZkZ1V2ciLCJjbGllbnRJRCI6ImRiYTJiODcyLWZhOTctNGUyMS05Y2IxLTRkYjM0MTE1MzA4YiIsImNsaWVudFNlY3JldCI6Ik1CemJUenpNYVduc0tEZWoifQ.QUyw5ziGN_Cygr0fFQ1S12urag8zUeNYt1ARdOsMijs";
const LOG_API_URL = "http://4.224.186.213/evaluation-service/logs";


export async function Log(stack, level, packageName, message) {
  try {
    const payload = {
      stack: stack.toLowerCase(),
      level: level.toLowerCase(),
      package: packageName.toLowerCase(),
      message: message
    };

    const response = await fetch(LOG_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${ACCESS_TOKEN}`
      },
      body: JSON.stringify(payload)
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error(`[Test Server Log Failed]: ${response.status}`, errorData);
      return;
    }

    const data = await response.json();
    console.log(`[Test Server Log Success] LogID: ${data.logID}`);
  } catch (error) {
    console.error("[Logger Network Error]:", error);
  }
}