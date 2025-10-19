# https://www.geeksforgeeks.org/machine-learning/what-are-recommender-systems/
import logging
from langchain_core.messages import SystemMessage
from langchain_openai import ChatOpenAI
from langgraph.checkpoint.memory import InMemorySaver

model = ChatOpenAI(
    base_url="http://localhost:12434/engines/v1",
    api_key="docker",
    temperature=0,
    model="ai/phi4"
)


class RecommenderService:

    def __init__(self):
        print(f"Initializing... {__name__}")
        self.logger = logging.getLogger(__name__)
        self.model = model
        self.model.invoke(
            [SystemMessage(content="You are a recommendation expert.")]
        )
        self.checkpointer = InMemorySaver()