export const chatMsg = async (msg) => {
  const response = await fetch("http://localhost:8000/chat", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(msg),
  });
  console.log(response);
  if (!response.ok) {
    throw new Error("Failed to create a message");
  }

  return response.json();
};

export const chatMsgV1 = async (msg, queryParams) => {
  const url = new URL("http://localhost:8000/v1/chat");
  // Add query parameters
  for (const key in queryParams) {
    url.searchParams.append(key, queryParams[key]);
  }

  const response = await fetch(url.toString(), {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(msg),
  });
  console.log(response);

  if (!response.ok) {
    throw new Error("Failed to create post");
  }

  return response.json();
};

export const agentReview = async (msg) => {
  const url = new URL("http://localhost:8000/agent_review");
  const response = await fetch(url.toString(), {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(msg),
  });
  console.log(response);
  if (!response.ok) {
    throw new Error("Failed to create a message");
  }

  return response.json();
};

export const deleteMsg = async () => {
  const response = await fetch("http://localhost:8000/v1/chat", {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (!response.ok) {
    throw new Error("Failed to delete messages");
  }

  return response.json();
};
