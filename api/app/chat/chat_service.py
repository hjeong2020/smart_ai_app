import logging

from langchain_core.language_models import BaseChatModel
from langchain_core.messages import SystemMessage, HumanMessage, RemoveMessage
from langgraph.checkpoint.memory import InMemorySaver
from langchain_core.runnables import RunnableConfig
from langchain.agents.middleware import dynamic_prompt, ModelRequest, SummarizationMiddleware
from langchain.agents import create_agent
from langgraph.graph.message import REMOVE_ALL_MESSAGES
from app.chat.chat_model import CustomContext
from langchain_openai import ChatOpenAI


model = ChatOpenAI(
    base_url="http://localhost:12434/engines/v1",
    api_key="docker",
    temperature=0,
    model="ai/gemma3"
)


class ChatService:

    def __init__(self, llm: BaseChatModel):
        print(f"Initializing... {__name__}")
        self.logger = logging.getLogger(__name__)
        self.llm = llm
        self.llm.invoke(
            [SystemMessage(content="You are a helpful and friendly agent. Please use emojis when generating a reply.")]
        )
        self.checkpointer = InMemorySaver()

    async def send_message(self, prompt: str, thread_id: str):
        agent = create_agent(
            model=self.llm,
            tools=[],
            middleware=[
                SummarizationMiddleware(
                    model=model,
                    max_tokens_before_summary=4000,  # Trigger summarization at 4000 tokens
                    messages_to_keep=20,  # Keep last 20 messages after summary
                )
            ],
            checkpointer=self.checkpointer,
        )
        config: RunnableConfig = {"configurable": {"thread_id": thread_id}}
        result = agent.invoke(
            {"messages": [HumanMessage(content=prompt)]},
            config
        )
        self.logger.info(f"Response: {result}")
        return result.get('messages')[-1].content

    async def send_human_message(self, prompt: str):
        messages = [
            SystemMessage(content="You are a helpful assistant."),
            HumanMessage(content=prompt)
        ]

        response = self.llm.invoke(messages)
        self.logger.debug(f"Response from LLM: {response}")
        return response.content

    async def send_message_with_tool(self, prompt: str):
        agent = create_agent(
            self.llm,
            tools=[get_weather],
            middleware=[dynamic_system_prompt],
            context_schema=CustomContext,
        )
        result = agent.invoke(
            {"messages": [{"role": "user", "content": "What is the weather in SF?"}]},
            context=CustomContext(user_name="John Smith"),
        )

        for msg in result["messages"]:
            msg.pretty_print()
        return result

    async def delete_messages(self):
        self.logger.info("Deleting messages...")
        return {"messages": [RemoveMessage(id=REMOVE_ALL_MESSAGES)]}


def get_weather(city: str) -> str:
    """Get the weather in a city."""
    return f"The weather in {city} is always sunny!"


@dynamic_prompt
def dynamic_system_prompt(request: ModelRequest) -> str:
    user_name = request.runtime.context["user_name"]
    system_prompt = (f"You are a helpful assistant. "
                     f"Address the user as {user_name}. "
                     f"Always include {user_name} in your response")
    return system_prompt
