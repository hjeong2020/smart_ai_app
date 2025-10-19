# Schema for structured output
import logging

from langchain.agents import create_agent
from langchain.agents.structured_output import ToolStrategy
from langchain_openai import ChatOpenAI

from chat.chat_model import SearchQuery, ProductReview


class AgentService:
    def __init__(self, model:str = "ai/phi4"):
        self.logger = logging.getLogger(__name__)
        self.model = ChatOpenAI(
            base_url="http://localhost:12434/engines/v1",
            api_key="docker",
            temperature=0,
            model=model
        )


    '''
    async def search_query(self, prompt: str | None):
        query = "How does Calcium CT score relate to high cholesterol?" if not prompt else prompt
        # Augment the LLM with schema for structured output
        structured_llm = self.llm.with_structured_output(SearchQuery)
        self.logger.info("Search query: %s", query)

        # Invoke the augmented LLM
        return structured_llm.invoke(query)

    async def llm_with_tools(self):
        # Augment the LLM with tools
        llm_with_tools = self.llm.bind_tools([multiply])

        # Invoke the LLM with input that triggers the tool call
        msg = llm_with_tools.invoke("What is 2 times 3?")
        print(msg.tool_calls)
        return msg
    '''

    async def review(self, review: str) -> str:
        agent = create_agent(
            model=self.model,
            tools=[],
            response_format=ToolStrategy(ProductReview),
            system_prompt="""
                    You are an assistant tasked with extracting key information from product review texts.
                    The rating of the product (1-5). 1 - negative, 5 - positive
                    Please do not make up any field or value; use only the information present in the given review text
                    """
        )
        result = agent.invoke({"messages": [{"role": "user", "content": f"{review}"}]})
        print(result)
        # for stream_mode, chunk in agent.stream(
        #         {"messages": [{"role": "user", "content": f"{review}"}]},
        #         stream_mode=["updates", "custom"]
        # ):
        #     print(f"stream_mode: {stream_mode}")
        #     print(f"content: {chunk}")
        #     print("\n")
        return result["structured_response"]


# Define a tool
def multiply(a: int, b: int) -> int:
    return a * b
