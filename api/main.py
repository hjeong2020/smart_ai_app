import uuid
import logging
from fastapi import FastAPI, Request
import requests
import os
from fastapi.middleware.cors import CORSMiddleware
from langchain_openai import ChatOpenAI

from chat.chat_model import ChatBody, ChatResponse
from chat.chat_service import ChatService
from chat.agent_service import AgentService

app = FastAPI()

# Configure basic logging
logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(name)s - %(levelname)s - %(message)s')
logger = logging.getLogger(__name__)

origins = ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Fetch environment variables
LLM_URL = os.environ.get("LOCAL_LLM_URL", "http://model-runner.docker.internal/engines/v1/")
if not LLM_URL.endswith("/"):
    LLM_URL += "/"
LLM_CHAT_ENDPOINT = f"{LLM_URL}chat/completions"
LLM_MODEL = os.environ.get("LOCAL_LLM_MODEL", "ai/gemma3")  # "ai/llama3.2"

llm = ChatOpenAI(
    base_url="http://localhost:12434/engines/v1",  # "http://localhost:12434/engines/llama.cpp/v1/"
    api_key="docker",
    temperature=0,
    model="ai/gemma3",  # ai/llama3.2
    stream_usage=True
)

chat_service = ChatService(llm)
agent_service = AgentService()

@app.post("/chat")
async def chat(req: Request):
    data = await req.json()
    prompt = data.get("prompt", "")

    if not prompt.strip():
        return {"error": "Prompt cannot be empty."}

    payload = {
        "model": LLM_MODEL,
        "messages": [
            {"role": "system", "content": "You are a helpful assistant."},
            {"role": "user", "content": prompt}
        ]
    }

    try:
        response = requests.post(LLM_CHAT_ENDPOINT, json=payload)
        response.raise_for_status()  # raises HTTPError if status is 4xx or 5xx
        return response.json()
    except requests.exceptions.HTTPError as http_err:
        return {
            "error": "HTTP error occurred",
            "status_code": response.status_code,
            "details": response.text
        }
    except requests.exceptions.RequestException as req_err:
        return {
            "error": "Request failed",
            "details": str(req_err)
        }
    except ValueError:
        return {
            "error": "Invalid JSON response",
            "raw_response": response.text
        }


@app.post("/v1/chat")
async def chat_v1(chat_body: ChatBody, thread_id: str | None = None):
    prompt = chat_body.prompt
    logger.debug(prompt)

    if not prompt.strip():
        return {"error": "Prompt cannot be empty."}

    if not thread_id:
        thread_id = str(uuid.uuid5(uuid.NAMESPACE_DNS, prompt))

    response = await chat_service.send_message(prompt=prompt, thread_id=thread_id)
    # return response
    return ChatResponse(prompt=prompt, response=response, thread_id=thread_id)


@app.post("/v1/llm_chat")
async def llm_chat(chat_body: ChatBody):
    prompt = chat_body.prompt
    return await chat_service.send_human_message(prompt)


@app.post("/v1/chat_tools")
async def chat_tools(chat_body: ChatBody):
    prompt = chat_body.prompt
    return await chat_service.send_message_with_tool(prompt)


# @app.post("/search_query")
# async def search_query(chat_body: ChatBody):
#     prompt = chat_body.prompt
#     return await structured_output.search_query(prompt)


@app.post("/agent_review")
async def agent_review(chat_body: ChatBody):
    prompt = chat_body.prompt
    return await agent_service.review(prompt)


# @app.get("/test")
# async def test():
#     return await structured_output.llm_with_tools()


@app.delete("/v1/chat")
async def delete_chat():
    await chat_service.delete_messages()

    return "Success"