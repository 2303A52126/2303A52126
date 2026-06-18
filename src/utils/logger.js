const API_BASE_URL = 'http://20.244.56.144/evaluation-service';
const TOKEN = 'YOUR_TOKEN';

export async function Log(stack, level, packageName, message) {
  try {
    await fetch(`${API_BASE_URL}/logs`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${TOKEN}`,
      },
      body: JSON.stringify({
        stack: stack,
        level: level,
        package: packageName,
        message: message,
      }),
    });
  } catch (error) {
    console.error('Logger failed:', error);
  }
}
