from dataclasses import dataclass
from typing import TypedDict, Literal
from langchain.agents import AgentState
from pydantic import BaseModel, Field


class ChatBody(BaseModel):
    prompt: str


class ChatResponse(BaseModel):
    prompt: str
    response: str
    thread_id: str


class CustomState(AgentState):
    user_id: str


class CustomContext(TypedDict):
    user_name: str


class SearchQuery(BaseModel):
    search_query: str = Field(None, description="Query that is optimized web search.")
    justification: str = Field(
        None, description="Why this query is relevant to the user's request."
    )


@dataclass
class ProductReview:
    """Analysis of a product review."""
    rating: int | None  # The rating of the product (1-5)
    sentiment: Literal["positive", "negative"]  # The sentiment of the review
    key_points: list[str]  # The key points of the review
